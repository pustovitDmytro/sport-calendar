import path from 'path';
import readline from 'readline';
import { google } from 'googleapis';
import fs from 'fs-extra';
// import { promisify } from 'bluebird';
import axios from 'axios';
import config from '../etc/config';

/* eslint-disable camelcase*/

class Sport {
    constructor({ apiKey }) {
        this.apiKey = apiKey;
    }
    async leagues() {
        const res = await axios.request({
            url : `https://allsportsapi.com/api/football/?met=Countries&APIkey=${this.apiKey}`
        });

        console.log('res: ', res.data);

        return res.data.result;
    }
}

export default new Sport(config.allSportsApi);
