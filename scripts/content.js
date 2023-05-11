// CREATE NEW UI BUTTON BAR
const newDiv = document.createElement('div');
newDiv.classList.add('PoE-Expand-Challenges-Extension');

// hide complete button
const newLinkHideComplete = document.createElement('a');
newLinkHideComplete.classList.add('POEECE-hide-complete');
newLinkHideComplete.setAttribute('title', 'Hide complete challenges');
newDiv.appendChild(newLinkHideComplete);

newLinkHideComplete.addEventListener('click', function(event) {
    let toggled = newLinkHideComplete.classList.toggle('toggled');
    let incomplete = document.querySelectorAll(".achievement:not(.incomplete)");
    for(let element of incomplete){
        element.classList.toggle('POEECE-hidden');
    }
    chrome.storage.local.set({ 'POEECE-hide-complete': toggled });
});

// hide incomplete button
const newLinkHideIncomplete = document.createElement('a');
newLinkHideIncomplete.classList.add('POEECE-hide-incomplete');
newLinkHideIncomplete.setAttribute('title', 'Hide incomplete challenges');
newDiv.appendChild(newLinkHideIncomplete);

newLinkHideIncomplete.addEventListener('click', function(event) {
    let toggled = newLinkHideIncomplete.classList.toggle('toggled');
    let incomplete = document.querySelectorAll(".achievement.incomplete");
    for(let element of incomplete){
        element.classList.toggle('POEECE-hidden');
    }
    chrome.storage.local.set({ 'POEECE-hide-incomplete': toggled });
});

// expand complete button
const newLinkExpandComplete = document.createElement('a');
newLinkExpandComplete.classList.add('POEECE-expand-complete');
newLinkExpandComplete.setAttribute('title', 'Expand complete challenges');
newDiv.appendChild(newLinkExpandComplete);

newLinkExpandComplete.addEventListener('click', function(event) {
    let toggled = newLinkExpandComplete.classList.toggle('toggled');
    let complete = document.querySelectorAll(".achievement:not(.incomplete)");
    for(let element of complete){
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
});

//expand incomplete button
const newLinkExpandIncomplete = document.createElement('a');
newLinkExpandIncomplete.classList.add('POEECE-expand-incomplete');
newLinkExpandIncomplete.setAttribute('title', 'Expand incomplete challenges');
newDiv.appendChild(newLinkExpandIncomplete);

newLinkExpandIncomplete.addEventListener('click', function(event) {
    let toggled = newLinkExpandIncomplete.classList.toggle('toggled');
    let incomplete = document.querySelectorAll(".achievement.incomplete");
    for(let element of incomplete){
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
});

// hide complete item button
const newLinkHideCompleteItem = document.createElement('a');
newLinkHideCompleteItem.classList.add('POEECE-hide-complete-item');
newLinkHideCompleteItem.setAttribute('title', 'Hide complete sub-challenges');
newDiv.appendChild(newLinkHideCompleteItem);

newLinkHideCompleteItem.addEventListener('click', function(event) {
    let toggled = newLinkHideCompleteItem.classList.toggle('toggled');
    let incomplete = document.querySelectorAll(".achievement.incomplete .finished");
    for(let element of incomplete){
        element.classList.toggle('POEECE-hidden');
    }
    chrome.storage.local.set({ 'POEECE-hide-complete-item': toggled });
});

// INSERT THE NEW UI BEFORE THE CHALLENGES LIST
const achievementList = document.querySelector(".achievement-list");
achievementList.parentNode.insertBefore(newDiv, achievementList);

// SET DEFAULT
chrome.storage.local.get(null).then((result) => {
    if (result['POEECE-hide-complete']) {
        document.querySelector('.POEECE-hide-complete').click();
    }
    if (result['POEECE-hide-incomplete']) {
        document.querySelector('.POEECE-hide-incomplete').click();
    }
    if (result['POEECE-expand-complete']) {
        document.querySelector('.POEECE-expand-complete').click();
    }
    if (result['POEECE-expand-incomplete']) {
        document.querySelector('.POEECE-expand-incomplete').click();
    }
    if (result['POEECE-hide-complete-item']) {
        document.querySelector('.POEECE-hide-complete-item').click();
    }
});