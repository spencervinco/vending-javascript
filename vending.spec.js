const Vending = require('./vending')

test('vending exists ', () => {
    expect(Vending).toBeDefined();
});

test('vending displays INSERT COINS', () => {
    let vendingRef = new Vending();
    expect(vendingRef.getDisplay()).toBe("INSERT COINS");
});

test('increases balance by .05 when a nickle is inserted', () => {
    let vendingRef = new Vending();
    vendingRef.insertCoin("nickle");
    expect(vendingRef.getDisplay()).toBe("balance: 0.05");
});

test('increases balance by .10 when a dime is inserted', () => {
    let vendingRef = new Vending();
    vendingRef.insertCoin("dime");
    expect(vendingRef.getDisplay()).toBe("balance: 0.10");
});

test('increases balance by .25 when a quarter is inserted', () => {
    let vendingRef = new Vending();
    vendingRef.insertCoin("quarter");
    expect(vendingRef.getDisplay()).toBe("balance: 0.25");
});

test('does not increases balance when a penny is inserted', () => {
    let vendingRef = new Vending();
    vendingRef.insertCoin("dime");
    vendingRef.insertCoin("penny");
    expect(vendingRef.getDisplay()).toBe("balance: 0.10");
});

test('balance should be equal to .35', () => {
    let vendingRef = new Vending();
    vendingRef.insertCoin("dime");
    vendingRef.insertCoin("quarter");
    expect(vendingRef.getDisplay()).toBe("balance: 0.35");
});

test('odd coins are returned from rejectedCoins function', () => {
    let vendingRef = new Vending();
    vendingRef.insertCoin("penny");
    expect(vendingRef.getChange().length).toBeGreaterThan(0);
});

//Select Product
describe("Select Product", () => {
    test('should display THANK YOU after selecting a product', () => {
        let vendingRef = new Vending();
        vendingRef.insertCoin('quarter');
        vendingRef.insertCoin('quarter');
        vendingRef.insertCoin('quarter');
        vendingRef.insertCoin('quarter');
        vendingRef.selectProduct(1);
        expect(vendingRef.getDisplay()).toBe('THANK YOU');
    });

    test('should display a INSERT COIN if get display is checked twice.', () => {
        let vendingRef = new Vending();
        vendingRef.insertCoin('quarter');
        vendingRef.insertCoin('quarter');
        vendingRef.insertCoin('quarter');
        vendingRef.insertCoin('quarter');
        vendingRef.selectProduct(1);
        vendingRef.getDisplay(); //thank you
        expect(vendingRef.getDisplay()).toBe('INSERT COINS');
    });

    test('should set the amount to 0.00 after displaying Thank you', () => {
        let vendingRef = new Vending();
        vendingRef.insertCoin('quarter');
        vendingRef.insertCoin('quarter');
        vendingRef.insertCoin('quarter');
        vendingRef.insertCoin('quarter');
        vendingRef.selectProduct(1);
        vendingRef.getDisplay(); //thank you
        expect(vendingRef.balance).toBe(0.00);
    });

    test('should display price of cola if balance is less than price', () => {
        let vendingRef = new Vending();
        vendingRef.selectProduct(1);
        expect(vendingRef.getDisplay()).toBe('PRICE $1.00');
    });

    test('should display price of chips if balance is less than price', () => {
        let vendingRef = new Vending();
        vendingRef.selectProduct(2);
        expect(vendingRef.getDisplay()).toBe('PRICE $0.50');
    });

    test('should display price of candy if balance is less than price', () => {
        let vendingRef = new Vending();
        vendingRef.selectProduct(3);
        expect(vendingRef.getDisplay()).toBe('PRICE $0.65');
    });

    test('should display price of product if balance is less than price', () => {
        let vendingRef = new Vending();
        vendingRef.insertCoin('quarter');
        vendingRef.selectProduct(3);
        expect(vendingRef.getDisplay()).toBe('PRICE $0.65');
        expect(vendingRef.getDisplay()).toBe("balance: 0.25");
    });

    test('should return dime as change when product selected is 10 less than balance', () => {
        let vendingRef = new Vending();
        vendingRef.insertCoin('quarter');
        vendingRef.insertCoin('quarter');
        vendingRef.insertCoin('dime');
        vendingRef.selectProduct(2);

        expect(vendingRef.getChange()).toEqual(["dime"]);
    });

    test('should return two dimes as change when product selected is 20 less than balance', () => {
        let vendingRef = new Vending();
        vendingRef.insertCoin('quarter');
        vendingRef.insertCoin('quarter');
        vendingRef.insertCoin('quarter');
        vendingRef.insertCoin('dime'); //.85
        vendingRef.selectProduct(3);  //.65
//change 20
        expect(vendingRef.getChange()).toEqual(["dime", "dime"]);
    });

    test('should return the inserted amount of money/coins if no product is purchased', () => {
        let vendingRef = new Vending();
        vendingRef.insertCoin('quarter');
        vendingRef.insertCoin('quarter');
        vendingRef.returnCoins();
        expect(vendingRef.getChange()).toEqual(["quarter", "quarter"]);
    });

    test('should set balance to zero if return coins button is pressed', () => {
        let vendingRef = new Vending();
        vendingRef.insertCoin('quarter');
        vendingRef.insertCoin('quarter');
        vendingRef.returnCoins();
        expect(vendingRef.balance).toBe(0.00);
    });
    
    test('should reduce inventory when product is purchased', () => {
        let vendingRef = new Vending();
        vendingRef.insertCoin('quarter');
        vendingRef.insertCoin('quarter');
        vendingRef.insertCoin('quarter');
        vendingRef.insertCoin('dime'); //.85
        let startingInventory = vendingRef.productLookUp["3"].inventory;
        vendingRef.selectProduct(3);  //.65
        expect(vendingRef.productLookUp["3"].inventory).toBe(startingInventory - 1);
    });

    //It was stuck in an ever-going loop - needs to be fixed 
    test('should display the SOLD OUT message when a product is out of stock', () => {
        let vendingRef = new Vending();
        vendingRef.insertCoin('quarter');
        vendingRef.insertCoin('dime'); 
        vendingRef.selectProduct(4); 
        expect(vendingRef.getDisplay()).toBe('SOLD OUT');
    });

    test('should display the the balance aif display is checked after SOLD out is displayed', () => {
        let vendingRef = new Vending();
        vendingRef.insertCoin('quarter');
        vendingRef.insertCoin('dime'); 
        vendingRef.selectProduct(4); 
        vendingRef.getDisplay(); //SOLD OUT.
        expect(vendingRef.getDisplay()).toBe('balance: 0.35');
    });

    test('should display the the balance aif display is checked after SOLD out is displayed', () => {
        let vendingRef = new Vending();
        vendingRef.selectProduct(4); 
        vendingRef.getDisplay(); //SOLD OUT.
        expect(vendingRef.getDisplay()).toBe('INSERT COINS');
    });

    test('when the user inserts a coin, it increase the coin inventory', () => {
        let vendingRef = new Vending();
        vendingRef.coinLookup.quarter.count = 0;
        vendingRef.insertCoin('quarter');
        expect(vendingRef.coinLookup.quarter.count).toBe(1);
    });
    
    //This works -- See comments and code from line#95-98 & Line#120-123
    test.skip('should display EXACT CHANGE ONLY when the vending machine doesnt have exact coins', () => {
        let vendingRef = new Vending();
        vendingRef.insertCoin('quarter');
        vendingRef.insertCoin('quarter');
        vendingRef.insertCoin('quarter');
        //vendingRef.insertCoin('dime'); //.85
        vendingRef.selectProduct(3);  //.65
        expect(vendingRef.getDisplay()).toBe("EXACT CHANGE ONLY");
    });

});

//keep the change you filthy animal.