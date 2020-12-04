const fs = require('fs').promises;

function part1(ints) {
    for (let i = 0; i < ints.length; i++) {
        for (let j = 0; j < ints.length; j++) {
            if (ints[i] + ints[j] === 2020) {
                console.log(ints[i], ints[j], 'korrutis:', ints[i] * ints[j])
            }
        }
    }
}

function part2(ints) {
    for (let i = 0; i < ints.length; i++) {
        for (let j = 0; j < ints.length; j++) {
            for (let k = 0; k < ints.length; k++) {
                if (ints[i] + ints[j] + ints[k] === 2020) {
                    console.log(ints[i], ints[j], ints[k], 'korrutis:', ints[i] * ints[j] * ints[k])
                }
            }
        }
    }
}


(async () => {
    const file = await fs.readFile(`${__dirname}/input.txt`, 'utf8');
    const rows = file.split('\n');
    const ints = rows.map(v => Number(v));

    console.log(part1(ints));
    console.log(part2(ints));
})().catch(error => console.log(error));