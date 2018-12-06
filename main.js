const dreams = require('./dreaming.json');
// const fs = require('fs');

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
  let wordArrayTotal = [];
  let wordArray = [];
  for (let word in words) {
    if (words[word]) {
      wordArrayTotal.push({ [word]: words[word] });
    }
    if (words[word] < 500 && words[word] > 5) {
      wordArray.push({ [word]: words[word] });
    }
  }

  console.log(wordArrayTotal.length);

  return wordArray.sort((a, b) => {
    return Object.values(b)[0] - Object.values(a)[0];
  });
};

// console.log(maxWord(dreamWordsCount));

console.log(rangeOfWords(dreamWordsCount));
