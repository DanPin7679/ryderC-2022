class CurrentGamesModel {
    constructor() {
        this.game = {
            "day_id": 1,
            "game_id": 1,
            "course": "Grand Portneuf",
            "red": {
                "score": 0,
                "player1": {
                    "first_name": "Rouge1",
                    "last_name": "1",
                    "score": Array(18).fill(0)
                },
                "player2": {
                    "first_name": "Rouge2",
                    "last_name": "2",
                    "score": Array(18).fill(0)
                }
            },
            "blue": {
                "score": 0,
                "player1": {
                    "first_name": "Bleu1",
                    "last_name": "1",
                    "score": Array(18).fill(0)
                },
                "player2": {
                    "first_name": "Bleu2",
                    "last_name": "2",
                    "score": Array(18).fill(0)
                }
            },
            "hole": 1
        }
    }
    
    addGame(day_id, game_id, course, blue_players, red_players) {
            this.game.day_id = day_id,
            this.game.game_id = game_id,
            this.game.course = course,
            this.game.red.player1.name = red_players[0],
            this.game.red.player2.name = red_players[1],
            this.game.blue.player1.name = blue_players[0],
            this.game.blue.player2.name = blue_players[1]
            
            createGame(this.game)
    }
  
    enterScore(blue_player1, blue_player2, red_player1, red_player2) {
        this.game.red.player1.score = red_player1,
        this.game.red.player2.score = red_player2,
        this.game.blue.player1.score = blue_player1,
        this.game.blue.player2.score = blue_player2
    }
}

class CurrentScoreModel {
    constructor() {
        this.game = {
            "game_type": "bestBall_4",
            "team1_scores": [
                Array(18).fill(0),
                Array(18).fill(0)
            ],
            "team2_scores": [
                Array(18).fill(0),
                Array(18).fill(0)
            ]
        }
    }
}

function createGame(game) {
    
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
            console.log(game)
    })();
}

export { CurrentGamesModel, CurrentScoreModel }