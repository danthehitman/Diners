var sui = {};
sui.utils = (function () {

    function extend(target, source) {
        if (source) {
            for(var prop in source) {
                if(hasOwnProperty.call(source, prop)) {
                    target[prop] = source[prop];
                }
            }
        }
        return target;
    }

    return {
        extend: extend,

        arrayForEach: function (array, action, actionOwner) {
            for (var i = 0, j = array.length; i < j; i++) {
                action.call(actionOwner, array[i], i, array);
            }
        },

    }

}());