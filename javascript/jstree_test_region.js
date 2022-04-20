// Variables
const addRegion = document.getElementsByClassName('add_button')[0];
const addInput = document.getElementsByClassName('add-input')[0];
const cancelButton = document.getElementsByClassName('b-cancel')[0];
const addSection = document.getElementsByClassName('b-add');
const inputText = document.getElementsByClassName('add-text')[0];
const sectionRegion = document.getElementsByClassName('main__region')[0];

let regionsArray = [];

//
// let regions = [
//     {
//       region: "Europa",
//       paises: [ 
//         {
//           pais: "Francia",
//           ciudades: [
//             "Paris",
//             "Lion"
//           ]
//         }
//       ]
//     }
// ];

//Adding Region

addRegion.addEventListener('click', () => {
    addInput.style.display = 'block';
})

// Cancel button when adding Region

cancelButton.addEventListener('click', () => {
    addInput.style.display ='none';
    inputText.value = "";
})


//Adding Section for Region

addSection[0].addEventListener('click', () => {
    if(inputText.value != "") {
        let result = confirm('¿Desea agregar región?');
        if(result) {
            const value = inputText.value;
            const valueRegion = firsttoUpperCase(value);
            
            if(checkRegion(regionsArray, valueRegion)) {
                addingRegionHtml(valueRegion);
                
                const mainSection = regionSelection();
                console.log(mainSection);
                deleteRegion(mainSection);
                addCountry(mainSection);
                cancelCountry(mainSection);

                addCity(mainSection);
                cancelCity(mainSection);

                let region = `${valueRegion}`;
                let paises = [];
                let valueReg = {region, paises};
                regionsArray.push(valueReg);
                console.log(regionsArray);
                
                addInput.style.display = 'none';
                inputText.value = "";
                
            } else {
                alert('Esta región ya existe, ingrese nuevamente');
            }
        }
    }
})



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
    <button class="b-add b-cancel-add">Cancelar</button>
    </div>
    <div class="e-item c-hide">
    <input class="add-text" type="text" placeholder="Editar país">
    <button class="b-add">Actualizar</button>
    <button class="b-add b-cancel-edit">Cancelar</button>
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
    <button class="b-add b-cancel-add">Cancelar</button>
    </div>
    <div class="e-item c-hide">
    <input class="add-text" type="text" placeholder="Editar ciudad">
    <button class="b-add">Actualizar</button>
    <button class="b-add b-cancel-edit">Cancelar</button>
    </div>
    </div>
    </div>
    `;
    
    sectionRegion.insertAdjacentHTML('beforeend',section);
};

function checkRegion (data, val) {
    let listadoRegion = [];
    data.forEach((region) => {
        if(region.length != 0) {
            listadoRegion.push(region.region);
        }
    });
    
    if(listadoRegion.indexOf(val) != -1) {
        return false;
    } else {
        return true;
    }
}


//Capitalize first letter

function firsttoUpperCase(str) {
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return str2;
}

//***************************

function regionSelection () {
    const parentRegion = document.getElementsByClassName('main-box-region');
    const pLength = parentRegion.length;
    return parentRegion[pLength-1];
    console.log(parentRegion[pLength-1]);
}

// Función Borrar Region

function deleteRegion(section) {
    const deleteButton = section.getElementsByClassName('b-delete')[0];
    deleteButton.addEventListener('click', () => {
        let result = confirm('¿Desea borrar región?');
        if(result) {
            section.remove();
            const valRegion = section.querySelector('.a-region').innerText;
            console.log('region '+ valRegion);
            
            for(let i=0; i<regionsArray.length; i++) {
                if(valRegion === regionsArray[i].region) {
                    regionsArray.splice(i, 1);
                }
            }
        }
    })
}

// Función Agregar País

function addCountry(section) {
    const addButtonCountry = section.getElementsByClassName('add-country')[0];
    const addItem = section.getElementsByClassName('add-item')[0];
    const editItem = section.getElementsByClassName('edit-item')[0];
    addButtonCountry.addEventListener('click', () => {
        console.log('Add Pais');
        editItem.style.display = 'none';
        addItem.style.display = 'flex';
        addButtonCountry.disabled = true;
    });
}

// Función Cancelar agregar país

function cancelCountry(section) {
    const cancelC = section.getElementsByClassName('b-cancel-add')[0];
    const addButtonCountry = section.getElementsByClassName('add-country')[0];
    const addItem = section.getElementsByClassName('add-item')[0];
    const editItem = section.getElementsByClassName('edit-item')[0];
    const input = section.querySelectorAll('.add-text')[0];
    cancelC.addEventListener('click', () => {
        addItem.style.display = 'none';
        editItem.style.display = 'flex';
        addButtonCountry.disabled = false;
        input.value = "";
    })
}

// Función Agregar Ciudad

function addCity(section) {
    const addButtonCity = section.getElementsByClassName('add-city')[0];
    const addItem = section.getElementsByClassName('add-item')[1];
    const editItem = section.getElementsByClassName('edit-item')[1];
    addButtonCity.addEventListener('click', () => {
        console.log('Add City');
        editItem.style.display = 'none';
        addItem.style.display = 'flex';
        addButtonCity.disabled = true;
    })
}

//Función Cancelar agregar ciudad

function cancelCity(section) {
    const cancelC = section.getElementsByClassName('b-cancel-add')[1];
    const addButtonCity = section.getElementsByClassName('add-city')[0];
    const addItem = section.getElementsByClassName('add-item')[1];
    const editItem = section.getElementsByClassName('edit-item')[1];
    const input = section.querySelectorAll('.add-text')[1];
    cancelC.addEventListener('click', () => {
        addItem.style.display = 'none';
        editItem.style.display = 'flex';
        addButtonCity.disabled = false;
        input.value = "";
    })
}





