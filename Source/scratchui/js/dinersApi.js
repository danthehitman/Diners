class DinersApi {
    constructor (baseUri)
    {    
        this.url =  baseUri + "/api/";
    }
    
    getCycles (success_callback, error_callback) {
        this.getResource("cycles", success_callback, error_callback);
    }

    getActiveCycle (success_callback, error_callback) {
        this.getResource("cycles/active", success_callback, error_callback);
    }
    
    getResource (resourceUrl, success_callback, error_callback){
        $.ajax({
            type: "GET",
            url: this.url + resourceUrl,
            dataType:"json",
            success: success_callback,
            error: error_callback
        });
    }

    // this.getResource = function(resourceUrl, success_callback, error_callback){
    //     $.ajax({
    //         type: "GET",
    //         url: this.url + resourceUrl,
    //         data: data,
    //         dataType:"json",
    //         success: success_callback,
    //         error: error_callback
    //     });
    // }
}