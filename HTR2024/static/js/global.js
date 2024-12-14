const url = 'http://127.0.0.1:5000/'

function getCookie(name) {
    const cookieString = document.cookie,
          cookies = cookieString.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
    
    return null;
}


const userData = getCookie('user-info'),
    navLogin = document.getElementById('nav-login'),
    userInfo = userData.slice(1, -1).split('/');

const navNotifs = document.getElementById('nav-notifs'),
    navContact = document.getElementById('nav-contact');
    
if (userData) {
    if (navLogin) {
        let username = userInfo[0];
    
        navLogin.innerText = `${username}`;
        navLogin.removeAttribute('href');
    }
    if (userInfo[2] == 'd' && navNotifs) {
        navNotifs.style.display = 'flex';
    }
    else if (userInfo[2] == 'p' && navContact) {
        navContact.style.display = 'flex';
    }   
}
