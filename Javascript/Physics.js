let usersDB = JSON.parse(localStorage.getItem('usersDB')) || [];
let threadsDB = JSON.parse(localStorage.getItem('threadsDB')) || [];
let loggedInUser = null;

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let username = document.getElementById('register-username').value;
    let password = document.getElementById('register-password').value;
    registerUser(username, password);
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let username = document.getElementById('login-username').value;
    let password = document.getElementById('login-password').value;
    loginUser(username, password);
});

document.getElementById('new-thread-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let title = document.getElementById('thread-title').value;
    let content = document.getElementById('thread-content').value;
    postNewThread(title, content);
});

document.getElementById('logout-btn').addEventListener('click', function() {
    logoutUser();
});

document.getElementById('signup-link').addEventListener('click', function() {
    document.getElementById('registration-section').classList.remove('hidden');
    document.getElementById('login-section').classList.add('hidden');
});

document.getElementById('login-link').addEventListener('click', function() {
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('registration-section').classList.add('hidden');
});

function registerUser(username, password) {
    let userExists = usersDB.some(user => user.username === username);
    if (!userExists) {
        let newUser = { username, password };
        usersDB.push(newUser);
        localStorage.setItem('usersDB', JSON.stringify(usersDB));
        alert('Registration successful!');
        document.getElementById('registration-section').classList.add('hidden');
        document.getElementById('login-section').classList.remove('hidden');
    } else {
        alert('Username already exists!');
    }
}

function loginUser(username, password) {
    let user = usersDB.find(user => user.username === username && user.password === password);
    if (user) {
        loggedInUser = user;
        displayForum();
    } else {
        alert('Invalid credentials!');
    }
}

function displayForum() {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('registration-section').classList.add('hidden');
    document.getElementById('forum-section').classList.remove('hidden');
    document.getElementById('logout-btn').classList.remove('hidden');
    document.getElementById('new-thread-form').classList.remove('hidden');
    document.getElementById('user-greeting').innerText = `Welcome, ${loggedInUser.username}`;
    loadThreads();
}

function logoutUser() {
    loggedInUser = null;
    document.getElementById('user-greeting').innerText = '';
    document.getElementById('logout-btn').classList.add('hidden');
    document.getElementById('new-thread-form').classList.add('hidden');
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('threads-container').innerHTML = ''; // Clear threads
}

function postNewThread(title, content) {
    let newThread = { id: Date.now(), title, content, author: loggedInUser.username };
    threadsDB.push(newThread);
    localStorage.setItem('threadsDB', JSON.stringify(threadsDB));
    addThreadToDOM(newThread);
    document.getElementById('thread-title').value = '';
    document.getElementById('thread-content').value = '';
}

function loadThreads() {
    threadsDB.forEach(thread => addThreadToDOM(thread));
}

function addThreadToDOM(thread) {
    let threadsContainer = document.getElementById('threads-container');
    let threadDiv = document.createElement('div');
    threadDiv.classList.add('thread');
    threadDiv.innerHTML = `<h3>${thread.title}</h3><p>${thread.content}</p><small>Posted by ${thread.author}</small>`;
    threadsContainer.appendChild(threadDiv);
}
