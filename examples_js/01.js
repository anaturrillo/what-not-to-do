// instead of:

const theSimpsons = require('./theSimpsons.json');

const femaleCharacters = [];
const maleCharacters = [];

theSimpsons.forEach(character => {
  if (character.sex === 'Female') femaleCharacters.push(character);

  if (character.sex === 'Male') maleCharacters.push(character)
});

// do:
const isFemale = character => character === 'Female';
const isMale = character => character === 'Male';

const femaleCharacters_trw = theSimpsons.filter(isFemale);
const maleCharacters_trw = theSimpsons.filter(isMale);


const theSimpsonIndex = {};

theSimpsons.forEach(character => {
  const key = character.name.replace(/\s/g,'_').toLowerCase();
  if (theSimpsonIndex[name]) {
    theSimpsonIndex[name] = character
  }
});