// alert("hola")

let card = {
};
let idSco = 1;
let listaCards = [];
const btnAddHistory = document.getElementById('btn-add-history')
let btnAdd = document.getElementById("btn-add-card");
let ctnMain = document.getElementById("ctn-principal");
let crearCard = document.getElementById('btn-crear-card');
btnAdd.addEventListener('click', function(){
    const contenedorCard = document.createElement("div");
    contenedorCard.setAttribute("class","card")
    ctnMain.appendChild(contenedorCard)
});
// Accion de presionar el boton add card
crearCard.addEventListener('click', function(){
  var titulo = document.getElementById('f-titulo').value;
  var pista = document.getElementById('f-pista').value;
  var descripcion = document.getElementById('f-descripcion').value;
//   var imagen = document.getElementById('f-imagen').value;
  card ={
    "sco_id": 1,
     "asset_name": "777-1686516925744-prueba.jpeg",
     "title": titulo,
     "track": pista,
     "posOrden": 9,
     "description":descripcion
  }
  registerNewCard();
  
});
// Funcion listar cartas en el div-principal
const listarCards = () => {
    const contendorPrincipal = document.getElementById('ctn-principal');
    
    listaCards.forEach(elemento => {
        const ctndiv = document.createElement('div');
    ctndiv.setAttribute('class', "formulario-card");
    ctndiv.setAttribute('id', elemento.id);
    let contenido = ` <form action="">
         <div class="inputform">
              <label for="">Orden de la Tarjeta</label>
          <input value="${elemento.posorden}" type="text">
        </div>
         <div class="inputform">
             <label for="">Titulo</label>
             <input value="${elemento.title}" type="text">
         </div>
         <div class="inputform">
             <label for="">Pista</label>
             <input value="${elemento.track}" type="text">
         </div>
         <div class="inputform">
             <label for="descripcio">Descripcion</label>
             <textarea value="" name="" id="" >${elemento.description}</textarea>
         </div>
         <div class="inputform">
           
             <div class="imagen-card">
               
             <label for="lang">Imagen Descriptiva</label>
              <select name="lenguajes" id="lang">
                <option value="selecciona">${elemento.assets_id}</option>
                 <option value="imag1">777-1686516925744-prueba.jpeg</option>
                
                 </select>
             </div>
           
         </div>          
     </form>
     <div class="form-crear-card-options">
         <button id="btn-close">ELIMINAR</button>
         <button id="btn-save">EDITAR</button>
      
     </div>`;

     ctndiv.innerHTML= contenido;
     contendorPrincipal.appendChild(ctndiv);
    });
   console.log("ingreso aqui")
   
   
    

}
// Funcion crear historia
btnAddHistory.addEventListener('click', function(){
    // const contenedorForm = document.createElement("div");
    // contenedorForm.setAttribute("class","form-div-history");
    
    const contenedor = document.getElementById("form-hi");
    contenedor.style.display='contents';
    
});


// --------------------------------------------
// Peticiones a la base de datos 
// --------------------------------------------

// Get lista de cards registrados en el SCO actual
const getListaCards = async ( ) => {
    let response = await fetch("http://localhost:3000/api/get/sco/"+idSco)
    const jsonData = await response.json();
    console.log(jsonData.cards);
    listaCards = jsonData.cards;
    listarCards();
}

getListaCards();


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
    

    listarCards();
}



//codigo para recuperar los assets
async function getAssets(){
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
                let path = asset['path'];
                
                const partes = path.split('-'); // Dividir la cadena en partes usando el carácter "-"
                const nombreArchivo = partes.pop();
                await createAssetItemModal(idAsset,nombreArchivo)
            })
            
        
        } else {
            console.log("Error al obtener el asset");
        }
    } catch (error) {
        console.log("Error al pedir assets al servidor", error)
    }
}

async function createAssetItemModal(id,title){
    const container = document.getElementById('container-asset-modal');
    const item = document.createElement("div");
    item.setAttribute("class","col mb-5");
    item.setAttribute("style","height: 100px;");
    const check = `
        <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault-${id}">
            <label class="form-check-label text-truncate d-inline-block w-100" for="flexRadioDefault-${id}">
            ${title}
            </label>
        </div>
    `;

    item.innerHTML = check;
    const contImg = document.createElement("div");
    contImg.setAttribute("class","border border-dark w-100 h-100 item-modal-assets");
    item.appendChild(contImg);
   
    const spinner = document.createElement("div");
    spinner.setAttribute("id","spinner");
    
    contImg.appendChild(spinner);

    let contenido = `
        <div class="col mb-5" style="height: 100px;">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                <label class="form-check-label text-truncate d-inline-block w-100" for="flexRadioDefault2">
                Default checked radio
                </label>
            </div>
            <div class="border border-dark w-100 h-100">
                <img src="" />
            </div>
        </div>
    `;
    container.appendChild(item);

    
    
    
    

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

            //const spinner = item.querySelector("#spinner");
            spinner.style.display = "none"; // Oculta el spinner
            
           
            // // Mostrar la imagen en un elemento <img>
            const imgElement = document.createElement("img");
            imgElement.src = imageUrl;
            contImg.appendChild(imgElement);

        
        } else {
            console.log("Error al obtener la imagen");
        }
    } catch (error) {
        console.log("Error al pedir imagen al servidor", error)
    }
}
getAssets();
