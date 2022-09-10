import {getGames, updateAllGames } from "./get_games.js"
import { buildGame, calculScore, updateGames } from "./game-hole.js"
import {CurrentScoreModel} from "../js/Models/currentGames.js"
import { buildResults } from "./results.js"

console.log("justbeforestate")

//updateAllGames()

var state = {
    day: 2,
    game: 1,
    all_games: [],
    game: null,
    all_players: [],
    players: [],
    playersO: {},
    scores: {},
}

if (state.all_players.length === 0) {
    getAllPlayers()
}
if (state.all_games.length === 0) {
    console.log("in state")
    getGames()
}



document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        console.log("in event listener")
        if (e.target.matches("#draft")) {
            var newPlayer = document.getElementById('new-player');
            var newPlayerNames = newPlayer.options[newPlayer.selectedIndex].textContent;
            var splitNames = newPlayerNames.split(" ");
            var newTeam = document.getElementById('new-team');
            var newTeamValue = newTeam.options[newTeam.selectedIndex].value;

            var first_name = splitNames[0];
            var last_name = splitNames[1];
            var team = newTeamValue;
            console.log(first_name, last_name, team)
            updateTeam(first_name, last_name, team, "/manage")
        }
        if (e.target.matches("#submit-game")) {
            var new_game = new CurrentGamesModel();
            
            var game = document.getElementById('game');
            var game_id = game.options[game.selectedIndex].value;
            new_game.game.day_id = parseInt(state.day);
            new_game.game.game_id = parseInt(game_id);
            new_game.game.course = "Chicoutimi";
            
            var blue1 = document.getElementById('blue1');
            var blue1_id = blue1.options[blue1.selectedIndex].value;
            var blue1_name = blue1_id.split(" ");
            new_game.game.blue.player1.first_name = blue1_name[0];
            new_game.game.blue.player1.last_name = blue1_name[1];
            
            var red1 = document.getElementById('red1');
            var red1_id = red1.options[red1.selectedIndex].value;
            var red1_name = red1_id.split(" ");
            new_game.game.red.player1.first_name = red1_name[0];
            new_game.game.red.player1.last_name = red1_name[1];
            
            if (state.day == 1) {
                var blue2 = document.getElementById('blue2');
                var blue2_id = blue2.options[blue2.selectedIndex].value;
                var blue2_name = blue2_id.split(" ");
                new_game.game.blue.player2.first_name = blue2_name[0];
                new_game.game.blue.player2.last_name = blue2_name[1];
                
                var red2 = document.getElementById('red2');
                var red2_id = red2.options[red2.selectedIndex].value;
                var red2_name = red2_id.split(" ");
                new_game.game.red.player2.first_name = red2_name[0];
                new_game.game.red.player2.last_name = red2_name[1];
            }
            
            postGame(new_game.game);

            
        }
        if (e.target.matches("#refresh")) {
            refreshTeam()
        }
        
        
       
        if (e.target.matches("#prev-hole")) {
            var hole = state.game.hole;
            var currentScore = new CurrentScoreModel()
            
            state.game.red.player1.score[hole] = document.getElementById("new-score-3").value;
            state.game.blue.player1.score[hole] = document.getElementById("new-score-1").value;
            
            currentScore.game.team1_scores[0] = state.game.red.player1.score
            currentScore.game.team2_scores[0] = state.game.blue.player1.score
            
            if (state.game.day_id == 2) {
                state.game.red.player2.score[hole] = 99;
                state.game.blue.player2.score[hole] = 99;
                
                currentScore.game.team1_scores[1] = state.game.red.player2.score
                currentScore.game.team2_scores[1] = state.game.blue.player2.score
            }

            state.game.hole = Math.max(hole - 1, 0);
            calculScore(currentScore);
        }
        if (e.target.matches("#next-hole")) {
            var hole = state.game.hole;
            var currentScore = new CurrentScoreModel()
            
            state.game.red.player1.score[hole] = document.getElementById("new-score-3").value;
            state.game.blue.player1.score[hole] = document.getElementById("new-score-1").value;
            state.game.red.player2.score[hole] = document.getElementById("new-score-2").value;
            state.game.blue.player2.score[hole] = document.getElementById("new-score-4").value;
            currentScore.game.team1_scores[0] = state.game.red.player1.score
            currentScore.game.team2_scores[0] = state.game.blue.player1.score
            currentScore.game.team1_scores[1] = state.game.red.player2.score
            currentScore.game.team2_scores[1] = state.game.blue.player2.score
            
            if (state.game.day_id == 2) {
                state.game.red.player2.score[hole] = 99;
                state.game.blue.player2.score[hole] = 99;
                
                currentScore.game.team1_scores[1] = state.game.red.player2.score
                currentScore.game.team2_scores[1] = state.game.blue.player2.score
            }
            
            console.log(currentScore)
            state.game.hole = Math.min(hole + 1, 18)
            calculScore(currentScore);
            updateGames(state.game)
        }
        if (e.target.matches("#back-results")) {
            buildResults()
        }
        if (e.target.matches("#add-red")) {
            
            formPlayer("red");
        }
        if (e.target.matches("#add-blue")) {
            
            formPlayer("blue");
        }
        if (e.target.matches("#update-red")) {
            var new_player = document.getElementById("Nom_joueur").value;
            
            var edition = state.edition;
            if (edition.red_team) {
                edition.red_team.push(new_player);
            }else{
                edition["red_team"] = [];
                edition.red_team.push(new_player)
                
            }
            postEdition(edition);
        }
        if (e.target.matches("#update-blue")) {
            var new_player = document.getElementById("Nom_joueur").value;
            
            var edition = state.edition;
            if (edition.blue_team) {
                edition.blue_team.push(new_player);
            }else{
                edition["blue_team"] = [];
                edition.blue_team.push(new_player)
                
            }
            postEdition(edition);
        }
        if (e.target.matches("#add-game")) {
            
            formGames();
        }
        if (e.target.matches("#update-game")) {
            var new_blue1 = document.getElementById("Joueur_bleu_1").value;
            var new_blue2 = document.getElementById("Joueur_bleu_2").value;
            var new_red1 = document.getElementById("Joueur_rouge_1").value;
            var new_red2 = document.getElementById("Joueur_rouge_2").value;
            var game_type = document.getElementById("game_type").value;
            var winning_team = document.getElementById("Equipe_gagnante").value;
            
            let new_game = {
                "red": [
                    new_red1,
                    new_red2
                ],
                "winner": winning_team,
                "type": game_type,
                "blue": [
                    new_blue1,
                    new_blue2
                ]
            }
            
            var edition = state.edition;
            if (edition.games) {
                
            }else{
                edition["games"] = []
            }
            
            edition.games.push(new_game);
            console.log(edition);
            postEdition(edition);
        }
        
        if (e.target.matches("#create-game-btn")) {
            formCurrentGames();
        }
        if (e.target.matches("#create-game")) {
            
            var day_id = document.getElementById("day_id").value;
            var game_id = document.getElementById("game_id").value;
            var course = document.getElementById("course").value;
            var blue_players = document.getElementById("blue_players").value;
            var red_players = document.getElementById("red_players").value;
             
            var new_game = CurrentGamesModel(day_id, game_id, course, blue_players, red_players);
        }
        
        if (e.target.matches("#add-new-player")) {
            formNewPlayer();
        }
        if (e.target.matches("#confirm-new-player")) {
            var newPlayer = new CurrentEditionModel();
            
            var first_name = document.getElementById("Prénom").value;
            var last_name = document.getElementById("Nom").value;
            var nickname = document.getElementById("Nickname").value
             
            newPlayer.player.first_name = first_name;
            newPlayer.player.last_name = last_name;
            newPlayer.player.nickname = nickname;
            players = [newPlayer];
            
            addNewPlayer(players, "/players");
        }
        if (e.target.matches("#add-avail")) {
            availablePlayers();
        }
        if (e.target.matches("#submit-available")) {
            var players = state.all_players;
            var avail_players = []
            for (let i = 0; i < players.length; i++) {
                var day1_id = "1" + players[i].first_name + "-" + players[i].last_name;
                var day2_id = "2" + players[i].first_name + "-" + players[i].last_name;
                var team_blue_id = "Bleus" + players[i].first_name + "-" + players[i].last_name
                var team_red_id = "Rouges" + players[i].first_name + "-" + players[i].last_name
                var team_notSelect_id = "Indéterminé" + players[i].first_name + "-" + players[i].last_name
                
                var day1 = document.getElementById(day1_id)
                var day2 = document.getElementById(day2_id)
                var team_blue = document.getElementById(team_blue_id)
                var team_red = document.getElementById(team_red_id)
                var team_notSelect = document.getElementById(team_notSelect_id)
                
                if (day1.checked === true || day2.checked === true) {
                    var newAvailPlayer = new CurrentEditionModel();
                    newAvailPlayer.player.first_name = players[i].first_name;
                    newAvailPlayer.player.last_name = players[i].last_name;
                    newAvailPlayer.player.is_avail_day1 = day1.checked;
                    newAvailPlayer.player.is_avail_day2 = day2.checked;
                    
                    if (team_blue.checked) {
                        newAvailPlayer.player.team = "blue";
                    } else if (team_red.checked) {
                        newAvailPlayer.player.team = "red";
                    } else {
                        newAvailPlayer.player.team = "not_selected"
                    }
      
                    avail_players.push(newAvailPlayer);
                }
            }
            updatePlayers(avail_players);
        }
        if (e.target.matches(".go-to-score")) {
            var ids = e.target.value;
            console.log(ids)
            var game_id_total = ids.split("");
            
            
            var day_id = game_id_total[0];
            if(game_id_total.length === 4) {
                var game_id = 10 + parseInt(game_id_total[3]);
                console.log(game_id)
            } else{
                var game_id = game_id_total[2];
            }

            var title = "Partie " + game_id;
            
            var games = state.all_games;
            for (let i = 0; i < games.length; i++) {
                if (day_id == games[i].day_id && game_id == games[i].game_id) {
                state.game = games[i]
                }
            }
            console.log("just before build game")
            buildGame()
        }
    });
});

function updateView(newChild) {
    let app = document.querySelector("#app");
    let currentChild = app.childNodes[0];
    app.replaceChild(newChild, currentChild)
}

function getAllPlayers() {

    (async () => {
        const data = await fetch('https://r6d0b8mldh.execute-api.us-east-2.amazonaws.com/test/players',{
            method:'POST',
            headers: {
                
            }
        })
            .then(response => response.json());
            console.log(data.body)
            state.all_players = data.body;
    })();
}

export { updateView, state }





