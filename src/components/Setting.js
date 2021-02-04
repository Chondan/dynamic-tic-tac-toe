import { useRef, useState } from 'react';

// Change board's size -> { 3, 5, 7, .. }
const Setting = ({
	boardSize, handleGameStart, gameStart, handleGameReset
}) => {

	const [size, setSize] = useState(boardSize);
	const [win, setWin] = useState(boardSize);
	let input = useRef();
	let consecutive = useRef();

	const handleSizeChange = () => {
		setSize(input.value);
		if (win > input.value) setWin(input.value);
	}

	return (
		<div className="setting">
			<b>Board Size</b>{' '} 
			<input type="number" min={3} value={size} 
				ref={node => input = node} onChange={handleSizeChange}
				disabled={gameStart}
			 /><br />
			<b>Consecutive X to Win</b>{' '}
			<input type="number" min={3} max={size} value={win}
				ref={node => consecutive = node} onChange={() => setWin(consecutive.value)}
				disabled={gameStart}
			/><br />
			<button className="start-btn" onClick={() => handleGameStart(input.value, consecutive.value)} disabled={gameStart}>Start</button>
			<button className="reset-btn" onClick={handleGameReset}>Reset</button>
		</div>
	);
}

export default Setting;