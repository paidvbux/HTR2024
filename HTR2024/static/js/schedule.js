const changedCells = {};

function markCalendar(event, pos){
    let cell = document.getElementById(pos);
    event.preventDefault();

    backgroundColor = cell.style.backgroundColor;
    if (backgroundColor == ''){
        cell.style.backgroundColor = '#333';
    }
    else{
        cell.style.backgroundColor = '';
    }

    if (changedCells[`${pos}`] == null)
        changedCells[`${pos}`] = true;
    else
        delete changedCells[`${pos}`];
    console.log(changedCells);
}

function sendChanges(event) {
    
}