//===============imports=====================
import {getDataApi} from "./games.module.js"
import { getDetailApi } from "./details.module.js"; 

//=============== Global ======================
export const loaderElement = document.querySelector(".loading");

let categoryActive = document.querySelector(".active").getAttribute("data-category");

let userName;
if(localStorage.getItem("uToken")!== null){
    userName = localStorage.getItem("uToken");
    document.querySelector(".user-name").innerHTML = userName;
    
} else{
    location.href = "./login.html";
}

//=============== Events ======================
window.onload = function(){
    
    document.querySelector("#category-text").innerHTML= categoryActive;
    getDataApi(categoryActive);
};

document.querySelectorAll(".menu a").forEach(function(link){
    link.addEventListener("click", function(){
        document.querySelector("#category-text").innerHTML= link.getAttribute("data-category");
        document.querySelector(".menu .active").classList.remove("active");
        link.classList.add("active");
        getDataApi(link.getAttribute("data-category"));
    });
});

document.querySelector(".close-icon i").addEventListener("click", function(){
    document.querySelector(".detail-section").classList.add("d-none");
    document.querySelector(".games-section").classList.remove("d-none");
})


document.querySelector(".logout").addEventListener("click", function(){
    localStorage.removeItem("uToken");
    location.href="./login.html";
})
//=============== Functions ===================


window.showDetail = async function(id){
    document.querySelector(".games-section").classList.add("d-none");
    document.querySelector(".detail-section").classList.remove("d-none");
    await getDetailApi(id);
  }









