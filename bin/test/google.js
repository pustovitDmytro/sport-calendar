#!./node_modules/.bin/babel-node


/* eslint-disable no-unused-expressions */
import { docopt } from 'docopt';
import { promisify } from 'bluebird';
import calendar from '../../src/calendar';

const doc =
`Usage:
   google.js [--verbose] [--quiet]
   google.js -h | --help

Options:
   -h --help                 Show this screen.
   --id <id>                 Set workflow dueDate on yerstafay.
   -v --verbose              Show more verbose logs.
   -q --quiet                Hide logging
`;
const event = {
    'summary'     : 'Google I/O 2015',
    'location'    : '800 Howard St., San Francisco, CA 94103',
    'description' : 'A chance to hear more about Google\'s developer products.',
    'start'       : {
        'dateTime' : '2019-06-05T09:00:00-07:00',
        'timeZone' : 'America/Los_Angeles'
    },
    'end' : {
        'dateTime' : '2019-06-05T17:00:00-07:00',
        'timeZone' : 'America/Los_Angeles'
    },
    // 'recurrence' : [
    //     'RRULE:FREQ=DAILY;COUNT=2'
    // ],
    // 'attendees' : [
    //     { 'email': 'lpage@example.com' },
    //     { 'email': 'sbrin@example.com' }
    // ],
    'reminders' : {
        'useDefault' : false,
        'overrides'  : [
            { 'method': 'email', 'minutes': 24 * 60 },
            { 'method': 'popup', 'minutes': 10 }
        ]
    }
};

const opts = docopt(doc);

main({
    verbose : opts['--verbose'],
    quiet   : opts['--quiet']
});

export async function main({ verbose, quiet }) {
    verbose && console.log('TESTING GOOGLE');
    await calendar._init();
    verbose && console.log('AUTHORIZED');
    await calendar.listEvents();
    // await calendar.addEvent(event);
    !quiet && console.log('Done');
    // process.exit();
}

