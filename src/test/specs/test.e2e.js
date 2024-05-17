import { browser } from '@wdio/globals';
import { expect } from 'chai';
import IndexPage from '../../p-o/pages/index.page.js';
import PricingCalculatorPage from '../../p-o/pages/pricingCalculator.page.js';
import CostSummaryPage from '../../p-o/pages/costSummary.page.js';
import SearchResultPage from '../../p-o/pages/searchResult.page.js';
import { baseTestData } from '../../test-data/baseTestData.js';
import { moreExpensiveEnigneTestData } from '../../test-data/moreExpensiveEnigneTestData.js';
import Helpers from '../../p-o/helpers/helpers.js';

const indexPage = new IndexPage();
const searchResultPage = new SearchResultPage();
const pricingCalculatorPage = new PricingCalculatorPage();
const costSummaryPage = new CostSummaryPage();

describe('Google Cloud Platform Pricing Calculator', () => {
    beforeEach(async () => {
        await indexPage.open();
        await indexPage.removePopups();
    });

    it('should open the index page and confirm the search bar is functional @Smoke', async () => {
        expect(await browser.getUrl()).to.be.equal('https://cloud.google.com/');
        await indexPage.header.searchBar.click();
        await indexPage.header.searchBar.setValue(
            'Google Cloud Platform Pricing Calculator'
        );
        browser.keys('Enter');
        expect(await searchResultPage.rootEl.isDisplayed()).to.be.true;
    });

    it('should navigate to the pricing calculator page from search results @Smoke', async () => {
        await indexPage.header.searchBar.click();
        await indexPage.header.searchBar.setValue(
            'Google Cloud Platform Pricing Calculator'
        );
        browser.keys('Enter');
        await searchResultPage
            .findByString('Google Cloud Pricing Calculator')
            .click();
        expect(await pricingCalculatorPage.midFirstComp.rootEl.isDisplayed()).to
            .be.true;
    });

    it('should confirm the interaction with "Add to estimate" is functional @Smoke', async () => {
        await indexPage.header.searchBar.click();
        await indexPage.header.searchBar.setValue(
            'Google Cloud Platform Pricing Calculator'
        );

        browser.keys('Enter');

        await searchResultPage
            .findByString('Google Cloud Pricing Calculator')
            .click();

        await pricingCalculatorPage.midFirstComp
            .findByString('Add to estimate')
            .click();

        await Helpers.waitUntilElementIsBeingDisplayed(
            pricingCalculatorPage.addToEstimateModal.rootEl
        );

        expect(
            await pricingCalculatorPage.addToEstimateModal.rootEl.isDisplayed()
        ).to.be.true;
    });
});

describe('Google Cloud Platform Pricing Calculator displays correct data on summary', () => {
    beforeEach(async () => {
        await indexPage.open();
        await indexPage.removePopups();
    });

    checkIfDataIsDisplayedOnLastPage(baseTestData, 'Base test data');
    checkIfDataIsDisplayedOnLastPage(
        moreExpensiveEnigneTestData,
        'More Expensive test data'
    );
});

function checkIfDataIsDisplayedOnLastPage(inpTestData, testDataName) {
    it(`should calculate the cost and display it for specific compute engine settings with : ${testDataName}`, async () => {
        const testData = inpTestData;

        await indexPage.header.searchBar.click();
        await indexPage.header.searchBar.setValue(
            'Google Cloud Platform Pricing Calculator'
        );

        browser.keys('Enter');

        await searchResultPage
            .findByString('Google Cloud Pricing Calculator')
            .click();

        await pricingCalculatorPage.midFirstComp
            .findByString('Add to estimate')
            .click();

        await pricingCalculatorPage.addToEstimateModal.waitAndClickForComputeEngineBtn();

        await pricingCalculatorPage.getCloseBtnPopup();

        await pricingCalculatorPage.computeEngineForm.getNumberOfInstancesInput.setValue(
            testData.numberOfInstances
        );

        await pricingCalculatorPage.computeEngineForm.selectOperatingSystemSoftwareOption(
            testData.operatingSystemSoftware
        );

        await pricingCalculatorPage.computeEngineForm.clickOnProvisioningModelOption(
            testData.provisioningModel
        );

        await pricingCalculatorPage.computeEngineForm.selectMachineFamilyOption(
            testData.machineFamily
        );

        await pricingCalculatorPage.computeEngineForm.selectSeriesOption(
            testData.series
        );

        await pricingCalculatorPage.computeEngineForm.selectMachineTypeOption(
            testData.machineType
        );

        await pricingCalculatorPage.computeEngineForm.getAddGpusBtn.click();

        await Helpers.waitUntilElementIsBeingDisplayed(
            pricingCalculatorPage.computeEngineForm.getGpuModelInput
        );

        await pricingCalculatorPage.computeEngineForm.selectGpuModelOption(
            testData.gpuModel
        );

        await pricingCalculatorPage.computeEngineForm.selectNumberOfGPUsOption(
            testData.numberOfGPUs
        );

        await pricingCalculatorPage.computeEngineForm.selectLocalSSDOption(
            testData.localSSD
        );

        await pricingCalculatorPage.computeEngineForm.selectRegionSelectOption(
            testData.regionSelect
        );

        await pricingCalculatorPage.computeEngineForm
            .getCommitedUseDiscountOption(testData.commitedUseDiscount)
            .click();

        await Helpers.waitUntilElementIsBeingDisplayed(
            pricingCalculatorPage.costDetailPanel.getShareEstimatedCostBtn
        );

        await browser.pause(1000);

        await pricingCalculatorPage.costDetailPanel.getShareEstimatedCostBtn.click();

        await Helpers.waitUntilElementIsBeingDisplayed(
            pricingCalculatorPage.shareEstimatePopup.findByString(
                'Open estimate summary'
            )
        );

        await pricingCalculatorPage.shareEstimatePopup
            .findByString('Open estimate summary')
            .click();

        await browser.pause(1000);
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[handles.length - 1]);

        await Helpers.waitUntilElementIsBeingDisplayed(
            costSummaryPage.totalCostModal.getTotalEstimatedCostValue
        );

        const numberOfInstances =
            await costSummaryPage.selectedOptions.getNumberOfInstancesValue.getText();
        const operatingSystemSoftware =
            await costSummaryPage.selectedOptions.getOperatingSystemSoftwareValue.getText();
        const provisioningModel =
            await costSummaryPage.selectedOptions.getProvisioningModelValue.getText();
        const machineType =
            await costSummaryPage.selectedOptions.getMachineTypeValue.getText();
        const gpuModel =
            await costSummaryPage.selectedOptions.getGPUModelValue.getText();
        const numberOfGPUs =
            await costSummaryPage.selectedOptions.getNumberOfGPUsValue.getText();
        const localSSD =
            await costSummaryPage.selectedOptions.getLocalSSDValue.getText();
        const regionSelect =
            await costSummaryPage.selectedOptions.getRegionSelectValue.getText();
        const commitedUseDiscount =
            await costSummaryPage.selectedOptions.getCommitedUseDiscountValue.getText();

        expect(numberOfInstances).to.equal(
            testData.numberOfInstances.toString()
        );
        expect(operatingSystemSoftware).to.equal(
            testData.operatingSystemSoftware
        );
        expect(provisioningModel).to.equal(testData.provisioningModel);
        expect(machineType.split(',')[0].trim()).to.equal(testData.machineType);
        expect(gpuModel).to.equal(testData.gpuModel);
        expect(numberOfGPUs).to.equal(testData.numberOfGPUs);
        expect(localSSD).to.equal(testData.localSSD);
        expect(regionSelect).to.equal(testData.regionSelect);
        expect(commitedUseDiscount).to.equal(testData.commitedUseDiscount);
    });
}
