var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var main = document.getElementById('main');
var addUserBtn = document.getElementById('add-user');
var doubleBtn = document.getElementById('double');
var sortBtn = document.getElementById('sort');
var showMillionairesBtn = document.getElementById('show-millionaires');
var calculateWealthBtn = document.getElementById('calculate-wealth');
var clearListBtn = document.getElementById('clear-list');
var userList = [];
/*--- UTILITY FUNCTIONS ---*/
// Format number value into readble monetary value
function formatMoney(money) {
    return "$" + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
// Clear Users Listed
function clearList() {
    userList = [];
    updateDOM();
}
// Update DOM
function updateDOM(providedData) {
    if (providedData === void 0) { providedData = userList; }
    // Clear main div 
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
    providedData.forEach(function (item) {
        var element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = "<strong>" + item.name + "</strong> " + formatMoney(item.money);
        main.appendChild(element);
    });
    console.log(main.children[main.children.length - 1]);
}
// Adds user to data array
function addData(user) {
    userList.push(user);
    updateDOM();
}
/*--- USER FUNCTIONS ---*/
// Fetch random user and add money 
function getRandomUser() {
    return __awaiter(this, void 0, void 0, function () {
        var res, user, newUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://randomuser.me/api')];
                case 1: return [4 /*yield*/, (_a.sent()).json()];
                case 2:
                    res = _a.sent();
                    user = res.results[0];
                    newUser = {
                        name: user.name.first + " " + user.name.last,
                        money: Math.floor(Math.random() * 10000000)
                    };
                    addData(newUser);
                    return [2 /*return*/];
            }
        });
    });
}
function doubleMoney() {
    userList = userList.map(function (user) {
        return __assign(__assign({}, user), { money: user.money * 2 });
    });
    updateDOM();
}
// Sort by Richest 
function sortByRichest() {
    userList.sort(function (a, b) {
        return b.money - a.money;
    });
    updateDOM();
}
// Show only millionaires
function showMillionaires() {
    userList = userList.filter(function (user) { return user.money > 1000000; });
    updateDOM();
}
// Calculate combined wealth
function calculateWealth() {
    var mainLastChild = main.children[main.children.length - 1];
    // Checks to see if userList is greater than 0 and hasn't been run before.
    if (userList.length > 0 &&
        mainLastChild.classList.contains("person")) {
        var wealth = userList.reduce(function (acc, user) { return (acc += user.money); }, 0);
        var weatlhEl = document.createElement('div');
        weatlhEl.innerHTML = "<h3>Total: Weatlh <strong>" + formatMoney(wealth) + "</strong></h3>";
        main.appendChild(weatlhEl);
    }
    else {
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
