//this module to handle calling api to get details data 


//====================import=======================
import {displayDetail} from "./ui.module.js" 
import {loaderElement} from "./index.js";


//====================variables======================



//====================functions======================
export async function getDetailApi(index){
    loaderElement.classList.replace("d-none", "d-flex");

    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${index}`, {
        method:"GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
            'x-rapidapi-key': '5edd5ba1cfmsh4c86548f6170622p15ac9djsn30d2410772b6'
          }
    });

    const response = await api.json();
    displayDetail(response);
}