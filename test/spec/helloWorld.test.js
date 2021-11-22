/**
 * File will test methods from '../src/helloWorld.js'
 */
const helloWorld = require('../../source/assets/scripts/helloWorld.js');

/**
 * Basic fail test 1
 */
// describe("helloWorld", () => {
//     it("returns hello world test 1", () => {
//         expect(helloWorld()).toBe("Hello world");
//     });
// });

// /**
//  * Basic fail test 2
//  */
// describe("helloWorld2", () => {
//     it("returns hello world test 2", () => {
//         expect(helloWorld()).toBe("hello World");
//     });
// });

// /**
//  * Basic fail test 3
//  */
// describe("helloWorld3", () => {
//     it("returns hello world test 3", () => {
//         expect(helloWorld()).toBe("helloWorld");
//     });
// });

/**
 * Basic pass test
 */
describe("helloWorld4", () => {
    it("returns hello world test 4", () => {
        expect(helloWorld()).toBe("hello world");
    });
});

/**
 * Multiple it (asserts) in one description.
 */
describe("helloWorld4", () => {
    // Should pass
    it("returns hello world test 5a", () => {
        expect(helloWorld()).toBe("hello world");
    });
    // // Should fail
    // it("returns hello world test 5b", () => {
    //     expect(helloWorld()).toBe("Hello world");
    // });
});

/**
 * Multiple it (asserts) in one description.
 */
describe("helloWorld6", () => {
    // // Should fail
    // it("returns hello world test 6a", () => {
    //     expect(helloWorld()).toBe("Hello world");
    // });
    // Should pass
    it("returns hello world test 6b", () => {
        expect(helloWorld()).toBe("hello world");
    });
});

/**
 * Multiple it (asserts) in one description.
 */
describe("helloWorld7", () => {
    // Should pass
    it("returns hello world test 7a", () => {
        expect(true).toBe(true);
    });
    // Should pass
    it("returns hello world test 7b", () => {
        expect(helloWorld()).toBe("hello world");
    });
});

/**
 * Nested describe statements
 */
// describe('helloWorld8', () => {
//     describe('firstChild', () => {
//         // Should fail
//         it("returns hello world test 8 child1", () => {
//             expect(true).toBe(false);
//         });
//     });
//     describe('secondChild', () => {
//         // Should fail
//         it("returns hello world test 8 child2", () => {
//             expect(helloWorld()).toBe("Hello world");
//         });
//     });
//});