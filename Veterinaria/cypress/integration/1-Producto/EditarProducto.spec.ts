

describe('Modulo de crear un producto', ()  => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/productos/')
        cy.get('[id=editar]').last().click()
        cy.contains('Editar producto')
        cy.get('#precio').clear().type(15000)
        cy.get('#descuento').clear().type(66)
    })
    it ('Debe dar click en el boton de guardar cambios y solicitar el valor del envio', () => {
        cy.get('#envio-gratis').click({force: true, multiple: true})
        cy.get('[id=ver-cambios]').click()
        cy.get('span').contains('Debe ser un número positivo')
    })
    it ('Debe dar mostrar que el descuento es del 66% y el precio es de 5100', () => {
        cy.get('[id=ver-cambios]').click()
        cy.contains('66% OFF')
        cy.contains('5100')
    })

    it ('Debe dar click en guardar y debe redireccionar', () => {
        cy.get('[id=ver-guardar]').click()
    })
})