export default class YourListModel {
    constructor() {
        this.localStorageKey = 'customListings';
        this.data = {
            results: [
                {
                    itemID: 0,
                    title: "The mask of sanity",
                    contributor: ["Hervey M. Cleckley"],
                    description: ["No description available."],
                    date: 1941,
                    rating: 1.4,
                    image_url: ["https://covers.openlibrary.org/b/olid/OL8518405M-L.jpg"],
                    resell_price: 46.02,
                    seller: "CampusBooks",
                    tags: "general",
                    negotiable: false,
                    quantity: 1,
                },
                {
                    itemID: 1,
                    title: "Physics Textbook Part - 1 for Class - 11 - 11086",
                    contributor: ["NCERT (Author)"],
                    description: ["A book about Physics."],
                    date: 2014,
                    rating: 2.3,
                    image_url: ["https://covers.openlibrary.org/b/olid/OL27054365M-L.jpg"],
                    resell_price: 113.23,
                    seller: "BookBarn",
                    tags: "science physics mechanics",
                    negotiable: false,
                    quantity: 1,
                },
                {
                    itemID: 2,
                    title: "The united-independent compensatory code/system/concept",
                    contributor: ["Neely Fuller"],
                    description: ["No description available."],
                    date: 1984,
                    rating: 3.1,
                    image_url: [""],
                    resell_price: 110.34,
                    seller: "BookBarn",
                    tags: "general",
                    negotiable: false,
                    quantity: 1,
                },
                {
                    itemID: 3,
                    title: "Our sexuality",
                    contributor: ["Crooks, Robert, Robert L. Crooks, Karla Baur"],
                    description: ["No description available."],
                    date: 1980,
                    rating: 3.6,
                    image_url: ["https://covers.openlibrary.org/b/olid/OL3699118M-L.jpg"],
                    resell_price: 54.82,
                    seller: "ScholarTrade",
                    tags: "general",
                    negotiable: false,
                    quantity: 1,
                },
                {
                    itemID: 4,
                    title: "Macroeconomics",
                    contributor: [
                        "Campbell R. McConnell, Stanley L. Brue, Sean M. Flynn, Thomas Paul Barbiero, Sean Flynn",
                    ],
                    description: ["No description available."],
                    date: 1989,
                    rating: 2.1,
                    image_url: ["https://covers.openlibrary.org/b/olid/OL9250781M-L.jpg"],
                    resell_price: 144.26,
                    seller: "ScholarTrade",
                    tags: "business",
                    negotiable: false,
                    quantity: 1,
                },
                {
                    itemID: 5,
                    title: "Research in psychology",
                    contributor: ["C. James Goodwin"],
                    description: ["No description available."],
                    date: 1995,
                    rating: 4.5,
                    image_url: [""],
                    resell_price: 35.09,
                    seller: "CampusBooks",
                    tags: "social science behavior psychology",
                    negotiable: false,
                    quantity: 1,
                },
                {
                    itemID: 6,
                    title: "Life-span development",
                    contributor: ["John W. Santrock"],
                    description: ["No description available."],
                    date: 2005,
                    rating: 4.7,
                    image_url: ["https://covers.openlibrary.org/b/olid/OL24412871M-L.jpg"],
                    resell_price: 57.92,
                    seller: "BookBarn",
                    tags: "social science behavior",
                    negotiable: false,
                    quantity: 1,
                },
                {
                    itemID: 7,
                    title: "The Humanistic Tradition",
                    contributor: ["Gloria K. Fiero"],
                    description: ["No description available."],
                    date: 1981,
                    rating: 4.5,
                    image_url: ["https://covers.openlibrary.org/b/olid/OL3427957M-L.jpg"],
                    resell_price: 52.16,
                    seller: "ScholarTrade",
                    tags: "general",
                    negotiable: false,
                    quantity: 1,
                },
                {
                    itemID: 8,
                    title: "Psychology",
                    contributor: ["Gray, Peter"],
                    description: ["No description available."],
                    date: 1991,
                    rating: 1.9,
                    image_url: ["https://covers.openlibrary.org/b/olid/OL3944042M-L.jpg"],
                    resell_price: 35.11,
                    seller: "CampusBooks",
                    tags: "social science behavior psychology",
                    negotiable: false,
                    quantity: 1,
                },

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
        // Get current saved items or empty array
        let saved = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];

        const maxID = Math.max(...this.data.results.map(item => item.itemID), 0);
        newItem.itemID = maxID + 1;

        // Save to localStorage
        saved.push(newItem);
        localStorage.setItem(this.localStorageKey, JSON.stringify(saved));
        this.data.results.push(newItem);
    }

    update(updatedItem) {
        const index = this.data.results.findIndex(item => item.itemID === updatedItem.itemID);
        if (index !== -1) {
            this.data.results[index] = updatedItem;
            // Update localStorage
            localStorage.setItem('listings', JSON.stringify(this.data.results));
        }
    }

    delete(itemID) {
        this.data.results = this.data.results.filter(item => item.itemID !== itemID);
        // Remove from localStorage
        let saved = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
        saved = saved.filter(item => item.itemID !== itemID);
        localStorage.setItem(this.localStorageKey, JSON.stringify(saved));
    }

}