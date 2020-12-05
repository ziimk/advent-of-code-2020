const fs = require('fs').promises;

function part1(rows) {
    const seatIds = [];

    for (row of rows) {
        const seatRows = [...Array(128).keys()];
        const seatColumns = [...Array(8).keys()];
        const rowChars = row.substr(0, 7);
        const columnChars = row.substr(7, 3);
    
        for (let char of rowChars) {
            const half = Math.ceil(seatRows.length / 2);
    
            char === 'B' ? seatRows.splice(0, half) : seatRows.splice(-half);
        }
    
        for (let char of columnChars) {
            const half = Math.ceil(seatColumns.length / 2);
    
            char === 'R' ? seatColumns.splice(0, half) : seatColumns.splice(-half);
        }
    
        seatIds.push(Number(seatRows[0]) * 8 + Number(seatColumns[0]));
    }

    console.log('Highest seat ID', Math.max(...seatIds));

    seatIds.sort((a, b) => a - b);

    for (let i = 1; i < seatIds.length; i++) {
        if (seatIds[i] - seatIds[i - 1] !== 1) {
               console.log('Your seat ID is between', seatIds[i], seatIds[i - 1])
        }
    }
}


(async () => {
    const file = await fs.readFile(`${__dirname}/input.txt`, 'utf8');
    const rows = file.split('\n');

    console.log(part1(rows));
})().catch(error => console.log(error));