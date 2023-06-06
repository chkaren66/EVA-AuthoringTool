// alert("hola")

let btnAdd = document.getElementById("btn-add-card");
let ctnMain = document.getElementById("ctn-principal");

btnAdd.addEventListener('click', function(){
    const contenedorCard = document.createElement("div");
    contenedorCard.setAttribute("class","card")
    ctnMain.appendChild(contenedorCard)
});