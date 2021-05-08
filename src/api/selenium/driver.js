
const browser = process.env.BROWSER || 'chrome';

function getDriver() {
    switch (browser) {
        case 'firefox': return require('./drivers/firefox').default;
        case 'chrome': return require('./drivers/chrome').default;
        default: return require('./drivers/chrome').default;
    }
}

export default getDriver(browser);
