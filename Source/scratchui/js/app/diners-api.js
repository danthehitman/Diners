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
    
    getResource (resourceUrl, success_callback, error_callback) {
        $.ajax({
            type: "GET",
            url: this.url + resourceUrl,
            dataType:"json",
            success: success_callback,
            error: error_callback
        });
    }

    createEntry (entry, success_callback, error_callback) {
        this.postResource("entries", entry, success_callback, error_callback);
    }

    postResource (resourceUrl, data, success_callback, error_callback) {
        $.ajax({
            type: "POST",
            url: this.url + resourceUrl,
            data: JSON.stringify(data),
            dataType:"json",
            contentType: "application/json; charset=utf-8",
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