import { Selector } from 'testcafe';

export default class SearchModel {
    constructor() {
        this.searchField = Selector("#keywords");
        this.searchButton = Selector('[type="submit"]');
    }

    async search(t, query) {
        return t
            .typeText(this.searchField, query)
            .click(this.searchButton);
    }

}