describe("Currency converter testing", () => {
  const localhost = "http://127.0.0.1:8080/#";
  const defaultConversionURL = "https://api.exchangerate.host/convert?from=USD&to=ARS&amount=1&places=3";

  beforeEach(() => {
    cy.visit(localhost);
    cy.intercept("GET", defaultConversionURL, { fixture: "conversion" }).as("defaultConversion");
  });

  it("Should display all the default elements in the converter correctly", () => {
    cy.wait("@defaultConversion").then(({ response }) => {
      const amount = response.body.query.amount;
      const conversionDate = response.body.date;
      const conversionResult = response.body.result;
      const from = response.body.query.from;
      const to = response.body.query.to;

      cy.get("[data-cy='from-exchange-text']").should("have.text", `${amount}`);
      cy.get("[data-cy='from-currency-text']").should("have.text", ` ${from}`);
      cy.get("[data-cy='from-currency-text']").should("have.class", "disabled-text");

      cy.get("[data-cy='to-exchange-text']").should("have.text", ` = ${conversionResult}`);
      cy.get("[data-cy='to-currency-text']").should("have.text", ` ${to}`);
      cy.get("[data-cy='to-currency-text']").should("have.class", "disabled-text");

      cy.get("[data-cy='conversion-date']").should("have.text", `Results based on ${conversionDate} as date of Exchange`);
    });

    cy.get("[data-cy='converter-fluctuation-button']").should("have.text", "Check Fluctuation");
    cy.get("[data-cy='converter-fluctuation-button']").should("have.class", "disabled");
  });

  it("Should convert one currency to another correctly and then click reset making the conversion results card disabled", () => {
    cy.intercept("GET", defaultConversionURL, { fixture: "conversion" }).as("conversion");

    cy.get("[data-cy='from-input']").type("USD");
    cy.get("[data-cy='to-input']").type("ARS");
    cy.get("[data-cy='amount-input']").type("1");

    cy.get("[data-cy='currency-convert-button']").click();

    cy.wait("@conversion").then(({ response }) => {
      const conversion = response.body;
      const from = conversion.query.from;
      const to = conversion.query.to;
      const amount = conversion.query.amount;
      const conversionDate = conversion.date;
      const conversionResult = conversion.result;

      cy.get("[data-cy='from-exchange-text']").should("have.text", amount);
      cy.get("[data-cy='from-currency-text']").should("have.text", ` ${from}`);
      cy.get("[data-cy='from-currency-text']").should("not.have.class", "disabled");

      cy.get("[data-cy='to-exchange-text']").should("have.text", ` = ${conversionResult}`);
      cy.get("[data-cy='to-currency-text']").should("have.text", ` ${to}`);
      cy.get("[data-cy='to-currency-text']").should("not.have.class", "disabled");

      cy.get("[data-cy='conversion-date']").should("have.text", `Results based on ${conversionDate} as date of Exchange`);
      cy.get("[data-cy='conversion-date']").should("have.class", "text-primary");

      cy.get("[data-cy='converter-fluctuation-button']").should("have.text", "Check Fluctuation");
      cy.get("[data-cy='converter-fluctuation-button']").should("not.have.class", "disabled");

      cy.get("[data-cy='currency-reset-button']").click();

      cy.get("[data-cy='from-input']").should("not.have.class", "is-valid");
      cy.get("[data-cy='to-input']").should("not.have.class", "is-valid");
      cy.get("[data-cy='amount-input']").should("not.have.class", "is-valid");

      cy.get("[data-cy='conversion-title']").should("not.have.class", "text-primary");

      cy.get("[data-cy='from-exchange-text']").should("have.text", `${amount}`);
      cy.get("[data-cy='from-currency-text']").should("have.text", ` ${from}`);
      cy.get("[data-cy='from-currency-text']").should("not.have.class", "text-primary");

      cy.get("[data-cy='to-exchange-text']").should("have.text", ` = ${conversionResult}`);
      cy.get("[data-cy='to-currency-text']").should("have.text", ` ${to}`);
      cy.get("[data-cy='to-currency-text']").should("not.have.class", "text-primary");

      cy.get("[data-cy='conversion-date']").should("have.text", `Results based on ${conversionDate} as date of Exchange`);
      cy.get("[data-cy='conversion-date']").should("not.have.class", "text-primary");

      cy.get("[data-cy='converter-fluctuation-button']").should("have.class", "disabled");
    });
  });

  it("Should display invalid feedbacks from the inputs when the values are incorrect", () => {
    cy.get("[data-cy='currency-convert-button']").click();

    cy.get("[data-cy='from-input']").should("have.class", "is-invalid");
    cy.get("[data-cy='from-validation-message']").should("have.text", "This currency field can't be empty");

    cy.get("[data-cy='to-input']").should("have.class", "is-invalid");
    cy.get("[data-cy='to-validation-message']").should("have.text", "This currency field can't be empty");

    cy.get("[data-cy='amount-input']").should("have.class", "is-invalid");
    cy.get("[data-cy='amount-validation-message']").should("have.text", "The amount field can't be empty");

    cy.get("[data-cy='from-input']").type("EEE");
    cy.get("[data-cy='to-input']").type("Pepe");
    cy.get("[data-cy='amount-input']").type("55555555555555555555555555555555555555555555555555");
    cy.get("[data-cy='currency-convert-button']").click();

    cy.get("[data-cy='from-input']").should("have.class", "is-invalid");
    cy.get("[data-cy='from-validation-message']").should("have.text", "This currency code does not exist");

    cy.get("[data-cy='to-input']").should("have.class", "is-invalid");
    cy.get("[data-cy='to-validation-message']").should("have.text", "Invalid currency code");

    cy.get("[data-cy='amount-input']").should("have.class", "is-invalid");
    cy.get("[data-cy='amount-validation-message']").should("have.text", "The amount given has to be less than 20 characters");

    cy.get("[data-cy='currency-reset-button']").click();

    cy.get("[data-cy='from-input']").should("have.text", "");
    cy.get("[data-cy='from-input']").should("not.have.class", "is-invalid");

    cy.get("[data-cy='to-input']").should("have.text", "");
    cy.get("[data-cy='to-input']").should("not.have.class", "is-invalid");

    cy.get("[data-cy='amount-input']").should("have.text", "");
    cy.get("[data-cy='amount-input']").should("not.have.class", "is-invalid");
  });

  it("Should display a modal upon clicking the fluctuation button", () => {
    cy.get("[data-cy='from-input']").type("ARS");
    cy.get("[data-cy='to-input']").type("USD");
    cy.get("[data-cy='amount-input']").type("1");

    cy.get("[data-cy='currency-convert-button']").click();

    cy.get("[data-cy='converter-fluctuation-button']").click();
    cy.get("[data-cy='fluctuation-modal']").should("be.visible");

    cy.wait(1000);
    cy.get("[data-cy='close-modal-button']").click();

    cy.wait(1000);
    cy.get("[data-cy='fluctuation-modal']").should("not.be.visible");
  });

  it("Should display the selected currency from the list on the input values", () => {
    cy.get("[data-cy='from-currency-button']").click();
    cy.get("[data-cy='from-list']").contains("ARS - Argentine Peso").click();
    cy.get("[data-cy='from-input']").should("have.value", "ARS");

    cy.get("[data-cy='to-currency-button']").click();
    cy.get("[data-cy='to-list']").contains("USD - United States Dollar").click();
    cy.get("[data-cy='to-input']").should("have.value", "USD");

    cy.get("[data-cy='from-currency-button']").click();
    cy.get("[data-cy='from-list']").contains("EUR - Euro").click();
    cy.get("[data-cy='from-input']").should("have.value", "EUR");

    cy.get("[data-cy='to-currency-button']").click();
    cy.get("[data-cy='to-list']").contains("ARS - Argentine Peso").click();
    cy.get("[data-cy='to-input']").should("have.value", "ARS");
  });
});
