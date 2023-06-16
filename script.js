// Eliminar ejemplo de sco 
// {
//     "id": 2,
//     "title": "Titulo SCO 2",
//     "instruction": "Intrucción del SCO 2",
//     "historiaprevia": "Erase una vez un patito feliz que conocio un ganzo que no podia dejarlo libre, y el patito sufria y sufria",
//     "metadata_id": 2,
//     "cards": [
//         {
//             "id": 9,
//             "title": "Titulo de la card 4",
//             "track": "Pista de la card 4",
//             "description": "Descripción de la card 4",
//             "posorden": 4,
//             "metadata_id": 12,
//             "sco_id": 2,
//             "assets_id": 1
//         }
   
//     ]
// }
let sco = {
    
    "title": "",
    "instruction": "Intrucción del SCO 2",
    "historiaprevia": "",
    
}
let listSaveCards = [
      
]
let card = {
};
let contador = 0;
let editorText = '';
let idSco = '';
let listaCards = [];
let listaImages = [];
let imgMostrar =[];
let myModal = new bootstrap.Modal(document.getElementById('myModal'))
// const btnAddHistory = document.getElementById('btn-add-history')
let btnSaveAll = document.getElementById('btn-save')
// let btnAdd = document.getElementById("btn-add-card");
let ctnMain = document.getElementById("ctn-principal");
 let crearCard = document.getElementById('btn-crear-card');
let btnNewSco = document.getElementById('btn-new-sco')



/** Codigo para el drag-drop asset ---------------------------------------------------------------*/

var containerAssets = document.getElementById('cnt-bassets');
const dropInputFile = document.getElementById('drop-input-file');
const dropButton = document.querySelector('.drop-button');

dropButton.addEventListener("click",(e)=>{
    dropInputFile.click()
})
dropInputFile.addEventListener("change", async (e)=>{
    // const file = e.files[0];
    const file = dropInputFile.files[0];
    const response = await uploadFile(file);
    const idAsset = response["id"];
    await createAssetItem(idAsset);
    // const assetCard = document.createElement("div");
    // const spinner = document.createElement("div");
    // spinner.setAttribute("id","spinner")
    // assetCard.setAttribute("class","grid-item-barraassets")
    // containerAssets.appendChild(assetCard)
    // assetCard.appendChild(spinner)
    // obtenerImagen(assetCard);
})
async function uploadFile(file){
    const formData = new FormData();
    formData.append("file",file);
    const url = new URL(`http://localhost:3000/api/upload`);
    //url.search = new URLSearchParams(params).toString();

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
            
        }).then();
        
        if (response.ok) {
            const res = await response.json();
            return res;
            
        
        } else {
            console.log("Error al obtener el asset");
        }
    } catch (error) {
        console.log("Error al subir el asset al servidor", error)
    }
}
async function obtenerImagen(padre) {
    
    const params = { id: 1 };
    const url = new URL(`http://localhost:3000/api/file/1`);
    //url.search = new URLSearchParams(params).toString();

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "/*" // Indica que se aceptan archivos multimedia
              },
            
        }).then();
        
        if (response.ok) {
            // const json = await response.json();
            // console.log(json)
            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            console.log(imageUrl)

            const spinner = padre.querySelector("#spinner");
            spinner.style.display = "none"; // Oculta el spinner
            
           
            // // Mostrar la imagen en un elemento <img>
            const imgElement = document.createElement("img");
            imgElement.src = imageUrl;
            padre.appendChild(imgElement);
        
        } else {
            console.log("Error al obtener la imagen");
        }
    } catch (error) {
        console.log("Error al pedir imagen al servidor", error)
    }
}

async function recuperarAssets(){
    const params = { id: 1 };
    const url = new URL(`http://localhost:3000/api/get/assets_id`);
    //url.search = new URLSearchParams(params).toString();

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "/*" // Indica que se aceptan archivos multimedia
              },
            
        }).then();
        
        if (response.ok) {
            const json = await response.json();
            json.map(async (asset)=>{
                let idAsset = asset['id'];
                await createAssetItem(idAsset)
            })
           
        } else {
            console.log("Error al obtener el asset");
        }
    } catch (error) {
        console.log("Error al pedir assets al servidor", error)
    }

    // getListaCards(); 
   
}

async function createAssetItem(id){
    const assetCard = document.createElement("div");
    const spinner = document.createElement("div");
    spinner.setAttribute("id","spinner")
    assetCard.setAttribute("class","grid-item-barraassets")
    containerAssets.appendChild(assetCard)
    assetCard.appendChild(spinner)
    
    const url = new URL(`http://localhost:3000/api/file/${id}`);
    //url.search = new URLSearchParams(params).toString();

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "/*" // Indica que se aceptan archivos multimedia
              },
            
        }).then();
        
        if (response.ok) {
            // const json = await response.json();
            // console.log(json)
            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
           
            console.log(imageUrl)
            // codigo KM
             let elemento = {
                "id" : id,
                "url": imageUrl
             }
             imgMostrar.push(elemento)
             console.log(imgMostrar)
            // =---------

            const spinner = assetCard.querySelector("#spinner");
            spinner.style.display = "none"; // Oculta el spinner
            
           
            // // Mostrar la imagen en un elemento <img>
            const imgElement = document.createElement("img");
            imgElement.src = imageUrl;
            assetCard.appendChild(imgElement);
        
        } else {
            console.log("Error al obtener la imagen");
        }
    } catch (error) {
        console.log("Error al pedir imagen al servidor", error)
    }
    
}

recuperarAssets();














// Accion crear nuevo SCO
btnNewSco.addEventListener('click', function(){
    // remove intro
    let intro = document.getElementById("intro");
    let main = document.getElementById('ctn-principal')
    main.removeChild(intro);
    // introducir history
    const contenedor = document.getElementById("form-hi");
    contenedor.style.display='contents';
    // introducir tarjetas vacias
    const title = document.getElementById('title-cards');
    title.style.display="contents";
    const ctnCards = document.getElementById('ctn-cards-id')
    ctnCards.style.display='contents';
    // mostrar boton guardar
    const btnSave = document.getElementById('ctn-save')
    btnSave.style.display='contents';

    listarCards();

})

btnSaveAll.addEventListener('click', function(){
   console.log("Guardar Todo");
//    get titulo
   let scoTitulo =document.getElementById("titulo-sco");
//    get history
   sco.title=scoTitulo.value;
   sco.historiaprevia= editorText;
// sco
    console.log(sco);
   

});





// Accion de presionar el boton add card
crearCard.addEventListener('click', function(){
  var titulo = document.getElementById('f-titulo').value;
  var pista = document.getElementById('f-pista').value;
  var descripcion = document.getElementById('f-descripcion').value;
//   var imagen = document.getElementById('f-imagen').value;
contador++;
  card ={
    "sco_id": 1,
     "asset_name": "777-1686516925744-prueba.jpeg",
     "title": titulo,
     "track": pista,
     "posOrden": contador,
     "description":descripcion
  }
  console.log(card)
  listSaveCards.push(card);
  const contendorPrincipal = document.getElementById('ctn-cards-id2');
  const ctndiv = document.createElement('div');
  ctndiv.setAttribute('class', "card");
  
  ctndiv.setAttribute('id', "card"+contador);
//   let url = imgMostrar[0].url;
  let contenido = `  <div class="card-img">
    <img src=""></img>
  </div>
  <div class="card-content">
     <h3>${card.title}</h3>
     <p>${card.track}</p>
     
     <div class="card-options">
        <button id="btn-eliminar"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><style>svg{fill:#37345E}</style><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg></button>
        <button id="btn-editar"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg></button>
        
     </div>
  </div>`;

   ctndiv.innerHTML= contenido;
   contendorPrincipal.appendChild(ctndiv);
// Resetear formulario 
    var formulario1 = document.getElementById("formulario1")
    formulario1.reset();
  
// Agregar accion a los botones de editar y eliminar
           addActionEdit();
           addActionDelete();

});
// Funcion listar cartas en el div-principal
const listarCards =  () => {
    const contendorPrincipal = document.getElementById('ctn-cards-id2');
    while(listSaveCards.length != 0){
        listSaveCards.forEach(elemento => {
            const ctndiv = document.createElement('div');
            ctndiv.setAttribute('class', "card");
            ctndiv.setAttribute('id', elemento.id);
            let url = imgMostrar[0].url;
            let contenido = `  <div class="card-img">
              <img src="${url}"></img>
            </div>
            <div class="card-content">
               <h3>${elemento.title}</h3>
               <p>${elemento.track}</p>
               
               <div class="card-options">
                  <button id="btn-eliminar"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><style>svg{fill:#37345E}</style><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg></button>
                  <button id="btn-editar"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg></button>
                  
               </div>
            </div>`;
        
             ctndiv.innerHTML= contenido;
             contendorPrincipal.appendChild(ctndiv);
            });

        //     addActionEdit();
        //    addActionDelete();
    }
   
    const ctnAdd = document.createElement('div');
    // ctnAdd.setAttribute('class', "card");
    ctnAdd.setAttribute('id', "add");
    let imagen = `<div class="card-add"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg> ADD CARD</div>`
    ctnAdd.innerHTML=imagen
    var contendorPrincipal2=  document.getElementById("ctn-cards-id")
    contendorPrincipal2.appendChild(ctnAdd);

    

    let add = document.getElementById('add');
    add.addEventListener('click', function(){
       myModal.show();
    });

   console.log("ingreso aqui")
   
}


// Funcion crear historia
// btnAddHistory.addEventListener('click', function(){
//     // const contenedorForm = document.createElement("div");
//     // contenedorForm.setAttribute("class","form-div-history");
    
//     const contenedor = document.getElementById("form-hi");
//     contenedor.style.display='contents';
    
// });

// Accion a botones editar
const addActionEdit = () => {
    let lista = document.querySelectorAll('#btn-editar');
    lista.forEach(elemento => {
        elemento.addEventListener('click', function(){
            console.log(elemento.parentNode.parentNode.parentNode.getAttribute('id'))
            myModal.show();
        })
    })
    console.log(lista)
}
// Accion a botones eliminar
const addActionDelete = () => {
    let lista = document.querySelectorAll('#btn-eliminar');
    lista.forEach(elemento => {
        elemento.addEventListener('click', function(){
            console.log('eliminar')
            console.log(elemento.parentNode.parentNode.parentNode.getAttribute('id'))
            let id = elemento.parentNode.parentNode.parentNode.getAttribute('id');
            let contenedor = document.getElementById('ctn-cards-id2');
            let elementoRemove = document.getElementById(id);
            contenedor.removeChild(elementoRemove)
            let idposition = id.split('')[id.length-1]
            console.log(idposition);
            
            let position = 0;
            listSaveCards.forEach( elemento => {
                console.log(elemento);
                if(elemento.posOrden == idposition){
                    listSaveCards.splice(position,1)
                }
                position++;
            })

            console.log(listSaveCards)
            // metodo eliminar de la base de datos
            // deleteCard(id)

            
        })
    })
    console.log(lista)
}
// --------------------------------------------
// Peticiones a la base de datos 
// --------------------------------------------

// Get lista de cards registrados en el SCO actual
const getListaCards = async ( ) => {
    let response = await fetch("http://localhost:3000/api/get/sco/"+idSco)
    const jsonData = await response.json();
    console.log(jsonData.cards);
    listaCards = jsonData.cards;
    let imagenes = await fetch("http://localhost:3000/api/filesNames")
    const listImages = await imagenes.json();
    console.log(listImages)
    listaImages = listImages;
  


    let ctncards = document.getElementById("ctn-cards-id");
    let padre = ctncards.parentNode.getAttribute('id');
    let ctnpadre = document.getElementById(padre);
    ctnpadre.removeChild(ctncards);
    let nuevoctn = document.createElement('div')
    nuevoctn.setAttribute("class", 'ctn-cards')
    nuevoctn.setAttribute('id', "ctn-cards-id")
    ctnpadre.appendChild(nuevoctn);
    
    // listarCards();
}




// Registrar card en la base de datos
const registerNewCard = async () => {
    let registrarCard = await fetch('http://localhost:3000/api/register/card', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(card)

    })
    .then(res => res.json())
    .then(res=> {
          console.log(res);
    });
    

    // getListaCards();
}
// Eliminar card de la base de datos
const deleteCard = async (entrada) => {
    let id = { 'card_id': entrada }
    let deleteCard = await fetch('http://localhost:3000/api/delete/card', {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
      },
     body: JSON.stringify(id)

    })
    .then(res => res.json())
    .then(res=> {
          console.log(res);
    });
    

    //  getListaCards();
}



var quill = new Quill('#editor', {
    theme: 'snow'
  });
  quill.on('text-change', update);
//   var container = document.querySelector('#id-description');
  update();
  
  function update(delta) {
    var contents = quill.getContents();
    // editorText = quill.getText();
    editorText = quill.root.innerHTML;
    
    var html = "contents = " + JSON.stringify(contents, null, 2);
    if (delta) {
      
      html = "change = " + JSON.stringify(delta, null, 2) + "\n\n" + html;
    }
    // container.innerHTML = html;
    // hljs.highlightBlock(container);
  }
  

  //codigo para recuperar los assets

// async function getAssets(){
//     const url = new URL(`http://localhost:3000/api/get/assets_id`);
//     //url.search = new URLSearchParams(params).toString();

//     try {
//         const response = await fetch(url, {
//             method: "GET",
//             headers: {
//                 Accept: "/*" // Indica que se aceptan archivos multimedia
//               },
            
//         }).then();
        
//         if (response.ok) {
//             const json = await response.json();
//             json.map(async (asset)=>{
//                 let idAsset = asset['id'];
//                 let path = asset['path'];
//                 const partes =  await path.split('-'); // Dividir la cadena en partes usando el carácter "-"
//                 const nombreArchivo = partes.pop();
//                 await createAssetItemModal(idAsset,nombreArchivo)
//             })
            
        
//         } else {
//             console.log("Error al obtener el asset");
//         }
//     } catch (error) {
//         console.log("Error al pedir assets al servidor", error)
//     }
// }

// async function createAssetItemModal(id,title){
//     const container = document.getElementById('container-asset-modal');
//     const item = document.createElement("div");
//     item.setAttribute("class","col mb-5");
//     item.setAttribute("style","height: 100px;");
//     const check = `
//         <div class="form-check">
//             <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault-${id}">
//             <label class="form-check-label text-truncate d-inline-block w-100" for="flexRadioDefault-${id}">
//             ${title}
//             </label>
//         </div>
//     `;

//     item.innerHTML = check;
//     const contImg = document.createElement("div");
//     contImg.setAttribute("class","border border-dark w-100 h-100 item-modal-assets");
//     item.appendChild(contImg);
   
//     const spinner = document.createElement("div");
//     spinner.setAttribute("id","spinner");
    
//     contImg.appendChild(spinner);

//     let contenido = `
//         <div class="col mb-5" style="height: 100px;">
//             <div class="form-check">
//                 <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
//                 <label class="form-check-label text-truncate d-inline-block w-100" for="flexRadioDefault2">
//                 Default checked radio
//                 </label>
//             </div>
//             <div class="border border-dark w-100 h-100">
//                 <img src="" />
//             </div>
//         </div>
//     `;
//     container.appendChild(item);

    
    
    
    

//     const url = new URL(`http://localhost:3000/api/file/${id}`);
//     //url.search = new URLSearchParams(params).toString();

//     try {
//         const response = await fetch(url, {
//             method: "GET",
//             headers: {
//                 Accept: "/*" // Indica que se aceptan archivos multimedia
//               },
            
//         }).then();
        
//         if (response.ok) {
//             // const json = await response.json();
//             // console.log(json)
//             const imageBlob = await response.blob();
//             const imageUrl = URL.createObjectURL(imageBlob);
//             console.log(imageUrl)

//             //const spinner = item.querySelector("#spinner");
//             spinner.style.display = "none"; // Oculta el spinner
            
           
//             // // Mostrar la imagen en un elemento <img>
//             const imgElement = document.createElement("img");
//             imgElement.src = imageUrl;
//             contImg.appendChild(imgElement);

        
//         } else {
//             console.log("Error al obtener la imagen");
//         }
//     } catch (error) {
//         console.log("Error al pedir imagen al servidor", error)
//     }
// }
// getAssets();