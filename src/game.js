const crypto = require('crypto')
const Dictionary = require('./dictionary.js')
const JSONDb = require('./json-db.js')

class Game {
  constructor({
    word,
    hint,
    leftAttempts = 5
  } = {}) {
    this.word = word
    this.hint = hint
    this.leftAttempts = leftAttempts
  }

  static create(configure = {}) {
    return Dictionary.getWord(configure.difficulty, configure.includePunctuation)
      .then(word => {        
        const newGame = new Game({
          word: word,
          hint: Game.createHint(word),
          leftAttempts: configure.maxAttempts
        })
        newGame.id = crypto.randomBytes(12).toString('hex');
        return JSONDb.save(newGame)
      })
      .then(savedGame => {
        delete savedGame.word
        return savedGame;
      })
  }

  static createHint(word) {
    console.log(word);
    // TODO replace duplicate characters too in hint
    const wordLength = word.length
    const index = Math.floor(Math.random() * wordLength);
    const character = word[index];
    //console.log(character);   
    return Array.from(word).map((ch, i) => ch === character ? ch : '_').join(' ')
  }

  static updateHint({
    hint,
    word,
    letter
  } = {}) {
    let hintArr = hint.split(' ')    
    Array.from(word).forEach((ch, i) => {
      if (ch === letter) {
        hintArr[i] = letter;
      }
    })
    return hintArr.join(' ');
  }

  static hintEqualsWord({
    hint,
    word
  } = {}) {
    if (hint.split(' ').join('') === word) {
      //console.log(`${hint} :: ${word}`)
      return true;
    }
    return false;
  }

  static attempt(gameId, attempt) {
    return JSONDb.getGameById(gameId)
      .then(game => {
        if (game.word.includes(attempt.letter)) {
          // TODO udpate hint and save that          
          game.hint = Game.updateHint({
            hint: game.hint,
            word: game.word,
            letter: attempt.letter
          })
          game.isInvalid = false;
          game.isDone = Game.hintEqualsWord({
            hint: game.hint,
            word: game.word
          });
          if (game.isDone) {
            return JSONDb.delete(game);
          }
          return JSONDb.save(game);
        }
        if (game.leftAttempts > 0) {
          game.leftAttempts--;
          game.isInvalid = true;
        } else {
          game.isGameOver = true;
        }
        return JSONDb.save(game);
      })
      .then(savedGame => {
        delete savedGame.word;
        return savedGame;
      })
      //.catch()
  }
}

module.exports = Game