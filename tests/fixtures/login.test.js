import { Selector } from 'testcafe';
import PageFactory from '../util/page.factory'
import LoginModel from '../page-models/login.model'
const Config = require('../config/config');

const page = new PageFactory(Config.app);

fixture `User login`
    .beforeEach(async t => {
        t.ctx.loginPage = new LoginModel('spree@example.com', 'spree123');
    })
    .page `${page.login()}`;

test('Successfully login user with username spree@example.com', async t => {
    const successMessageElement = Selector("#content").find('.flash.success');
    await t.ctx.loginPage.login(t);
    await t.expect(successMessageElement.innerText).eql("Logged in successfully");
});

test('Unsuccessful login when username is wrong', async t => {
    const unsuccessfulNotification = Selector("#content").find(".flash.error");
    await t.ctx.loginPage
        .updateUsername('non-authenticate-username@example.com')
        .login(t);
    await t.expect(unsuccessfulNotification.innerText).eql("Invalid email or password.")
});

test('Unsuccessful login when password is wrong', async t => {
    const unsuccessfulNotification = Selector("#content").find(".flash.error");
    await t.ctx.loginPage
        .updatePassword('wrong-password')
        .login(t);
    await t.expect(unsuccessfulNotification.innerText).eql("Invalid email or password.")
});

test('Logout a successfully logged in user', async t => {
    const navBarLinks = Selector("#nav-bar").find("li").nth(1);
    await t.ctx.loginPage
        .login(t);
    await t.expect(navBarLinks.find('a').innerText).eql('LOGOUT')
});
