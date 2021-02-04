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

const History = ({
	history, handleRewind, turnId: currentTurnId
}) => {

	const histories = Object.keys(history);

	return (
		<div className="history">
			<b>History</b>
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