export enum TabbingToolErrorCode {
  TabNotFound,
}

export class TabbingToolError {
  static errorMessages: Record<TabbingToolErrorCode, string> = {
    [TabbingToolErrorCode.TabNotFound]:
      "Unable to find tab on the local storage of your device. Sorry :c",
  };

  static getErrorMessage(code: TabbingToolErrorCode) {
    return this.errorMessages[code];
  }
}
