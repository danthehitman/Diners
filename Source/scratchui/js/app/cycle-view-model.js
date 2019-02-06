(function( diners, $, undefined ) {

    diners.CycleViewModel = class {
        constructor(cycle) {
            if (cycle) 
                this.cycle = ko.observable(ko.mapping.fromJS(cycle));
            else 
                this.cycle = ko.observable(ko.mapping.fromJS(new diners.models.Cycle()));

            this.getBucketTotals = ko.pureComputed(function() {
                let total = 0;
                for (let i = 0; i < this.cycle().buckets().length; i++) {
                    const element = this.cycle().buckets()[i];
                    let bucketTotal = diners.CycleViewModel.getBucketTotal(element);
                    // element.entries().forEach(function(num){bucketTotal+=parseFloat(num.ammount()) || 0;});
                    total+=bucketTotal;
                }
                return total;
            }, this);

            this.getTopBuckets = function(count) {
                return ko.computed(function() {
                    var result = [];

                    for (let i = 0; i < this.cycle().buckets().length; i++) {
                        const element = this.cycle().buckets()[i];
                        let bucketTotal = diners.CycleViewModel.getBucketTotal(element);
                        result.push({name:element.name, total:bucketTotal})
                    }

                    result.sort(
                        function (left, right) {
                             return left.total == right.total ? 0 : (left.total > right.total ? -1 : 1) 
                        });

                    return result.splice(0,count);                    
                }, this);  
            }.bind(this);

            this.getCurrentSavings = function() {
                return ko.computed(function() {
                    var bucketTotals = this.getBucketTotals();
                    return this.cycle().budget() - bucketTotals;
                }, this);  
            }.bind(this);
        }

        static getBucketTotal(bucket) {
            let bucketTotal = 0;
            bucket.entries().forEach(function(num){bucketTotal+=parseFloat(num.ammount()) || 0;});
            return bucketTotal;
        }
    }

}( window.diners = window.diners || {}, jQuery ));