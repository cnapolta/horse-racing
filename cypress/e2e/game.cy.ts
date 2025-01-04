describe('Horse Racing Game', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should start a new game', () => {
    cy.get('.new-game-btn').click()
    cy.get('.game-info').should('be.visible')
    cy.get('.game-info').should('contain', 'Round 1 of')
  })

  it('should display available horses', () => {
    cy.get('.new-game-btn').click()
    cy.get('.participant').should('have.length.at.least', 1)
  })

  it('should complete a race', () => {
    cy.get('.new-game-btn').click()
    cy.get('.start-race-btn').click()

    cy.get('.countdown', { timeout: 30000 }).should('be.visible').and('contain', 'Yeni tur')

    cy.get('.result-item').should('have.length.at.least', 1)
  })

  it('should advance to next round after race', () => {
    cy.get('.new-game-btn').click()
    cy.get('.start-race-btn').click()

    cy.get('.countdown', { timeout: 30000 }).should('be.visible').and('contain', 'Yeni tur')

    cy.get('.countdown', { timeout: 10000 }).should('not.exist')

    cy.get('.game-info').should('contain', 'Round 2 of')
  })

  it('should show all completed races in results', () => {
    cy.get('.new-game-btn').click()

    cy.get('.start-race-btn').click()
    cy.get('.countdown', { timeout: 30000 }).should('be.visible').and('contain', 'Yeni tur')
    cy.get('.countdown', { timeout: 10000 }).should('not.exist')

    cy.get('.start-race-btn').click()
    cy.get('.countdown', { timeout: 30000 }).should('be.visible').and('contain', 'Yeni tur')

    cy.get('.round-card').should('have.length', 2)
  })
})
