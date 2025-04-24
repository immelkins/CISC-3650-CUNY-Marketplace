export default class YourListModel {
    constructor() {
        this.localStorageKey = 'customListings';
        this.data = {
            results: [
            ]
        };

        // Merge with stored listings
        this.loadLocalListings();
    }

    loadLocalListings() {
        const saved = localStorage.getItem(this.localStorageKey);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                this.data.results = this.data.results.concat(parsed);
            } catch (err) {
                console.error('Error parsing localStorage data:', err);
            }
        }
    }

    getAll() {
        return this.data.results;
    }

    getById(itemID) {
        return this.data.results.find(item => item.itemID === parseInt(itemID));
    }

    addListing(newItem) {
        let nextID = parseInt(localStorage.getItem(this.pkeyStorageKey) || "1");
        newItem.itemID = nextID;
        this.data.results.push(newItem);
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.data.results));
        localStorage.setItem(this.pkeyStorageKey, (nextID + 1).toString());
    }

    remove(itemID) {
        const index = this.data.results.findIndex(item => item.itemID === itemID);
        if (index !== -1) {
            this.data.results.splice(index, 1);
            localStorage.setItem(this.localStorageKey, JSON.stringify(this.data.results));
        }
    }
}