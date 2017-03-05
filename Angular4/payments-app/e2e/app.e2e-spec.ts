import { PaymentsAppPage } from './app.po';

describe('payments-app App', () => {
  let page: PaymentsAppPage;

  beforeEach(() => {
    page = new PaymentsAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
