import { until } from 'selenium-webdriver';
import { DEFAULT_TIMEOUT } from '../constants/common.js';


async function wait(driver, func, timeout) {
    await driver.wait(func, timeout || DEFAULT_TIMEOUT);
}

export async function waitForVisible(driver, element, timeout) {
    await wait(driver, until.elementIsVisible(element), timeout);
}

export async function waitForElement(driver, locator, timeout) {
    await wait(driver, until.elementLocated(locator), timeout);
}

export async function waitForEnabled(driver, element, timeout) {
    await wait(driver, async () => {
        const disabled = await element.getAttribute('disabled');

        return !disabled;
    }, timeout);
}
