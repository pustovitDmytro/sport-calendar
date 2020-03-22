import path from 'path';
import readline from 'readline';
import { google } from 'googleapis';
import fs from 'fs-extra';
// import { promisify } from 'bluebird';
import axios from 'axios';
import config from '../etc/config';

const configDir = path.resolve(__dirname, '../etc');
/* eslint-disable camelcase*/

class Calendar {
    constructor(opts) {
        this.SCOPES = opts.scopes;
        this.tokenPath = path.resolve(configDir, opts.tokenPath);
        this.credentialPath = path.resolve(configDir, opts.credentialPath);
        this.calendarId = opts.calendarId;
    }
    async _init() {
        await this.authorize();
        this.calendar = google.calendar({ version: 'v3', auth: this.auth });
        this.headers = await this.auth.getRequestHeaders();
    }
    async addEvent(event) {
        try {
            const res = await this.calendar.events.insert({
                auth       : this.auth,
                calendarId : 'primary',
                resource   : event
            });

            console.log('res: ', res);
        } catch (error) {
            console.log('error: ', error);
            throw error;
        }
    }

    async listEvents() {
        const res = await axios.request({
            url     : `https://www.googleapis.com/calendar/v3/calendars/${'primary'}/events`,
            headers : this.headers
        });
        const events = res.data.items;

        console.log('events: ', events);
    }
    async authorize() {
        const credentials = require(this.credentialPath);
        const { client_secret, client_id, redirect_uris } = credentials.installed;

        this.auth = new google.auth.OAuth2(
            client_id,
            client_secret,
            redirect_uris[0]
        );

        if (await fs.exists(this.tokenPath)) {
            const { tokens } = require(this.tokenPath);

            await this.auth.setCredentials(tokens);
            this.token = tokens;
        } else {
            await this.getAccessToken();
        }
    }

    async getAccessToken() {
        const authUrl = this.auth.generateAuthUrl({
            access_type : 'offline',
            scope       : this.SCOPES
        });

        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
            input  : process.stdin,
            output : process.stdout
        });

        return new Promise((res, rej) => {
            rl.question('Enter the code from that page here: ', async (code) => {
                try {
                    rl.close();
                    const token = await this.auth.getToken(code);

                    await this.auth.setCredentials(token.tokens);
                    await fs.writeFile(this.tokenPath, JSON.stringify(token));
                    console.log('Token stored to', this.tokenPath);
                    this.token = token;
                    res(token);
                } catch (error) {
                    rej(error);
                }
            });
        });
    }
}

export default new Calendar(config.calendar);
