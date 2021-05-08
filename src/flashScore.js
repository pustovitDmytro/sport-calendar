import path from 'path';
import readline from 'readline';
import { google } from 'googleapis';
import fs from 'fs-extra';
// import { promisify } from 'bluebird';
import axios from 'axios';
import cheerio from 'cheerio';
import { By } from 'selenium-webdriver';
import config from '../etc/config';
import driver from './api/selenium/driver';
import Selenium from './api/selenium/Selenium';


const selenium = new Selenium(driver.build());
/* eslint-disable camelcase*/
const pause = time => new Promise(res => setTimeout(res, time));

class FlashScore {
    constructor() {
    }
    async table() {
        const url = 'https://www.flashscore.com/football/england/premier-league/standings';

        await selenium.open(url);
        await pause(500);
        const elements = await selenium.findElementsByClass('row___', 'div');
        const table = [];

        for (const element of elements) {
            const [ team ] = await element.findElements(By.xpath('.//div[contains(@class, \'rowCellParticipant\')]'));

            if (team) {
                const [ place ] = await element.findElements(By.xpath('.//div[contains(@class, \'rowCellRank\')]'));
                const [ points ] = await element.findElements(By.xpath('.//span[contains(@class, \'cellScore\')]/following-sibling::span'));

                table.push({
                    place  : await place.getText(),
                    team   : await team.getText(),
                    points : points && await points.getText()
                });
            }
        }
        await pause(100);

        await selenium.driver.close();

        return table;
    }
    async fixtures() {
        const url = 'https://www.flashscore.com/football/england/premier-league/fixtures/';

        await selenium.open(url);
        await pause(500);
        while (await selenium.findElementsByClass('event__more', 'div')) {

        }
        const elements = await selenium.findElementsByClass('event__match', 'div');
        const fixtures = [];

        for (const element of elements) {
            const [ time ] = await element.findElements(By.xpath('.//div[contains(@class, \'event__time\')]'));
            const [ home, away ] = await element.findElements(By.xpath('.//div[contains(@class, \'event__participant\')]'));

            fixtures.push({
                time : time && await time.getText(),
                home : home && await home.getText(),
                away : away && await away.getText()
            });
        }
        await pause(100);

        await selenium.driver.close();

        return fixtures;
    }
}

export default new FlashScore(config);
