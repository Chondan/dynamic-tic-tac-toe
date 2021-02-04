import { useState, useEffect } from 'react';
import _ from 'lodash';
import { v4 as uuidv4} from 'uuid';
import './App.css';

// Components
import { Instruction, Setting, GameBoard, History } from './components';

// Utils
import whoIsWinner from './utils/checkWinner';

const Info = ({
  turn, winner
}) => {
  return (
    <div className="info">
      <div>Next Turn: {turn.toUpperCase()}</div>
      {
        winner && 
        (winner === 'tie' ? 
        <div>{'TIE'}</div> :
        <div>Result: {winner.toUpperCase()} won!!!</div>)
      }
    </div>
  );
}

function App() {

  const [gameStart, setGameStart] = useState(false);
  const [boardSize, setBoardSize] = useState(3);
  const [turn, setTurn] = useState("p1"); // p1 and p2
  const [table, setTable] = useState(null); // record the input
  const [history, setHistory] = useState({}); // record plays -> { 0: { turn: 'p1', row: 0, col: 0 } };
  const [latestTurnId, setLatestTurnId] = useState(null); // lateset turnId
  const [turnId, setTurnId] = useState(null); // turnId at any moment
  const [square, setSqaure] = useState(0);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [consecutiveWins, setConsecutiveWins] = useState(3);

  const handleGameStart = (size, consecutiveWins) => {
    setBoardSize(size);
    setGameStart(true);

    // set consecutiveWins
    setConsecutiveWins(consecutiveWins);

    // set starting table
    let startingTable = Array(+size).fill(null);
    startingTable = startingTable.map(n => Array(+size).fill(null));
    setTable(startingTable);
  }

  const handleGameReset = () => {
    setGameStart(false);
    setTable(null);
    setHistory({});
    setTurnId(null);
    setLatestTurnId(null);
    setSqaure(0);
    setWinner(null);
    setTurn('p1');
    setGameOver(false);
  }

  const handleRewind = (historyObj) => {
    const { table, turn, turnId } = historyObj;
    setTable(table);
    const nextTurn = turn === 'p1' ? 'p2' : 'p1';
    setTurn(nextTurn);
    setTurnId(turnId);
  }

  const handleCellClick = (row, col) => {

    if (!gameStart || turnId !== latestTurnId || gameOver) return;
    if (table[row][col] != null) return;

    // copy table and fill the input
    const fill = turn === "p1" ? 'X' : 'O';
    const copyTable = _.cloneDeep(table);
    copyTable[row][col] = fill;
    setTable(copyTable);

    // record history
    const copyHistory = {...history};
    const id = uuidv4();
    copyHistory[id] = { turn, row, col, table: copyTable, turnId: id };
    setHistory(copyHistory);
    setLatestTurnId(id);
    setTurnId(id);

    // update the amount of input
    setSqaure(state => state + 1);

    // change turn
    setTurn(turn => turn === "p1" ? "p2" : "p1");
  }

  useEffect(() => {

    // check winner
    const winner = whoIsWinner(table, consecutiveWins);
    setWinner(winner);

    // game over
    if (winner) setGameOver(true);

    if (square === boardSize * boardSize && turnId === latestTurnId) setWinner('tie');

  }, [table, boardSize, square, consecutiveWins, turnId, latestTurnId]);

  return (
    <div className="App">
      <h1>Dynamic Tic Tac Toe</h1>
      <Instruction boardSize={boardSize} />
      <div className="game-body shadow">
        <div className="game-body-left">
          <Setting  boardSize={boardSize} handleGameStart={handleGameStart} gameStart={gameStart}
            handleGameReset={handleGameReset}
          />
          <Info turn={turn} winner={winner} square={square} />
          <GameBoard boardSize={boardSize} handleCellClick={handleCellClick} table={table} />
        </div>
        <div className="game-body-right">
          <History turn={turn} history={history} handleRewind={handleRewind} turnId={turnId}/>
        </div>
      </div>
    </div>
  );
}

export default App;