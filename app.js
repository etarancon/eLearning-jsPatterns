document.onreadystatechange = function () {
    if (document.readyState === "interactive" || document.readyState === "complete") {
        initApplication();
    }
}

function initApplication() {
    //Vars
    const URL = 'cats.json';
    let catsList = [];
    const listContainer = document.getElementById('list-container');

    //Get list of cats to show in index
    _generateList(URL).then((response) => {
        catsList = response.cats;

        catsList.forEach(data => {
            //Crear los elementos en el DOM
            let node = _createNode(data);
            //Añadir event
            node.addEventListener('click', function (target) {
                _addClick(target.currentTarget, catsList);
            });
            //Pintar
            listContainer.appendChild(node);
        });
    });
}

//Private  Functions
function _getData(url) {
    return fetch(url, {
        method: 'get'
    });
}

function _generateList(url) {
    return _getData(url).then((response) => {
        return response.json();
    });
}

function _createNode(data) {
    let node = document.createElement('li');
    node.setAttribute('data-id', data.id);
    node.className = 'list-item';
    node.innerHTML = `${data.catName} <img src="${data.catImage}"/><span>${data.catCount}</span>`;

    return node;
}

function _findById(id, list) {
    return list.find(function (obj) {
        if (obj.id && obj.id === id) {
            return true;
        }
    });
}

function _addClick(target, catsList) {
    const id = parseInt(target.getAttribute('data-id'));
    const cat = _findById(id, catsList);
    if (cat) {
        cat.catCount++;
    }
    const span = target.getElementsByTagName('span')[0];
    span.innerText = cat.catCount;

}