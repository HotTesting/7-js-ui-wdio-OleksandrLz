import { BasePO } from "./base";
export class ProductDetailsPO extends BasePO {
  addToCart(): any {
    $("button.btn-success").click();
    browser.pause(1000); // yes, i know
  }

  getProductCurrency(): string {
    const productCurrencyText = $("#box-product .price-wrapper > .price");
    productCurrencyText.waitForDisplayed(4000);
    const productCurrency = productCurrencyText.getText().slice(-1);
    return productCurrency;
  }
}

export const ProductDetails = new ProductDetailsPO();
