import path from 'path';
import jwt from 'jwt-simple';
import config from '../constants/config.js';

const etcFolder = path.resolve(config.backendPath, 'etc/');
const { secret } = require(`${etcFolder}/config.json`);

async function getUserToken(user) {
    return jwt.encode(user, secret);
}


export async function setToken(driver, user) {
    const token = await getUserToken(user);

    await driver.executeScript(`window.localStorage.setItem('token', '${token}');`);
}
