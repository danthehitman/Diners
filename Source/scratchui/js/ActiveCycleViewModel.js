class ActiveCycleViewModel {
    constructor(cycle) {
        this.cycle = null;
        this.selectedCycle = null;
        this.showNewEntry = new ko.observable(false);
    }

    newEntryClicked() {
        this.showNewEntry(true);
    }

    closeNewEntry() {
        this.showNewEntry(false);
    }
}