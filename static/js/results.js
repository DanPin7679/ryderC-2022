import { titleCustom } from "./components/title.js";
import { gridCustom } from "./components/grid.js";
import { updateView, state } from "./index.js";

function buildResults(title) {
    var games = state.all_games;
    var data = []
    var main = document.createElement("div");
    main.style.height = "100%";

    var titlePage = titleCustom("Saguenay Lac-Saint-Jean");

 
    main.appendChild(titlePage)
    
    const columnsDay1 = "repeat(3, 1fr)";
    const columnsDay2 = "repeat(3, 1fr)";
    const rowsDay1 = "repeat(9, 1fr)";
    const rowsDay2 = "repeat(16, 1fr)";
    main.appendChild(buildTournamentScore())
    main.appendChild(buildDay(1, "", columnsDay1, rowsDay1))
    //main.appendChild(buildDay(2, "", columnsDay2, rowsDay2))
    
    updateView(main)
}


function buildDay(day) {
    var games = state.all_games;
    var day = 1
    var columns = "30% 30% 30%"
    var rows = "30px"
    var color = "#202030"
    var daySection = gridCustom("100%", "100%", columns, rows, "5px", color);
    daySection.style.overflow = "visible";
    daySection.style.position = "relative";
    
    var dayTitle = document.createElement("h3")
    dayTitle.style.textAlign = "center";
    
    if (day == 1) {
        var course = "Club de Golf";
    }else {
        var course = "Club de Golf";
    }
    
    dayTitle.textContent = "Jour " + day + " - " + course;
    dayTitle.style.gridRow = "1 / 2";
    dayTitle.style.gridColumn = "1 / 4";
    dayTitle.style.color = "white";
    dayTitle.style.fontSize = "20px"
    
    for (var i = 0; i < games.length; i++) {
        var game = games[i]
        if (game.day_id == day) {
            var row = parseInt(game.game_id) + 1
            
            var player = document.createElement("p");
            player.textContent = game.blue.player1.first_name.charAt(0) + " " + game.blue.player1.last_name;
            
            var players = document.createElement("div");
            players.className = "card-score"
            players.style.backgroundColor = "#303050";
            players.style.overflow = "visible";
            players.style.position = "relative";
            players.style.gridColumn = "1 / 2"
            players.style.gridRowStart = row;
            players.style.gridRowEnd = row + 1;
            players.appendChild(player);
            
            var redPlayer = document.createElement("p");
            redPlayer.textContent = game.red.player1.first_name.charAt(0) + " " + game.red.player1.last_name;
            
            var redPlayers = document.createElement("p");
            redPlayers.className = "card-score"
            redPlayers.style.backgroundColor = "#503030";
            redPlayers.style.overflow = "visible";
            redPlayers.style.position = "relative";
            redPlayers.style.gridColumn = "3 / 4"
            redPlayers.style.gridRowStart = row;
            redPlayers.style.gridRowEnd = row + 1;
            redPlayers.appendChild(redPlayer);
            
            if (game.day_id == 1) {
                var bluePlayer2 = document.createElement("p");
                // bluePlayer2.className = "card-roster"
                // bluePlayer2.style.backgroundColor = "#303050";
                // bluePlayer2.className = "roster";
                bluePlayer2.textContent = game.blue.player2.first_name.charAt(0) + " " + game.blue.player2.last_name;
                // bluePlayer2.style.overflow = "visible";
                // bluePlayer2.style.position = "relative";
                // bluePlayer2.style.gridColumn = "1 / 2"
                // bluePlayer2.style.gridRowStart = row + 1;
                // bluePlayer2.style.gridRowEnd = row + 2;
                players.appendChild(bluePlayer2);
                
                var redPlayer2 = document.createElement("p");
                // redPlayer2.className = "card-roster"
                // redPlayer2.style.backgroundColor = "#503030";
                // redPlayer2.className = "roster";
                redPlayer2.textContent = game.red.player2.first_name.charAt(0) + " " + game.red.player2.last_name;
                // redPlayer2.style.overflow = "visible";
                // redPlayer2.style.position = "relative";
                // redPlayer2.style.gridColumn = "3 / 5"
                // redPlayer2.style.gridRowStart = row + 1;
                // redPlayer2.style.gridRowEnd = row + 2;
                redPlayer.appendChild(redPlayer2);
            }
            
            var scoreWinning = document.createElement("span");
            var scoreHole = document.createElement("span");
            
            var colorText = "white"
            if (game.red.score > game.blue.score) {
                scoreWinning.textContent = game.red.score + "up"
                scoreHole.textContent = "après " + game.hole + " trou(s)"
                var colorWinning = "#503030"
            } else if (game.blue.score > game.red.score) {
                scoreWinning.textContent = game.blue.score + "up"
                scoreHole.textContent = "après " + game.hole + " trou(s)"
                var colorWinning = "#303050"
            }else {
                scoreWinning.textContent = "A / S"
                scoreHole.textContent = "après " + game.hole + " trou(s)"
                var colorWinning = "white"
                var colorText = "#101010"
            }
            
            var score = document.createElement("button");
            score.className = "go-to-score";
            score.value = game.day_id + " " + game.game_id
            score.style.textAlign = "center";
            score.style.color = colorText;
            score.style.backgroundColor = colorWinning;
            score.style.fontSize = "15px";
            score.style.overflow = "visible";
            score.style.position = "relative";
            score.style.gridColumn = "2 / 3"
            score.style.gridRowStart = row;
            score.style.gridRowEnd = row + 1;
            
            var breakEl = document.createElement("br");
            score.appendChild(scoreWinning);
            score.appendChild(breakEl);
            score.appendChild(scoreHole);
            
            daySection.appendChild(players);
            daySection.appendChild(redPlayers);
            daySection.appendChild(score);
        }
    }
    
    // var addGameBtn = document.createElement("btn");
    // addGameBtn.style.gridRow = "12 / 13";
    // addGameBtn.style.gridColumn = "2 / 6";
    // addGameBtn.id = "create-game-btn"        
    // addGameBtn.className = "btn btn-outline"
    // addGameBtn.textContent = "Ajouter une partie"
    // addGameBtn.style.color = "#101030";
    // addGameBtn.style.border = "#101030";
    
    daySection.appendChild(dayTitle);
    
    return daySection
}

function buildTournamentScore() {
    
    let scores = totScoreCalculation()
    let redScore = scores[0]
    let blueScore = scores[1]
    
    var gameGrid = document.createElement("div");
    gameGrid.className="containerGame";

    var partie = document.createElement("div");
    partie.className = "title-total-score"
    partie.style.fontSize = "25px"
    partie.textContent = "Les résultats de Ryder CP2021"
    gameGrid.appendChild(partie)
    
    var cellTotBlue = document.createElement("div");
    cellTotBlue.className = "blue-main-total-score"
    cellTotBlue.style.fontSize = "20px"
    cellTotBlue.style.backgroundColor = "#303050"
    cellTotBlue.style.border = "solid white"
    cellTotBlue.textContent = blueScore
    gameGrid.appendChild(cellTotBlue)
    var cellTotRed = document.createElement("div");
    cellTotRed.className = "red-main-total-score"
    cellTotRed.style.fontSize = "20px"
    cellTotRed.style.backgroundColor = "#503030"
    cellTotRed.style.border = "solid white"
    cellTotRed.textContent = redScore
    gameGrid.appendChild(cellTotRed)
    
    return gameGrid
}

function getGames(title) {

    (async () => {
        const data = await fetch('https://r6d0b8mldh.execute-api.us-east-2.amazonaws.com/test/games',{
            method:'POST',
            headers: {
                
            }
        })
            .then(response => response.json());
                state.all_games = data.body;
                console.log("test", data.body)
                buildResults(title);
    })();
}

function totScoreCalculation() {
    var games = state.all_games;
    var redScore = 0;
    var blueScore = 0;
    
    for (var i = 0; i < games.length; i++) {
        
        if (parseInt(games[i].hole) > 0) {
            if (parseInt(games[i].red.score) > parseInt(games[i].blue.score)) {
                redScore = redScore + 1;
            } else if (parseInt(games[i].red.score) < parseInt(games[i].blue.score)) {
                blueScore = blueScore + 1;
            } else {
                redScore = redScore + 0.5;
                blueScore = blueScore + 0.5;
            }
        }
        
    }
     return [redScore, blueScore]
}

// export { getEdition }
export { getGames, totScoreCalculation, buildResults }