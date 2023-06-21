const path = "http://localhost:3000/api/"
// Obtener la URL actual
var url = window.location.href;
let idSco = 0;
// Obtener el índice del signo de interrogación (?)
var indice = url.indexOf('?');

// Verificar si hay parámetros en la URL
if (indice !== -1) {
  // Obtener la parte de la URL que contiene los parámetros
  var parametros = url.slice(indice + 1);

  // Dividir los parámetros en pares clave=valor
  var pares = parametros.split('&');

  // Objeto para almacenar los parámetros
  var parametrosObj = {};

  // Recorrer los pares clave=valor y almacenarlos en el objeto
  for (var i = 0; i < pares.length; i++) {
    var par = pares[i].split('=');
    var clave = decodeURIComponent(par[0]);
    var valor = decodeURIComponent(par[1] || '');
    parametrosObj[clave] = valor;
  }

  // Acceder a los valores de los parámetros
  idSco = parametrosObj.parametro1;
  

  // Hacer algo con los valores de los parámetros
  console.log('Valor del parámetro 1:', idSco);
 
}


// variables



const draggable_list = document.getElementById('draggable-list');
var cheked = document.getElementById('check');
const next = document.getElementById('btn-next');
let editorText = '';
let idEditar = 0;
let contador = 100;

let lengthArrayCards = 1;
let listSaveCards = [];
let card = {};
let listItems = [];
let sco = [];
var listarOrden = [];

let dragStartIndex;

next.addEventListener('click', function(){
    document.getElementById('form-hi').style.display="none";
    document.getElementById('title-cards').style.display="block"
    createList();
    document.getElementById('ctn-cards-id2').style.display="block";
    cheked.style.display="block";
    console.log("hola")
});


function createActivity(){
  var titulo = document.getElementById('titulo-activity')
  titulo.innerHTML = sco.title;  
}

// Insert list items into DOM
function createList() {

    
   [...listSaveCards]
  
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((card, index) => {
        
        const listItem = document.createElement('li');
        
        listItem.setAttribute('data-index', index);
        listItem.innerHTML = `
          <span class="number">${index + 1}</span>
          <div class="draggable" draggable="true">
          <div class="card" id="${card.posorden}">
          <div class="card-img">
          <img src="${"images/"+card.asset_name}" alt="Image for a card"></img>
        </div>
        <div class="card-content">
           <h3>${card.title}</h3>
           <p>${card.track}</p>
           
           
        </div>
          </div>
          <div class="card-description"> ${card.description}</div>
          </div>
        `;
  
        listItems.push(listItem);
        draggable_list.appendChild(listItem);
    });
    
    document.querySelectorAll('.draggable').forEach(ele =>{
        var idElemento =Number(ele.childNodes[1].getAttribute('id'));
        console.log(idElemento)
        listarOrden.push(listSaveCards.find( card => card.posorden === idElemento))
   
      })
    
          addEventListeners();
          console.log(listarOrden)
        
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
   listarOrden = [];
   document.querySelectorAll('.draggable').forEach(ele =>{
     var idElemento =Number(ele.childNodes[1].getAttribute('id'));
     console.log(idElemento)
     listarOrden.push(listSaveCards.find( card => card.posorden === idElemento))

   })
//    var ordenar = 0;
//    listarOrden.forEach( card =>{
//      card.posOrden = ordenar;
//      ordenar++;
//    })
//    listSaveCards=listarOrden;
   console.log(listarOrden);
//    console.log(listSaveCards);
}

// Check the order of list items
function checkOrder() {
//   listItems.forEach((listItem, index) => {
//     const personName = listItem.querySelector('.draggable').innerText.trim();

//     if (personName !== listSaveCards[index]) {
//       listItem.classList.add('wrong');
//     } else {
//       listItem.classList.remove('wrong');
//       listItem.classList.add('right');
//     }
//   });
    var listaActual = document.querySelectorAll('.card');
    var listaNumeros = document.querySelectorAll('li span');
    console.log(listaActual)
    console.log(listaNumeros)
    var longitudlistSaveCards = listSaveCards.length-1;
    listarOrden.forEach((elemento,index) => {
        var ele = listSaveCards.find( card => card.posorden === index)
        if(ele.posorden == elemento.posorden){
             console.log("esta en su lugar")
             listaActual[index].classList.add('rigth')
             listaNumeros[index].classList.add('rigth')
        }else{
            console.log("no esta en su lugar ")
            listaActual[index].classList.add('wrong')
            listaNumeros[index].classList.add('wrong')
        }

    })

}
cheked.addEventListener('click', checkOrder)

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
// var toolbaroptions = [['bold','italic', 'underline','strike'],['link'],[{'header':1 },{'header':2}],[{ 'align': [] }]]
// var quill = new Quill('#editor', {
//   modules :{
//     toolbar: toolbaroptions
//   },  
//   theme: 'snow'
//   });
//   quill.on('text-change', update);
//   update();
  
//   function update(delta) {
//     var contents = quill.getContents();
   
//     editorText = quill.root.innerHTML;
    
//     var html = "contents = " + JSON.stringify(contents, null, 2);
//     if (delta) {
      
//       html = "change = " + JSON.stringify(delta, null, 2) + "\n\n" + html;
//     }
 
//   }
  
// ------------------------------------------------------
// Peticiones a la base de datos
// ------------------------------------------------------

const getSco = async () => {
    try{
        const response = await fetch(path+"get/sco/"+idSco).then();
        if(response.ok){
            const jsonData = await response.json();
            sco = jsonData;
           
            console.log(sco)
            
        }else{
            console.log("error al obtener ")
        }
       
      
    }catch(error){
        console.log("Error al obtener el sco ")
    }

    listSaveCards = sco.cards;
    createActivity();
    // createList();
    
}

getSco();


