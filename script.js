// alert("hola")

let btnAdd = document.getElementById("btn-add-card");
let ctnMain = document.getElementById("ctn-principal");

btnAdd.addEventListener('click', function(){
    const contenedorCard = document.createElement("div");
    contenedorCard.setAttribute("class","card")
    ctnMain.appendChild(contenedorCard)
});

/** Codigo para el drag-drop asset */

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

