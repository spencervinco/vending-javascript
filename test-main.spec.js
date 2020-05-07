const testMain = require('./test-main');

test('adds 1 + 2 to equal 3', () => {
    expect(testMain(1, 2)).toBe(3);
});

