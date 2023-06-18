const path = "http://localhost:3000/api/"
// variables
let myModal = new bootstrap.Modal(document.getElementById('myModal'))
let myModal2 = new bootstrap.Modal(document.getElementById('myModal2'))
let myModalEliminar = new bootstrap.Modal(document.getElementById('staticBackdrop'))
const draggable_list = document.getElementById('draggable-list');
// Btn de la interfaz
const addCard = document.getElementById('add-card');
// Btm del formulario de crear card
let crearCard = document.getElementById('btn-crear-card');
let editCard = document.getElementById('btn-edit-card');
let seveAll = document.getElementById('btn-save');
let imagenSeleccionada = '';
let editorText = '';
let idEditar = 0;
let contador = 100;
let idSco = 7;
let lengthArrayCards = 1;
let listSaveCards = [{
  "id_local": contador,
  "sco_id": idSco,
  "asset_name": "imagen1.jpg",
  "title": "Example title of a card",
  "track": "A track for your student",
  "posOrden": 0,
  "description":"Example for a description card"
}];
let card = {};
let listItems = [];
let sco = {};




var imagen = document.getElementById('imagen');

imagen.addEventListener('change', function(){
  var option = imagen.options[imagen.selectedIndex];
  console.log(option.text)
  imagenSeleccionada = option.text;
})

// Accion de presionar el boton save (save all)
seveAll.addEventListener('click', function(){
  var titulo = document.getElementById('titulo-sco').value;
  sco = {
    "title": titulo,
    "historiaprevia": " "+editorText+" "
  }
  // Guardar cards
  console.log(sco)
  console.log(listSaveCards)
  console.log(typeof(editorText));
  registerNewSco();
  registerCards();
});

// Add new card 
addCard.addEventListener('click', function(){
    myModal.show();
})

// Accion de presionar el boton add card
crearCard.addEventListener('click', function(){
    var titulo = document.getElementById('f-titulo').value;
    var pista = document.getElementById('f-pista').value;
    var descripcion = document.getElementById('f-descripcion').value;
   
    console.log()
    contador++;
    card ={
       "id_local": contador,
       "sco_id": idSco,
       "asset_name": imagenSeleccionada,
       "title": titulo,
       "track": pista,
       "posOrden": lengthArrayCards,
       "description":descripcion
    }
    listSaveCards.push(card);
   
      removeList();
    
    createList();
    
    lengthArrayCards = listSaveCards.length;
    console.log("Tamanio de list listsavecar"+lengthArrayCards)
  // Resetear formulario 
    var formulario1 = document.getElementById("formulario1")
    formulario1.reset();
    console.log(listSaveCards)
  });

// Accion a botones editar 
const addActionEdit = () => {
  let lista = document.querySelectorAll('#btn-editar');
  lista.forEach(elemento => {
    elemento.addEventListener('click', function(){
      
        var id = Number(elemento.parentNode.parentNode.parentNode.getAttribute('id'))
       
        idEditar = id;
        console.log("editar " + idEditar)
        var elementEditar =  listSaveCards.find( card => card.id_local === idEditar)
        console.log(elementEditar)
        console.log(elementEditar.title)
        document.getElementById('f2-titulo').setAttribute('value', elementEditar.title);
        document.getElementById('f2-pista').setAttribute('value', elementEditar.track );
        document.getElementById('f2-descripcion').setAttribute('value', elementEditar.description);
        myModal2.show();
        
    });
});
}
editCard.addEventListener('click', function(){
   var titulo = document.getElementById('f2-titulo').value;
   var pista = document.getElementById('f2-pista').value;
   var descripcion = document.getElementById('f2-descripcion').value;
   
   listSaveCards.forEach(elemento =>{
    if(elemento.id_local == idEditar){
      elemento.title = titulo;
      elemento.track = pista;
      elemento.description = descripcion
    }
   });
   
   removeList();
   createList();
   var formulario2 = document.getElementById("formulario2")
    formulario2.reset();
   console.log(listSaveCards)
})

// Accion a botones eliminar
  const addActionDelete = () => {
    let lista = document.querySelectorAll('#btn-eliminar');
    lista.forEach(elemento => {
        elemento.addEventListener('click', function(){

           myModalEliminar.show(); 
           var btnEliminar = document.getElementById('eliminar');
           var ideliminar = Number(elemento.parentNode.parentNode.parentNode.getAttribute('id'))
           btnEliminar.addEventListener('click', function(){
              
              const eliminar = listSaveCards.findIndex(x => x.id_local === ideliminar)
              listSaveCards.splice(eliminar,1);
              removeList();
              createList();
              var listarOrden = [];
              document.querySelectorAll('.draggable').forEach(ele =>{
              
                var idElemento =Number(ele.childNodes[1].getAttribute('id'));
                listarOrden.push(listSaveCards.find( card => card.id_local === idElemento))
          
              })
      
              var ordenar = 0;
              listarOrden.forEach( card =>{
                card.posOrden = ordenar;
                ordenar++;
              })
          
              listSaveCards=listarOrden;
              removeList();
              createList();
              myModalEliminar.hide()
           })


        
        })
    })
    console.log(listSaveCards)
    lengthArrayCards= listSaveCards.length;
}


let dragStartIndex;

// remove list Actual 
function removeList(){
  var padre = document.getElementById("draggable-list")
  var listaActual = document.querySelectorAll('li');
  console.log(listaActual.length);
  console.log(listaActual)
  if(listaActual.length != 0){
    listaActual.forEach(elemento =>{
      padre.removeChild(elemento);
    })
  }
 
  listItems=[];
}

// Insert list items into DOM
function createList() {
  const dragListItems = document.querySelectorAll('.draggable-list li');
    
  // [...listSaveCards]
  
    
    listSaveCards.forEach((card, index) => {
      
        const listItem = document.createElement('li');
      
        listItem.setAttribute('data-index', index);
        listItem.innerHTML = `
          <span class="number">${index + 1}</span>
          <div class="draggable" draggable="true">
          <div class="card" id="${card.id_local}">
          <div class="card-img">
          <img src="${"images/"+card.asset_name}" alt="Image for a card"></img>
        </div>
        <div class="card-content">
           <h3>${card.title}</h3>
           <p>${card.track}</p>
           
           <div class="card-options">
              <button class="" id="btn-eliminar"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><style>svg{fill:#37345E}</style><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg></button>
              <button class="" id="btn-editar"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg></button>
              
           </div>
        </div>
          </div>
          </div>
        `;
  
        listItems.push(listItem);
        draggable_list.appendChild(listItem);
    });

          addEventListeners();
          addActionDelete();
          addActionEdit();
}
createList();
function dragStart() {
  // console.log('Event: ', 'dragstart');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
  // console.log('Event: ', 'dragenter');
  this.classList.add('over');
}

function dragLeave() {
  // console.log('Event: ', 'dragleave');
  this.classList.remove('over');
}

function dragOver(e) {
  // console.log('Event: ', 'dragover');
  e.preventDefault();
}

function dragDrop() {
  // console.log('Event: ', 'drop');
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
   var listarOrden = [];
   document.querySelectorAll('.draggable').forEach(ele =>{
     var idElemento =Number(ele.childNodes[1].getAttribute('id'));
     listarOrden.push(listSaveCards.find( card => card.id_local === idElemento))

   })
   var ordenar = 0;
   listarOrden.forEach( card =>{
     card.posOrden = ordenar;
     ordenar++;
   })
   listSaveCards=listarOrden;
   console.log(listSaveCards);
}

// Check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if (personName !== listSaveCards[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

// check.addEventListener('click', checkOrder);







// Quill editor -----------------------------------------
var toolbaroptions = [['bold','italic', 'underline','strike'],['link'],[{'header':1 },{'header':2}],[{ 'align': [] }]]
var quill = new Quill('#editor', {
  modules :{
    toolbar: toolbaroptions
  },  
  theme: 'snow'
  });
  quill.on('text-change', update);
  update();
  
  function update(delta) {
    var contents = quill.getContents();
   
    editorText = quill.root.innerHTML;
    
    var html = "contents = " + JSON.stringify(contents, null, 2);
    if (delta) {
      
      html = "change = " + JSON.stringify(delta, null, 2) + "\n\n" + html;
    }
 
  }
  
// ------------------------------------------------------
// Peticiones a la base de datos
// ------------------------------------------------------
// Registrar card en la base de datos
const registerNewSco = async () => {
  
  try {
      const response = await fetch(path+"register/sco", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
            },
          body: JSON.stringify(sco)

      }).then();
      
      if (response.ok) {
         let res =  await response.json();
         console.log(res.SCO.id);
         idSco = res.SCO.id;
      } else {
          console.log("Error al registrar SCO");
      }
  } catch (error) {
    console.log("Error al registrar el Sco en el servidor", error)
  }
  
  
}
// Registrar card en la base de datos
const registerCards = async () => {
  try {
    listSaveCards.forEach(elemento => {
      registerOneCard(elemento); 
    })
} catch (error) {
  console.log("Error al registrar  las cards", error)
}
 
}
const registerOneCard = async (elemento) => {
  try {
    const response = await fetch(path+"register/card", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
          },
        body: JSON.stringify(elemento)

    }).then();
    
    if (response.ok) {
       let res =  await response.json();
       console.log(res);
       
    } else {
        console.log("Error al registrar card");
    }
} catch (error) {
  console.log("Error al registrar card", error)
}
 
}