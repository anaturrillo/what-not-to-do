const puppeteer = require('puppeteer');
const waitValues = require('./helpers/waitValues');

const logAndReturn = message => result => {
  console.log(message);
  return result;
};
const openNewPage = browser => waitValues({page: browser.newPage(), browser})
    .then(logAndReturn('Abrir ventana'))
    .catch(logAndReturn('Error Abrir ventana'));

const goto = url => ({page, browser}) => waitValues({page, browser, open: page.goto(url)})
    .then(logAndReturn('Abrir URL'))
    .catch(logAndReturn('Error abriendo URL'));

const launch = () => puppeteer.launch()
    .then(logAndReturn('Lanzamiento'))
    .catch(logAndReturn('Error Lanzamiento'));

const simpsonsHost = 'https://simpsons.fandom.com/wiki';
const theSimpsoooons = simpsonsHost + `/Portal:All_Simpson_Characters`;
const local = 'http://localhost:3008';

return launch()
    .then(openNewPage)
    .then(goto(theSimpsoooons))
    .then(({page, browser}) => {

        const characterLinks = page.$$eval(".lightbox-caption a", charactersList => {
            return charactersList.reduce((characters, character) => {
                const url = `https://simpsons.fandom.com${character.getAttribute('href')}`;
                const name = character.getAttribute('title');

                return [...characters, {name, url}]
            }, [])
        });

        return waitValues({characterLinks, browser})
    })
    .then(({characterLinks, browser}) => {
        const url = characterLinks[121].url;
        const name = characterLinks[121].name;

        characterLinks.reduce((promise, link) => {
            promise
                .then(() => {
                    return openNewPage(browser)
                        .then(goto(url))
                        .then(({page}) => {
                            return page.$$eval('.pi-item', characterInfo =>
                                characterInfo.reduce((info, item) => {
                                    const label = $(item).find('.pi-data-label').text();
                                    const imageField = $(item).find('.pi-data-value').find('a').find('img');
                                    const value = imageField.length > 0 ? imageField.attr('alt')
                                        : $(item).find('.pi-data-value').text();

                                    return !label ? info : {...info, [label.toLowerCase().replace(/\s/g, '_')]:value}
                                }, {}))
                        })
                })
                .then(() => {
                    
                })
        }, Promise.resolve())
    })
    .catch(e => {
        console.log(e)
    });