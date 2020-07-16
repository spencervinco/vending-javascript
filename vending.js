class Vending {

    constructor() {
        this.balance = 0.0;
        this.coinLookup = {
            "nickle": .05,
            "dime": .1
        }
    }
    getDisplay = () => this.balance === 0.0 ? "INSERT COINS" : ("balance: " + this.balance.toFixed(2));
    insertCoin = (coinName) => {
        this.balance += this.coinLookup[coinName] ? this.coinLookup[coinName] : 0.0;
    }
}

module.exports = Vending;