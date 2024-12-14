const calendar = document.getElementById('calendar'),
    doctorSelect = document.getElementById('select-doctor'),
    selectError = document.getElementById('select-error');

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const today = new Date();
    
function load_calendar(){
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date();
        currentDate.setDate(today.getDate() + i);
    
        const dayName = dayNames[currentDate.getDay()];
        const formattedDate = `${dayName} (${currentDate.getMonth() + 1}/${currentDate.getDate()})`;
    
        document.getElementById(`header-${i}`).innerText = formattedDate;
    }
}
    

function selectDoctor(event) {
    event.preventDefault();

    if (doctorSelect.value == 'Select a Doctor'){
        selectError.innerText = 'Please select a doctor.';
        return
    } 
    else selectError.innerText = '';

    $.ajax({
        url: '/load-calendar',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ 'email' : `${doctorSelect.value}`}),
        success: function(response) {
            calendar.style.display = 'block';
            calendar.innerHTML = `${response.html}`;
            load_calendar();
        },
        error: function(xhr, status, error) {
        }
    })
}

