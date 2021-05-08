#!./node_modules/.bin/babel-node

import { docopt } from 'docopt';
import { promisify } from 'bluebird';
import flashScore from '../../src/flashScore';


const doc =
`Usage:
   sport.js flashScore [--verbose] [--quiet]
   sport.js -h | --help

Options:
   -h --help                 Show this screen.
   -v --verbose              Show more verbose logs.
   -q --quiet                Hide logging
`;

const params = docopt(doc);

main({
    verbose    : params['--verbose'],
    quiet      : params['--quiet'],
    flashScore : params.flashScore
});

export async function main(opts) {
    params.verbose && console.log('TESTING SPORTS');
    if (params.flashScore) {
        // const table = await flashScore.table();

        // console.log('table: ', table);
        console.log('fixtures', await flashScore.fixtures());
    }

    process.exit();
}

