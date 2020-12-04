const fs = require('fs').promises;

function part1(rows) {
    let count = 0;

    rows.forEach(row => {
        const splitByDash = row.split('-');
        const min = Number(splitByDash[0]);

        const splitBySpace = splitByDash[1].split(' ');
        const max = Number(splitBySpace[0]);
        const letter = splitBySpace[1].charAt(0);
        const pw = splitBySpace[2];

        const regex = new RegExp(letter, 'g');

        const numberOfLetters = (pw.match(regex)||[]).length;

        if (numberOfLetters >= min && numberOfLetters <= max) {
            count++;
        }
    });

    console.log('Number of valid passwords', count);
}

function part2(rows) {
    let count = 0;

    rows.forEach(row => {
        const splitByDash = row.split('-');
        const position1 = Number(splitByDash[0]);

        const splitBySpace = splitByDash[1].split(' ');
        const position2 = Number(splitBySpace[0]);
        const letter = splitBySpace[1].charAt(0);
        const pw = splitBySpace[2];

        let matches = 0;

        if (pw[position1 - 1] === letter) {
            matches++;
        }

        if (pw[position2 - 1] === letter) {
            matches++;
        }

        if (matches === 1) {
            count++;
        }
    });

    console.log('Number of valid passwords pt 2', count);
}


(async () => {
    const file = await fs.readFile(`${__dirname}/input.txt`, 'utf8');
    const rows = file.split('\n');

    console.log(part1(rows));
    console.log(part2(rows));
})().catch(error => console.log(error));