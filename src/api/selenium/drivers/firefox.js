import path from 'path';
import { Builder } from 'selenium-webdriver';
import firefox  from 'selenium-webdriver/firefox';

const drivers = path.join(__dirname, '../../../../selenium_drivers');

process.env.PATH = `${process.env.PATH}:${drivers}`;
const options = new firefox.Options();

const driver = new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options);

export default driver;
