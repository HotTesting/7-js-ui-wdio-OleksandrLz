import { BasePO } from "./base";
import { Currency } from "./fragments/currency";

export class RegionSettingsPO extends BasePO {
  public currency: Currency;

  constructor() {
    super();
    this.currency = new Currency();
  }

  open() {
    super.open("/");
  }

  getCurrentCurrency(): string {
    this.open();
    return $("#region .currency > span").getText();
  }
}

export const RegionSettings = new RegionSettingsPO();
