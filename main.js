const dreams = require('./dreaming.json');
const fs = require('fs');

let dreamWordsCount = {};

for (let dream of dreams) {
  const dreamWords = dream.dream.split(' ');
  for (let word of dreamWords) {
    let letterNumberOnlyArray = word.match(/[a-zA-Z0-9]/g);
    if (letterNumberOnlyArray) {
      let lowerCaseWord = letterNumberOnlyArray.join('').toLowerCase();
      if (!dreamWordsCount[lowerCaseWord]) {
        dreamWordsCount[lowerCaseWord] = 1;
      } else {
        dreamWordsCount[lowerCaseWord]++;
      }
    }
  }
}

const maxWord = words => {
  let max = 0;
  let maxWord = '';
  for (let word in words) {
    if (words[word] > max) {
      max = words[word];
      maxWord = word;
    }
  }
  return { maxWord, max };
};

const rangeOfWords = words => {
  let wordArray = [];
  for (let word in words) {
    if (words[word] < 100 && words[word] > 5) {
      wordArray.push({ [word]: words[word] });
    }
  }
  fs.writeFile('words.csv', JSON.stringify(wordArray), err => {
    if (err) throw err;
    console.log('The file has been saved');
  });

  return wordArray;
};

// console.log(maxWord(dreamWordsCount));

console.log(
  rangeOfWords(dreamWordsCount).sort((a, b) => {
    return a - b;
  })
);
