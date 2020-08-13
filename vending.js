class Vending {

    constructor() {
        this.balance = 0.0;
        this.coinLookup = {
            "nickle": .05,
            "dime": .1,
            "quarter": .25
        };

        this.coinReverseLookupArray = [
            { 
                coinValue: .25,
                coinName: "quarter"
            },
            { 
                coinValue: 0.1,
                coinName: "dime" 
            },
            {
                coinValue: 0.05,
                coinName: "nickle"
            }
        ]

        this.productLookUp = {
            "1": {
                name: "cola",
                price: 1.00,
                inventory: 5
            },
            "2": {
                name: "chips",
                price: .5,
                inventory: 5
            },
            "3": {
                name: "candy",
                price: .65,
                inventory: 5
            },
            "4": {
                name: "chocolate",
                price: .20,
                inventory: 0
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

    makeChange = (remainingBalance) => {
        while (remainingBalance > 0) {
            if (remainingBalance === 0) {
                break;
            }
            for (let i = 0; i < this.coinReverseLookupArray.length; i++) {
                const currentCoin = this.coinReverseLookupArray[i];
                if (currentCoin.coinValue <= remainingBalance) {
                    this.rejectedCoins.push(currentCoin.coinName);
                    remainingBalance -= currentCoin.coinValue;
                    break;
                }
            }
        }
    }
    selectProduct = (productNumber) => {
        let selectedProduct = this.productLookUp[parseInt(productNumber)];
        if (this.balance < selectedProduct.price) {
            this.displayText = "PRICE $" + selectedProduct.price.toFixed(2);
        }
        else {
            if (this.balance > selectedProduct.price) {
                let remainingBalance = (((this.balance * 100) - (selectedProduct.price * 100)) / 100);
                this.makeChange(remainingBalance);
            }
            selectedProduct.inventory -= 1;
            this.balance = 0;
            this.displayText = "THANK YOU";
        }
    }
    returnCoins = () => {
        let remainingBalance = this.balance;
        this.makeChange(remainingBalance);
        this.balance = 0;
    }
}

module.exports = Vending;