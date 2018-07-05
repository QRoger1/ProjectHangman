const fs = require('fs')
let words = [];

function readWords ({path = ''} = {}) {
	return new Promise((resolve, reject) => {
		if (words.length === 0) {
			fs.readFile(path, 'utf-8', (err, data) => {
			  if (err) {
			  	return reject(err)
			  };
			  words = data.split('\n').map(word => word.replace('\r', ''))
			  resolve(words)
			});
			return;
		}

		return resolve(words)		
	})
}

function WriteObjectToJson({path = ''} = {}, dataGames){
	let dataGame = JSON.stringify(dataGames);  	
	 return new Promise(function(resolve, reject) {
            fs.writeFile(path, JSON.stringify(dataGame), function(err) {
               if (err) reject(err);
               else resolve(dataGame);
            });
    });  
}

module.exports = readWords;
module.exports.WriteObjectToJson = WriteObjectToJson;