var textDescription = document.querySelector(".photoBlock__description");
var breed = document.querySelector(".inputBlock__breeds");
var color = document.querySelector(".inputBlock__colors");
var font = document.querySelector(".inputBlock__fonts");
var photoDog = document.querySelector(".photoBlock__photo");


window.onload = init();

function init() {
    getBreed();
    saveInfosBreed();
    getInfosBreed();
    saveInfosFont();
    getInfosFont();
    saveInfosColor();
    getInfosColor();
    saveInfosName();
    getInfosName();
    getImage(); 
}

$(".inputBlock__dog--button").click(function() {

    if(breed.value != "none" && color.value != "none" && font.value != "none"){
        getBreedPhoto();
        colorSet();
        fontSet();
        namePetSet();
        saveImage();
        alert("sucesso")
        }else{
        alert("preencha todos os campos")
        }
        

      
        
    
});

function colorSet(){
    let selectColor = document.querySelector(".inputBlock__colors").value;
    textDescription.style.color = selectColor;
}
function fontSet(){
    let selectFonts = document.querySelector(".inputBlock__fonts").value;
    textDescription.style.fontFamily = selectFonts;
}

function namePetSet(){
    let nomePet = document.getElementById("textDog");
    document.querySelector(".photoBlock__description").innerHTML =nomePet.value;
}

//função para consumir raça e popular o select
function getBreed(){
    let urlStr = "https://dog.ceo/api/breeds/list/all";
    $.ajax({
        url : urlStr,
        type : "get",
        dataType : "json",
        success : function(data){
            for (let i = 0; i < Object.entries(data.message).length; i++){
                newOption = document.createElement("option"); 
                newOption.value =Object.entries(data.message)[i][0];
                newOption.text=Object.entries(data.message)[i][0];
                breed.add(newOption);
            }
        },
        error : function(erro){
            console.log(erro);
        }
    });
}


//função para consumir imagem
function getBreedPhoto(){
    let urlStrPhotos = "https://dog.ceo/api/breed/"+breed.value+"/images";
    $.ajax({
        url : urlStrPhotos,
        type : "get",
        dataType : "json",
        success : function(dataPhoto){
            let numberImages = (Object.entries(dataPhoto.message).length);
            let numberImagesRandom = (Math.round(Math.random() * (numberImages- 0 + 1) + 0));
            photoDog.src = Object.entries(dataPhoto.message)[numberImagesRandom][1];

        },
        error : function(erro){
            console.log(erro);
        }
    });
}

//salvando opções de raça no localstorage
function saveInfosBreed() {
    $('.inputBlock__breeds').change(function() {
        localStorage.setItem('breed', this.value);
    })
}
function getInfosBreed() {
    $(document).ajaxComplete(function (event, xhr, settings) {
        if (settings.url === "https://dog.ceo/api/breeds/list/all") {
            if (localStorage.getItem('breed')) {
                $('.inputBlock__breeds').val(localStorage.getItem('breed'));
            }
        }
    });
}

//salvando opções de cor no localstorage
function saveInfosColor() {
    $('.inputBlock__colors').change(function() {
        localStorage.setItem('color', this.value);
    })
}
function getInfosColor() {
    if (localStorage.getItem('color')) {
        $('.inputBlock__colors').val(localStorage.getItem('color'));
    }
}


//salvando opções de fonte no localstorage
function saveInfosFont() {
    $('.inputBlock__fonts').change(function() {
        localStorage.setItem('font', this.value);
    })
}
function getInfosFont() {
    if (localStorage.getItem('font')) {
        $('.inputBlock__fonts').val(localStorage.getItem('font'));
    }
}

//salvando opções de nome no localstorage
function saveInfosName() {
    $('.inputBlock__dog--text').change(function() {
        localStorage.setItem('name', this.textContent);
    })
}
function getInfosName() {
    if (localStorage.getItem('name')) {
        $('.photoBlock__description').text(localStorage.getItem('name'));
    }
}

//salvando foto no localstorage
function saveImage() {
    $(document).ajaxComplete(function (event, xhr, settings) {
        if (settings.url.indexOf('/images') >= 0) {
            localStorage.setItem('image', $('.photoBlock__photo').attr('src'))
        }
    })
}
function getImage() {
    if (localStorage.getItem('image')) {
        $('.photoBlock__photo').attr('src', localStorage.getItem('image'));
    }
}

