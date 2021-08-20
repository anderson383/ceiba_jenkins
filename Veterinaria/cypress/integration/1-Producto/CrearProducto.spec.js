

describe('Modulo de crear un producto', ()  => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/productos/')
        cy.get('#nuevo-producto').click()
    })
    it ('Deben aparecer los campos que son obligatorios', () => {
        cy.get('[id=ver-guardar]').click()
        cy.get('form').should('contain', 'El nombre es requerido')
        cy.get('form').should('contain', 'La url de imagen es requerido')
        cy.get('form').should('contain', 'Debe ser un número positivo')
        cy.get('form').should('contain', 'La categoria es requerida')
        cy.get('form').should('contain', 'Debe ser un número positivo')
    })
    /*it ('Llenar formulario de producto y ver lo cambios y luego guardar cambios', () => {
        cy.contains('Configuración')
        cy.get('#nombre-producto').type('Correa reflectiva para perro - rosado')
        cy.get('#url-imagen').type('https://www.ciudaddemascotas.com/pub/media/catalog/product/cache/69c62af52119a2e09af1a901268e75f5/c/o/correa_rosado_1-min.jpg')
        cy.get('#precio').clear().type(9000)
        cy.get(`[data-testid="select-categoriad"]`).click({force: true, multiple: true});
        cy.get('[role=option]').contains('Collares').click();
        cy.get('#descuento').clear().type(44)
        cy.get('#fecha-inicio').type('2021-11-08T00:00')
        cy.get('#fecha-final').type('2021-12-08T00:00')
        cy.get('#descripcion').type('Correa reflectiva para perro - rosada en nylon reflectiva diseñada para optimizar la resistencia y la durabilidad, con gancho metálico para asegurar tu seguridad y la de tu perro.')
        cy.get('#fecha-final').type('2021-12-08T00:00')
        cy.get('#envio-gratis').click({force: true, multiple: true})
        cy.get('[id=ver-cambios]').click()
        cy.contains('Correa reflectiva para perro - rosado')
        cy.get('[id=seguir-configurando]').click()
        cy.get('[id=ver-guardar]').click()
    })*/
})