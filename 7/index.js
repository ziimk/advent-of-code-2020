const fs = require('fs').promises;

let containers = new Set();

function recursive(rows, bag) {
    rows.forEach(row => {
        if (row.includes(bag) && !row.startsWith(bag)) {
            containers.add(row);

            const container = row.substring(0, row.indexOf('bag') + 3);

            recursive(rows, container);
        }
    });
}

let count = 0;

function recursiveContains(rows, bag, parentCount) {
    rows.forEach(row => {
        if (row.startsWith(bag)) {
            const contains = row.substring(row.indexOf('contain') + 8, row.length - 1);
            const containsArr = contains.split(', ');

            for (let bagStr of containsArr) {
                if (!row.includes('no other bags')) {
                    const numberOfBags = parseInt(bagStr, 10);
                    const searchBag = bagStr.substring(bagStr.indexOf(' ') + 1);

                    count = count + (numberOfBags * parentCount);

                    recursiveContains(rows, searchBag, (numberOfBags * parentCount));
                }
            }
        }
    });
}

function part1(rows) {
    recursive(rows, 'shiny gold bag');

    console.log('Number of bags that contain at least one shiny gold bag', containers.size);
}

function part2(rows) {
    recursiveContains(rows, 'shiny gold bag', 1);

    console.log('Number of bags inside your single shiny gold bag', count);
}


(async () => {
    const file = await fs.readFile(`${__dirname}/input.txt`, 'utf8');
    const rows = file.split('\n');

    console.log(part1(rows));
    console.log(part2(rows));
})().catch(error => console.log(error));