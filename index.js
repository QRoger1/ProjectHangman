const express = require('express')
const app = express()
const Dictionary = require('./src/dictionary.js')
const WordReader = require('./src/word-reader.js')
const ConvertJson = require('./src/convert-object-json.js')
const Game = require('./src/game.js')
const MapDataString = require("./assets/saved-games.json");
let MapDataGames =new Map();

Dictionary.getWord().then(word => console.log('word: ', word))

MapDataGames = ConvertJson.objectToStrMap(MapDataString);

app.get('/gameInstance', (req, res) => {

    let initGame ={
        id: 2,
        hint: '_ _ _ _ A',
        leftAttempts: 5,
        image: `
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
`
    };
    
    MapDataGames.set(initGame.id, initGame);
    WriteObjectToJson({path:'./assets/saved-games.json'}, ConvertJson.strMapToObject(MapDataGames));
    res.send(initGame);    
})

app.get('/game', (req, res) => {
    
    var dato =Game.create()
        .then(game => {
            MapDataGames.set(game.id, game);    
            WordReader.WriteObjectToJson({path:'./assets/saved-games.json'}, ConvertJson.strMapToObject(MapDataGames));
            res.send(game)            
        })
        .catch(err => {
            res.status(500).send({
                error: 'Game could not be created'
            })
        });    
    return dato;
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})
