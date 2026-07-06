describe('Web Table Automation Practice', () => {

  beforeEach(() => {
    // Navigate to the demo website before each test
    cy.visit('https://testautomationpractice.blogspot.com/');
  });

  // Automatically runs after every test case finishes
  afterEach(function () {
    // Captures a screenshot ONLY if the individual test case failed
    if (this.currentTest.state === 'failed') {
      cy.screenshot(`failure-${this.currentTest.title}`);
    }
  });

  // 1. Count Rows
  it('should count the total number of rows in the table', () => {
    cy.get('table[name="BookTable"] tr')
      .should('have.length', 7); 
  });

  // 2. Count Columns
  it('should count the total number of columns in the table', () => {
    cy.get('table[name="BookTable"] tr').first().find('th')
      .should('have.length', 4);
  });

  // 3. Read Data from a Row
  it('should read and validate data from a specific row', () => {
    cy.get('table[name="BookTable"] tr').eq(1).within(() => {
      cy.get('td').eq(0).should('have.text', 'Learn Selenium');
      cy.get('td').eq(1).should('have.text', 'Amit');
    });

    // Milestone Screenshot: Saves an image of the whole page at this exact moment
    cy.screenshot('row-validation-success');
  });

  // 4. Click a Button/Action Inside a Row Based on Text
  it('should locate a specific row by its text and perform an action', () => {
    cy.contains('table[name="BookTable"] td', 'Learn Java')
      .parent('tr')
      .within(() => {
        cy.get('td').eq(1).click(); 
      });

    // Targeted Screenshot: Captures ONLY the specific table element instead of the whole page
    cy.get('table[name="BookTable"]').screenshot('targeted-table-view');
  });

  // 5. Verify Table Contents
  it('should iterate through rows to verify table contents', () => {
    cy.get('table[name="BookTable"] tr').each(($row, index) => {
      if (index > 0) {
        const author = $row.find('td').eq(1).text();
        if (author === 'Amit') {
          const bookName = $row.find('td').eq(0).text();
          expect(bookName).to.match(/Learn Selenium|Master In JS/);
        }
      }
    });
  });

});

describe('Cypress Scrolling Operations', () => {

  beforeEach(() => {
    // Visit a page with a long vertical layout
    cy.visit('https://testautomationpractice.blogspot.com/');
  });

  // 1. Scroll to the bottom of a page
  it('should scroll down to the bottom of the window', () => {
    // Scrolls the entire viewport window to the very bottom instantly
    cy.scrollTo('bottom'); 
  });

  // 2. Scroll to the top of a page
  it('should scroll back up to the top of the window', () => {
    cy.scrollTo('bottom');
    cy.scrollTo('top'); 
  });

  it('should scroll to a specific element and confirm its visibility', () => {
    // Targets the footer copyright text near the bottom of the page
   cy.get('footer')
  .scrollIntoView()         
  .should('be.visible');
   
  });

  // 4. Scoped element scrolling inside a container
  it('should scroll inside a specific scrollable container', () => {
    // Targets the scrolling web table element present on the page
   cy.scrollTo('bottom');   
  });

});

describe('Mini Project UI Automation Suite', () => {
  it('should successfully interact with all required form controls and elements', () => {
    // Prevent application exceptions from breaking the test
    Cypress.on('uncaught:exception', () => false);

    // 1. Navigation
    cy.visit('https://testautomationpractice.blogspot.com/', { timeout: 30000 });

    // 2. Text Input Fields
    cy.get('#name')
      .type('Hope Mwila')
      .should('have.value', 'Hope Mwila');

    cy.get('#email')
      .type('hope.m@example.com')
      .should('have.value', 'hope.m@example.com');

    cy.get('#phone')
      .type('0574030068')
      .should('have.value', '0574030068');

    cy.get('#textarea')
      .type('Lusaka, Zambia')
      .should('contain.value', 'Zambia');

    // 3. Dropdown Menu
    cy.get('#country')
      .select('Australia')
      .should('have.value', 'australia');

    // 4. Checkboxes
    cy.get('#monday').check().should('be.checked');
    cy.get('#sunday').check().should('be.checked');
    cy.get('#monday').uncheck().should('not.be.checked');

    // 5. Radio Buttons
    cy.get('#female').check().should('be.checked');
    cy.get('#male').should('not.be.checked');

    // 6. File Upload
    cy.get('#singleFileInput').selectFile({
      contents: Cypress.Buffer.from('Mock file content for assignment submission'),
      fileName: 'assignment-document.pdf',
      mimeType: 'application/pdf'
    });

    // 7. Scroll Behavior & Assertions
    cy.get('footer')
      .scrollIntoView()
      .should('be.visible');

    cy.get('.title')
      .first()
      .should('exist')
      .and('contain.text', 'Automation Testing Practice');
      cy.screenshot('all-required-form-and-element-interaction-success');
  });
});
