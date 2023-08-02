///<reference types="cypress"/>

import users from '../fixtures/users.json'
import loginPage from '../support/pages/LoginPage'
import studentPage from '../support/pages/StudentPage'



describe('lgoin', () => {

  it('deve logar com o perfil do admin', () => {

    const user = users.admin

    loginPage.dologin(user)
    studentPage.navbar.userLoggedIn(user.name)

  })

  it('não deve logar com senha incoreta', () => {

    const user = users.inv_pass

    loginPage.dologin(user)
    loginPage.popup.haveText('Suas credenciais são inválidas, por favor tente novamente!')

  })

  it('não deve logar com email não cadastrado', () => {

    const user = users.email_not_found

    loginPage.dologin(user)
    loginPage.popup.haveText('Suas credenciais são inválidas, por favor tente novamente!')
  })

  it('não deve logar com emails incorretos', () => {

    const emails = users.inv_emails

    let outputMessages = []
    let expectedMessages = []

    loginPage.go()

    emails.forEach((u) => {
      loginPage.fill(u)
      loginPage.submit()

      loginPage.popup.content('#swal2-content')
        .invoke('text')
        .then((t) => {
          cy.log(t)
          outputMessages.push(t)
          expectedMessages.push('Insira um email válido.')

        })

        loginPage.popup.back()
    })

    cy.wrap(outputMessages).should('deep.equal', expectedMessages)

  })

  it('não deve logar com email em branco', () => {

    const user = users.empty_email

    loginPage.dologin(user)
    loginPage.popup.haveText('Os campos email e senha são obrigatórios.')
  })

  it('não deve logar com senha em branco', () => {

    const user = users.empty_password

    loginPage.dologin(user)
    loginPage.popup.haveText('Os campos email e senha são obrigatórios.')
  })
})

