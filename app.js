//Vars
let clickCountImg1 = 0;
let clickCountImg2 = 0;

const containerImg1 = document.getElementById('img-1');
const containerImg2 = document.getElementById('img-2');
const header1 = containerImg1.getElementsByClassName('header')[0];
const header2 = containerImg2.getElementsByClassName('header')[0];


//Events
containerImg1.addEventListener('click', function () {
    clickCountImg1++;
    console.log(clickCountImg1);
    _addText(header1, clickCountImg1);
}, false);
containerImg2.addEventListener('click', function () {
    clickCountImg2++;
    console.log(clickCountImg2);
    _addText(header2, clickCountImg2);
}, false);

//Functions
function _addText(container = '', count = '') {
    let textContainer = container.getElementsByTagName('p')[0];
    if (!textContainer) {
        const element = document.createElement('p');
        container.appendChild(element);
        textContainer = container.getElementsByTagName('p')[0];
    }

    textContainer.innerText=count;
}