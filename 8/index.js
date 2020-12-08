const fs = require('fs').promises;

function part1(rows) {
    let acc = 0;
    let operations = [];

    rows.forEach(row => {
        const command = row.split(' ');

        operations.push({ instruction: command[0], argument: Number(command[1]) });
    });

    let index = 0;
    let finish = false;

    while (!finish) {
        if (operations[index].visited) {
            finish = true;
            return acc;
        }

        operations[index].visited = true;

        if (operations[index].instruction === 'nop') {
            index++;
        } else if (operations[index].instruction === 'acc') {
           acc = acc + operations[index].argument;
           index++;
        } else if (operations[index].instruction === 'jmp') {
            index = index + operations[index].argument;
        }
    }
}

function part2(rows) {
    let operations = [];
    let triedIndexes = [];
    let visitedIndexes = [];

    rows.forEach(row => {
        const command = row.split(' ');

        operations.push({ instruction: command[0], argument: Number(command[1]) });
    });

    let finish = false;
    let acc;
    let index ;
    let tryInProgress;

    const reset = () => {
        acc = 0;
        index = 0;
        tryInProgress = false;
        visitedIndexes = [];
    }

    reset();

    while (!finish) {
        if (index >= 631) {
            finish = true;

            return acc;
        }

        if (visitedIndexes.includes(index)) {
            reset();
            continue;
        }

        visitedIndexes.push(index);

        if (operations[index].instruction === 'nop') {
            if (!triedIndexes.includes(index) && !tryInProgress && operations[index].argument !== 0) {
                // jump instead
                tryInProgress = true;
                triedIndexes.push(index);
                index = index + operations[index].argument;
            } else {
                index++;
            }
        } else if (operations[index].instruction === 'acc') {
           acc = acc + operations[index].argument;
           index++;
        } else if (operations[index].instruction === 'jmp') {
            if (!triedIndexes.includes(index) && !tryInProgress) {
                // nop instead
                tryInProgress = true;
                triedIndexes.push(index);
                index++;
            } else {
                index = index + operations[index].argument;
            }
        }
    }
}


(async () => {
    const file = await fs.readFile(`${__dirname}/input.txt`, 'utf8');
    const rows = file.split('\n');

    console.log(part1(rows));
    console.log(part2(rows) + 3 + 50 + 49);

})().catch(error => console.log(error));