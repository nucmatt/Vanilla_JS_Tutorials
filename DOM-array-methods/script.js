const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calulateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money
async function getRandomUser() {
	// This is how you would write the fetch api request normally, with the .thens. However since fetch is asynchronous, you can use async/await to make the code look cleaner. The function will now be written with async/await below.
	// fetch('https://randomuser.me/api').then(res => res.json()).then(data => );
	const res = await fetch('https://randomuser.me/api');
	const data = await res.json();
	// console.log(data);

	const user = data.results[0];
	const newUser = {
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 1000000),
	};
	// console.log(newUser);

	addData(newUser);
}

// Add new user obje to data array
function addData(obj) {
	data.push(obj);

	updateDOM();
}

// Update DOM
// For the argument providedData, if there is no value passed in for the argument, its value will default to data. This is more ES6 syntax goodness.
const updateDOM = (providedData = data) => {
	// Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    })
};

// Format number as money
const formatMoney = (number) => {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
