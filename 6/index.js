const fs = require('fs').promises;
const _ = require('lodash');

function part1(rows) {
    let count = 0;

    rows.forEach(row => {
        const groupRows = row.split('\n');
        const groupUniqueAnswers = new Set();

        groupRows.forEach(row => {
            for (let char of row) {
                groupUniqueAnswers.add(char);
            }
        });

        count = count + groupUniqueAnswers.size;
    });

    console.log('Sum of answers', count);
}

function part2(rows) {
    let count = 0;

    rows.forEach(row => {
        const groupRows = row.split('\n');
        const groupAnswers = [];

        groupRows.forEach(row => {
            groupAnswers.push(row.split(''));
        });

        const intersection = _.intersection(...groupAnswers);

        count = count + intersection.length;
    });

    console.log('Sum of answers', count);
}


(async () => {
    const file = await fs.readFile(`${__dirname}/input.txt`, 'utf8');
    const rows = file.split('\n\n');

    console.log(part1(rows));
    console.log(part2(rows));
})().catch(error => console.log(error));