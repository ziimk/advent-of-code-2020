const fs = require('fs').promises;

function part1(rows) {
    let count = 0;
    let i = 3;

    for (let rowNr = 1; rowNr < rows.length; rowNr++) {
        if (rows[rowNr][i] === '#') {
            count++;
        }

        const rowLen = rows[rowNr].length;

        if (i >= rowLen - 3) {
            i = 3 - (rowLen - i);
        } else {
            i = i + 3;
        }
    }

    console.log('Number of hit trees', count);
}

function part2(rows) {
    const variants = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ];

    variants.forEach(rightDown => {
        let count = 0;
        let i = rightDown[0];
    
        for (let rowNr = rightDown[1]; rowNr < rows.length; rowNr = rowNr + rightDown[1]) {
            if (rows[rowNr][i] === '#') {
                count++;
            }
    
            const rowLen = rows[rowNr].length;
    
            if (i >= rowLen - rightDown[0]) {
                i = rightDown[0] - (rowLen - i);
            } else {
                i = i + rightDown[0];
            }
        }
    
        console.log('Number of hit trees', count);
    });
}


(async () => {
    const file = await fs.readFile(`${__dirname}/input.txt`, 'utf8');
    const rows = file.split('\n');

    // console.log(part1(rows));
    console.log(part2(rows));
})().catch(error => console.log(error));