
$(document).ready(function () {

    let cycleVm = new ActiveCycleViewModel();

    // var api = new DinersApi("https://192.168.1.22:5001");
    var api = new DinersApi("https://localhost:5001");

    api.getActiveCycle(
        function(data)
        {
            cycleVm.cycle = ko.mapping.fromJS(data);
            ko.applyBindings(cycleVm);
        },
        function(error) {alert(error)}
    );
});

