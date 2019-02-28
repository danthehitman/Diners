
$(document).ready(function () {

    diners.initializeAcitiveCycleApp();

    // let cycleVm = new ActiveCycleViewModel();

    // // var api = new DinersApi("https://192.168.1.22:5001");
    // var api = new DinersApi("https://localhost:5001");

    // api.getActiveCycle(
    //     function(data)
    //     {
    //         cycleVm.cycle = ko.mapping.fromJS(data);
    //         ko.applyBindings(cycleVm);
    //     },
    //     function(error) {alert(error)}
    // );
});

(function( diners, $, undefined ) {

    var aca = diners.activeCycleApp = {templatesLoaded:false};
    
    diners.initializeAcitiveCycleApp = function()
    {
        // var api = new DinersApi("https://192.168.1.25:5001");
        var api = new DinersApi("https://127.0.0.1:5001");
        aca.activeCycleVm = new diners.ActiveCycleViewModel(api);

        var checkReady = function() {
            if (aca.templatesLoaded) {
                ko.applyBindings(aca);
            } else {
                setTimeout(checkReady, 100);
            }
        }
        checkReady();
        //ko.applyBindings(aca);
    };

}( window.diners = window.diners || {}, jQuery ));

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function isDecimalKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode != 46 &&(charCode < 48 || charCode > 57)))
        return false;
    return true;
}


