import { $ } from '@wdio/globals';
import Helpers from '../../helpers/helpers.js';

export default class AddToEstimateModal {
    get rootEl() {
        return $('//div[@aria-label="Add to this estimate"]');
    }

    findByString(param) {
        return this.rootEl.$(Helpers.findByTextWithXPath(param));
    }

    async getComputeEngineBtn() {
        const selector = this.rootEl.$('//div[@data-service-form="8"]');
        return selector;
    }

    async waitAndClickForComputeEngineBtn() {
        const selector = this.rootEl.$('//div[@data-service-form="8"]');
        await Helpers.waitUntilElementIsBeingDisplayed(selector);
        await selector.click();
    }

    items(param) {
        const selectors = {
            computeEngineBtn: '//div[@data-service-form="8"]',
        };
        return this.rootEl.$(`${selectors[param]}`);
    }
}
