describe("Exchange table testing", () => {
  const URL = "http://127.0.0.1:8080/#";
  const currentDate = new Date().toISOString().split("T")[0];
  function getExchanges(base = "EUR", date = "latest") {
    return `https://api.exchangerate.host/${date}?base=${base}&places=2`;
  }

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

    cy.intercept(getExchanges("EUR", "latest")).as("exchange");
    cy.wait("@exchange").then(({ response }) => {
      const rates = Object.keys(response.body.rates);

      cy.get("[data-cy='table-currency-list-button']").should("have.text", "List of Currencies");
      cy.get("[data-cy='table-list-dropdown").find("li").should("have.length", rates.length);
    });

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

    cy.intercept(getExchanges("EUR", "latest")).as("exchange");
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

    cy.get("[data-cy='table-date-input']").click();
    cy.get("[data-cy='table-date-input").type("2022-01-01");

    cy.get("[data-cy='current-currency-title']").should("have.text", "Currently displaying ARS");
    cy.get("[data-cy='current-date-title']").should("have.text", `At 2022-01-01 as date of exchange`);
  });

  it("Should display the typed currency and date correctly", () => {
    cy.get("[data-cy='current-currency-title']").should("have.text", "Currently displaying EUR");
    cy.get("[data-cy='current-date-title']").should("have.text", `At ${currentDate} as date of exchange`);

    cy.get("[data-cy='table-code-input']").type("ARS");
    cy.get("[data-cy='table-date-input']").type("2022-01-01");

    cy.get("[data-cy='current-currency-title']").should("have.text", "Currently displaying ARS");
    cy.get("[data-cy='current-date-title']").should("have.text", `At 2022-01-01 as date of exchange`);
  });

  it("Should display the typed currency and date exchanges correctly ", () => {
    cy.get("[data-cy='current-currency-title']").should("have.text", "Currently displaying EUR");
    cy.get("[data-cy='current-date-title']").should("have.text", `At ${currentDate} as date of exchange`);

    cy.get("[data-cy='table-code-input']").type("ARS");

    cy.intercept(getExchanges("ARS", "latest")).as("exchange");
    cy.wait("@exchange").then(({ response }) => {
      const rates = response.body.rates;
      const ratesLength = Object.keys(rates).length;

      cy.get("[data-cy='table-body']").find("tr").should("have.length", ratesLength);
      cy.get("[data-cy='ARS-exchange']").should("have.text", `$${rates["ARS"]}`);
      cy.get("[data-cy='USD-exchange']").should("have.text", `$${rates["USD"]}`);
    });

    cy.get("[data-cy='table-date-input']").type(currentDate);
    cy.get("[data-cy='current-date-title']").should("have.text", `At ${currentDate} as date of exchange`);

    cy.get("[data-cy='table-code-input']").clear();
    cy.get("[data-cy='table-date-input']").clear();

    cy.get("[data-cy='current-currency-title']").should("have.text", "Currently displaying EUR");
    cy.get("[data-cy='current-date-title']").should("have.text", `At ${currentDate} as date of exchange`);
  });

  it("Should display a different table of currencies depending on the date given by the user", () => {
    cy.get("[data-cy='current-currency-title']").should("have.text", "Currently displaying EUR");
    cy.get("[data-cy='current-date-title").should("have.text", `At ${currentDate} as date of exchange`);

    cy.get("[data-cy='table-code-input']").type("EUR");
    cy.wait(1000);
    cy.get("[data-cy='table-date-input']").type("2000-01-01");

    cy.intercept(getExchanges("EUR", "2000-01-01")).as("exchange");
    cy.wait("@exchange").then(({ response }) => {
      const rates = Object.keys(response.body.rates);

      cy.get("[data-cy='table-list-dropdown").find("li").should("have.length", rates.length);
      cy.get("[data-cy='table-body']").find("tr").should("have.length", rates.length);
    });

    cy.get("[data-cy='table-date-input']").clear();

    cy.intercept(getExchanges("EUR", "latest")).as("exchange");
    cy.wait("@exchange").then(({ response }) => {
      const rates = Object.keys(response.body.rates);

      cy.get("[data-cy='table-list-dropdown").find("li").should("have.length", rates.length);
      cy.get("[data-cy='table-body']").find("tr").should("have.length", rates.length);
    });

    cy.get("[data-cy='current-currency-title']").should("have.text", "Currently displaying EUR");
    cy.get("[data-cy='current-date-title").should("have.text", `At ${currentDate} as date of exchange`);
  });

  it("Should display Euro as default currency if no currency has match the typed one", () => {
    cy.get("#current-currency").should("have.text", "Currently displaying EUR");
    cy.get("#current-date").should("have.text", `At ${currentDate} as date of exchange`);

    cy.get("#table-currency-input").type("TEST");

    cy.intercept(getExchanges("TEST", "latest")).as("exchange");
    cy.wait("@exchange").then(({ response }) => {
      const rates = Object.keys(response.body.rates);

      cy.get("[data-cy='table-list-dropdown").find("li").should("have.length", rates.length);
      cy.get("[data-cy='table-body']").find("tr").should("have.length", rates.length);
    });

    cy.get("#current-currency").should("have.text", "Currently displaying EUR");
    cy.get("#current-date").should("have.text", `At ${currentDate} as date of exchange`);

    cy.get("#table-currency-input").clear();

    cy.get("#current-currency").should("have.text", "Currently displaying EUR");
    cy.get("#current-date").should("have.text", `At ${currentDate} as date of exchange`);
  });

  it("Should display an error message if the typed date is invalid", () => {
    cy.get("[data-cy='current-currency-title']").should("have.text", "Currently displaying EUR");
    cy.get("[data-cy='current-date-title']").should("have.text", `At ${currentDate} as date of exchange`);

    cy.get("[data-cy='table-error-message']").should("not.be.visible");
    cy.get("[data-cy='table-error-message']").should("have.class", "hidden");

    cy.get("[data-cy='table-date-input']").click();
    cy.get("[data-cy='table-date-input").type("1111-01-01");

    cy.on("uncaught:exception", () => false);

    cy.get("[data-cy='table-error-message']").should("be.visible");
    cy.get("[data-cy='table-error-message").should("not.have.class", "hidden");

    cy.get("[data-cy='current-currency-title']").should("have.text", "Currently displaying EUR");
    cy.get("[data-cy='current-date-title']").should("have.text", `At ${currentDate} as date of exchange`);

    cy.get("[data-cy='table-date-input']").clear();

    cy.get("[data-cy='table-error-message").should("not.be.visible");
    cy.get("[data-cy='table-error-message").should("have.class", "hidden");

    cy.get("[data-cy='current-currency-title']").should("have.text", "Currently displaying EUR");
    cy.get("[data-cy='current-date-title").should("have.text", `At ${currentDate} as date of exchange`);
  });

  it("Should display a loading table everytime a new currency is looked up", () => {
    cy.get("[data-cy='current-currency-title']").should("have.text", "Currently displaying EUR");
    cy.get("[data-cy='current-date-title']").should("have.text", `At ${currentDate} as date of exchange`);

    cy.get("[data-cy='table-code-input']").type("ARS");

    cy.get("[data-cy='loading-table']").should("have.length", 10);
    cy.get("[data-cy='table-body']").find("tr").should("have.class", "placeholder-glow");

    cy.get("[data-cy='current-currency-title']").should("have.text", "Currently displaying ARS");
    cy.get("[data-cy='current-date-title").should("have.text", `At ${currentDate} as date of exchange`);

    cy.get("[data-cy='table-code-input").clear();
    cy.intercept(getExchanges("", "latest")).as("exchange");
    cy.wait("@exchange").then(({ response }) => {
      const rates = Object.keys(response.body.rates);

      cy.get("[data-cy='table-body']").find("tr").should("have.length", rates.length);
    });

    cy.get("[data-cy='current-currency-title").should("have.text", "Currently displaying EUR");
    cy.get("[data-cy='current-date-title").should("have.text", `At ${currentDate} as date of exchange`);
  });
});
