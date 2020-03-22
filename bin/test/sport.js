#!./node_modules/.bin/babel-node
/* eslint-disable no-unused-expressions */
import { docopt } from 'docopt';
import { promisify } from 'bluebird';
import sports from '../../src/sports';


const doc =
`Usage:
   sport.js [--verbose] [--quiet]
   sport.js -h | --help

Options:
   -h --help                 Show this screen.
   -v --verbose              Show more verbose logs.
   -q --quiet                Hide logging
`;

const opts = docopt(doc);

main({
    verbose : opts['--verbose'],
    quiet   : opts['--quiet']
});

export async function main({ verbose, quiet }) {
    verbose && console.log('TESTING SPORTS');
    const leagues = await sports.leagues();

    console.log('leagues: ', leagues);

    // process.exit();
}

