import { By } from 'selenium-webdriver';
import { byText, byClassName } from './utils/xpathUtils';


export default class Base {
    constructor(driver) {
        this.driver = driver;
    }

    open(url) {
        return this.driver.get(url);
    }

    waitForPageReady = () => {
        return this.driver.wait(async () => {
            const readyState = await this.driver.executeScript('return document.readyState');

            return readyState === 'complete';
        });
    }

    findElementsByJs = (...args) => {
        const fn = (selector) => document.querySelectorAll(selector);

        return this.driver.findElements(By.js.call(this, fn, ...args));
    }

    findElementByJs = (...args) => {
        const fn = (selector) => document.querySelector(selector);

        return this.driver.findElement(By.js.call(this, fn, ...args));
    }

    findElementByText(text) {
        return this.driver.findElement(byText(text));
    }

    findElementByXpath(xpath) {
        return this.driver.findElement(By.xpath(xpath));
    }

    findElementsByClass(css, tag, root) {
        return this.driver.findElements(byClassName(css, tag), tag, root);
    }

    scrollToElement = async (element) => {
        await this.driver.executeScript('arguments[0].scrollIntoView(true);', element);
    }
}
