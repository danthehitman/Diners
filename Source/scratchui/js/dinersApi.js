function DinersApi(baseUri) {
    
    this.url =  baseUri + "/api/";
    
    this.getCycles = function(success_callback, error_callback) {
        this.getResource("cycles", success_callback, error_callback);
    }
    
    this.getResource = function(resourceUrl, success_callback, error_callback){
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