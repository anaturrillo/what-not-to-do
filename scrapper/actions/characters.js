const waitValues = require('../helpers/waitValues');
const {openNewPage, goto} = require('../helpers/browserHelpers');

const getCharactersLinks = ({page, browser}) => {
  const characterLinks = page.$$eval(".lightbox-caption a", charactersList => {
    return charactersList.reduce((characters, character) => {
      const url = `https://simpsons.fandom.com${character.getAttribute('href')}`;
      const name = character.getAttribute('title');

      return [...characters, {name, url}]
    }, [])
  });

  return waitValues({characterLinks, browser})
};

const getCharacterInfo = browser => (promise, {name, url}) =>
  promise
    .then(characters => {
      return openNewPage(browser)
        .then(goto(url))
        .then(({page}) =>
          page.$$eval('.pi-item', characterInfo =>
            characterInfo.reduce((info, item) => {
              const label = $(item).find('.pi-data-label').text();
              const imageField = $(item).find('.pi-data-value').find('a').find('img');
              const value = imageField.length > 0 ? imageField.attr('alt')
                : $(item).find('.pi-data-value').text();

              return !label ? info : {...info, [label.toLowerCase().replace(/\s/g, '_')]: value}
            }, [])))
        .then(char => [...characters, {...char, name}]);
    });

module.exports = {getCharacterInfo, getCharactersLinks};