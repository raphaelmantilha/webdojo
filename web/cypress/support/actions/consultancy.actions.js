Cypress.Commands.add('fillConsultancyForm', (form) => {
    cy.get('input[placeholder="Digite seu nome completo"]').type(form.name)
    cy.get('input[placeholder="Digite seu email"]').type(form.email)

    cy.get('input[placeholder="(00) 00000-0000"]')
        .type(form.phone)
    //.should('have.value', '(19) 99999-8888')

    // //label[text()="Tipo de Consultoria"]/..//select    
    cy.contains('label', 'Tipo de Consultoria')
        .parent()
        .find('select')
        .select(form.consultancyType)

    // //span[text()="Pessoa Física"]/..//input
    if (form.personType === 'cpf') {
        cy.contains('span', 'Pessoa Física')
            .parent()
            .find('input')
            .click() //ou check()
            .should('be.checked')

        cy.contains('span', 'Pessoa Jurídica')
            .parent()
            .find('input')
            .should('be.not.checked')

        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type(form.document)
        //.should('have.value', '817.194.500-72')
    }

    if (form.personType === 'cnpj') {
        cy.contains('span', 'Pessoa Jurídica')
            .parent()
            .find('input')
            .click() //ou check()
            .should('be.checked')

        cy.contains('span', 'Pessoa Física')
            .parent()
            .find('input')
            .should('be.not.checked')

        cy.contains('label', 'CNPJ')
            .parent()
            .find('input')
            .type(company.document)

        const discoveryChannels = [
            'Instagram',
            'LinkedIn',
            'Udemy',
            'YouTube',
            'Indicação de Amigo'
        ]
    }

    form.discoveryChannels.forEach((channel) => {
        cy.contains('span', channel)
            .parent()
            .find('input')
            .check() //ou click()
            .should('be.checked')
    })

    cy.get('input[type="file"]')
        .selectFile(form.file, { force: true })
    //pdf obtido em lorempdf.com

    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type(form.description)
    //texto obtido em loremipsum.io

    cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        .type('Cypress')
        .type('{enter}')

    form.techs.forEach((tech) => {
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
            .type(tech)
            .type('{enter}')

        // cy.contains('span', tech)
        //     .should('be.visible') Não é uma boa estratégia porque qualquer outra span com texto "Cypress" seria validado aqui

        cy.contains('label', 'Tecnologias')
            .parent()
            .contains('span', tech)
            .should('be.visible')
    })

    if (form.terms === true) {
        cy.contains('label', 'termos de uso')
            .find('input')
            .check()
    }
})

Cypress.Commands.add('submitConsultancyForm', () => {
    cy.contains('button', 'Enviar formulário')
        .click()
})

Cypress.Commands.add('validateConsultancyModal', () => {
    cy.get('.modal', { timeout: 7000 })
        .should('be.visible')
        .find('.modal-content')
        .should('be.visible')
        .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
})