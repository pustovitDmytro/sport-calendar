import path from 'path';
import readline from 'readline';
import { google } from 'googleapis';
import fs from 'fs-extra';
// import { promisify } from 'bluebird';
import axios from 'axios';
import cheerio from 'cheerio';
import config from '../etc/config';

/* eslint-disable camelcase*/

class Sport {
    constructor() {
    }
    async leagues() {
        const url = 'https://www.fixturecalendar.com/?competition=Bundesliga&startDate=14/05/2020&endDate=19/05/2020';
        const res = await axios.request({
            url
        });
        const dom = cheerio.load(res.data);
        const events = dom('.event-wrapper .panel-body');
        const results = [];

        events.each(function () {
            const date = dom('.event-result-panel__event-date', this);
            const time = dom('.event-result-panel__sport-time-wrapper > p', this);
            const teams = dom('.event-result-panel-details__event-title > a', this);

            results.push({
                date : date.text().trim(),
                time : time.text().split('\n')[1].trim(),
                home : dom(teams[0]).text(),
                away : dom(teams[1]).text()
            });
        });

        console.log('results: ', results);

        return [];
    }
}

export default new Sport(config);
