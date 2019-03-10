import { BasePO } from "./base";
import { RegionSettings } from "./fragments/regionSettings";

export class MainSettingsPO extends BasePO {
  public regionSettings: RegionSettings;

  constructor() {
    super();
    this.regionSettings = new RegionSettings ();
  }

  open() {
    super.open("/");
  }

}

export const MainSettings = new MainSettingsPO();