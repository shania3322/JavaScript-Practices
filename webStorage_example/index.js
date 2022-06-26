// create needed constants
const rememberDiv = document.querySelector('.remember');
const enternameInput = document.querySelector('#entername');
const submitnameBtn = document.querySelector('#submitname');
const forgetDiv = document.querySelector('.forget');
const forgetnameBtn = document.querySelector('#forgetname');
const greetingText = document.querySelector('.personal-greeting');
const form = document.querySelector('form');
const h1 = document.querySelector('h1');

form.addEventListener('submit', e=>e.preventDefault());

submitnameBtn.addEventListener('click', ()=>{
	localStorage.setItem('name', enternameInput.value);
	nameDisplayCheck();
})

forgetnameBtn.addEventListener('click', ()=>{
	localStorage.removeItem('name');
	nameDisplayCheck();
})

function nameDisplayCheck() {
	if (localStorage.getItem('name')) {
		const personName = localStorage.getItem('name');
		h1.textContent = `Hello, ${personName}`;
		greetingText.textContent = `Hello, ${personName}. Welcome to our website.`;
		rememberDiv.style.display = 'none';
		forgetDiv.style.display = 'block';
	} else {
		h1.textContent = 'Welcome to our website';
		greetingText.textContent = 'Welcome to our website. We hope you have fun while you are here.';
		rememberDiv.style.display = 'block';
		forgetDiv.style.display = 'none';
	}
	}

nameDisplayCheck();

