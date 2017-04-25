import { FriendsAppPage } from './app.po';

describe('friends-app App', () => {
  let page: FriendsAppPage;

  beforeEach(() => {
    page = new FriendsAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
