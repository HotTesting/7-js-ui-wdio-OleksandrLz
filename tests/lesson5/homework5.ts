/**
 - Try to implement as much tests as you can
 - Do not overload tests with logic, be simple
 - browser.pause() NOT allowed, use browser.wait, browser.waitUntil
 - You SHOULD use PageObjects for this tests
 - prefer css selectors
 - Use mocha before/after hooks to reuse pre/post conditions
 - Use ChaiJS to make assertions
 */

import { expect } from "chai";
import { ProductDetails, Checkout, RegionSettings } from "../../pageObjects";

// Each implemented test gives you 20 points
describe("Cart", function() {
  it("adding one item to cart should be successful", function() {
    ProductDetails.open("/rubber-ducks-c-1/purple-duck-p-5");
    ProductDetails.addToCart();

    Checkout.open();
    const itemsCount = Checkout.shoppingCart.getQuantity();
    expect(itemsCount).to.equal(1);
  });

  it("removing one item from cart should be successful", function() {
    Checkout.shoppingCart.removeFromCart();
    const removeText = Checkout.shoppingCart.getRemoveText();
    expect(removeText).to.contain("There are no items in your cart.");
  });

  // from 1 to 2 for example
  it("increasing item quantity in cart should be successful", function() {
    ProductDetails.open("/rubber-ducks-c-1/purple-duck-p-5");
    ProductDetails.addToCart();

    Checkout.open();
    Checkout.shoppingCart.increaseForOneItem();
    Checkout.shoppingCart.updateCart();
    const itemsCount = Checkout.shoppingCart.getQuantity();
    expect(itemsCount).to.equal(2);
  });

  // from 2 to 1 for example
  it("decreasing item quantity in cart should be successful", function() {
    Checkout.shoppingCart.decreaseForOneItem();
    Checkout.shoppingCart.updateCart();
    const itemsCount = Checkout.shoppingCart.getQuantity();
    expect(itemsCount).to.equal(1);
  });
});

// This test gives you 20 points
describe("Prices", function() {
  it("can be switched to EUR", function() {
    RegionSettings.open();
    RegionSettings.currency.changeCurrencyToEUR();
    const currency = RegionSettings.getCurrentCurrency();

    expect(currency).to.contain("EUR");
  });
});
