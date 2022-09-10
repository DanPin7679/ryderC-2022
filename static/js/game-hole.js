import { titleCustom } from "./components/title.js";
import { totScoreCalculation } from "./results.js"
import { updateView, state } from "./index.js";

   
function buildGame() {
    var game = state.game
    var main = document.createElement("div");
    main.style.height = "450px"
    main.style.width = "350px"
    main.style.margin = "auto"
    var title = "Partie " + game.game_id;
    var titlePage = titleCustom(title);
    main.appendChild(titlePage);

    var course = document.createElement("h3");
    course.style.textAlign = "center";
    course.textContent = game.course;
    course.style.fontSize = "20px"
    main.appendChild(course);

// ****************  Build Grid  **************************
    var gameGrid = document.createElement("div");
    gameGrid.className="containerGame";


    var playedHole = document.createElement("div");
    playedHole.className = "played-hole"
    playedHole.style.fontSize = "15px"
    playedHole.textContent = "Après " + game.hole + " trous";
    gameGrid.appendChild(playedHole)
    var enterHole = document.createElement("div");
    enterHole.className = "enter-hole"
    enterHole.style.fontSize = "15px"
    enterHole.textContent = "Entrer les scores - Trou " + (game.hole + 1)
    gameGrid.appendChild(enterHole)

    let scores = totScoreCalculation()
    let redScore = scores[0]
    let blueScore = scores[1]
    
    var cellTotBlue = document.createElement("div");
    cellTotBlue.className = "blue-total-score"
    cellTotBlue.style.fontSize = "20px"
    cellTotBlue.style.backgroundColor = "#202050"
    cellTotBlue.textContent = "Bleus " + blueScore
    gameGrid.appendChild(cellTotBlue)
    var cellTotRed = document.createElement("div");
    cellTotRed.className = "red-total-score"
    cellTotRed.style.fontSize = "20px"
    cellTotRed.style.backgroundColor = "#502020"
    cellTotRed.textContent = "Rouges " + redScore
    gameGrid.appendChild(cellTotRed)
    
    for (let i = 0; i < 4; i++) {
        if (i === 0) {
            var name = game.blue.player1.last_name;
            var score = game.blue.player1.score.reduce(getSum, 0);
            var id = 1;
            var color = "#202050";
            var value = game.blue.player1.score[state.game.hole]
        } else if (i === 1) {
            var name = game.blue.player2.last_name;
            var score = game.blue.player2.score.reduce(getSum, 0);
            var id = 2;
            var color = "#202050";
            var value = game.blue.player2.score[state.game.hole]
        } else if (i === 2) {
            var name = game.red.player1.last_name;
            var score = game.red.player1.score.reduce(getSum, 0);
            var id = 3;
            var color = "#502020";
            var value = game.red.player1.score[state.game.hole]
        } else if (i === 3) {
            var name = game.red.player2.last_name;
            var score = game.red.player2.score.reduce(getSum, 0);
            var id = 4;
            var color = "#502020";
            var value = game.red.player2.score[state.game.hole]
        }
        
        if (game.day_id == 1 || (game.day_id == 2 && i == 0) || (game.day_id == 2 && i == 2)) {
            var newPlayer1 = document.createElement("div");
            newPlayer1.className = "new"+id+"-name"
            newPlayer1.style.fontSize = "15px"
    
            var newScore1 = document.createElement("input");
            newScore1.type= "text";
            newScore1.inputmode = "numeric"
            newScore1.pattern = "[0-9]*"
            newScore1.className = "new"+id+"-score";
            newScore1.value = value;
            newScore1.style.width = "100%";
            newScore1.style.fontSize = "15px";
            newScore1.style.backgroundColor = "white";
            newScore1.id = "new-score-"+id;

            var cellPlayer1 = document.createElement("div");
            cellPlayer1.className = "player"+id+"-name"
            cellPlayer1.style.fontSize = "15px"
    
            var cellScore1 = document.createElement("div");
            cellScore1.className = "player"+id+"-score"
            cellScore1.style.fontSize = "15px"
    
            newPlayer1.textContent = name;
            cellPlayer1.textContent = name;
            cellScore1.textContent = score;
            newPlayer1.style.backgroundColor = "color";
            cellPlayer1.style.backgroundColor = "color";
            cellScore1.style.backgroundColor = "color";

            gameGrid.appendChild(newPlayer1)
            gameGrid.appendChild(newScore1)
            gameGrid.appendChild(cellPlayer1)
            gameGrid.appendChild(cellScore1)
            
        }
    }

    for (let j = 0; j < 2; j++) {
        var cellScoreTeam = document.createElement("div");
        if (j === 0) {
            cellScoreTeam.className = "blue-score";
            cellScoreTeam.style.backgroundColor = "#202050";
            cellScoreTeam.textContent = game.blue.score;
         }else{
             cellScoreTeam.className = "red-score";
             cellScoreTeam.style.backgroundColor = "#502020";
             cellScoreTeam.textContent = game.red.score;
         }
         cellScoreTeam.style.fontSize = "20px"
         gameGrid.appendChild(cellScoreTeam)
    }

// ****************  Build Buttons  **************************
    var buttons = document.createElement("div");

    var prevHole = document.createElement("div");
    prevHole.id = "prev-hole";
    prevHole.className = "previous-hole";
    prevHole.style.fontSize = "15px";
    prevHole.style.backgroundColor = "darkOrange";
    prevHole.textContent = "précédent";
    prevHole.style.borderRadius = "20px";
    gameGrid.appendChild(prevHole);
    var nextHole = document.createElement("div");
    nextHole.id = "next-hole";
    nextHole.className = "next-hole";
    nextHole.style.fontSize = "15px";
    nextHole.style.backgroundColor = "darkOrange";
    nextHole.textContent = "prochain";
    nextHole.style.borderRadius = "20px";
    gameGrid.appendChild(nextHole);

    var backResults = document.createElement("div");
    backResults.id = "back-results";
    backResults.className = "back-results";
    backResults.style.fontSize = "15px";
    backResults.style.backgroundColor = "darkBlue";
    backResults.style.padding = "5px"
    backResults.textContent = "résultats";
    backResults.style.borderRadius = "20px";
    gameGrid.appendChild(backResults);
    

// **********************************************************
    // for (let j = 0; j < 40; j++) {
    //     var cell = document.createElement("div");
    //     cell.textContent = j + 1
    //     cell.style.fontSize = "8px"
    //     gameGrid.appendChild(cell)
    // }
    main.appendChild(gameGrid)
    updateView(main)
}

function getGame(day_id, game_id, title) {
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
            let main = buildGame();
            return main
        // } else {
            // let main = buildGame(title);
            // return main
        // }
        
    })();
}
function calculScore2(scores) {
    (async () => {
        const data = await fetch('https://hk2wwul58k.execute-api.us-east-2.amazonaws.com/test/match-calculation',{
            method:'POST',
            body: JSON.stringify({
                "game": scores.game
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
                console.log("calcul score", data.body)
                var new_scores = JSON.parse(data.body)
                state.game.red.score = getArraySum(new_scores["team1_score"]);
                state.game.red["allHoles"] = new_scores["team1_score"]
                state.game.blue.score = getArraySum(new_scores["team2_score"]);
                state.game.blue["allHoles"] = new_scores["team2_score"];
                postScore()
    })();
     
}

function calculScore(scores) {
    console.log("in next", scores.game)
    var game = scores.game
    var game_type = game.game_type;
    var team1_scores = game.team1_scores;
    var team2_scores = game.team2_scores;
    var team1_score = []
        var team2_score = []
        if (game_type === "bestBall_4") {
            for (let i = 0; i < team1_scores[0].length; i++) { 
                var team1_best = Math.min(parseInt(team1_scores[0][i]), parseInt(team1_scores[1][i]))
                var team2_best = Math.min(parseInt(team2_scores[0][i]), parseInt(team2_scores[1][i]))
                if (team1_best < team2_best) {
                    team1_score.push(1);
                    team2_score.push(-1);
                } else if (team1_best > team2_best) {
                    team1_score.push(-1);
                    team2_score.push(1);
                } else {
                    team1_score.push(0);
                    team2_score.push(0);
                }
                
            }
        }
    
    let results = {
        team1_score: team1_score,
        team2_score: team2_score
    }
    var new_scores = results
    state.game.red.score = getArraySum(new_scores["team1_score"]);
    state.game.red["allHoles"] = new_scores["team1_score"]
    state.game.blue.score = getArraySum(new_scores["team2_score"]);
    state.game.blue["allHoles"] = new_scores["team2_score"];
    postScore()
}

function postScore() {
    (async () => {
        const data = await fetch('https://r6d0b8mldh.execute-api.us-east-2.amazonaws.com/test/games',{
            method:'POST',
            body: JSON.stringify({
                "game": state.game
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
                var title = "Partie " + state.game.game_id
                getGame()
    })();
     
}
function updateGames(game) {

    (async () => {
        const data = await fetch('https://r6d0b8mldh.execute-api.us-east-2.amazonaws.com/test/games',{
            method:'POST',
            body: JSON.stringify({
                "game": game
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
    })();
     
}

function getSum(total, num) {
  return total + parseInt(num);
}

function getArraySum(array) {
    var sumArray = 0
    for (let j = 0; j < array.length; j++) {
        sumArray = sumArray + parseInt(array[j])
    }

    return sumArray
}

// function calculScoreEndGame(game_id) {
//     var red1_score = state.game.redPlayer.player1
//     var red2_score = state.game.redPlayer.player2
//     var blue1_score = state.game.bluePlayer.player1
//     var blue2_score = state.game.bluePlayer.player2
    
//     for (let i = 0; i < red_score.length; i++) { 
//             var red_best = Math.min(parseInt(red1_score[i]), parseInt(red2_score[i]))
//             var blue_best = Math.min(parseInt(blue1_score[i]), parseInt(blue2_score[i]))
//             if (red_best < blue_best) {
//                 team1_score.push(1);
//                 team2_score.push(-1);
//             } else if (red_best > blue_best) {
//                 team1_score.push(-1);
//                 team2_score.push(1);
//             } else {
//                 team1_score.push(0);
//                 team2_score.push(0);
//             }
            
//         }

//     return sumArray
// }


// function calculTeamScore(redScores, blueScore) {
//     var redScore = 0
//     var blueScore = 0
//     for (let j = 0; j < redScores.length; j++) {
//         sumArray = sumArray + parseInt(array[j])
//     }

//     return sumArray
// }

export { getGame, postScore, buildGame, calculScore, updateGames }


