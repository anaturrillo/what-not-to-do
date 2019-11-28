const fs = require('fs').promises;
const {getCharacterInfo, getCharactersLinks} = require('./actions/characters');
const {openNewPage, goto, launch, logAndReturn} = require('./helpers/browserHelpers');
const waitValues = require('./helpers/waitValues');
const {filePath} = require('./config');

const simpsonsHost = 'https://simpsons.fandom.com/wiki';
const theSimpsoooons = simpsonsHost + `/Portal:All_Simpson_Characters`;
const local = 'http://localhost:3008';

const mentira = () => Promise.resolve();

 return launch()
  .then(openNewPage)
  .then(goto(theSimpsoooons))
  .then(getCharactersLinks)
  .then(({characterLinks, browser}) =>
    characterLinks
      .slice(0,15)
      .reduce(getCharacterInfo(browser), Promise.resolve([])))
   .then(characters => {
     console.log(JSON.stringify(characters))
   })
  .then(characters => waitValues({characters, fd: fs.open(filePath, 'a')}))
  .then(({fd, characters}) => fs.writeFile(fd, JSON.stringify(characters)))
  .catch(e => {
    console.log(e)
  });