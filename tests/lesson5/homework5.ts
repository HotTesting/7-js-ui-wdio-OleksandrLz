import { expect } from "chai";
import { ProductDetails, Checkout, RegionSettings } from "../../pageObjects";

describe("Cart", function() {
  beforeEach(function() {
    ProductDetails.open("/rubber-ducks-c-1/purple-duck-p-5");
    ProductDetails.addToCart();
    Checkout.open();
  });
  afterEach(function() {
    if ($("#box-checkout-cart").isDisplayed()) {
      Checkout.open();
      Checkout.shoppingCart.removeFromCart();
    }
  });

  it("adding one item to cart should be successful", function() {
    const itemsCount = Checkout.shoppingCart.getQuantity();
    expect(itemsCount).to.equal(1);
  });

  it("removing one item from cart should be successful", function() {
    Checkout.shoppingCart.removeFromCart();
    const removeText = Checkout.shoppingCart.getRemoveText();
    expect(removeText).to.contain("There are no items in your cart.");
  });

  // from 1 to 2
  it("increasing item quantity in cart should be successful", function() {
    Checkout.shoppingCart.increaseForOneItem();
    Checkout.shoppingCart.updateCart();
    const itemsCount = Checkout.shoppingCart.getQuantity();
    expect(itemsCount).to.equal(2);
  });

  // from 2 to 1
  it("decreasing item quantity in cart should be successful", function() {
    ProductDetails.open("/rubber-ducks-c-1/purple-duck-p-5");
    ProductDetails.addToCart(); // add one more item

    Checkout.open();
    Checkout.shoppingCart.decreaseForOneItem();
    Checkout.shoppingCart.updateCart();
    const itemsCount = Checkout.shoppingCart.getQuantity();
    expect(itemsCount).to.equal(1);
  });
});

describe("Prices", function() {
  it("can be switched to EUR", function() {
    RegionSettings.open();
    RegionSettings.currency.changeCurrencyToEUR();
    const currency = RegionSettings.getCurrentCurrency();
    expect(currency).to.contain("EUR");

    ProductDetails.open("/rubber-ducks-c-1/purple-duck-p-5");
    const currencyProduct = ProductDetails.getProductCurrency();
    expect(currencyProduct).to.contain("€");
  });
});
