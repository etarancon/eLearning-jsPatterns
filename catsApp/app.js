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
    const detailContainer = document.getElementById('detail-container');

    //Get list of cats to show in index
    _getData(URL).then((response) => {
        catsList = response.cats;

        catsList.forEach(data => {
            //Crear los elementos en el DOM
            let node = _createHtml(data, 'li');
            //Añadir event
            node.addEventListener('click', function (target) {
                const selectedItem = _selectItem(target.currentTarget, catsList);

                _showDetail(detailContainer, selectedItem);
            });
            //Pintar
            listContainer.appendChild(node);
        });
    });
}

//Private  Functions
function _get(url) {
    return fetch(url, {
        method: 'get'
    });
}

function _getData(url) {
    return _get(url).then((response) => {
        return response.json();
    });
}

function _findById(id, list) {
    return new Promise(function (resolve, reject) {
        const item = list.find(function (obj) {
            if (obj.id && obj.id === id) {
                return true;
            }
        });
        resolve(item);
    });
}

function _createHtml(data, tagElement = 'div') {
    let node = document.createElement(tagElement);
    node.setAttribute('data-id', data.id);
    node.className = 'list-item';
    node.innerHTML = `<h2>${data.catName}</h2> <img src="${data.catImage}"/><span>${data.catCount}</span>`;

    return node;
}

function _showDetail(container, detail = {}) {
    if (!container) {
        container = document.getElementsByTagName('body')[0];
    }
    const element = _createHtml(detail, 'div');
    
    const child = container.getElementsByTagName('div')[0];
    if(child){
        container.removeChild(child);
    }
    container.appendChild(element);
}

function _selectItem(target, list) {
    const id = parseInt(target.getAttribute('data-id'));
    _findById(id, list).then(item => {
        if (item) {
            const span = target.getElementsByTagName('span')[0];

            item.catCount++;
            span.innerText = item.catCount;

            return item;
        }
    });

}