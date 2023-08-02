///<reference types="cypress"/>
import data from '../fixtures/enrollments.json'
import enrollsPage from '../support/pages/EnrollsPage'
describe('matriculas', () => {

    it('deve poder matricular um novo aluno', () => {

        const dataTest = data.create

        cy.task('resetStudent', dataTest.student)

        cy.adminLogin()
        enrollsPage.navbar.goToEnrolls()
        enrollsPage.goForm()
        enrollsPage.selectItem('student', dataTest.student.name)
        enrollsPage.selectItem('plan', dataTest.plan)

        enrollsPage.fillCard(dataTest.student)
        enrollsPage.submit()
        enrollsPage.popup.haveText('Matrícula cadastrada com sucesso.')

    })

    it.only('não deve criar matricula duplicada', () => {
        const dataTest = data.duplicate

       cy.task('resetStudent', dataTest.student)

        cy.task('resetStudent', dataTest.student)
        cy.task('selectStudentId', dataTest.student.email)
            .then(result => {
                cy.log(JSON.stringify(result))
            })

        
    })


})