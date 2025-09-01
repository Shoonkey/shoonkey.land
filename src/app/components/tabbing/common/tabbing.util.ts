import { Instrument, TabData, TabDefaults, Tuning } from "./tabbing.types";

export class TabUtility {
  static defaults: TabDefaults = {
    instrument: "guitar",
    tuning: TabUtility.getStandardTuning("guitar"),
    fretAmount: 22,
  };

  static getStandardTuning(instrument: Instrument): Tuning {
    switch (instrument) {
      case "guitar":
        return "EADGBE".split("") as Tuning;
      case "uke":
        return "GCEA".split("") as Tuning;
    }
  }

  static getBlankTabContent(lineCount: number) {
    const tabContent = [];

    for (let i = 0; i < lineCount; i++) {
      const line = "--------------------".split("");
      tabContent.push(line);
    }

    return tabContent;
  }

  static getBlankTab() {
    const { instrument, tuning } = this.defaults;
    const content = this.getBlankTabContent(tuning.length);

    const newTab: TabData = {
      instrument,
      tuning,
      content,
    };

    return newTab;
  }
}
