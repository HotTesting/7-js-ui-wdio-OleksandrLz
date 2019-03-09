import { Input } from "./input";

export class ShoppingCart {
  protected containerLocator: string;
  protected get container() {
    return $(this.containerLocator);
  }
  protected quantity: Input = new Input(() => {
    return $('input[name*="quantity"]');
  });

  getQuantity(): number {
    const quantityNumberInput = $('input[name*="quantity"]');
    quantityNumberInput.waitForDisplayed(4000);
    return Number(quantityNumberInput.getValue());
  }

  removeFromCart(): any {
    $("button[name='remove_cart_item']").click();
  }

  increaseForOneItem(): any {
    const items = this.getQuantity();
    const quantityNumberInput = $('input[name*="quantity"]');
    quantityNumberInput.waitForDisplayed(4000);
    quantityNumberInput.clearValue();
    return quantityNumberInput.setValue(items + 1);
  }

  decreaseForOneItem(): any {
    const items = this.getQuantity();
    const quantityNumberInput = $('input[name*="quantity"]');
    quantityNumberInput.clearValue();
    $(".loader-wrapper").waitForDisplayed(undefined, true); // waiting when loader become disabled
    return quantityNumberInput.setValue(items - 1);
  }

  updateCart(): any {
    $(".loader-wrapper").waitForDisplayed(undefined, true); // waiting when loader become disabled
    const updateButton = $("button[name='update_cart_item']");
    updateButton.waitForDisplayed(4000);
    updateButton.click();
  }

  getRemoveText(): string {
    const RemoveText = $("#box-checkout > .cart.wrapper em");
    RemoveText.waitForDisplayed(4000);
    return RemoveText.getText();
  }

  constructor(containerLocator: string) {
    this.containerLocator = containerLocator;
  }
}
