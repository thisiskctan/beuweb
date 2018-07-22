function saveState_added() {
action=true;
	if (action === true) {
		if (stateIndex == opc_back_forward){
			state.shift();
			console.log('saveState_added shift');
			}
		state[stateIndex] = JSON.stringify(canvas.toDatalessJSON());
		refresh = true;
		action = false;

		canvas.renderAll();
	}
}

function saveState_modified() {
	if (stateIndex == opc_back_forward) {
		state.shift();
		stateIndex = 9;
		console.log('saveState_modified shift');
	}
	state[++stateIndex] = JSON.stringify(canvas.toDatalessJSON());
	action = false;
	canvas.renderAll();
}

opc_undoFun = function() {
	if (stateIndex < 0) {
		stateIndex = 0;
		canvas.loadFromJSON(state[stateIndex], cnavasRender);
		canvas.renderAll();
		document.getElementById("undo").style.enabled = false;
		return false;
	} else{
		canvas.loadFromJSON(state[stateIndex], cnavasRender);
		}
	action = false;
	canvas.renderAll();
	opc_Update_Layer();
};
opc_redoFun = function() {
	action = false;
	var canvasObj=canvas.getObjects();
	if (opc_back_forward == state.length) {
		canvas.loadFromJSON(state[stateIndex], cnavasRender);
		canvas.renderAll();
		return false;
	} else
		canvas.loadFromJSON(state[stateIndex], cnavasRender);
		canvas.renderAll();
		opc_Update_Layer();
}
function cnavasRender() {
	setTimeout(function() {
		canvas.renderAll();
		canvas.calcOffset();
	}, 200);
}