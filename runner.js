const createTestCafe = require('testcafe');
const glob = require('glob');
let testcafe         = null;
let runner           = null;

const suites = {
    fixture: './tests/fixtures/*.test.js'
};

const getTests = suite => {
    return new Promise(resolve => {
        glob(suite, (err, files) => resolve(files));
    })
};

const runTests = suite => {
    createTestCafe('localhost', 1338)
        .then(testCafe => {
            testcafe = testCafe;
            runner = testcafe.createRunner();
        })
        .then(() => getTests(suite))
        .then(testFiles => {
            return runner
                .src(testFiles)
                .browsers(['chrome:headless', 'safari:headless', 'chrome:headless:emulation:device=iphone 6'])
                .screenshots('reports/screenshots/', true)
                .reporter('spec')
                .reporter('html-testrail', null)
                .run();
        })
        .then(failedCount => {
            console.log('\nTests failed: ' + failedCount);
            testcafe.close();
        })
};

runTests(suites.fixture);