function saveState_added() {

	if (action === true) {
		if (stateIndex == 10)
			state.shift();
		state[stateIndex] = JSON.stringify(canvas.toDatalessJSON());
		refresh = true;
		action = false;

		canvas.renderAll();
	}
}

function saveState_modified() {
	if (stateIndex == 10) {
		state.shift();
		stateIndex = 9;
	}
	state[++stateIndex] = JSON.stringify(canvas.toDatalessJSON());
	action = false;
}

opc_undoFun = function() {
	//alert("alert");
	if (stateIndex < 0) {
		stateIndex = 0;
		canvas.loadFromJSON(state[stateIndex], cnavasRender);
		canvas.renderAll();
		return;
	} else
		canvas.loadFromJSON(state[stateIndex], cnavasRender);
	action = false;
};
opc_redoFun = function() {
	//alert("hjgf");
	action = false;
	if (stateIndex >= state.length - 1) {
		canvas.loadFromJSON(state[stateIndex], cnavasRender);
		canvas.renderAll();
		return;
	} else
		canvas.loadFromJSON(state[stateIndex], cnavasRender);
}
function cnavasRender() {
	setTimeout(function() {
		canvas.renderAll();
		canvas.calcOffset();
	}, 200);
}