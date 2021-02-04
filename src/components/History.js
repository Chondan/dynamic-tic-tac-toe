const List = ({
	historyObj, onClick, currentTurnId
}) => {

	const { turnId, turn, row, col } = historyObj;

	return (
		<li className="history-list" onClick={() => onClick(historyObj)}
			style={{ color: currentTurnId === turnId ? 'red': 'black' }}
		>
			{turnId.slice(0, 3)}{'->'}{turn}: {`(${row}, ${col})`}
		</li>
	);
}

const Replay = ({
	onClick
}) => {

	return (
		<div>
			<button onClick={onClick}>Replay</button>
		</div>
	);
}

const History = ({
	history, handleRewind, turnId: currentTurnId, setReplaying
}) => {

	const histories = Object.keys(history);

	const handleReplay = (speed) => {
		// speed in milli-second
		for (let i = 0; i < histories.length; i++) {
			setReplaying(true);
			setTimeout(() => {
				handleRewind(history[histories[i]])
				if (i === histories.length - 1) setReplaying(false);
			}, i * speed);
		}
	}

	return (
		<div className="history">
			<b>History</b>
			<Replay onClick={() => handleReplay(500)} />
			<ul>
				{
					histories.map(historyId => (
						<List key={historyId} historyObj={history[historyId]} 
							onClick={handleRewind} currentTurnId={currentTurnId}
						/>
					))
				}
			</ul>
		</div>
	);
}

export default History;