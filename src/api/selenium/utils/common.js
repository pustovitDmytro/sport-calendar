import path from 'path';
import fs from 'fs-extra';

export const pause = time => new Promise((resolve) => {
    setTimeout(resolve, time);
});

export function requireFixtures(file) {
    const fixturesFolder = path.resolve(config.backendPath, 'fixtures/');
    const requirePath = path.join(fixturesFolder, file);

    return require(requirePath);
}

export async function open(driver, url) {
    await driver.get(url);
}

export async function openNewTab(driver, prefix) {
    await driver.executeScript(`window.open("${config.url}${prefix}");`);
}

export async function takeScreenshot(driver, mocha, id) {
    await driver.takeScreenshot() //eslint-disable-line
        .then(async (image) => {
            const p = path.join(__dirname, `../../../selenium_screenshots/${mocha.parent.title}/${mocha.title}/${id}.png`);

            await fs.ensureFile(p);
            await fs.writeFile(p, image, 'base64', (error) => {
                if (error) console.error('screenshot error', error);
            });
        });
}
