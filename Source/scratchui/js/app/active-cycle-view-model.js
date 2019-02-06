
(function( diners, $, undefined ) {

    diners.ActiveCycleViewModel = class {
        constructor(api) {
            this.api = api;
            this.cycleVm = ko.observable(ko.mapping.fromJS(new diners.CycleViewModel()));
            this.showNewEntry = ko.observable(false);
            this.newEntryVm = ko.observable(ko.mapping.fromJS(new diners.EntryViewModel({"api":api})));
            
            this.getDateRange = ko.pureComputed(function() {
                if (this.cycleVm().cycle().startDate().length > 0)
                    return $.format.date(this.cycleVm().cycle().startDate(), "MM/dd/yy") + " to " + $.format.date(this.cycleVm().cycle().endDate(), "MM/dd/yy");
                else
                    return "";
            }, this);            

            var self = this;
            api.getActiveCycle(
                function(data)
                {
                    self.cycleVm().cycle(ko.mapping.fromJS(data));
                },
                function(error) {alert(JSON.stringify(error))}
            );

            this.closeNewEntry = function(){  self.showNewEntry(false); }
            diners.broker.subscribe(diners.events.closeNewEntryWindow, this.closeNewEntry);
        }

        newEntryClicked() {
            this.showNewEntry(true);
            this.createEntryViewModel();
        }

        createEntryViewModel() {
            let entryVm = ko.mapping.fromJS(new diners.EntryViewModel(
                {"buckets":this.cycleVm().cycle().buckets(), "api":this.api}
                ));
            this.newEntryVm(entryVm);
        }
    }
    
}( window.diners = window.diners || {}, jQuery ));