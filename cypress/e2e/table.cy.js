describe("Exchange table testing", () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const localhost = "http://127.0.0.1:8080";
  const defaultExchangeURL = "https://api.exchangerate.host/latest?base=EUR&places=2";
  const exchangeURL = "https://api.exchangerate.host/2020-01-01?base=ARS&places=2";
  const testURL = `https://api.exchangerate.host/2023-09-04?base=TEST&places=2`;

  beforeEach(() => {
    cy.visit(localhost);
    cy.intercept("GET", defaultExchangeURL, { fixture: "default-exchange" }).as("defaultExchange");
  });

  it("Should display the table on default correctly upon initializing the page", () => {
    cy.wait("@defaultExchange").then(({ response }) => {
      const rates = Object.keys(response.body.rates);
      const base = response.body.base;

      cy.get("[data-cy='current-currency-title']").should("have.text", `Currently displaying ${base}`);
      cy.get("[data-cy='current-date-title']").should("have.text", `At ${currentDate} as date of exchange`);
      cy.get("[data-cy='table-body']").find("tr").should("have.length", rates.length);
    });
  });

  it("Should display the exchange rates of the selected currency and date", () => {
    cy.intercept("GET", exchangeURL, { fixture: "exchange" }).as("exchange");

    cy.get("[data-cy='table-currency-list-button").click();
    cy.contains("ARS - Argentine Peso").click();

    cy.get("[data-cy='table-date-input']").type("2020-01-01");

    cy.wait("@exchange").then(({ response }) => {
      const rates = Object.keys(response.body.rates);
      const base = response.body.base;
      const date = response.body.date;

      cy.get("[data-cy='current-currency-title']").should("have.text", `Currently displaying ${base}`);
      cy.get("[data-cy='current-date-title']").should("have.text", `At ${date} as date of exchange`);
      cy.get("[data-cy='ARS-exchange']").should("have.text", "$1");
      cy.get("[data-cy='table-body']").find("tr").should("have.length", rates.length);
      cy.get("[data-cy='table-list-dropdown']").find("li").should("have.length", rates.length);
    });
  });

  it("Should display Euro as default currency if no currency has match the typed one", () => {
    cy.intercept("GET", testURL, { fixture: "default-exchange" }).as("testExchange");

    cy.get("[data-cy='table-code-input']").type("TEST");
    cy.get("[data-cy='table-date-input']").type("2023-09-04");

    cy.wait("@testExchange").then(({ response }) => {
      const rates = Object.keys(response.body.rates);
      const base = response.body.base;
      const date = response.body.date;

      cy.get("[data-cy='current-currency-title']").should("have.text", `Currently displaying ${base}`);
      cy.get("[data-cy='current-date-title']").should("have.text", `At ${date} as date of exchange`);
      cy.get("[data-cy='table-list-dropdown").find("li").should("have.length", rates.length);
      cy.get("[data-cy='table-body']").find("tr").should("have.length", rates.length);
    });
  });

  it("Should display an error message if the typed date is invalid", () => {
    cy.get("[data-cy='table-error-message']").should("not.be.visible");
    cy.get("[data-cy='table-error-message']").should("have.class", "hidden");

    cy.get("[data-cy='table-date-input']").click();
    cy.get("[data-cy='table-date-input").type("1111-01-01");

    cy.on("uncaught:exception", () => false);

    cy.get("[data-cy='table-error-message']").should("be.visible");
    cy.get("[data-cy='table-error-message").should("not.have.class", "hidden");

    cy.get("[data-cy='table-date-input']").clear();

    cy.get("[data-cy='table-error-message").should("not.be.visible");
    cy.get("[data-cy='table-error-message").should("have.class", "hidden");
  });

  it("Should display a loading table everytime a new currency is looked up", () => {
    cy.get("[data-cy='table-code-input']").type("ARS");

    cy.get("[data-cy='loading-table']").should("have.length", 10);
    cy.get("[data-cy='table-body']").find("tr").should("have.class", "placeholder-glow");

    cy.get("[data-cy='current-currency-title']").should("have.text", "Currently displaying ARS");
    cy.get("[data-cy='current-date-title").should("have.text", `At ${currentDate} as date of exchange`);
  });
});
