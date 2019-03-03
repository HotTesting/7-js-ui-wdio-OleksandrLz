import { expect } from "chai";
import * as faker from "faker";

describe("Items search", function() {
  beforeEach(function() {
    browser.url("/");
  });

  it("should show results in case multiple items matches", function() {
    $('input[name="query"]').setValue("duck");
    $('input[name="query"]').addValue("Enter");
    browser.pause(1000);
    expect(browser.getUrl()).contain("search?query=duck");
    const ducksCount = $$("#box-search-results .product").length;
    expect(ducksCount, "ducks more than one").to.be.above(1);
  });

  it("should redirect to item page in case only one result matches", function() {
    $('input[name="query"]').setValue("purple");
    $('input[name="query"]').addValue("Enter");
    browser.pause(1000);
    expect(browser.getUrl()).contain("purple-duck");
    const headerTitle = $("#box-product h1.title").getText();
    expect(headerTitle).to.contain("Purple Duck");
  });

  it("should redirect to 'no matching results' in case no items matched", function() {
    $('input[name="query"]').setValue("test123");
    $('input[name="query"]').addValue("Enter");
    browser.pause(1000);
    expect(browser.getUrl()).contain("test123");
    const searchText = $("#box-search-results > div > em").getText();
    expect(searchText).to.contain("No matching results");
  });

  after(function() {
    browser.url("/");
  });
});

describe("Search results sorting", function() {
  beforeEach(function() {
    browser.url("/");
  });
  it("correctly arranges items when using 'by price' sorting", function() {
    $('input[name="query"]').setValue("duck");
    $('input[name="query"]').addValue("Enter");
    browser.pause(1000);
    expect(browser.getUrl()).contain("search?query=duck");

    $('#box-search-results a[href*="sort=price"]').click();
    browser.pause(1000);
    let ducks = $$("#box-search-results .product");
    const duckPrice = ducks.map(duck=> parseInt(duck.getAttribute("data-price")));
    const sortByPrice = duckPrice.map(duck=> duck); // new array for sorting by price 
    sortByPrice.sort((a, b) => a - b); // sorting from low to high of the array of Price
    expect(duckPrice).to.deep.equal(sortByPrice);
  });

  it("correctly arranges items when using 'by name' sorting", function() {
    $('input[name="query"]').setValue("duck");
    $('input[name="query"]').addValue("Enter");
    browser.pause(1000);
    expect(browser.getUrl()).contain("search?query=duck");

    $('#box-search-results a[href*="sort=name"]').click();
    browser.pause(1000);
    let ducks = $$("#box-search-results .product");
    const ducksNames = ducks.map(duck=> duck.getAttribute("data-name"));
    const ducksSortByNames = ducksNames.map(duck=> duck); // new array for sorting by Name 
    // sorting from A to Z of the array of Names
    ducksSortByNames.sort(function(a, b) {
      let nameA = a.toLowerCase(),
        nameB = b.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    expect(ducksNames).to.deep.equal(ducksSortByNames);
  });

  after(function() {
    browser.url("/");
  });
});

// BONUS LEVEL
describe("Contact us form", function() {
  it("must send messages to shop administration", function() {
    browser.url("/customer-service-s-0");
    const email = faker.internet.email(
      undefined,
      undefined,
      "ip-5236.sunline.net.ua"
    );
    $('#box-contact-us input[name="name"]').setValue("TestName");
    $('#box-contact-us input[name="email"]').click();
    browser.pause(200);
    $('#box-contact-us input[name="email"]').setValue(email);
    $('#box-contact-us input[name="subject"]').setValue("TestSubject");
    $('#box-contact-us textarea[name="message"]').setValue("Test message");
    $('#box-contact-us button[name="send"]').click();
    browser.pause(1000);
    const sendConfirmationText = $("#notices .alert-success").getText();
    expect(sendConfirmationText).to.contain(
      "Your email has successfully been sent"
    );
  });

  after(function() {
    browser.url("/");
  });
});
