describe('Validações de Alertas em JavaScript', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Alertas JS', 'JavaScript Alerts')
    })

    it('Deve validar a mensagem de alerta', () => {

        //Isto é uma listener que vai aguardar o evento de exibição do Alert ocorrer
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá QA, eu sou um Alert Box!')
        })

        cy.contains('button', 'Mostrar Alert').click()
    })

    it('Deve confirmar um diálogo e validar a resposta positiva', () => {
        
        //Isto é uma listener que vai aguardar o evento de confirm ocorrer
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!')
            return true; // True simula o click no botão OK
        })

        //Isto é uma listener que vai aguardar o evento de exibição do Alert ocorrer
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você clicou em Ok!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('Deve cancelar um diálogo e validar a resposta negativa', () => {
        
        //Isto é uma listener que vai aguardar o evento de confirm ocorrer
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!')
            return false; // True simula o click no botão Cancelar
        })

        //Isto é uma listener que vai aguardar o evento de exibição do Alert ocorrer
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você cancelou!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('Deve interagir com um prompt, inserir um texto e validar uma mensagem', ()=> {
        cy.window().then((win) => {
            cy.stub(win,'prompt').returns('Fernando')  
        })

         cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá Fernando! Boas-vindas ao WebDojo!')
        })
    })
})