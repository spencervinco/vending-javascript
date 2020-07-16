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

test('does not increases balance when a penny is inserted', () => {
    let vendingRef = new Vending();
    vendingRef.insertCoin("dime");
    vendingRef.insertCoin("penny");
    expect(vendingRef.getDisplay()).toBe("balance: 0.10");
});

test('does not increases balance when a penny is inserted', () => {
    let vendingRef = new Vending();
    vendingRef.insertCoin("penny");
    expect(vendingRef.rejectedCoins.length).toBeGreaterThan(0);
});