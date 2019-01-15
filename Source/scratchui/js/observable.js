function observable(value) {
    var listeners = [];

    function notify(newValue) {
        listeners.forEach(function (listener) { listener(newValue); });
    }

    function accessor(newValue, force) {
        if (force || (arguments.length && newValue !== value)) {
            value = newValue;
            notify(newValue);
        }
        return value;
    }

    accessor.subscribe = function (listener) { listeners.push(listener); };

    return accessor;
}

function computed(calculation, dependencies) {
    // start with the initial value
    var value = observable(calculation());

    // register a listener for each dependency, that updates the value
    function listener() { value(calculation()); }
    dependencies.forEach(function (dependency) {
        dependency.subscribe(listener);
    });

    // now, wrap the value so that users of computed() can't manually update the value
    function getter() { return value(); }
    getter.subscribe = value.subscribe;

    return getter;
}

function observableArray(initialValues) {
    var _initialValues = initialValues || [];

    var result = observable(_initialValues);

    sui.utils.extend(result, observableArray['fn']);

    return result;
}

observableArray['fn'] = {}

sui.utils.arrayForEach(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (methodName) {
    observableArray['fn'][methodName] = function () {
        var methodCallResult = this()[methodName].apply(this(), arguments);
       this(this(), true);
    };
});

function bindValue(input, observable) {
    var initial = observable();
    input.value = initial;
    observable.subscribe(function () { input.value = observable(); });

    var converter = function (v) { return v; };
    if (typeof initial == 'number') {
        converter = function (n) { return isNaN(n = parseFloat(n)) ? 0 : n; };
    }

    input.addEventListener('input', function () {
        observable(converter(input.value));
    });
}
