import { By } from 'selenium-webdriver';

export const byText = (text, tag) => By.xpath(`//${tag || '*'}[contains(text(),'${text}')]`);
export const byClassName = (text, tag) => By.xpath(`.//${tag || '*'}[contains(@class, '${text}')]`);
