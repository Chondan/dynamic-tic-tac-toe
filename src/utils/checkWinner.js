const whoIsWinner = (table ,consecutiveWin) => {
	// rule -> determine consecutive amount

	if (!table) return null;
	const size = table.length;
	const rule = (+consecutiveWin) > size ? size : +consecutiveWin;

	// check row 
	for (let row = 0; row < size; row++) {
		for (let col = 0; col + rule - 1 < size; col++) {
			const start = col;
			const end = start + rule - 1;
			let allSame = true;
			for (let i = start; i <= end; i++) {
				if (table[row][i] === null) allSame = false;
				if (table[row][i] !== table[row][start]) allSame = false;
				if (!allSame) break;
			}
			if (allSame) {
				const winner = table[row][start] === 'X' ? 'p1' : 'p2';
				return winner;
			}		
		}
	}

	// check column
	for (let col = 0; col < size; col++) {
		for (let row = 0; row + rule - 1 < size; row++) {
			const start = row;
			const end = start + rule - 1;
			let allSame = true;
			for (let i = start; i <= end; i++) {
				if (table[i][col] === null) allSame = false;
				if (table[i][col] !== table[start][col]) allSame = false;
				if (!allSame) break;
			}
			if (allSame) {
				const winner = table[start][col] === 'X' ? 'p1' : 'p2';
				return winner;
			}
		}
	}

	// check diangonal
	for (let row = 0; row < size; row++) {
		for (let col = 0; col < size; col++) {
			const startX = row;
			const startY = col;
			let curX = row;
			let curY = col;
			let endX;

			// check bottomRight
			endX = row + rule - 1;
			let allSame = endX >= size ? false : true;

			while (curX <= endX && endX < size) {
				if (table[curX][curY] === null) allSame = false;
				if (table[curX][curY] !== table[startX][startY]) allSame = false;
				if (!allSame) break;
				curX++;
				curY++;
			}
			if (allSame) {
				const winner = table[startX][startY] === 'X' ? 'p1' : 'p2';
				return winner;
			}

			// check upRight
			curX = row;
			curY = col;
			endX = row - (rule - 1);
			allSame = endX < 0 ? false : true;

			while (curX >= endX && endX >= 0) {
				if (table[curX][curY] === null) allSame = false;
				if (table[curX][curY] !== table[startX][startY]) allSame = false;
				if (!allSame) break;
				curX--;
				curY++;
			}
			if (allSame) {
				const winner = table[startX][startY] === 'X' ? 'p1' : 'p2';
				return winner;
			}

		}
	}

	return null;

}

export default whoIsWinner;