

describe('Modulo de crear un producto', ()  => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/productos/')
    })
    it ('Debe dar click en el ultimo elemento de la tabla y debe eliminarlo', () => {
        cy.get('[id=eliminar]').last().click()
        cy.get('#eliminar-element').click({force: true, multiple: true})
        cy.contains('Correa reflectiva para perro - rosado').should('not.exist')
    })
})