//Variables Region
const addRegion = document.getElementsByClassName('add_button')[0];
const addInput = document.getElementsByClassName('add-input')[0];
const addButtonRegion = document.getElementsByClassName('b-add');
const inputText = document.getElementsByClassName('add-text')[0];
const sectionRegion = document.getElementsByClassName('main__region')[0];
let regions = [];
let arrayRegions = [
    {
        "sudamerica": {
            "argentina": {
                "bue": "Buenos Aires",
                "cor": "Córdoba"
            },
            "colombia": {
                "bog": "Bogotá",
                "med": "Medellín"
            }
        }
    }, 
    { 
        "norteamerica": {
            "mexico": {
                "cdx": "Ciudad de México",
                "tij": "Tijuana"
            }
        }
    }
];

let arrayTest = [];

// let arr = [1, 2, 3, 4, 5, 6];

// arr.map((item) => {
//   console.log(item);
// });

//2. CREAR UNA FUNCIÓN QUE PERMITA CONOCER TODOS LOS HOTELES QUE ESTEN EN UNA MISMA CIUDAD

// function getHotelsCity(data) {
//     let listCity = [];
//     data.map(hotel.nombre)
//   }

//Variable Country and City

let listCountry = undefined;
let listCity = [];

// Array of Objects for Database, Edit and Delete
let regionArray = [];

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

class City {
    constructor(region, country, city) {
        this.region = region;
        this.country = country;
        this.city = city;
    }
}

const newUser = new User('antonio', 'delosrios', 'antoniodelosrios22@gmail.com');
const newCity = new City('ASIA', 'China', 'Beijing');
const newCity2 = new City('EUROPA','Francia', 'Paris' );
const newCity3 = new City('ASIA');
listCity.push(newCity);
listCity.push(newCity2);
listCity.push(newCity3);
listCity[2].country = 'China';

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
    const valueRegion = inputText.value.toUpperCase();
    if (!searchRegion(valueRegion, regions) && valueRegion != "") {
        let region = {
            region: valueRegion,         
        }
        let valueReg = {};
        valueReg[valueRegion] = {};
        arrayTest.push(valueReg)
        console.log(arrayTest);
        regions.push(region);
        
        const newRegion = new City(`${valueRegion}`);
        regionArray.push(newRegion);
        console.log(regionArray);
        
        addingRegionHtml(valueRegion);
        addingIdRegion();
        
        checkItem();
        checkEdit();
        deleteSelection(); 
        
        //editListener();
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
    <div class = "main-box-region">
    <div class="box-region">
    <div class="sec-region">
    <a class="a-region" href="#">${value}</a>
    <button class="b-region b-margin-2 b-delete"> <img class="box-img" src="../assets/trashcan.svg" alt="add"> Borrar </button>
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
    <div class="add-item p-hide">
    <input class="add-text" type="text" placeholder="Insertar país">
    <button class="b-add">Guardar</button>
    <button class="b-add">Cancelar</button>
    </div>
    <div class="e-item c-hide">
    <input class="add-text" type="text" placeholder="Editar país">
    <button class="b-add">Actualizar</button>
    <button class="b-add">Cancelar</button>
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
    <div class="add-item c-hide">
    <input class="add-text" type="text" placeholder="Insertar ciudad">
    <button class="b-add">Guardar</button>
    <button class="b-add">Cancelar</button>
    </div>
    <div class="e-item c-hide">
    <input class="add-text" type="text" placeholder="Editar ciudad">
    <button class="b-add">Actualizar</button>
    <button class="b-add">Cancelar</button>
    </div>
    </div>
    </div>
    `;
    
    sectionRegion.insertAdjacentHTML('beforeend',section);
};

// Adding ID to Region - Create Node with Region and buttons

function addingIdRegion () {
    const totalRegion = document.getElementsByClassName('main-box-region');
    const countryContainer = document.querySelectorAll('.box-country');
    const cityContainer = document.querySelectorAll('.box-city');
    const deleteButton = document.getElementsByClassName('box-region');
    for(let i = 0; i < totalRegion.length; i++) {
        if (totalRegion[i].getAttribute('id') == null) {
            if(i==0 || totalRegion[i-1].getAttribute('id') != totalRegion.length-1 ) {
                totalRegion[totalRegion.length-1].setAttribute("id", totalRegion.length-1);
                deleteButton[totalRegion.length-1].querySelector('.b-delete').setAttribute("id", totalRegion.length-1);
                deleteButton[totalRegion.length-1].querySelector('.b-delete').addEventListener('click', (item) => {
                    
                    removeRegion(item);
                    
                })
                const value = totalRegion[totalRegion.length-1].querySelector('.box-country').getElementsByTagName('select')[0];
                value.addEventListener('change', (e) => {
                    const opt = value.value;
                    //console.log(value.value);
                    // console.log(value.selectedIndex);
                    // console.log(e.target.parentNode.parentNode);
                    if(opt != 0 || true) {
                        const nameReg = e.target.parentNode.parentNode.querySelector('.a-region').innerText;
                        // console.log(nameReg);
                        const ind = qRegion(nameReg);
                        const itm = e.target.parentNode.parentNode;
                        // console.log('hola index ' + ind);
                        removeSelect(itm);
                        populateSelection(itm, ind, nameReg, opt);
                    }
                })
                
                const sectionCountry = countryContainer[totalRegion.length-1];
                const addButton = countryContainer[totalRegion.length-1].querySelectorAll('.add-country')[0];
                addCountry(sectionCountry, addButton);
                editingCountry(sectionCountry);
                
                const sectionCity = cityContainer[totalRegion.length-1];
                const addButtonCity = cityContainer[totalRegion.length-1].querySelectorAll('.add-city')[0];
                addCity(sectionCity, addButtonCity);
                editingCity(sectionCity);
                
            } else if (totalRegion[i-1].getAttribute('id') == totalRegion.length-1) {
                totalRegion[totalRegion.length-1].setAttribute("id", totalRegion.length);
                deleteButton[totalRegion.length-1].querySelector('.b-delete').setAttribute("id", totalRegion.length);
                deleteButton[totalRegion.length-1].querySelector('.b-delete').addEventListener('click', (item) => {
                    
                    removeRegion(item);    
                })
                const value = totalRegion[totalRegion.length-1].querySelector('.box-country').getElementsByTagName('select')[0];
                value.addEventListener('change', (e) => {
                    const opt = value.value;
                    //console.log(value.value);
                    // console.log(value.selectedIndex);
                    // console.log(e.target.parentNode.parentNode);
                    if(opt != 0 || true) {
                        const nameReg = e.target.parentNode.parentNode.querySelector('.a-region').innerText;
                        // console.log(nameReg);
                        const ind = qRegion(nameReg);
                        const itm = e.target.parentNode.parentNode;
                        // console.log('hola index ' + ind);
                        removeSelect(itm);
                        populateSelection(itm, ind, nameReg, opt);
                    }
                })
                
                const sectionCountry = countryContainer[totalRegion.length-1];
                const addButton = countryContainer[totalRegion.length-1].querySelectorAll('.add-country')[0];
                addCountry(sectionCountry, addButton);
                editingCountry(sectionCountry);
                
                const sectionCity = cityContainer[totalRegion.length-1];
                const addButtonCity = cityContainer[totalRegion.length-1].querySelectorAll('.add-city')[0];
                addCity(sectionCity, addButtonCity);
                editingCity(sectionCity);
            }
            
        }
    }
    function removeRegion (element) {
        const val = document.getElementById(element.target.id).querySelector('.a-region').innerHTML;
        let result = confirm('¿Desea borrar región?');
        if(result) {
            for(let x=0; x< regions.length; x++) {
                if( val == regions[x].region) {
                    regions.splice(x,1);
                    arrayTest.splice(x,1);
                }
            }
            document.getElementById(element.target.id).remove(); 
        }
        
    }
}

function qRegion (region) {
    let indx = false;
    arrayTest.map((item, index) => {
        // console.log(index);
        // console.log(Object.keys(item));
        if(region == Object.keys(item)) {
            indx = index;
        }
    })
    return indx;
}

function changeValue () {
    
}

// Adding Country and City ------------------------------------------------------------

function checkItem () {
    const totalRegion = document.getElementsByClassName('main-box-region');
    const countryContainer = document.querySelectorAll('.box-country');
    const cityContainer = document.querySelectorAll('.box-city');
    
    countryContainer[totalRegion.length-1].querySelectorAll('.add-country')[0].addEventListener('click', (item) => {
        const sectionCountry = item.target.parentNode;
        const addButton = item.target.parentNode.querySelector('.add-country');
        
        if(addButton == null) {
            sectionCountry.parentNode.querySelector('.edit-item').style.display = 'none';
            sectionCountry.parentNode.querySelector('.p-hide').style.display = 'block';
            addButton.disabled = true;
            
        } else {
            sectionCountry.querySelector('.edit-item').style.display = 'none';
            sectionCountry.querySelector('.p-hide').style.display = 'block';
            addButton.disabled = true;
            
        }
    })
    
    cityContainer[totalRegion.length-1].querySelectorAll('.add-city')[0].addEventListener('click', (item) => {
        const sectionCity = item.target.parentNode;
        const addButton = item.target.parentNode.querySelector('.add-city');    
        
        if(addButton == null) {
            sectionCity.parentNode.querySelector('.edit-item').style.display = 'none';
            sectionCity.parentNode.querySelector('.c-hide').style.display = 'block';
            addButton.disabled = true;
        } else {
            sectionCity.querySelector('.edit-item').style.display = 'none';
            sectionCity.querySelector('.c-hide').style.display = 'block';
            addButton.disabled = true;
        }
        
    })    
}

// DELETE Selection Country or City ----------------
function deleteSelection () {
    const totalRegion = document.getElementsByClassName('main-box-region');
    const countryContainer = document.querySelectorAll('.box-country');
    const cityContainer = document.querySelectorAll('.box-city');
    
    countryContainer[totalRegion.length-1].querySelectorAll('.b-delete')[0].addEventListener('click', (item) => {
        // const sectionCountry = item.target.parentNode;
        // const addButton = item.target.parentNode.querySelector('.add-country');
        
        // addingItem('Insertar país', sectionCountry);
        // addCountry(sectionCountry, addButton);
        const countrySelection = countryContainer[0].getElementsByTagName('select')[0];
        console.log(countrySelection.selectedIndex);
        if(countrySelection.selectedIndex == 0) {
            alert('Seleccione País');
        } 
        // let result = confirm('¿Desea borrar País?');
        // if(result) {
        //     for(let x=0; x< regions.length; x++) {
        //         if( val == regions[x].region) {
        //             regions.splice(x,1);
        //             arrayTest.splice(x,1);
        //         }
        //     }
        //     document.getElementById(element.target.id).remove(); 
        // }
        console.log('Borrar Pais');
        
        
        // const countryValue = countrySelection.value;
        // const val = searchSelection (input.value, item);
        // if(e.which === 13 && !val && input.value != "") {
        //     if(countrySelection.selectedIndex == 0) {
        //         alert('Selecciona País');
        //     }
        
    })
    
    cityContainer[totalRegion.length-1].querySelectorAll('.b-delete')[0].addEventListener('click', (item) => {
        
        // const sectionCity = item.target.parentNode;
        // const addButton = item.target.parentNode.querySelector('.add-city');    
        
        // addingItem('Insertar ciudad', item.target.parentNode);
        // addCity(sectionCity, addButton);
        console.log('Borrar Ciudad');
    })   
    
}

//1. Add Country to list option to Region

function addCountry (item, element) {
    const totalRegion = document.getElementsByClassName('main-box-region');
    const countryContainer = document.querySelectorAll('.box-country');
    const value = item.getElementsByTagName('select')[0];
    const save = item.querySelectorAll('.b-add')[0];
    const cancel = item.querySelectorAll('.b-add')[1];
    const input = item.querySelectorAll('.add-text')[0];
    save.addEventListener('click', () => {
        const val = searchSelection (input.value, item);
        if(!val && input.value != "") {
            const newOption = createItem (input.value);
            value.appendChild(newOption);
            
            const newVal = input.value;
            const regionParent = item.parentNode;
            const valueRegion = regionParent.querySelector('.a-region').innerText;
            console.log(valueRegion);
            for(let i = 0; i < totalRegion.length; i++) {
                if(arrayTest[i].hasOwnProperty(valueRegion)) {
                    arrayTest[i][valueRegion][newVal] = {};
                }
            }
            
            addCountryToObject(valueRegion, input.value);
            
            const addItem = item.getElementsByClassName('add-item')[0];
            addItem.style.display = 'none';
            input.value = "";
            const editItem = item.getElementsByClassName('edit-item')[0];
            editItem.style.display = 'flex';
            // addItem.remove();
            // editingItem(item);
            element.disabled = false;
        }
        
    })
    
    input.addEventListener('keyup', (e) => {
        const val = searchSelection (input.value, item);
        if(e.which === 13 && !val && input.value != "") {
            const newOption = createItem (input.value);
            value.appendChild(newOption);
            
            const newVal = input.value;
            const regionParent = item.parentNode;
            const valueRegion = regionParent.querySelector('.a-region').innerText;
            for(let i = 0; i < totalRegion.length; i++) {
                if(arrayTest[i].hasOwnProperty(valueRegion)) {
                    arrayTest[i][valueRegion][newVal] = {};
                }
            }
            
            addCountryToObject(valueRegion, input.value);
            
            const addItem = item.getElementsByClassName('add-item')[0];
            addItem.style.display = 'none';
            input.value = "";
            const editItem = item.getElementsByClassName('edit-item')[0];
            editItem.style.display = 'flex';
            // addItem.remove();
            // editingItem(item);
            element.disabled = false;
            
        }
    });
    
    cancel.addEventListener('click', (event) => {
        const editItem = item.getElementsByClassName('edit-item')[0];
        const addItem = item.getElementsByClassName('add-item')[0];
        editItem.style.display = 'flex';
        addItem.style.display = 'none';
        input.value = "";
        //countryContainer.querySelector('.edit-item').style.display = 'block';
        // if(addItem.length > 0) {
        //     addItem[0].remove();
        // }
        // editingItem(item);
        //editListener();
        element.disabled = false;
        //event.stopPropagation();
    })
}

function addCity (item, element) {
    const value = item.getElementsByTagName('select')[0];
    const save = item.querySelectorAll('.b-add')[0];
    const cancel = item.querySelectorAll('.b-add')[1];
    const input = item.querySelectorAll('.add-text')[0];
    const totalRegion = document.getElementsByClassName('main-box-region');
    
    save.addEventListener('click', () => {
        const country = item.parentNode.querySelector('.box-country');
        const countrySelection = country.getElementsByTagName('select')[0];
        const countryValue = countrySelection.value;
        const val = searchSelection (input.value, item);
        if(countrySelection.selectedIndex == 0) {
            alert('Selecciona País');
        }
        
        if(!val && input.value != "" && countrySelection.selectedIndex != 0) {
            const newOption = createItem (input.value);
            value.appendChild(newOption);
            const addItem = item.getElementsByClassName('add-item')[0];
            
            const newVal = input.value;
            const str = newVal.substring(0,3);
            const regionParent = item.parentNode;
            const valueRegion = regionParent.querySelector('.a-region').innerText;
            for(let i = 0; i < totalRegion.length; i++) {
                if(arrayTest[i].hasOwnProperty(valueRegion)) {
                    const Obj = arrayTest[i][valueRegion][countryValue]
                    Obj[str] = newVal;
                }
            }
            
            //Go through RegionArray
            // for(let i = 0; i < regionArray.length; i++) {
            //     if(regionArray[i].region == valueRegion && regionArray[i].country == countryValue && regionArray[i].city == undefined) {
            //         regionArray[i].city = input.value;
            //         break;
            //     } else {
            //         const newRegion = new City(`${valueRegion}`,`${countryValue}`, `${input.value}`);
            //         regionArray.push(newRegion);
            //         break;
            //     }
            // }
            
            addCityToObject(valueRegion, countryValue, input.value);
            
            addItem.style.display = 'none';
            input.value = "";
            const editItem = item.getElementsByClassName('edit-item')[0];
            editItem.style.display = 'flex';
            
            
            element.disabled = false;
        }
        
    })
    
    input.addEventListener('keyup', (e) => {
        const country = item.parentNode.querySelector('.box-country');
        const countrySelection = country.getElementsByTagName('select')[0];
        const countryValue = countrySelection.value;
        const val = searchSelection (input.value, item);
        if(e.which === 13 && !val && input.value != "") {
            if(countrySelection.selectedIndex == 0) {
                alert('Selecciona País');
            }
            
            if(countrySelection.selectedIndex != 0) {
                const newOption = createItem (input.value);
                value.appendChild(newOption);
                const addItem = item.getElementsByClassName('add-item')[0];
                
                const newVal = input.value;
                const str = newVal.substring(0,3);
                const regionParent = item.parentNode;
                const valueRegion = regionParent.querySelector('.a-region').innerText;
                for(let i = 0; i < totalRegion.length; i++) {
                    if(arrayTest[i].hasOwnProperty(valueRegion)) {
                        const Obj = arrayTest[i][valueRegion][countryValue];
                        Obj[str] = newVal;
                    }
                }
                addCityToObject(valueRegion, countryValue, input.value);
                
                addItem.style.display = 'none';
                input.value = "";
                const editItem = item.getElementsByClassName('edit-item')[0];
                editItem.style.display = 'flex';
                
                element.disabled = false;
            }
        }
    });
    
    cancel.addEventListener('click', (event) => {
        const editItem = item.getElementsByClassName('edit-item')[0];
        const addItem = item.getElementsByClassName('add-item')[0];
        editItem.style.display = 'flex';
        addItem.style.display = 'none';
        input.value = "";
        element.disabled = false;
        
    })
}

// Editing Buttons ---------------------------------------

function checkEdit() {
    const totalRegion = document.getElementsByClassName('main-box-region');
    const countryContainer = document.querySelectorAll('.box-country');
    const cityContainer = document.querySelectorAll('.box-city');
    
    countryContainer[totalRegion.length-1].querySelectorAll('.b-edit')[0].addEventListener('click', (item) => {
        const sectionCountry = item.target.parentNode;
        sectionCountry.parentNode.querySelector('.edit-item').style.display = 'none';
        sectionCountry.parentNode.querySelector('.e-item').style.display = 'block';
        
    })
    
    cityContainer[totalRegion.length-1].querySelectorAll('.b-edit')[0].addEventListener('click', (item) => {
        const sectionCity = item.target.parentNode;
        sectionCity.parentNode.querySelector('.edit-item').style.display = 'none';
        sectionCity.parentNode.querySelector('.e-item').style.display = 'block';
        
    })    
}


function editingCountry (item, element) {
    const value = item.getElementsByTagName('select')[0];
    const save = item.getElementsByClassName('e-item')[0].querySelectorAll('.b-add')[0];
    const cancel = item.getElementsByClassName('e-item')[0].querySelectorAll('.b-add')[1];
    const input = item.getElementsByClassName('e-item')[0].querySelectorAll('.add-text')[0];
    const editItem = item.getElementsByClassName('edit-item')[0];
    const eItem = item.getElementsByClassName('e-item')[0];

    save.addEventListener('click', (e) => {
        const element = e.target.parentNode.parentNode;
        const countrySelection = element.getElementsByTagName('select')[0];
        console.log(element);
        console.log(countrySelection);

        const val = searchSelection (input.value, item);
        if(countrySelection.selectedIndex == 0) {
            alert('Selecciona País');
        } else if(!val && input.value != "") {
            const newOption = createItem (input.value);
            value.appendChild(newOption);
            const addItem = item.getElementsByClassName('add-item')[0];

            editItem.style.display = 'flex';
            eItem.style.display = 'none';
            input.value = "";
        }

        
    })
    
    input.addEventListener('keyup', (e) => {
        const val = searchSelection (input.value, item);
        if(e.which === 13 && !val && input.value != "") {
            const newOption = createItem (input.value);
            value.appendChild(newOption);
            const addItem = item.getElementsByClassName('add-item')[0];

        }

        editItem.style.display = 'flex';
        eItem.style.display = 'none';
        input.value = "";
    });
    
    cancel.addEventListener('click', (event) => {
        
        editItem.style.display = 'flex';
        eItem.style.display = 'none';
        input.value = "";

    })
    
    value.addEventListener('change', (e) => {
        console.log(value.value);
        if(value.value === input.value) {
            
        }
    })
}


function editingCity (item, element) {
    const value = item.getElementsByTagName('select')[0];
    const save = item.getElementsByClassName('e-item')[0].querySelectorAll('.b-add')[0];
    const cancel = item.getElementsByClassName('e-item')[0].querySelectorAll('.b-add')[1];
    const input = item.getElementsByClassName('e-item')[0].querySelectorAll('.add-text')[0];
    
    save.addEventListener('click', () => {
        const val = searchSelection (input.value, item);
        if(!val && input.value != "") {
            const newOption = createItem (input.value);
            value.appendChild(newOption);
            const addItem = item.getElementsByClassName('add-item')[0];

            // addItem.remove();
            // editingItem(item);
        }
    })
    
    input.addEventListener('keyup', (e) => {
        const val = searchSelection (input.value, item);
        if(e.which === 13 && !val && input.value != "") {
            const newOption = createItem (input.value);
            value.appendChild(newOption);
            const addItem = item.getElementsByClassName('add-item')[0];

            // addItem.remove();
            // editingItem(item);
        }
    });
    
    cancel.addEventListener('click', (event) => {
        const editItem = item.getElementsByClassName('edit-item')[0];
        const eItem = item.getElementsByClassName('e-item')[0];
        editItem.style.display = 'flex';
        eItem.style.display = 'none';
        input.value = "";

    })
    
    value.addEventListener('change', (e) => {
        console.log(value.value);
        if(value.value === input.value) {
            
        }
    })
}

// function addingItem (value, item) {
//     let editItem = item.getElementsByClassName('edit-item');
//     if(editItem.length > 0) {
//         editItem[0].remove();
//     }
//     const section = `
//     <div class="add-item">
//     <input class="add-text" type="text" placeholder="${value}">
//     <button class="b-add">Guardar</button>
//     <button class="b-add">Cancelar</button>
//     </div>
//     `;
//     const itemExist = item.getElementsByClassName('add-item');
//     if(itemExist.length === 0) {

//         item.insertAdjacentHTML('beforeend', section);
//     }
// };

// function editingItem (item) {
//     const section = `
//     <div class="edit-item">
//     <button class="b-region b-margin-2 b-edit"> <img class="box-img" src="../assets/pencil_blue.svg" alt="add"> Editar </button>
//     <button class="b-region b-margin-2 b-delete"> <img class="box-img" src="../assets/trashcan.svg" alt="add"> Borrar </button>
//     </div>
//     `;
//     const itemExist = item.getElementsByClassName('edit-item');
//     if(itemExist.length === 0) {
//         item.insertAdjacentHTML('beforeend', section);
//     }
// }

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

// ---------------------------------------------------------------
function createItem (name) {
    const option = document.createElement('option');
    option.innerText = name;
    option.value = name;
    return option;
}

function removeSelect (item) {
    //const totalRegion = document.getElementsByClassName('main-box-region');
    const selection = item.querySelector('.box-city').getElementsByTagName('select')[0];
    selection.querySelectorAll('option').forEach((e) => {
        //console.log(e.value);
        if(e.value != 0) {
            e.remove();
        }
    })
}

function populateSelection (item, index, region, country) {
    //const totalRegion = document.getElementsByClassName('main-box-region');
    const selection = item.querySelector('.box-city').getElementsByTagName('select')[0];
    if(country != 0) {
        const arrayCity = Object.values(arrayTest[index][region][country]);
        //console.log(arrayCity);
        for(let i = 0; i < arrayCity.length; i ++) {
            const newOption = createItem (arrayCity[i]);
            selection.appendChild(newOption);
        }
    }
}

// Function for looping through RegionArray

function dataCity (data) {
    
}

function addCountryToObject (val, input) {
    //Go through RegionArray
    for(let i = 0; i < regionArray.length; i++) {
        if(regionArray[i].region == val && regionArray[i].country == undefined) {
            regionArray[i].country = input;
            break;
        } else if (i == regionArray.length-1) {
            const newRegion = new City(`${val}`,`${input}`);
            regionArray.push(newRegion);
            break;
        }
    }
}

function addCityToObject (val, country, input) {
    //Go through RegionArray
    for(let i = 0; i < regionArray.length; i++) {
        if(regionArray[i].region == val && regionArray[i].country == country && regionArray[i].city == undefined) {
            regionArray[i].city = input;
            break;
        } else if (i == regionArray.length-1) {
            const newRegion = new City(`${val}`,`${country}`, `${input}`);
            regionArray.push(newRegion);
            break;
        }
    }
}