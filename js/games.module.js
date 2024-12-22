//this module to handle calling api to get games data 

//=================import===========================
import {displayData} from "./ui.module.js"
import {loaderElement} from "./index.js";

//=================functions=========================
export async function getDataApi(query){
    console.log(query);

    loaderElement.classList.replace("d-none", "d-flex");
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${query}`, {
        method:"GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
            'x-rapidapi-key': '5edd5ba1cfmsh4c86548f6170622p15ac9djsn30d2410772b6'
          }
    });

    const response = await api.json();
    displayData(response);
}