import { Selector } from 'testcafe';
import PageFactory from '../util/page.factory'
import SignUpModel from "../page-models/signup.model";
const faker = require("faker");
const Config = require('../config/config');

const page = new PageFactory(Config.app);

fixture `Create new account`
    .beforeEach(async t => {
        t.ctx.registerModel = new SignUpModel(faker.internet.email(), faker.internet.password());
    })
    .page(page.signup());

test('Successfully creates account for Roy', async t => {
    const successMessageElement = Selector("#content").find('.flash.notice');
    await t.ctx.registerModel.signup(t);
    await t.expect(successMessageElement.innerText).eql("Welcome! You have signed up successfully.");
});