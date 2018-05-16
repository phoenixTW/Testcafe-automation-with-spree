import { Selector } from 'testcafe';

fixture `Getting Started`
    .page `http://192.168.33.10:3000/`;

test('Open spree commerce page', async t => {
    await t
        .click("#link-to-login")
        .expect(Selector("#existing-customer").find("h6").innerText).eql("LOGIN AS EXISTING CUSTOMER");
});