import path from 'path';
import { Capabilities, Builder } from 'selenium-webdriver';
import chrome, { Options }  from 'selenium-webdriver/chrome';

const driverPath = path.join(__dirname, '../../../selenium_drivers/chrome');
console.log('driverPath: ', driverPath);

const service = new chrome.ServiceBuilder().build();
const options = new Options().addArguments('--window-size=1280,960');

chrome.setDefaultService(service);


const driver = new Builder().withCapabilities(Capabilities.chrome()).setChromeOptions(options);

export default driver;
