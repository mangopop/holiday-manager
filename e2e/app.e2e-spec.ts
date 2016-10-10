import { HolidayManagerPage } from './app.po';

describe('holiday-manager App', function() {
  let page: HolidayManagerPage;

  beforeEach(() => {
    page = new HolidayManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
