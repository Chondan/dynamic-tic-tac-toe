import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Row = ({
	col, rowId, onClick, table
}) => {

	return (
		<Fragment>
			<tr>
				{
					Array(+col).fill(null).map((_, index) => (
						<td key={uuidv4()} className='cell' row={rowId} col={index}
							onClick={() => onClick(rowId, index)}
						>{ table && table[rowId][index] }</td>
					))
				}
			</tr>
		</Fragment>
	);
}

const GameBoard = ({
	boardSize, handleCellClick, table
}) => {

	return (
		<div className="game-board">
			<table>
				<tbody>
				{
					Array(+boardSize).fill(null).map((_, index) => (
						<Row key={uuidv4()} col={boardSize} rowId={index} 
							onClick={handleCellClick} table={table}
						/>
					))
				}	
				</tbody>
			</table>
		</div>
	);
}

export default GameBoard;