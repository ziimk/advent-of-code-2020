const fs = require('fs').promises;

function part1(rows) {
    const limit = 25;

    for (let i = limit; i <= rows.length; i++) {
        const preamble = rows.slice(i - limit, i);

        let sumFound = false;

        preamble.forEach(firstNum => {
            preamble.forEach(secondNum => {
                if ((Number(rows[i]) === Number(firstNum) + Number(secondNum)) && firstNum !== secondNum) {
                    sumFound = true;
                }
            })
        });

        if (!sumFound) {
            return rows[i];
        }
    }
}

function part2(rows) {
    const sum = 105950735;

    for (let i = 0; i <= rows.length; i++) {
        for (let nums = 2; nums <= rows.length - 4; nums++) {
            const preamble = rows.slice(i, i + nums);
        
            const sumOfNums = preamble.reduce((a, b) => Number(a) + Number(b), 0);

            if (sumOfNums === sum) {
                return Math.min(...preamble) + Math.max(...preamble);
            }
        }
    }
}


(async () => {
    const file = await fs.readFile(`${__dirname}/input.txt`, 'utf8');
    const rows = file.split('\n');

    console.log(part1(rows));
    console.log(part2(rows));

})().catch(error => console.log(error));