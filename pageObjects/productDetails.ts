import { BasePO } from "./base";
export class ProductDetailsPO extends BasePO {
  addToCart(): any {
    $("button.btn-success").click();
    browser.pause(1000); // yes, i know
  }
}

export const ProductDetails = new ProductDetailsPO();