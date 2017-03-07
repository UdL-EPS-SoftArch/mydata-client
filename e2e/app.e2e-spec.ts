import { MydataClientPage } from './app.po';

describe('mydata-client App', () => {
  let page: MydataClientPage;

  beforeEach(() => {
    page = new MydataClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
