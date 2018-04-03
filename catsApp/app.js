document.onreadystatechange = function () {
    if (document.readyState === "interactive" || document.readyState === "complete") {
        const URL = 'cats.json';
        const METHOD = 'GET';

        var model = {
            currentCat: {},
            list: [
                    {
                        "id": 1,
                        "catName": "Solomon",
                        "catImage": "https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426",
                        "catCount": 0
                    },
                    {
                        "id": 2,
                        "catName": "Jake",
                        "catImage": "https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496",
                        "catCount": 0
                    }, {
                        "id": 3,
                        "catName": "Tom & Jerry",
                        "catImage": "https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454",
                        "catCount": 0
                    }, {
                        "id": 4,
                        "catName": "Grumpy",
                        "catImage": "https://i.ytimg.com/vi/OqQPv78AMw0/maxresdefault.jpg",
                        "catCount": 0
                    }, {
                        "id": 5,
                        "catName": "Nico",
                        "catImage": "https://news.nationalgeographic.com/content/dam/news/photos/000/755/75552.ngsversion.1422285553360.adapt.1900.1.jpg",
                        "catCount": 0
                    }]
        };

        var service = {

            get: function (){

            },

            getData: function (url, method) {
                return fetch(url, { method }).then((response) => {
                    return response.json();
                });
            }
        };

        var viewList = {
            init: function () {
                this.listContainer = document.getElementById('list-container');

                this.renderList();
            },

            renderList: function () {
                const self = this;
                const listContainer = this.listContainer;

                controller.getList().forEach(cat => {
                        //Crear los elementos en el DOM
                        let node = _createListItem(cat);
                        //Pintar
                        listContainer.appendChild(node);
                        // Añadir event
                        node.addEventListener('click', (function (cat) {
                            return function(){
                                controller.setCurrentCat(cat);
                                viewDetail.renderDetail();
                            };
                        })(cat));
                    });
            }
        };

        var viewDetail = {
            init: function () {
                this.detailContainer = document.getElementById('detail-container');

                this.renderDetail();
            },

            renderDetail: function(){
                const self = this;
                const container = this.detailContainer;
                const detail = controller.getCurrentCat();
                const element = _createDetailItem(detail, 'div');

                container.innerHTML = '';
                container.appendChild(element);

                element.addEventListener('click', function (detail){
                    controller.updateCount();
                })
            },

            updateCounterView: function(){
                const container = this.detailContainer;
                const child = container.getElementsByClassName('detail')[0];
                const detail = controller.getCurrentCat();

                if (child){
                    const counter = child.getElementsByClassName('counter')[0];
                    counter.innerText = detail.catCount;
                }
            }
        };

        var controller = {
            init: function() {
                // service.getData(URL,METHOD).then((data)=>{
                //     model.list = data;
                //     this.setCurrentCat(model.list[0]);

                //     viewList.init();
                //     viewDetail.init();
                // });

                this.setCurrentCat(model.list[0]);

                viewList.init();
                viewDetail.init();
            },

            getList: function () {
                return model.list;
            },

            getCurrentCat: function(){
                return model.currentCat;
            },
            setCurrentCat: function(cat){
                model.currentCat = cat;
            },

            updateCount: function(){
                model.currentCat.catCount++;
                viewDetail.updateCounterView();

                // Update in model.list
                // _findById(item.id, model.list).then((item) => {
                //     if (item) {
                //         item.catCount++;

                //         return item;
                //     }
                // });
            }

        };

        controller.init();
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

    function _createListItem(data, tagElement = 'li') {
        let node = document.createElement(tagElement);
        node.setAttribute('data-id', data.id);
        node.className = 'list-item';
        node.innerHTML = `<h2>${data.catName}</h2>`;

        return node;
    }

    function _createDetailItem(data, tagElement = 'div') {
        let node = document.createElement(tagElement);
        node.setAttribute('data-id', data.id);
        node.className = 'detail';
        node.innerHTML = `<h2>${data.catName}</h2> <img src='${data.catImage}' alt=''></img> <span class='counter'>${data.catCount}</span>`;

        return node;
    }
}