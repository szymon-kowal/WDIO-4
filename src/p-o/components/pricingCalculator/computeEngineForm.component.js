import { $ } from '@wdio/globals';
import Helpers from '../../helpers/helpers.js';

export default class ComputeEngineForm {
    get rootEl() {
        return $('//div[@data-form-title="Compute Engine"]');
    }

    findByString(param) {
        return this.rootEl.$(Helpers.findByTextWithXPath(param));
    }

    get getNumberOfInstancesInput() {
        return $('//input[@type="number"][@value="1"][@max="50000"]');
    }

    get getOperatingSystemSoftwareInput() {
        return $('//*[@aria-controls="c20"]');
    }

    get getMachineFamilyInput() {
        return $('//*[@aria-describedby="c24"]');
    }

    get getSeriesInput() {
        return $('//*[@aria-controls="c28"]');
    }

    get getMachineTypeInput() {
        return $('//*[@aria-describedby="c32"]');
    }

    get getAddGpusBtn() {
        return $('[aria-label="Add GPUs"]');
    }

    get getGpuModelInput() {
        return $('//*[@data-field-type="158"]');
    }

    get getNumberOfGPUsInput() {
        return $('//*[@data-field-type="174"]');
    }

    get getLocalSSDInput() {
        return $('//*[@data-field-type="180"]');
    }

    get getRegionInput() {
        return $('//*[@data-field-type="115"]');
    }

    getOperatingSystemSoftwareOption(option) {
        const selector = {
            'Free: Debian, CentOS, CoreOS, Ubuntu or BYOL (Bring Your Own License)':
                'free-debian-centos-coreos-ubuntu-or-byol-bring-your-own-license',
            'Paid: Ubuntu Pro': 'paid-ubuntu-pro',
            'Paid: Windows Server 2012 R2, Windows Server 2016, Windows Server 2019, Windows Server (2004, 20H2)':
                'paid-windows-server-2012-r2-windows-server-2016-windows-server-2019-windows-server-2004-20h2',
            'Paid: Red Hat Enterprise Linux': 'paid-red-hat-enterprise-linux',
            'Paid: Red Hat Enterprise Linux for SAP with HA and Update Services':
                'paid-red-hat-enterprise-linux-for-sap-with-ha-and-update-services',
        };
        const outputPath = `//ul[@aria-label="Operating System / Software"]/*[@data-value="${selector[option]}"]`;

        Helpers.waitUntilElementIsBeingDisplayed($(outputPath));

        return $(outputPath);
    }

    async selectOperatingSystemSoftwareOption(option) {
        await this.getOperatingSystemSoftwareInput.click();
        await this.getOperatingSystemSoftwareOption(option).click();
    }

    async clickOnProvisioningModelOption(option) {
        const selector = {
            Regular: 'regular',
            'Spot (Preemptible VM)': 'spot',
        };
        const path = `//*[@data-field-type="107"]//*[@id="${selector[option]}"]/..`;
        await $(path).waitForClickable();
        await $(path).click();
    }

    getMachineFamilyOption(option) {
        const selector = {
            'general-purpose': 'general-purpose',
            'compute-optimized': 'compute-optimized',
        };
        return $(
            `//ul[@aria-label="Machine Family"]//*[@data-value="${selector[option]}"]`
        );
    }

    async selectMachineFamilyOption(option) {
        await this.getMachineFamilyInput.click();
        await this.getMachineFamilyOption(option).waitForClickable();
        await this.getMachineFamilyOption(option).click();
    }

    getSeriesOption(option) {
        const selector = {
            n1: 'n1',
            n2: 'n2',
        };
        return $(
            `//ul[@aria-label="Series"]//*[@data-value="${selector[option]}"]`
        );
    }

    async selectSeriesOption(option) {
        await this.getSeriesInput.click();
        await this.getSeriesOption(option).click();
    }

    getMachineTypeOption(option) {
        const selector = {
            'n1-standard-8': 'n1-standard-8',
            'n1-highcpu-64': 'n1-highcpu-64',
        };
        return $(
            `//ul[@aria-label="Machine type"]//*[@data-value="${selector[option]}"]`
        );
    }

    async selectMachineTypeOption(option) {
        (await this.getMachineTypeInput).click();
        (await this.getMachineTypeOption(option)).click();
    }

    getGpuModelOption(option) {
        const selector = {
            'NVIDIA Tesla V100': 'nvidia-tesla-v100',
            'NVIDIA Tesla P100': 'nvidia-tesla-p100',
        };

        return $(
            `//ul[@aria-label="GPU Model"]//*[@data-value="${selector[option]}"]`
        );
    }

    async selectGpuModelOption(option) {
        (await this.getGpuModelInput).click();
        await Helpers.waitUntilElementIsBeingDisplayed(
            this.getGpuModelOption(option)
        );
        await this.getGpuModelOption(option).click();
    }

    getNumberOfGPUsOption(option) {
        const selector = {
            1: '1',
            4: '4',
        };
        return $(
            `//ul[@aria-label="Number of GPUs"]//*[@data-value="${selector[option]}"]`
        );
    }

    async selectNumberOfGPUsOption(option) {
        (await this.getNumberOfGPUsInput).click();
        (await this.getNumberOfGPUsOption(option)).click();
    }

    getLocalSSDOption(option) {
        const selector = {
            '2x375 GB': '2',
            '8x375 GB': '8',
        };
        return $(
            `//*[@aria-label="Local SSD"]//*[@data-value="${selector[option]}"]`
        );
    }

    async selectLocalSSDOption(option) {
        (await this.getLocalSSDInput).click();
        await Helpers.waitUntilElementIsBeingDisplayed(
            this.getLocalSSDOption(option)
        );
        (await this.getLocalSSDOption(option)).click();
    }

    getRegionSelectOption(option) {
        const selector = {
            'Netherlands (europe-west4)': 'europe-west4',
            'Belgium (europe-west1)': 'europe-west1',
        };
        return $(
            `//ul[@aria-label="Region"]//*[@data-value="${selector[option]}"]`
        );
    }

    async selectRegionSelectOption(option) {
        (await this.getRegionInput).click();
        (await this.getRegionSelectOption(option)).click();
    }

    getCommitedUseDiscountOption(option) {
        const selector = {
            none: 'none',
            '1 year': '1-year',
            '3 years': '3-years',
        };
        return $(
            `//*[@data-field-type="116"]//*[@id="${selector[option]}"]/..`
        );
    }
}
