
$(document).ready(function () {

    let dinersApp = new DinersApp();

    var api = new DinersApi("https://localhost:44316");
    api.getCycles(
        function(data){alert(data); dinersApp.Cycles = data;},
        function(error) {alert(error)}
    );
    
    $("#testDiv").click(function () {
    });
});

function DinersApp() {
    this.Cycles = null;
}