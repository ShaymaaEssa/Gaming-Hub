//This module is for displaying data (games data - details data)

//===================import===============================
import {loaderElement} from "./index.js";


//====================functions=============================
export function displayData(dataArr){

  console.log(dataArr);
    let elementsBox = "";
    for (let i=0; i<dataArr.length; i++){
        let videoSrc = dataArr[i].thumbnail.replace("thumbnail.jpg","videoplayback.webm")
        elementsBox += `            <div class="col-md-6 col-lg-4 col-xlg-3">
              <div  class="inner">
                <div class="card w-100" onclick="showDetail(${dataArr[i].id})" style="width: 18rem;">
                    <figure  class="position-relative p-2 mb-0" onmouseenter = "playVideo(this)" onmouseleave="stopVideo(this)">
                  <img src=${dataArr[i].thumbnail} class="card-img-top w-100 h-100" alt="game thumbnail" onerror="this.onerror=null; this.src='/images/errorimg.png';" >
                    <video muted loop class="position-absolute p-2 top-0 start-0 w-100 h-100 z-3 d-none" controls>
                      <source  src=${videoSrc} type="video/webm">
                    </video>
                  </figure>
                  <div class="card-body">
                    <h5 class="card-title">${dataArr[i].title}</h5>
                    <p class="card-text">${dataArr[i].short_description}</p>

                    <div class="badges d-flex justify-content-around mb-2">
                      <span class="badge text-bg-primary">
                      ${dataArr[i].platform.includes(',')? dataArr[i].platform.split(',')[0] : dataArr[i].platform}
                      </span>
                      <span class="badge text-bg-primary">${dataArr[i].genre}</span>
                    </div>

                    <div class="d-flex justify-content-center">
                      <a class="btn playnow-btn mb-1" href=${dataArr[i].game_url} target="_blank"><i class="fa-solid fa-shield-halved"></i> Play Now</a>
                    </div>

                  </div>

                  <div class="card-footer text-body-secondary d-flex justify-content-between">
                    <span>release_date</span>
                    <span>${dataArr[i].release_date}</span>
                  </div>
                </div>
              </div>
            </div>`;
    }

    document.querySelector("#data-place").innerHTML = elementsBox;
    loaderElement.classList.replace("d-flex","d-none");

}

window.playVideo =  function(object){
    const videoElement = object.querySelector("video");
    videoElement.classList.remove("d-none");
    videoElement.muted = true;
    videoElement.play();
}

window.stopVideo =  function(object){
    const videoElement = object.querySelector("video");
    videoElement.classList.add("d-none");
    videoElement.pause();
}



export function displayDetail(details){
  let detailBox = `
            <div class="col-lg-4">
            <div class="inner">
              <img src=${details.thumbnail} alt="image of the game" class="w-100">
            </div>
          </div>
          <div class="col-lg-8 ">
            <div class="inner text-light d-flex flex-column row-gap-2">
              <h3>Title: ${details.title}</h3>
              <span>Category: <span class="badge text-bg-primary">${details.genre}</span></span>
              <span>Platform: <span class="badge text-bg-primary">${details.platform}</span></span>
              <span>Status: <span class="badge text-bg-primary">${details.status}</span></span>
              <p>${details.description}</p>
              <div class="d-flex justify-content-start column-gap-3">
                <a class="btn profile-btn mb-3" href=${details.freetogame_profile_url} target="_blank"><i class="fa-brands fa-fantasy-flight-games"></i> Game Profile</a>
                <a class="btn playnow-btn mb-3" href=${details.game_url} target="_blank"><i class="fa-solid fa-shield-halved"></i> Play Now</a>
              </div>
            </div>

          </div>
          `
          document.querySelector(".details-row").innerHTML = detailBox;
          loaderElement.classList.replace("d-flex","d-none");

}
