export function movePiecesToLeft(mutableArray) {
	// addAdjacentElements(moves['left'], mutableArray)
	mutableArray.forEach((row, i) => {
		//since we are moving the blocks to left we only need to check the pairs (0,1),(1,2),(2,3)...where the second argument is value of j
		for (let j = 1; j < 4; j++) {
			if (row[j] == row[j - 1] && row[j] !== 0) {
				row[j - 1]++;
				row[j] = 0;
			}
		}
	});

	// shifting the elements...to left side.......
	for (let i = 0; i < 4; i++) {
		let ar = [];
		for (let j = 0; j < 4; j++) {
			if (mutableArray[i][j] == 0) {
				ar.push(j);
			} // trash
			else if (ar.length) {
				const newPos = ar[0];
				mutableArray[i][newPos] = mutableArray[i][j];
				mutableArray[i][j] = 0;
				ar.push(j);
				ar.shift();
			}
		}
	}
}

export function movePiecesToRight(mutableArray) {
	// addAdjacentElements(moves['right'], mutableArray)
	mutableArray.forEach((row, i) => {
		//since we are moving the blocks to left we only need to check the pairs (0,1),(1,2),(2,3)...where the second argument is value of j
		for (let j = 0; j < 3; j++) {
			if (row[j] == row[j + 1] && row[j] !== 0) {
				row[j]++;
				row[j + 1] = 0;
			}
		}
	});

	// shifting the elements...to right side.......
	for (let i = 0; i < 4; i++) {
		let ar = [];
		for (let j = 3; j >= 0; j--) {
			if (mutableArray[i][j] == 0) {
				ar.push(j);
			} else if (ar.length) {
				const newPos = ar[0];
				mutableArray[i][newPos] = mutableArray[i][j];
				mutableArray[i][j] = 0;
				ar[0] = j;
				ar.push(j);
				ar.shift();
			}
		}
	}
}

// TODO:create a helper function rotate matrix....this function would convert the original matrix into a rotated matrix thereby making the addition functionality "more perfect"(presumably)

export function movePiecesUp(mutableArray) {
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 3; j++) {
			if (
				mutableArray[j][i] === mutableArray[j + 1][i] &&
				mutableArray[j][i] !== 0
			) {
				mutableArray[j][i]++;
				mutableArray[j + 1][i] = 0;
			}
		}
	}
	// addAdjacentElements(moves['up'], mutableArray)

	for (let i = 0; i < 4; i++) {
		let ar = [];
		for (let j = 0; j < 4; j++) {
			if (mutableArray[j][i] == 0) {
				ar.push(j);
			} else if (ar.length) {
				const newPos = ar[0];
				mutableArray[newPos][i] = mutableArray[j][i];
				mutableArray[j][i] = 0;
				ar.push(j);
				ar.shift();
			}
		}
	}
}

export function movePiecesDown(mutableArray) {
	// addAdjacentElements(moves['down'], mutableArray)
	for (let i = 0; i < 4; i++) {
		for (let j = 1; j < 4; j++) {
			if (
				mutableArray[j][i] === mutableArray[j - 1][i] &&
				mutableArray[j][i] !== 0
			) {
				mutableArray[j][i]++;
				mutableArray[j - 1][i] = 0;
			}
		}
	}

	for (let i = 0; i < 4; i++) {
		let ar = [];
		for (let j = 3; j >= 0; j--) {
			if (mutableArray[j][i] == 0) {
				ar.push(j);
			} // trash
			else if (ar.length) {
				const newPos = ar.shift();
				mutableArray[newPos][i] = mutableArray[j][i];
				mutableArray[j][i] = 0;
				ar.push(j);
			}
		}
	}
}

// const moves = {
// 	left: { x: -1, y: 0 },
// 	right: { x: 1, y: 0 },
// 	up: { x: 0, y: -1 },
// 	down: { x: 0, y: 1 },
// };

// function addAdjacentElements({ x, y }, mutableArray) {
// 	if (x) {
// 		for (let i = 0; i < 4; i++) {
// 			for (let j = 0; j < 4; j++) {
// 				if (mutableArray[i + y][j + x] !== undefined) {
// 					if (
// 						mutableArray[i + y][j + x] === mutableArray[i][j] &&
// 						mutableArray[i][j] !== 0
// 					) {
// 						mutableArray[i + y][j + x]++;
// 						mutableArray[i][j] = 0;
// 					}
// 				}
// 			}
// 		}
// 	} else {
// 		for (let i = 0; i < 4; i++) {
// 			for (let j = 0; j < 4; j++) {
// 				if (mutableArray[j + y] !== undefined) {
// 					if (
// 						mutableArray[j][i] === mutableArray[j + y][i + x] &&
// 						mutableArray[j][i] !== 0
// 					) {
// 						mutableArray[j + y][i + x]++;
// 						mutableArray[j][i] = 0;
// 					}
// 				}
// 			}
// 		}
// 	}
// }
