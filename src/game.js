const Dictionary = require('./dictionary.js')

class Game {
    constructor() {        
    }

    static create(a, b) {
        let keyId = Math.floor(Math.random() * 999999);
        let game = {};
        game.id= keyId;        
        game.hint = "_ _ _ _ A";
  		game.leftAttempts = 6;
  		game.image = `
 |_____________
 |            | 
 |           ( )
 |            |
 |           /|\\
 |          / | \\
 |            |
 |           / \\
 |          /   \\
 |         /     \\
 |
`;

	

    return new Promise((resolve, reject) => {
		resolve(game);
    });

    };
}

module.exports = Game;