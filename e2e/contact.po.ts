import { browser, by, element } from 'protractor';

export class ContactPage {
  navigateTo() {
    return browser.get('/contact');
  }

  async getCodeResponse() {
    return await element(by.css('app-contact code')).getText();
  }
}
