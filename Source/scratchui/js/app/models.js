(function( diners, $, undefined ) {
    diners.models = {};
    
    diners.models.Entry = class {
        constructor() {
            this.bucketId = "";
            this.ammount = "";
            this.name = "";
            this.notes = "";
            this.location = "";
            this.locationPoint = null;
        }
    }

    diners.models.Cycle = class {
        constructor() {
            this.startDate = "";
            this.endDate = "";
            this.buckets = [];
            this.budget = 0;
            this.savingsTarget = 0;
            this.extendedData = {};
        }
    }

}( window.diners = window.diners || {}, jQuery ));