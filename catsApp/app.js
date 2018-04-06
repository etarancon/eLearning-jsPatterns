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
                listContainer.innerHTML = '';

                controller.getList().forEach(cat => {
                        //Crear los elementos en el DOM
                        let node = _createListItem(cat);
                        //Pintar
                        listContainer.appendChild(node);
                        // Añadir event
                        node.addEventListener('click', (function (cat) {
                            return function(){
                                controller.setCurrentCat(cat);
                                viewAdmin.cleanContainer();
                                viewDetail.renderDetail();
                            };
                        })(cat));
                    });
            }
        };

        var viewDetail = {
            init: function (){
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

        var viewAdmin = {
            init: function (){
                const self = this;
                this.adminContainer = document.getElementById('admin-container');
                this.adminButton = document.getElementById('admin-mode');

                this.adminButton.addEventListener('click', function(){
                    self.render();
                });
            },
            render: function (){
                const currentCat = controller.getCurrentCat();
                const form = _createFormAdmin(currentCat);
                const container = this.adminContainer;

                this.cleanContainer();
                container.appendChild(form);
                this.addListeners();
            },
            addListeners: function(){
                const self = this;
                const saveButton = this.adminContainer.getElementsByClassName('save-button')[0];
                const cancelButton = this.adminContainer.getElementsByClassName('cancel-button')[0];
                const form = this.adminContainer.getElementsByTagName('form')[0];

                form.addEventListener('submit',function (event){
                    const id = event.currentTarget.getAttribute('data-id');
                    const inputs = event.currentTarget.getElementsByTagName('input');
                    const catName = inputs[0].value;
                    const catImage = inputs[1].value;
                    const catCount = inputs[2].value;
                    const modifiedCat = {
                        id,
                        catName,
                        catImage,
                        catCount
                    };

                    controller.setCurrentCat(modifiedCat);
                    viewDetail.renderDetail();
                    self.removeListeners();
                    self.cleanContainer();
                    controller.updateModel(modifiedCat);

                    event.preventDefault();
                    return false;
                });
                cancelButton.addEventListener('click',function(){
                    self.removeListeners();
                    self.cleanContainer();
                });


            },
            removeListeners: function(){
                const self = this;
                const saveButton = this.adminContainer.getElementsByClassName('save-button')[0];
                const cancelButton = this.adminContainer.getElementsByClassName('cancel-button')[0];
                const form = this.adminContainer.getElementsByTagName('form')[0];

                form.addEventListener('submit',function (event){
                    event.preventDefault();
                    return false;
                });

                saveButton.removeEventListener('click',function(){

                });
                cancelButton.removeEventListener('click',function(){
                    self.removeListeners();
                    self.cleanContainer();
                });

            },
            cleanContainer: function(){
                const container = this.adminContainer;

                container.innerHTML = '';
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
                viewAdmin.init();
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

            updateModel(cat){
                const index = model.list.findIndex(function(currentCat){
                    return currentCat.id === parseInt(cat.id);
                });

                if (index !== -1){
                    model.list[index] = cat;

                    viewList.renderList();
                }
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
        const item = list.find(function (obj) {
            if (obj.id && obj.id === parseInt(id)) {
                return true;
            }
        });
        return item;
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

    function _createFormAdmin(data){
        let node = document.createElement('form');
        node.setAttribute('data-id', data.id);
        node.innerHTML = `
        <label for="name">Name</label>
        <input type="text" id="name" value="${data.catName}">
        <label for="image-url">Image URL</label>
        <input type="text" id="image-url" value="${data.catImage}">
        <label for="clicks">Clicks</label>
        <input type="text" id="clicks" value="${data.catCount}">
        <button class="cancel-button">Cancel</button>
        <button type="submit" class="save-button">Save</button>
        `;

        return node;
    }
}