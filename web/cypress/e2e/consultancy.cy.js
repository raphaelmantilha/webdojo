//import consultancyData from '../fixtures/consultancy.json'
import { personal, company } from '../fixtures/consultancy.json'

describe('Formulário de Consultoria', () => {

    before(() => {
        cy.log('Isso acontece antes de todos os testes uma única vez')
    })
    beforeEach(() => {
        cy.login();
        cy.goTo('Formulários', 'Consultoria')

        //cy.fixture('consultancy').as('consultancyData')
    })

    afterEach(() => {
        cy.log('Isso acontece depois de cada teste')
    })

    after(() => {
        cy.log('Isso acontece depois de todos os testes uma única vez')
    })

    it.only('Deve solicitar consultoria individual', () => {
        cy.fillConsultancyForm(personal)
        cy.submitConsultancyForm()
        cy.validateConsultancyModal()
    })

    it('Deve solicitar consultoria in company', () => {
        cy.fillConsultancyForm(company)
        cy.submitConsultancyForm()
        cy.validateConsultancyModal()
    })

    it.only('Deve verificar os campos obrigatórios', () => {
        cy.submitConsultancyForm()
       
        const requiredFields = [
            { label: 'Nome Completo', message: 'Campo obrigatório' },
            { label: 'Email', message: 'Campo obrigatório' },
            { label: 'termos de uso', message: 'Você precisa aceitar os termos de uso' }
        ]

        requiredFields.forEach(({ label, message }) => {
            //label[text()="Nome Completo *"]/..//p
            //label[text()="Email *"]/..//p

            cy.contains('label', label)
                .parent()
                .find('p')
                .should('be.visible')
                .should('have.text', message)
                .and('have.class', 'text-red-400')
                .and('have.css', 'color', 'rgb(248, 113, 113)')
        })
    })
})