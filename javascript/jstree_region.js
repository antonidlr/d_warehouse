
//JSTREE
/*
$(function () {
    // 6 create an instance when the DOM is ready
    $('#jstree').jstree();
    // 7 bind to events triggered on the tree
    $('#jstree').on("changed.jstree", function (e, data) {
        console.log(data.selected);
    });
    // 8 interact with the tree - either way is OK
    $('button').on('click', function () {
        $('#jstree').jstree(true).select_node('child_node_1');
        $('#jstree').jstree('select_node', 'child_node_1');
        $.jstree.reference('#jstree').select_node('child_node_1');
    });
});
*/

//Variables Region

const addRegion = document.getElementsByClassName('add_button')[0];
const addInput = document.getElementsByClassName('add-input')[0];
const addButtonRegion = document.getElementsByClassName('b-add');
const inputText = document.getElementsByClassName('add-text')[0];
const sectionRegion = document.getElementsByClassName('main__region')[0];
let regions = [];

//Variable Country and City

let listCountry = undefined;
let listCity = undefined;

class User {
    constructor(name, lastname, email, user, pass, status) {
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.user = user;
        this.pass = pass;
        this.status = status;
    }
}

const newUser = new User('antonio', 'delosrios', 'antoniodelosrios22@gmail.com');

// Adding Region

addRegion.addEventListener('click', () => {
    addInput.style.display = 'block';
})

addButtonRegion[0].addEventListener('click', () => {
    getRegion();
    if(inputText.value != "") {
        addInput.style.display = 'none';
        inputText.value = "";
    }
    
})

inputText.addEventListener('keyup', (e) => {
    if(e.which === 13) {
        getRegion();
        if(inputText.value != "") {
            addInput.style.display = 'none';
            inputText.value = "";
        }
    }
});

addButtonRegion[1].addEventListener('click', () => {
    addInput.style.display = 'none';
})

function getRegion () {
    const valueRegion = inputText.value;
    if (!searchRegion(valueRegion, regions) && valueRegion != "") {
        let region = {
            region: valueRegion
        }
        regions.push(region);
        addingRegionHtml(valueRegion);
        checkItem();
        editListener();
    }
}

function searchRegion (keyname, myArray) {
    let value = false;
    myArray.forEach((element, index) => {
        if (element.region.toUpperCase() === keyname.toUpperCase()) {
            console.log('Ya existe ' + element.region);
            value = true;
        }
    });
    return value;
};

function addingRegionHtml (value) {
    const section = `
    <div class="box-region">
        <div class="sec-region">
        <a class="a-region" href="#">${value}</a>
        </div>
    </div>
    
    <div class="box-country b-align">
        <h3>País</h3>
        <select class="b-country b-select" name="country">
        <option value="0">Selecciona </option>
        </select>
        <button class="add-country b-region b-margin"> <img class="box-img" src="../assets/cross_white.svg" alt="add"> Agregar </button>
        <div class="edit-item">
        <button class="b-region b-margin-2 b-edit"> <img class="box-img" src="../assets/pencil_blue.svg" alt="add"> Editar </button>
        <button class="b-region b-margin-2 b-delete"> <img class="box-img" src="../assets/trashcan.svg" alt="add"> Borrar </button>
        </div>
    </div>
    
    <div class="box-city b-align">
        <h3>Ciudad</h3>
        <select class="b-city b-select" name="city">
        <option value="0">Selecciona </option>
        </select>
        <button class="add-city b-region b-margin"> <img class="box-img" src="../assets/cross_white.svg" alt="add"> Agregar </button>
        <div class="edit-item">
        <button class="b-region b-margin-2 b-edit"> <img class="box-img" src="../assets/pencil_blue.svg" alt="add"> Editar </button>
        <button class="b-region b-margin-2 b-delete"> <img class="box-img" src="../assets/trashcan.svg" alt="add"> Borrar </button>
        </div>
    </div>
    `;
    
    sectionRegion.insertAdjacentHTML('beforeend',section);
};

// Adding Country and City 

function checkItem () {
    const countryContainer = document.querySelectorAll('.box-country');
    const cityContainer = document.querySelectorAll('.box-city');

    countryContainer.forEach(item => {
        item.querySelectorAll('.add-country').forEach(element => {
            element.addEventListener('click', event => {
                addingItem('Insertar país', item);
                
                addingEventlistener(item,element);

                
            })
        })
    })
    
    cityContainer.forEach(item => {
        item.querySelectorAll('.add-city').forEach(element => {
            element.addEventListener('click', event => {
                addingItem('Insertar ciudad', item);
                
                addingEventlistener(item,element);
            
                
            })
        })
    })
    
}

function editListener () {
    const countryContainer = document.querySelectorAll('.box-country');
    const cityContainer = document.querySelectorAll('.box-city');
    countryContainer.forEach(item => {
        item.querySelectorAll('.b-edit').forEach(element => {
            element.addEventListener('click', event => {
                console.log('holaaaaa');
                addingItem('Editar selección', item);
                //event.stopPropagation();
            })
            
        })

        item.querySelectorAll('.b-delete').forEach(element => {
            element.addEventListener('click', event => {
                console.log('holaaaaa');
                
                //event.stopPropagation();
            })
            
        })
    })
    
    cityContainer.forEach(item => {
        item.querySelectorAll('.b-edit').forEach(element => {
            element.addEventListener('click', event => {
                console.log('holaaaaa');
                
                //event.stopPropagation();
            })
            
        })
        
        item.querySelectorAll('.b-delete').forEach(element => {
            element.addEventListener('click', event => {
                console.log('holaaaaa');
                
                //event.stopPropagation();
            })
            
        })
    })
}

function addingEventlistener (item, element) {
    const value = item.getElementsByTagName('select')[0];
    element.disabled = true;
    const save = item.querySelectorAll('.b-add')[0];
    const cancel = item.querySelectorAll('.b-add')[1];
    const input = item.querySelectorAll('.add-text')[0];
    
    save.addEventListener('click', () => {
        const val = searchSelection (input.value, item);
        if(!val && input.value != "") {
            const newOption = createItem (input.value);
            value.appendChild(newOption);
            const addItem = item.getElementsByClassName('add-item')[0];
            addItem.remove();
            editingItem(item);
            element.disabled = false;
        }
        
    })
    
    input.addEventListener('keyup', (e) => {
        const val = searchSelection (input.value, item);
        if(e.which === 13 && !val && input.value != "") {
            const newOption = createItem (input.value);
            value.appendChild(newOption);
            const addItem = item.getElementsByClassName('add-item')[0];
            addItem.remove();
            editingItem(item);
            element.disabled = false;
            
        }
    });
    
    cancel.addEventListener('click', (event) => {
        const addItem = item.getElementsByClassName('add-item');
        if(addItem.length > 0) {
            addItem[0].remove();
        }
        editingItem(item);
        editListener();
        element.disabled = false;
        event.stopPropagation();
    })

    value.addEventListener('change', (e) => {
        console.log(value.value);
        if(value.value === input.value) {

        }
    })
}


function editingSelection (item, element) {
    const value = item.getElementsByTagName('select')[0];
    const save = item.querySelectorAll('.b-add')[0];
    const cancel = item.querySelectorAll('.b-add')[1];
    const input = item.querySelectorAll('.add-text')[0];
    
    save.addEventListener('click', () => {
        const val = searchSelection (input.value, item);
        if(!val && input.value != "") {
            const newOption = createItem (input.value);
            value.appendChild(newOption);
            const addItem = item.getElementsByClassName('add-item')[0];
            addItem.remove();
            editingItem(item);
        }
    })
    
    input.addEventListener('keyup', (e) => {
        const val = searchSelection (input.value, item);
        if(e.which === 13 && !val && input.value != "") {
            const newOption = createItem (input.value);
            value.appendChild(newOption);
            const addItem = item.getElementsByClassName('add-item')[0];
            addItem.remove();
            editingItem(item);
        }
    });
    
    cancel.addEventListener('click', (event) => {
        const addItem = item.getElementsByClassName('add-item')[0];
        addItem.remove();
        editingItem(item);
        editListener();
        event.stopPropagation();
    })

    value.addEventListener('change', (e) => {
        console.log(value.value);
        if(value.value === input.value) {

        }
    })
}

function addingItem (value, item) {
    let editItem = item.getElementsByClassName('edit-item');
    if(editItem.length > 0) {
        editItem[0].remove();
    }
    const section = `
    <div class="add-item">
    <input class="add-text" type="text" placeholder="${value}">
    <button class="b-add">Guardar</button>
    <button class="b-add">Cancelar</button>
    </div>
    `;
    const itemExist = item.getElementsByClassName('add-item');
    if(itemExist.length === 0) {
        
        item.insertAdjacentHTML('beforeend', section);
    }
};

function editingItem (item) {
    const section = `
    <div class="edit-item">
    <button class="b-region b-margin-2 b-edit"> <img class="box-img" src="../assets/pencil_blue.svg" alt="add"> Editar </button>
    <button class="b-region b-margin-2 b-delete"> <img class="box-img" src="../assets/trashcan.svg" alt="add"> Borrar </button>
    </div>
    `;
    const itemExist = item.getElementsByClassName('edit-item');
    if(itemExist.length === 0) {
        item.insertAdjacentHTML('beforeend', section);
    }
}

function addingCountry (value) {
    
}

function addingCity (value) {
    
}

function searchSelection (name, item) {
    const selection = item.getElementsByTagName('select')[0];
    const optionValue = selection.querySelectorAll('option');
    let itemExist = false;
    optionValue.forEach((e, index) => {
        if(e.innerText.toUpperCase() === name.toUpperCase()) {
            itemExist = true;
        }
    })
    
    return itemExist;
}

function validateItem (name, item) {
    const selection = item.getElementsByTagName('select')[0];
    
}

function createItem (name) {
    const option = document.createElement('option');
    option.innerText = name;
    option.value = name;
    return option;
}







