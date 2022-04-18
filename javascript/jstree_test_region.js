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

function deleteRegion () {
    addEventListener
}




//Capitalize first letter

function firsttoUpperCase(str) {
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return str2;
}



