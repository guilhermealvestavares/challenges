var textDescription = document.querySelector(".photoBlock__description");
var breed = document.querySelector(".inputBlock__breeds");
var photoDog = document.querySelector(".photoBlock__photo");


window.onload = getBreed();

$(".inputBlock__dog--button").click(function() {
colorSet();
fontSet();
namePetSet();
getBreedPhoto();
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
    


    

