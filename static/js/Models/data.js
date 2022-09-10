
const players = [
    ["JP Bédard", "S Verville", "M Bédard", "M-A Carrier"],
    ["S Racicot", "S Benoit", "M Salvail", "J Ventura"],
    ["JF Gagné", "S Clavel", "B Pasqualetto", "JF Théroux"],
    ["M Traversy", "M. Double", "F Giroux", "F Michaud"],
    ["E Viau", "C Pouliot", "F Bergeron", "E Cantin"],
    ["S Salvail", "E Roy", "C Chapman", "JF Poirier"],
    ["J Gendron", "E Larrivee", "M Verville", "D Potvin"]
]

export var data = players.map((players, index) => {
    return {"day_id": 1,
    "game_id": index + 1,
    "course": "",
    "red": {
        "score": 0,
        "player1": {
            "first_name": "",
            "last_name": players[0],
            "score": Array(18).fill(0)
        },
        "player2": {
            "first_name": "",
            "last_name": players[1],
            "score": Array(18).fill(0)
        }
    },
    "blue": {
        "score": 0,
        "player1": {
            "first_name": "",
            "last_name": players[2],
            "score": Array(18).fill(0)
        },
        "player2": {
            "first_name": "",
            "last_name": players[3],
            "score": Array(18).fill(0)
        }
    },
    "hole": 0}
})