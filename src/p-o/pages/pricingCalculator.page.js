import { $ } from '@wdio/globals';
import DefaultPage from '../basic.page.js';
import CommonHeader from '../components/common/commonHeader.component.js';
import MidStart from '../components/pricingCalculator/midStart.component.js';
import AddToEstimateModal from '../components/pricingCalculator/addToEstimateModal.component.js';
import ComputeEngineForm from '../components/pricingCalculator/computeEngineForm.component.js';
import CostDetailPanel from '../components/pricingCalculator/costDetailsPanel.component.js';
import ShareEstimatePopup from '../components/pricingCalculator/shareEstimatePopup.component.js';

export default class PricingCalculatorPage extends DefaultPage {
    constructor() {
        super();
        this.header = new CommonHeader();
        this.midFirstComp = new MidStart();
        this.addToEstimateModal = new AddToEstimateModal();
        this.computeEngineForm = new ComputeEngineForm();
        this.costDetailPanel = new CostDetailPanel();
        this.shareEstimatePopup = new ShareEstimatePopup();
    }

    async getCloseBtnPopup() {
        try {
            const element = await $('span.close');
            if (
                await element.waitForDisplayed({
                    timeout: 9500,
                    reverse: false,
                })
            ) {
                await element.click();
            }
        } catch (error) {
            console.log(
                'span.close is not displayed or not clickable',
                error.message
            );
        }
    }
}
