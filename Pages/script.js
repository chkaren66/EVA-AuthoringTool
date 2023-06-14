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
