const readWords = require('./word-reader.js')

class Dictionary {
  static accentedWord(word) {
    let expression = /^[a-zA-Z]*$/;
    if (expression.exec(word) === null) {
      return true;
    }
    return false;
  }

  static getWord(difficulty = null, includePunctuation) {
    return readWords({
        path: './assets/es-ES.dic'
      })
      .then(totalWords => {
        const index = Math.floor(Math.random() * (totalWords.length + 1));        
        if (difficulty === null) {
           return totalWords[index];
        }
        for (var i = index; i < totalWords.length; i++) {
          let isAccented = Dictionary.accentedWord(totalWords[i]);          
          if (`${isAccented}` === `${includePunctuation}`) {            
            if (difficulty === 'hard' && totalWords[i].length > 8) {
              return totalWords[i];
            }
            if (difficulty === 'easy' && totalWords[i].length > 5 && totalWords[i].length <= 8) {
              return totalWords[i];
            }
            if (difficulty === 'super-easy' && totalWords[i].length <= 5) {
              return totalWords[i];
            }
          }
        }
        for (var i = index; i > 0; i--) {
          let isAccented = Dictionary.accentedWord(totalWords[i]);          
          if (`${isAccented}` === `${includePunctuation}`) {
            if (difficulty === 'hard' && totalWords[i].length > 8) {
              return totalWords[i];
            }
            if (difficulty === 'easy' && totalWords[i].length > 5 && totalWords[i].length <= 8) {
              return totalWords[i];
            }
            if (difficulty === 'super-easy' && totalWords[i].length <= 5) {
              return totalWords[i];
            }
          }
        }
        return 'ERROR';
      })
  }
}

module.exports = Dictionary;