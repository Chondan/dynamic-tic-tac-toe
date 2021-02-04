// Instructions is depend on board's size

const Instruction = () => {
	return (
		<div className="instruction shadow">
			<b>Instruction</b><br/>
			<div style={{ textIndent: 20 }}>You can set the table into any <b>size</b> you want and you can also set the <b>rule</b> for 
			winning the game (consecutive X to win)</div>
		</div>
	);
}

export default Instruction;