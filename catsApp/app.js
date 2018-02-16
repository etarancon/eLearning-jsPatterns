document.onreadystatechange = function () {
    if (document.readyState === "interactive" || document.readyState === "complete") {
        const URL = 'cats.json';

        var model = {
            list: []
        };

        var service = {
            get: function (url) {
                return fetch(url, {
                    method: 'get'
                });
            },

            getData: function (url) {
                return this.get(url).then((response) => {
                    return response.json();
                });
            }
        };

        var view = {
            init: function () {
                this.listContainer = document.getElementById('list-container');
                this.detailContainer = document.getElementById('detail-container');

                this.renderList();
            },

            renderList: function () {
                const self = this;
                const listContainer = this.listContainer;
                const detailContainer = this.detailContainer;

                controller.getModel().then(function (data) {
                    data.forEach(item => {
                        //Crear los elementos en el DOM
                        let node = _createHtml(item, 'li');
                        //Pintar
                        listContainer.appendChild(node);
                        //Añadir event
                        node.addEventListener('click', function (target) {
                            const currentTarget = target.currentTarget;

                            controller.selectItem(currentTarget).then(function(item){
                                const span = currentTarget.getElementsByTagName('span')[0];
                                span.innerText = item.catCount;

                                self.renderDetail(item);
                            });
                        });
                    });
                });
            },

            renderDetail: function(detail){
                const container = this.detailContainer;
                const element = _createHtml(detail, 'div');

                if (!container) {
                    container = document.getElementsByTagName('body')[0];
                }
                const child = container.getElementsByTagName('div')[0];

                if (child) {
                    container.removeChild(child);
                }

                container.appendChild(element);
            }
        };

        var controller = {
            getModel: function () {
                return service.getData(URL).then((data) => {
                    model.list = data.cats;
                    return model.list;
                });
            },
            selectItem: function(target){
                const id = parseInt(target.getAttribute('data-id'));

                return _findById(id, model.list).then((item) => {
                    if (item) {
                        item.catCount++;
        
                        return item;
                    }
                });
            }

        };

        view.init();
    }
    //Private  Functions

    function _findById(id, list) {
        return new Promise((resolve, reject) => {
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
}