const fs = require('fs').promises;

const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

function part1(rows) {
    let count = 0;

    rows.forEach(row => {
        const fields = row.replace(/\n/g, ' ').split(' ');
        let keys = [];

        fields.forEach(field => {
            keys.push(field.split(':')[0]);
        });

        if (required.every(req => keys.includes(req))) {
            count++;
        }
    });

    console.log('Number of valid passports', count);
}

function part2(rows) {
    let count = 0;

    for (row of rows) {
        const fields = row.replace(/\n/g, ' ').split(' ');
        let keys = [];
        let kv = new Map();

        fields.forEach(field => {
            const split = field.split(':');

            keys.push(split[0]);
            kv.set(split[0], split[1]);
        });

        if (required.every(req => keys.includes(req))) {
            const byr = Number(kv.get('byr'));
            const iyr = Number(kv.get('iyr'));
            const eyr = Number(kv.get('eyr'));
            const hgt = kv.get('hgt');
            const hcl = kv.get('hcl');
            const ecl = kv.get('ecl');
            const pid = kv.get('pid');

            if (byr < 1920 || byr > 2002) {
                continue;
            }

            if (iyr < 2010 || iyr > 2020) {
                continue;
            }

            if (eyr < 2020 || eyr > 2030) {
                continue;
            }

            if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl)) {
                continue;
            }

            if (!hcl.match(/^#[0-9a-f]{6}$/)) {
                continue;
            }

            if (!pid.match(/^[0-9]{9}$/)) {
                continue;
            }

            if (hgt.includes('cm')) {
                const height = Number(hgt.split('c')[0]);

                if (height < 150 || height > 193) {
                    continue;
                }
            } else {
                const height = Number(hgt.split('i')[0]);

                if (height < 59 || height > 76) {
                    continue;
                }
            }

            count++;
        }
    };

    console.log('Number of valid passports', count);
}


(async () => {
    const file = await fs.readFile(`${__dirname}/input.txt`, 'utf8');
    const rows = file.split('\n\n');

    console.log(part1(rows));
    console.log(part2(rows));
})().catch(error => console.log(error));