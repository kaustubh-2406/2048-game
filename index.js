import {
	movePiecesToLeft,
	movePiecesToRight,
	movePiecesUp,
	movePiecesDown,
} from './helpers.js';

const div = document.querySelector('.output > div');
const parent = document.querySelector('.output');

const colors = [
	'#fff',
	'#adb5bd',
	'#00a896',
	'#8338ec',
	'#a0c4ff',
	'#d90429',
	'#c0fdff',
	'aqua',
	'brown',
	'#081c15',
	'#b07d62',
];

let state = [
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
];

function init() {
	for (let i = 0; i < 4; i++) {
		const divNew = document.createElement('div');
		for (let j = 0; j < 4; j++) {
			const innerDiv = document.createElement('div');
			innerDiv.classList.add('value');
			innerDiv.textContent = '0';
			innerDiv.style.backgroundColor = colors[0];
			divNew.append(innerDiv);
		}
		div.append(divNew);
	}
	parent.appendChild(div);
}
init();
// for pc users...
document.addEventListener('keyup', e => {
	const mutableArray = [...state];

	const canContinue = mutableArray.reduce((rowsum, row, i) => {
		rowsum += row.reduce(
			(acc, currentVal, j) =>
				currentVal === 0 ||
				row[j + 1] === currentVal ||
				row[j - 1] === currentVal ||
				(mutableArray[i + 1] && row[j] == mutableArray[i + 1][j]) ||
				(mutableArray[i - 1] && row[j] === mutableArray[i - 1][j])
					? ++acc
					: acc,
			0
		);
		return rowsum;
	}, 0);

	if (canContinue) {
		switch (e.keyCode) {
			case 32:
				generateRandom(state);
				break;
			case 37:
				movePiecesToLeft(mutableArray);
				break;
			case 38:
				movePiecesUp(mutableArray);
				break;
			case 39:
				movePiecesToRight(mutableArray);
				break;
			case 40:
				movePiecesDown(mutableArray);
				break;
			default:
				break;
		}
		generateRandom(state);
		displayResult(mutableArray);
		// create a piece at random location in the original state variable
	} else {
		displayResult(mutableArray);
		console.log('game ends 😔...');
	}
});

function displayResult(mutableArray) {
	const div = document.querySelector('.output > div');
	div.innerHTML = '';
	mutableArray.forEach(row => {
		const divNew = document.createElement('div');
		row.forEach(el => {
			const innerDiv = document.createElement('div');
			innerDiv.classList.add('value');
			innerDiv.innerHTML += `${el ? 2 ** el : 0}`;
			innerDiv.style.backgroundColor = colors[el];
			divNew.append(innerDiv);
		});
		div.append(divNew);
	});
	parent.appendChild(div);
}

// for touch functionality
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
let xDown = null;
let yDown = null;

function handleTouchStart(e) {
	xDown = e.touches[0].clientX;
	yDown = e.touches[0].clientY;
}

function handleTouchMove(e) {
	const mutableArray = [...state];
	const canContinue = mutableArray.reduce((rowsum, row) => {
		rowsum += row.reduce(
			(acc, currentVal) => (currentVal === 0 ? ++acc : acc),
			0
		);
		return rowsum;
	}, 0);

	if (!xDown || !yDown) {
		return;
	}
	let xUp = e.touches[0].clientX;
	let yUp = e.touches[0].clientY;
	let xd = xDown - xUp;
	let yd = yDown - yUp;

	if (canContinue) {
		if (Math.abs(xd) > Math.abs(yd)) {
			if (xd > 0) {
				movePiecesToLeft(mutableArray); // left swipe
			} else {
				movePiecesToRight(mutableArray); // right swipe
			}
		} else {
			if (yd > 0) {
				movePiecesUp(mutableArray); // up swipe
			} else {
				movePiecesDown(mutableArray); // down swipe
			}
		}
		generateRandom(state);
		displayResult(mutableArray);
	}

	//resetting the values--
	xDown = null;
	yDown = null;
}

function generateRandom(state) {
	let i = Math.floor(Math.random() * 4);
	let j = Math.floor(Math.random() * 4);
	if (!state[i][j]) {
		state[i][j] = Math.round(Math.random() * 3) || 1;
	} else generateRandom(state);
}
