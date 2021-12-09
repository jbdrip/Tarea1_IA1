function reflex_agent(location, state){
    if (state=="DIRTY") return "CLEAN";
    else if (location=="A") return "RIGHT";
    else if (location=="B") return "LEFT";
}

function test(info) {
    var location = info[0];		
    var state = info[0] == "A" ? info[1] : info[2];
    var action_result = reflex_agent(location, state);
    document.getElementById("log").innerHTML+="<br>Location: ".concat(location).concat(" | Action: ").concat(action_result);
    verify_state(location, info[1], info[2]);
    
    if (action_result == "CLEAN") {
        if (location == "A") info[1] = "CLEAN";
        else if (location == "B") info[2] = "CLEAN";
    }
    else if (action_result == "RIGHT") info[0] = "B";
    else if (action_result == "LEFT") info[0] = "A";

    let newStates = newState(info);
    info[1] = newStates[0];
    info[2] = newStates[1];

    if(!all_visited()) {
        setTimeout(function(){ test(info); }, 1000);
    } else { alert("SE HAN VISITADO TODOS LOS ESTADOS."); }
}

var newState = (states) => {
    let state = [];
    let random = Math.trunc(getRandom(1, 5));
    switch(random) {
        case 1:
			state[0] = 'DIRTY';
			state[1] = states[2];
			break;
		case 2:
			state[0] = states[1];
			state[1]  = 'DIRTY'
			break;
		case 3:
			state[0] = 'DIRTY';
			state[1]  = 'DIRTY';
			break;
		default:
			state[0] = states[1];
			state[1]  = states[2];
			break;
    }
    return state;
}

var getRandom = (min, max) => {
	return Math.random() * (max - min) + min;
}

var verify_state = (position, stateA, stateB) => {
    let state = -1;
    if(position == "A") {
        if(stateA == "DIRTY") { 
            if(stateB == "DIRTY") { state = 0; }
            else { state = 2; }
        } else { 
            if(stateB == "DIRTY") { state = 4; }
            else { state = 6; }
        }
    } else {
        if(stateA == "DIRTY") { 
            if(stateB == "DIRTY") { state = 1; }
            else { state = 3; }
        } else { 
            if(stateB == "DIRTY") { state = 5; }
            else { state = 7; }
        }
    }
    states[state]++;
    document.getElementById("log").innerHTML+="<br>Estado: ".concat(state + 1).concat(" visitado. ");
    console.log(states);
}

var all_visited = () => {
    for(let i = 0; i < 8; i++) {
        let state = states[i];
        if(state == 0){ return false; }
        else if(i == 7){ return true; }
    }
}

var states = [0, 0, 0, 0, 0, 0, 0, 0]
var info = ["A","DIRTY","DIRTY"];
test(info);