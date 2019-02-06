(function( diners, $, undefined ) {

    diners.EntryViewModel = class {
        constructor(args) {
            if (args.buckets) 
                this.buckets = ko.observableArray(args.buckets);
            else 
                this.buckets = ko.observableArray([]);

            if (args.entry)
                this.entry = ko.observable(args.entry); 
            else 
                this.entry = ko.observable(ko.mapping.fromJS(new diners.models.Entry()));

            this.selectedBucket = ko.observable(null);

            this.api = args.api

            this.includeLocationPoint = ko.observable(false);

            var self = this;
            this.saveEntryClicked = function() {
                self.saveEntry();
                diners.broker.publish(diners.events.closeNewEntryWindow);
            }
        }   

        saveEntry() {  
            this.entry().bucketId(this.selectedBucket().id()); 
            var self = this;         
            this.api.createEntry(ko.mapping.toJS(this.entry()),
                function(data)
                {
                    self.addEntryToBucket(self.entry());
                },
                function(error) {alert(JSON.stringify(error))}
            );
        }

        addEntryToBucket(entry) {
            for (let i = 0; i < this.buckets().length; i++) {
                const element = this.buckets()[i];
                if (element.id() === entry.bucketId()) {
                    element.entries.push(entry);
                }
            }
        }
    }

}( window.diners = window.diners || {}, jQuery ));