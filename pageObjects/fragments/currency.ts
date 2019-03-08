export class Currency {
  changeCurrencyToEUR() {
    const changeButton = $('a[href$="regional_settings"]');
    changeButton.waitForDisplayed(4000);
    changeButton.click();    

    const currencySelect = $('#box-regional-settings div.select-wrapper');
    currencySelect.waitForDisplayed(4000);
    currencySelect.click();

    const currencyValueEUR = $("option[value='EUR']");
    currencyValueEUR.waitForDisplayed(4000);
    currencyValueEUR.click();

    $("button[value='Save']").click();
  }
}
