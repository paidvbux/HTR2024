const fNameInput = document.getElementById('first'),
    lNameInput = document.getElementById('last'),
    emailInput = document.getElementById('email'),
    phoneInput = document.getElementById('phone'),
    passInput = document.getElementById('password'),
    confirmPassInput = document.getElementById('confirm_password'),
    userTypeInput = document.getElementById('user-type'),
    lEmailInput = document.getElementById('email-login'),
    lPassInput = document.getElementById('password-login');
    
const signupForm = document.getElementById('signup-form'),
    loginForm = document.getElementById('login-form');

let loginShown = true;

const loginError = document.getElementById('login-error'),
    signupError = document.getElementById('signup-error');

function toggleLogin() {
    loginShown = !loginShown;
    if (loginShown){
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    }
    else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    }
}

function login(event){
    event.preventDefault();
    
    $.ajax({
        url: '/user-login',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ 'email' : lEmailInput.value,
                               'password' : lPassInput.value }),
        success: function(response){
            console.log(response);
            if (response.message == 'invalid'){
                loginError.innerText = 'Incorrect email or password, please try again.';
                return
            }
            else if (response.message == 'success'){
                window.location.href = url;   
            }
        },
        error: function(xhr, status, error) {
        }
    })
}


function signup(event) {
    event.preventDefault();    
    
    if (passInput.value != confirmPassInput.value){
        signupError.innerText = 'Password doesn\'t match.';
        return
    }
    else if (userTypeInput == 'blank'){
        signupError.innerText = 'Please select an account type.';
        return    
    }
    else if (phoneInput.value.length != 10 || isNaN(phoneInput.value)){
        signupError.innerText = 'Invalid phone number.';
        return    
    }

    $.ajax({
        url: '/create-account',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ 'name' : `${fNameInput.value} ${lNameInput.value}`,
                               'email' : emailInput.value,
                               'phone' : phoneInput.value,
                               'password' : passInput.value,
                               'account_type' : userTypeInput.value }),
        success: function(response) {
            if (response.message == 'success'){
                window.location.href = url;
            }
            else if (response.message == 'email taken'){
                signupError.innerText = 'Email already in use.';
            }
        },
        error: function(xhr, status, error) {
            console.error('Error: ', error);
        }
    });
}

