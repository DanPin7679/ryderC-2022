import { state } from "./index.js";
import { buildResults } from "./results.js"
import {data} from "./Models/data.js"
import { updateGames } from "./game-hole.js"


function getGames(day_id, game_id, title) {
    var items = [];
    (async () => {
        const data = await fetch('https://r6d0b8mldh.execute-api.us-east-2.amazonaws.com/test/games',{
            method:'POST',
            headers: {
                
              },
        })
            .then(response => response.json());
            console.log(data.body)
            state.all_games = data.body;
        // if (title = "") {
            buildResults()
        // } else {
            // let main = buildGame(title);
            // return main
        // }
        
    })();
}

function getGames1() {
    state.all_games = data
    buildResults()
    console.log(state.all_games)

}

function updateAllGames() {
    console.log("in upt all")
    data.map(x => updateGames(x))
}


export { getGames, updateAllGames }