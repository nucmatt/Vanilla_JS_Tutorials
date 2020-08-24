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
        money: Math.floor(Math.random() * 1000000)
    };
    // console.log(newUser);
    
    addData(newUser);
}

// Add new user obje to data array
function addData(obj) {
    data.push(obj);
}
