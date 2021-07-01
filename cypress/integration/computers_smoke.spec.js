describe('Computers Database Smoke Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    // Setting window size to avoid having hidden elements or requiring to scroll.
    cy.viewport('macbook-15');
  })

  it('Filter by name', () => {
    //TODO: Creating a computer to search for or initially seeding the database are possible setups.
    cy.get('#searchbox').type('Apple Lisa');
    cy.get('#searchsubmit').click();
    cy.get('.computers').contains('Apple Lisa').click();
    cy.get('#name').should('have.value', 'Apple Lisa');
  })

  it('Filter by name - Keyboard Enter', () => {
    cy.get('#searchbox').type('Apple Lisa{enter}');
    cy.get('.computers').contains('Apple Lisa').click();
    cy.get('#name').should('have.value', 'Apple Lisa');
  })

  it('Search for a computer that doesn’t exist', () => {
    cy.get('#searchbox').type('Johnny Depp xyz');
    cy.get('#searchsubmit').click();
    cy.get('h1').contains('No computer');
    cy.get('.well').contains('Nothing to display');
  })

  it('Add a new computer', () => {
    cy.get('#add').click();
    cy.get('#name').type('automated-computer1');
    cy.get('#introduced').type('2015-12-01');
    cy.get('#discontinued').type('2020-11-01');
    cy.get('#company').select('IBM');
    cy.get('[value=\'Create this computer\']').click();
    cy.get('.alert-message').should('contain', 'Computer automated-computer1 has been created');
    // TODO: Assert that the computer has been added successfully by searching for it.
    // TODO: Cleanup is recommended to delete created computers, or a setup can be done to clear then seed the database 
  })

  it('Cancel adding a new computer', () => {
    cy.get('#add').click();
    cy.get('a').contains('Cancel').click();
    cy.get('#add');
  })

  it('Add a computer with missing Computer name', () => {
    cy.get('#add').click();
    cy.get('#introduced').type('2015-12-01');
    cy.get('#discontinued').type('2020-11-01');
    cy.get('[value=\'Create this computer\']').click();
    // TODO: The following assertion can be improved to assert for the actual error. 
    // Currently a non-user-friendly error appears.
    cy.get('form').find('.error').contains('Computer name');
    cy.get('[value=\'Create this computer\']');
  })

  it('Add a computer with invalid Introduced date format', () => {
    cy.get('#add').click();
    cy.get('#name').type('automated-computer-invalid');
    cy.get('#introduced').type('12-01');
    cy.get('#discontinued').type('2020-11-01');
    cy.get('[value=\'Create this computer\']').click();
    // TODO: The following assertion can be improved to assert for the actual error. 
    // Currently a non-user-friendly error appears.
    cy.get('form').find('.error').contains('Introduced');
    cy.get('[value=\'Create this computer\']');
  })

  it('Add a computer with invalid Discontinued date format', () => {
    cy.get('#add').click();
    cy.get('#name').type('automated-computer-invalid');
    cy.get('#introduced').type('2017-12-01');
    cy.get('#discontinued').type('11-01');
    cy.get('[value=\'Create this computer\']').click();
    // TODO: The following assertion can be improved to assert for the actual error. 
    // Currently a non-user-friendly error appears.
    cy.get('form').find('.error').contains('Discontinued');
    cy.get('[value=\'Create this computer\']');
  })

  it('Add a computer with blank Introduced date', () => {
    cy.get('#add').click();
    cy.get('#name').type('automated-computer2');
    cy.get('#discontinued').type('2020-11-01');
    cy.get('#company').select('IBM');
    cy.get('[value=\'Create this computer\']').click();
    cy.get('.alert-message').should('contain', 'Computer automated-computer2 has been created');
    // TODO: Assert that the computer has been added successfully by searching for it.
  })

  it('Add a computer with blank Discontinued date', () => {
    cy.get('#add').click();
    cy.get('#name').type('automated-computer3');
    cy.get('#introduced').type('2020-11-01');
    cy.get('#company').select('IBM');
    cy.get('[value=\'Create this computer\']').click();
    cy.get('.alert-message').should('contain', 'Computer automated-computer3 has been created');
    // TODO: Assert that the computer has been added successfully by searching for it.
  })

  it('Add a computer with non selected Company', () => {
    cy.get('#add').click();
    cy.get('#name').type('automated-computer4');
    cy.get('#introduced').type('2015-12-01');
    cy.get('#discontinued').type('2020-11-01');
    cy.get('[value=\'Create this computer\']').click();
    cy.get('.alert-message').should('contain', 'Computer automated-computer4 has been created');
    // TODO: Assert that the computer has been added successfully by searching for it.
  })

  it('Edit a computer', () => {
    // TODO: A setup to create a computer then edit it is possible, or use a preknown seeded computer.
    cy.get('#searchbox').type('Apple Lisa');
    cy.get('#searchsubmit').click();
    cy.get('.computers').contains('Apple Lisa').click();
    cy.get('#name').clear().type('Apple Lisa v2');
    cy.get('[value=\'Save this computer\']').click();
    cy.get('.alert-message').should('contain', 'Computer Apple Lisa v2 has been updated');
  })

  it('Delete a computer', () => {
    // TODO: A setup to create a computer then delete it is possible, or use a preknown seeded computer.
    cy.get('#searchbox').type('ARRA');
    cy.get('#searchsubmit').click();
    cy.get('.computers').contains('ARRA').click();
    cy.get('[value=\'Delete this computer\']').click();
    cy.get('.alert-message').should('contain', 'Computer ARRA has been deleted');
  })
})