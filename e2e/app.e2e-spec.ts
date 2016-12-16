import { WDCAngular2Page } from './app.po';

describe('wdc-angular2 App', function() {
  let page: WDCAngular2Page;

  beforeEach(() => {
    page = new WDCAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
