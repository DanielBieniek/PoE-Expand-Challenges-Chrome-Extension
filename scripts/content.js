// PoE Expand Challenges Extension


// CREATE NEW UI BUTTON BAR
const newDiv = document.createElement('div');
newDiv.classList.add('PoE-Expand-Challenges-Extension');
addNumbers();
addPins();
let pins = [];

// CREATE BUTTONS
let hideComplete = createNewButton('POEECE-hide-complete', 'Hide complete challenges');
let hideIncomplete = createNewButton('POEECE-hide-incomplete', 'Hide incomplete challenges');
let expandComplete = createNewButton('POEECE-expand-complete', 'Hide complete challenges');
let expandIncomplete = createNewButton('POEECE-expand-incomplete', 'Hide complete inchallenges');
let hideItem = createNewButton('POEECE-hide-complete-item', 'Hide complete sub-challenges');
let showNumber = createNewButton('POEECE-show-number', 'Show Challenge number');
let showPins = createNewButton('POEECE-show-pins', 'Enable Pinning Challenges');

// ADD BUTTON EVENTS
hideComplete.addEventListener('click', hideCompleteEvent);
hideIncomplete.addEventListener('click', hideIncompleteEvent);
expandComplete.addEventListener('click', expandCompleteEvent);
expandIncomplete.addEventListener('click', expandIncompleteEvent);
hideItem.addEventListener('click', hideItemEvent);
showNumber.addEventListener('click', showNumberEvent);
showPins.addEventListener('click', showPinsEvent);

// ADD UI
const achievementList = document.querySelector(".achievement-list");
achievementList.parentNode.insertBefore(newDiv, achievementList);

setDefault()




// --------------------------FUNCTIONS------------------------------

// CREATE BUTTON
function createNewButton(className, title) {
    let newButton = document.createElement('a');
    newButton.classList.add(className);
    newButton.setAttribute('title', title);
    newDiv.appendChild(newButton);
    return newButton;
}

// ADD NUMBERS
function addNumbers() {
    let selected = document.querySelectorAll(".achievement h2:first-of-type");
    let i = 0;
    for(let element of selected){
        i++;
        let newNumberSpan = document.createElement('span');
        newNumberSpan.classList.add('POEECE-numbers-span', 'POEECE-hidden');
        newNumberSpan.textContent = i + '. ';
        element.insertAdjacentElement('afterbegin', newNumberSpan);
    }
}

// SET DEFAULT STATE
function setDefault() {
    chrome.storage.local.get(null).then((result) => {
        for (let className in result) {
            if (className == 'pinned') {
                // set pins after page refresh
                for (let pin in result[className]) {
                    document.querySelector(`.${result[className][pin]}`).click();
                }
                continue;
            }
            if (result[className]) {
                // set settings after page refresh
                document.querySelector(`.${className}`).click();
            }
        }
    });
}

// ADD PINS
function addPins() {
    let selected = document.querySelectorAll(".achievement");
    i = 0;
    for(let element of selected){
        i++;
        let pinNumber = 'POEECE-pin-' + i;
        let newPin = document.createElement('a');
        newPin.classList.add('POEECE-pin', 'POEECE-hidden', pinNumber);
        element.insertAdjacentElement('beforeend', newPin);

// PIN CLICK EVENT
        newPin.addEventListener('click', function() {
            this.classList.toggle('toggled');
            this.parentNode.classList.toggle('POEECE-pinned');
            toggleElement(pins, pinNumber);
            chrome.storage.local.set({ 'pinned': pins });
        
            reorderPinnedChallenges();
        });
    }
}

// ADD OR REMOVE PIN FROM ARRAY
function toggleElement(array, element) {
    const index = array.indexOf(element);
    if (index !== -1) {
      array.splice(index, 1);
    } else {
      array.push(element);
    }
  }

// REORDER PINNED CHALLENGES
function reorderPinnedChallenges() {
    let challenges = document.querySelectorAll(".achievement");
    for(let chall of challenges){
        chall.style.order = 9999;
    }
    pins.forEach((className, index) => {
        document.querySelector(`.${className}`).parentNode.style.order = index+1;
    });
}





// ----------------------------CLICK EVENTS----------------------------

function hideCompleteEvent() {
    let toggled = hideComplete.classList.toggle('toggled');
    let selected = document.querySelectorAll(".achievement:not(.incomplete)");
    for(let element of selected){
        element.classList.toggle('POEECE-hidden');
    }
    chrome.storage.local.set({ 'POEECE-hide-complete': toggled });
}

function hideIncompleteEvent() {
    let toggled = hideIncomplete.classList.toggle('toggled');
    let selected = document.querySelectorAll(".achievement.incomplete");
    for(let element of selected){
        element.classList.toggle('POEECE-hidden');
    }
    chrome.storage.local.set({ 'POEECE-hide-incomplete': toggled });
}

function expandCompleteEvent() {
    let toggled = expandComplete.classList.toggle('toggled');
    let selected = document.querySelectorAll(".achievement:not(.incomplete)");
    for(let element of selected){
        if (toggled) {
            //expand
            if (!element.querySelector('a').classList.contains('expanded')) {
                element.querySelector('a').classList.toggle('expanded');
                element.querySelector('.detail').style.display = 'block';
            }
        } else {
            //collapse
            if (element.querySelector('a').classList.contains('expanded')) {
                element.querySelector('a').classList.toggle('expanded');
                element.querySelector('.detail').style.display = '';
            }
        }
    }
    chrome.storage.local.set({ 'POEECE-expand-complete': toggled });
}

function expandIncompleteEvent() {
    let toggled = expandIncomplete.classList.toggle('toggled');
    let selected = document.querySelectorAll(".achievement.incomplete");
    for(let element of selected){
        if (toggled) {
            //expand
            if (!element.querySelector('a').classList.contains('expanded')) {
                element.querySelector('a').classList.toggle('expanded');
                element.querySelector('.detail').style.display = 'block';
            }
        } else {
            //collapse
            if (element.querySelector('a').classList.contains('expanded')) {
                element.querySelector('a').classList.toggle('expanded');
                element.querySelector('.detail').style.display = '';
            }
        }
    }
    chrome.storage.local.set({ 'POEECE-expand-incomplete': toggled });
}

function hideItemEvent() {
    let toggled = hideItem.classList.toggle('toggled');
    let selected = document.querySelectorAll(".achievement.incomplete .finished");
    for(let element of selected){
        element.classList.toggle('POEECE-hidden');
    }
    chrome.storage.local.set({ 'POEECE-hide-complete-item': toggled });
}

function showNumberEvent() {
    let toggled = showNumber.classList.toggle('toggled');
    let selected = document.querySelectorAll(".POEECE-numbers-span");
    for(let element of selected){
        element.classList.toggle('POEECE-hidden');
    }
    chrome.storage.local.set({ 'POEECE-show-number': toggled });
}

function showPinsEvent() {
    let toggled = showPins.classList.toggle('toggled');
    let challengesList = document.querySelector(".achievement-list");
    challengesList.classList.toggle('POEECE-list');
    let selected = document.querySelectorAll(".POEECE-pin");
    for(let element of selected){
        element.classList.toggle('POEECE-hidden');
    }
    chrome.storage.local.set({ 'POEECE-show-pins': toggled });
}