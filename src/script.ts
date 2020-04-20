const main: any = document.getElementById('main');
const addUserBtn: any = document.getElementById('add-user');
const doubleBtn: any = document.getElementById('double');
const sortBtn: any = document.getElementById('sort');
const showMillionairesBtn: any = document.getElementById('show-millionaires');
const calculateWealthBtn: any = document.getElementById('calculate-wealth');
const clearListBtn: any = document.getElementById('clear-list');

let userList = [];

/*--- UTILITY FUNCTIONS ---*/

// Format number value into readble monetary value
function formatMoney(money): string {
    return "$" + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  
}

// Clear Users Listed
function clearList(): void {
    userList = [];
    updateDOM();
} 

// Update DOM
function updateDOM(providedData:object[]  = userList): void {
    // Clear main div 
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    providedData.forEach((item: any): void => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`; 
        main.appendChild(element);
    });
console.log(main.children[main.children.length - 1]);

}  

// Adds user to data array
function addData(user: object): void {
    userList.push(user);
    updateDOM();
}

/*--- USER FUNCTIONS ---*/
// Fetch random user and add money 
async function getRandomUser() {
    const res = await (await fetch('https://randomuser.me/api')).json();

    const user = res.results[0];

    const newUser: {name: string, money: number} = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 10000000)
    }

    addData(newUser);
}

function doubleMoney(): any {
    userList = userList.map((user: any): object[] => {
        return { ...user, money: user.money * 2 }
    });
    updateDOM();
}

// Sort by Richest 
function sortByRichest(): void {
    userList.sort((a: any, b: any) => {
        return b.money - a.money; 
    });
    updateDOM();
}

// Show only millionaires
function showMillionaires(): void {
    userList = userList.filter(user => user.money > 1000000); 
    updateDOM();
}

// Calculate combined wealth
function calculateWealth(): void {
    const mainLastChild = main.children[main.children.length - 1]; 

    // Checks to see if userList is greater than 0 and hasn't been run before.
    if (
        userList.length > 0 && 
        mainLastChild.classList.contains("person")
    ) {
        const wealth = userList.reduce((acc, user) => (acc += user.money), 0);
        const weatlhEl = document.createElement('div');
        weatlhEl.innerHTML = `<h3>Total: Weatlh <strong>${formatMoney(wealth)}</strong></h3>`;
        main.appendChild(weatlhEl);
    } else {
        return;
    }
} 

/*---  EVENT LISTENERS ---*/ 
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
clearListBtn.addEventListener('click', clearList);