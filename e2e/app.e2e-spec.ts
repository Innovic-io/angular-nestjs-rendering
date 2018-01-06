import { AppPage } from './app.po';
import { ContactPage } from './contact.po';

describe('angular-nestjs-render App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Universal App ( Server side rendering ) using NestJS and Angular 5+');
  });

  it('navigate to contact page', async () => {
    const contact = new ContactPage();

    contact.navigateTo();
    const response = await contact.getCodeResponse();
    expect(response).toEqual('{ "message": "Hello World!" }');
  });
});
