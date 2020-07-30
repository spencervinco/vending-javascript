class Vending {

    constructor() {
        this.balance = 0.0;
        this.coinLookup = {
            "nickle": .05,
            "dime": .1,
            "quarter": .25
        };
        this.coinReverseLookup = {
            "0.05": "nickle",
            "0.1": "dime",
            "0.25": "quarter"
        };
        this.productLookUp = {
            "1": {
                name: "cola",
                price: 1.00
            },
            "2": {
                name: "chips",
                price: .5
            },
            "3": {
                name: "candy",
                price: .65
            }
        };
        this.rejectedCoins = [];
        this.displayText = '';
    }
    getDisplay = () => {
        let currentDisplay = this.displayText;
        if (currentDisplay.length === 0) {
            currentDisplay = this.balance === 0.0 ? "INSERT COINS" : ("balance: " + this.balance.toFixed(2));
        }
        this.displayText = '';
        return currentDisplay;
    }
    insertCoin = (coinName) => {
        const identifiedCoin = this.coinLookup[coinName];

        if (!identifiedCoin) {
            this.rejectedCoins.push(coinName);
        } else {
            this.balance += identifiedCoin;
        }

    }
    getChange = () => {
        return this.rejectedCoins;
    }
    selectProduct = (productNumber) => {
        let selectedProduct = this.productLookUp[parseInt(productNumber)];
        if (this.balance < selectedProduct.price) {
            this.displayText = "PRICE $" + selectedProduct.price.toFixed(2);
        }
        else {
            if (this.balance > selectedProduct.price) {
                this.rejectedCoins.push(this.coinReverseLookup[(((this.balance * 100) - (selectedProduct.price * 100)) / 100).toString()]);
            }
            this.balance = 0;
            this.displayText = "THANK YOU";
        }
    }
}

module.exports = Vending;