const puppeteer = require('puppeteer');
const waitValues = require('./waitValues');

const logAndReturn = message => result => {
  console.log(message);
  return result;
};
const openNewPage = browser => waitValues({page: browser.newPage(), browser})
  .catch(logAndReturn('Error Abrir ventana'));

const goto = url => ({page, browser}) => waitValues({page, browser, open: page.goto(url)})
  .catch(logAndReturn('Error abriendo URL'));

const launch = () => puppeteer.launch()
  .catch(logAndReturn('Error Lanzamiento'));

module.exports = {
  logAndReturn,
  openNewPage,
  goto,
  launch
};