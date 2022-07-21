// describe('Created order ingredients', function () {
//   before(function () {
//     cy.visit('http://localhost:3000');
//     cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
//       fixture: 'ingredients.json',
//     });
//   });

//   it('доступ к сайту получин localhost:3000', function () {
//     cy.visit('http://localhost:3000');
//   });
//   it('наименования есть', function () {
//     cy.get('[data-test-id="ingredient-name"]').eq(0).as('first');
//   });
//   it('Добавление булки', function () {
//     cy.get('[data-test-id="ingredient-name"]')
//       .eq(0)
//       .as('first')
//       .parent()
//       .find('[data-test-id="ingredient"]')
//       .eq(0)
//       .as('bun');

//     cy.get('@bun').trigger('dragstart');
//     cy.get('[data-test-id="burder-constructor"]').trigger('drop');
//   });
//   it('Добавление ингредиента', function () {
//     cy.get('[data-test-id="ingredient-name"]')
//       .eq(1)
//       .as('first')
//       .parent()
//       .find('[data-test-id="ingredient"]')
//       .eq(0)
//       .as('item');
//     cy.get('[data-test-id="ingredient-name"]')
//       .eq(1)
//       .as('first')
//       .parent()
//       .find('[data-test-id="ingredient"]')
//       .eq(3)
//       .as('item-next');

//     cy.get('@item').trigger('dragstart');
//     cy.get('[data-test-id="burder-constructor"]').trigger('drop');
//     cy.get('@item-next').trigger('dragstart');
//     cy.get('[data-test-id="burder-constructor"]').trigger('drop');
//   });
//   it('Открытие модалки ингредиента', function () {
//     cy.get('[data-test-id="ingredient-name"]')
//       .eq(1)
//       .as('first')
//       .parent()
//       .find('[data-test-id="ingredient"]')
//       .eq(0)
//       .as('item');

//     cy.get('@item').click();
//   });
//   it('модалка ингредиента открыта', function () {
//     cy.get('.modal-wrap');
//   });
//   it('закрытие модалки ингредиента', function () {
//     cy.get('.btn-close-modal').click();
//   });
// });
