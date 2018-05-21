import { Selector } from 'testcafe';
import PageFactory from '../util/page.factory'
import SearchModel from "../page-models/search.model";
const Config = require('../config/config');
const SearchData = require('../data/search').search;

const page = new PageFactory(Config.app);

fixture `Search`
    .beforeEach(async t => {
        t.ctx.searchModel = new SearchModel();
    })
    .page(page.home());

SearchData.forEach(productQuery => {
    test(`Search for ${productQuery.query}`, async t => {
        const productList = Selector("#products").find('li');
        await t.ctx.searchModel.search(t, productQuery.query);
        for (let start = 0; start < productQuery.products.length; start++) {
            const searchedProductSelector = productList.nth(start);
            const product = productQuery.products[start];
            await t.expect(searchedProductSelector.find(".info").innerText).eql(product.name);
            await t.expect(searchedProductSelector.find(".price").innerText).eql(product.price);
        }
    });
});
