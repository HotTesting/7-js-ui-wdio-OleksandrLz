import { BasePO } from "../base";
import { Currency } from "./currency";

export class RegionSettings extends BasePO {
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
