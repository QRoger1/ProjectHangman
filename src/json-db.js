const fs = require('fs')

class JSONDb {
	static save(game) {
		return new Promise((resolve, reject) => {
			const JSON_DB = requireReload('./saved-games.json');
			JSON_DB[game.id] = game

			fs.writeFile('./src/saved-games.json', JSON.stringify(JSON_DB, null, 4), (err, response) => {
				if (err) {
					return reject(err)
				}

				resolve(game)
			})
		})
	}

	static getGameById(gameId) {
		return new Promise((resolve, reject) => {
			const JSON_DB = requireReload('./saved-games.json');
			const game = JSON_DB[gameId];
			if (game === undefined) {
				return reject('Game not found');
			}
			resolve(game);
		})
	}

	static delete(game) {
		return new Promise((resolve, reject) => {
			const JSON_DB = requireReload('./saved-games.json');
			delete JSON_DB[game.id];

			fs.writeFile('./src/saved-games.json', JSON.stringify(JSON_DB, null, 4), (err, response) => {
				if (err) {
					return reject(err)
				}

				resolve(game)
			})
		})
	}
}

var requireReload =  function(modulePath){
    delete require.cache[require.resolve(modulePath)];
    return require(modulePath);
};

module.exports = JSONDb