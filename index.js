const express = require('express')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Game = require('./src/game.js')

app.get('/game', (req, res) => {
    //console.log(req.query)    
    Game.create(req.query)
        .then(game => {
            res.send(game)            
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                error: 'Game could not be created'
            })
        })
})

app.post('/game/:gameId/attempt', (req, res) => {    
    const gameId = req.params.gameId
    const attempt = req.body
    console.log(gameId);    
    Game.attempt(gameId, attempt)
      .then(result => {
        console.log(`don ${result.isDone} is ${result.isGameOver} valid ${result.isInvalid}`);
        if (result.isDone) {
          res.status(200).send({
            message: 'You won!'
          })
          return;
        }
        if (result.isGameOver) {
          res.status(500).send({
            error: 'You lose XD'
          })
          return;
        }
        if (result.isInvalid) {
          res.status(400).send(result)
          return;
        }
        res.status(200).send(result)
      })
      .catch(err => {
        console.log(err)
      })
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})
