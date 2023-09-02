describe("Exchange table testing", () => {
  const URL = "http://127.0.0.1:8080/#";
  const currentDate = new Date().toISOString().split("T")[0];

  beforeEach(() => {
    cy.visit(URL);
  });

  it("Should display the main title correctly ", () => {
    cy.get("[data-cy='exchange-upper-title']").should("have.text", "Exchange-X");
    cy.get("[data-cy='exchange-lower-title").should("have.text", "Currency converter and exchange rate lookup.");
  });

  it("Should display EUR as default currency and today as latest date", () => {
    cy.get("[data-cy='current-currency-title']").should("have.text", "Currently displaying EUR");
    cy.get("[data-cy='current-date-title").should("have.text", `At ${currentDate} as date of exchange`);
  });

  it("Should display the table controls correctly", () => {
    cy.get("[data-cy='table-control-title").should("have.text", "Check out our exchange table feature");

    cy.get("[data-cy='table-currency-list-button']").should("have.text", "List of Currencies");
    cy.get("[data-cy='table-list-dropdown").find("li").should("have.length", 169);

    cy.get("[data-cy='currency-code-text']").should("have.text", "Insert your currency code here");
    cy.get("[data-cy='currency-date-label").should("have.text", "Look up exchange through date");
    cy.get("[data-cy='table-code-input']").should("have.attr", "placeholder", "E.g ARS");
    cy.get("[data-cy='table-date-input").should("have.attr", "type", "date");
  });

  it("Should display the table on default correctly", () => {
    cy.get("[data-cy='main-table-row'] th").should("have.length", 4);
    cy.get("[data-cy='number-column']").should("have.text", "#");
    cy.get("[data-cy='code-column']").should("have.text", "Currency-Code");
    cy.get("[data-cy='name-column']").should("have.text", "Name");
    cy.get("[data-cy='exchange-column']").should("have.text", "Exchange");

    const API_CALL = "https://api.exchangerate.host/latest?base=EUR&places=2";

    cy.intercept(API_CALL).as("exchange");
    cy.wait("@exchange").then(({ response }) => {
      const rates = Object.keys(response.body.rates);

      cy.get("[data-cy='table-body']").find("tr").should("have.length", rates.length);
    });
  });

  it("Should display the selected currency from the list correctly on the table", () => {
    cy.get("[data-cy='table-currency-list-button").click();
    cy.contains("ARS - Argentine Peso").click();
    cy.get("[data-cy='table-code-input']").should("have.value", "ARS");

    cy.get("[data-cy='current-currency-title']").should("have.text", "Currently displaying ARS");
    cy.get("[data-cy='current-date-title']").should("have.text", `At ${currentDate} as date of exchange`);
    cy.get("[data-cy='ARS-exchange']").should("have.text", "$1");
  });

  it("Should display the selected currency from the list correctly on the table with a selected date", () => {
    cy.get("[data-cy='current-currency-title']").should("have.text", "Currently displaying EUR");
    cy.get("[data-cy='current-date-title").should("have.text", `At ${currentDate} as date of exchange`);

    cy.get("[data-cy='table-currency-list-button").click();
    cy.contains("ARS - Argentine Peso").click();
    cy.get("[data-cy='table-code-input']").should("have.value", "ARS");

    cy.get("#currency-date").click();
    cy.get("#currency-date").type("2022-01-01");

    cy.get("#current-currency").should("have.text", "Currently displaying ARS");
    cy.get("#current-date").should("have.text", `At 2022-01-01 as date of exchange`);
  });

  it("Should display the typed currency and date correctly", () => {
    cy.get("#current-currency").should("have.text", "Currently displaying EUR");
    cy.get("#current-date").should("have.text", `At ${currentDate} as date of exchange`);

    cy.get("#table-currency-input").type("ARS");
    cy.get("#currency-date").type("2022-01-01");

    cy.get("#current-currency").should("have.text", "Currently displaying ARS");
    cy.get("#current-date").should("have.text", `At 2022-01-01 as date of exchange`);
  });

  it("Should display the typed currency and date exchanges correctly ", () => {
    cy.get("#current-currency").should("have.text", "Currently displaying EUR");
    cy.get("#current-date").should("have.text", `At ${currentDate} as date of exchange`);

    cy.get("#table-currency-input").type("ARS");
    cy.get("#currency-date").type(currentDate);

    cy.get("#current-currency").should("have.text", "Currently displaying ARS");
    cy.get("#current-date").should("have.text", `At ${currentDate} as date of exchange`);

    cy.get("#exchange-table-body tr:nth-child(7) td:nth-child(2)").should("have.text", "ARS");
    cy.get("#exchange-table-body tr:nth-child(7) td:nth-child(3)").should("have.text", "Argentine Peso");
    cy.get("#exchange-table-body tr:nth-child(7) td:nth-child(4)").should("have.text", "$1");

    cy.get("#exchange-table-body tr:nth-child(150) td:nth-child(2)").should("have.text", "USD");
    cy.get("#exchange-table-body tr:nth-child(150) td:nth-child(3)").should("have.text", "United States Dollar");
    cy.get("#exchange-table-body tr:nth-child(150) td:nth-child(4)").should("not.have.text", "$1");
  });

  it("Should display different currencies depending on the date given by the user", () => {
    cy.get("#current-currency").should("have.text", "Currently displaying EUR");
    cy.get("#current-date").should("have.text", `At ${currentDate} as date of exchange`);

    cy.get("#currency-date").type("2000-01-01");
    cy.get("#exchange-table-body").find("tr").should("have.length", 28);

    cy.get("#currency-date").clear();
    cy.get("#exchange-table-body").find("tr").should("have.length", 169);
  });

  it("Should display Euro as default currency if no currency has match the typed one", () => {
    cy.get("#current-currency").should("have.text", "Currently displaying EUR");
    cy.get("#current-date").should("have.text", `At ${currentDate} as date of exchange`);

    cy.get("#table-currency-input").type("TEST");

    cy.get("#current-currency").should("have.text", "Currently displaying EUR");
    cy.get("#current-date").should("have.text", `At ${currentDate} as date of exchange`);

    cy.get("#exchange-table-body tr:nth-child(47) td:nth-child(2)").should("have.text", "EUR");
    cy.get("#exchange-table-body tr:nth-child(47) td:nth-child(3)").should("have.text", "Euro");
    cy.get("#exchange-table-body tr:nth-child(47) td:nth-child(4)").should("have.text", "$1");

    cy.get("#table-currency-input").clear();

    cy.get("#current-currency").should("have.text", "Currently displaying EUR");
    cy.get("#current-date").should("have.text", `At ${currentDate} as date of exchange`);
  });

  it("Should display an error message if the typed date is invalid", () => {
    cy.get("#current-currency").should("have.text", "Currently displaying EUR");
    cy.get("#current-date").should("have.text", `At ${currentDate} as date of exchange`);
    cy.get("#error-message").should("not.be.visible");
    cy.get("#error-message").should("have.class", "hidden");

    cy.get("#currency-date").click();
    cy.get("#currency-date").type("1111-01-01");

    cy.on("uncaught:exception", () => false);

    cy.get("#error-message").should("be.visible");
    cy.get("#error-message").should("not.have.class", "hidden");

    cy.get("#current-currency").should("have.text", "Currently displaying EUR");
    cy.get("#current-date").should("have.text", `At ${currentDate} as date of exchange`);

    cy.get("#currency-date").clear();

    cy.get("#error-message").should("not.be.visible");
    cy.get("#error-message").should("have.class", "hidden");

    cy.get("#current-currency").should("have.text", "Currently displaying EUR");
    cy.get("#current-date").should("have.text", `At ${currentDate} as date of exchange`);
  });

  it("Should display a loading table everytime a new currency is looked up", () => {
    cy.get("#current-currency").should("have.text", "Currently displaying EUR");
    cy.get("#current-date").should("have.text", `At ${currentDate} as date of exchange`);

    cy.get("#table-currency-input").type("ARS");

    cy.get("#exchange-table-body").find("tr").should("have.length", 10);
    cy.get("#exchange-table-body").find("tr").should("have.class", "placeholder-glow");

    cy.get("#current-currency").should("have.text", "Currently displaying ARS");
    cy.get("#current-date").should("have.text", `At ${currentDate} as date of exchange`);

    cy.get("#table-currency-input").clear();
    cy.get("#exchange-table-body").find("tr").should("have.length", 169);

    cy.get("#current-currency").should("have.text", "Currently displaying EUR");
    cy.get("#current-date").should("have.text", `At ${currentDate} as date of exchange`);
  });
});
