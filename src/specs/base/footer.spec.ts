import { Footer as FooterComponent } from '../../page-components/page-components';
import {
  Auth as AuthActions,
  Main as MainActions,
} from '../../page-actions/page-actions';

const footerComponent = new FooterComponent();
const authActions = new AuthActions();
const mainActions = new MainActions();

describe('Footer', async function () {
  it('should be visible on main page', async function () {
    await mainActions.openPage();

    await footerComponent.Element_Container.waitForExist();
  });

  it('should be visible on sign in page', async function () {
    await authActions.openSignInPage();

    await footerComponent.Element_Container.waitForExist();
  });

  it('should be at the bottom of a page', async function () {
    await authActions.openSignInPage();

    const html = await $('html');
    const footer = await footerComponent.Element_Container;
    const { y: footerTop, height: footerHeight } = await browser.getElementRect(
      footer.elementId,
    );
    const footerBottom = footerTop + footerHeight;
    const { height: pageHeight } = await browser.getElementRect(html.elementId);

    expect(footerBottom).toBeGreaterThanOrEqual(pageHeight);
  });
});
