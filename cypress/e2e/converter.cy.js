describe("Currency converter testing", () => {
  const URL = "http://127.0.0.1:8080/#";

  beforeEach(() => {
    cy.visit(URL);
  });

  it("Should display all the default elements in the converter correctly", () => {
    const API_CALL = "https://api.exchangerate.host/convert?from=USD&to=ARS&amount=1&places=3";

    cy.get("[data-cy='converter-title']").should("have.text", "Calculate through our currency converter");

    cy.get("[data-cy='from-currency-button']").should("have.text", "From");
    cy.get("[data-cy='to-currency-button']").should("have.text", "To");

    cy.get("[data-cy='from-input']").should("have.attr", "placeholder", "USD");
    cy.get("[data-cy='to-input']").should("have.attr", "placeholder", "ARS");
    cy.get("[data-cy='amount-input']").should("have.attr", "placeholder", "Amount");

    cy.get("[data-cy='currency-convert-button']").should("have.text", "Convert");
    cy.get("[data-cy='currency-reset-button']").should("have.text", "Reset");

    cy.get("[data-cy='conversion-title']").should("have.text", "Conversion");

    cy.intercept(API_CALL).as("conversion");
    cy.wait("@conversion").then(({ response }) => {
      const conversion = response.body;
      const usdToArsConversion = conversion.info.rate;
      const conversionDate = conversion.date;

      cy.get("[data-cy='from-exchange-text']").should("have.text", "1");
      cy.get("[data-cy='from-currency-text']").should("have.text", " USD");
      cy.get("[data-cy='from-currency-text']").should("have.class", "disabled-text");

      cy.get("[data-cy='to-exchange-text']").should("have.text", ` = ${usdToArsConversion}`);
      cy.get("[data-cy='to-currency-text']").should("have.text", " ARS");
      cy.get("[data-cy='to-currency-text']").should("have.class", "disabled-text");

      cy.get("[data-cy='conversion-date']").should("have.text", `Results based on ${conversionDate} as date of Exchange`);
    });

    cy.get("[data-cy='converter-fluctuation-button']").should("have.text", "Check Fluctuation");
    cy.get("[data-cy='converter-fluctuation-button']").should("have.class", "disabled");
  });
});
