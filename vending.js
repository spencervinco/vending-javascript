class Vending {

    constructor() {
        this.balance = 0.0;
        this.coinLookup = {
            "nickle": .05,
            "dime": .1,
            "quarter": .25
        };
        this.productLookUp = {
            "1": {
                name: "cola",
                price: 1.00
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
            this.balance = 0;
            this.displayText = "THANK YOU";
        }
    }
}

module.exports = Vending;