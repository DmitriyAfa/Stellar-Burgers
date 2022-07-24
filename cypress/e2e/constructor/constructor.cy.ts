/// <reference types="cypress" />
describe("Провекра компонента BurgerConstructor", () => {
  // используем хук beforeEach с помощью которого перед каждым тестом ниже  сначала откроем страницу (по адресу http://localhost:3000)
  beforeEach( function () {
    cy.visit("http://localhost:3000");
  });

    // Что бы получить номер заказа в модальном окне пользователю нужно залогинится
  it("Заходим в личный кабинет", () => {
    // зайдем на страницу с логином
    cy.visit("http://localhost:3000/login");
    // cy.get используется для получения селекторов (похож на querySelector() метод)
    // Что бы ввести данные в HTML-элемент можно воспользоваться методом type(text, [options])
    // У инпутов есть атрибут name, можно получить их поданным артибутам
    cy.get('[name="email"]').type("est-dat@yandex.ru");
    cy.get('[name="password"]').type("qqq111");
    //а для кнопки создадим дата аттрибут (почему-то не сработал), заменю name 
    cy.get('[name="btnLogin"]').click();
  });

  // // //Открытие модального окна с описанием конкретного ингредиента по клику на этот ингредиент 
  // // //Закрытие модального окна по клику на специальную кнопку для закрытия
  it("Открытие модального окна с информацией об ингредиенте", () => {
    //кликнем по ингредиенту с alt="name"
    cy.get('[alt="Филе Люминесцентного тетраодонтимформа"]').click();
    //Проверим содержит ли модальное окно имя ингредиента c помощью метода contains() - который получает DOM элемент по содержанию в нём текста
    cy.get('[data-modal="modal"]').contains("Филе Люминесцентного тетраодонтимформа");
    // проверю есть ли кнопка закрытия
    cy.get('[name="btnModalClose"]').should('exist');
    cy.get('[name="btnModalClose"]').click();
    //проверю что бы не было модального окна
    cy.get('[data-modal="modal"]').should('not.exist');
  });

    //Перетащить ингредиент из предоставленных ингредиентов (BurgerIngredients) в конструктор с ингредиентами и корректно отобразить его в конструкторе
    it("Перетащить ингредиент в конструктор", () => {
      cy.get('[alt="Филе Люминесцентного тетраодонтимформа"]').trigger("dragstart");
      cy.get('[data-cypress="constructor"]').trigger("drop");
      cy.get('[data-cypress="constructor"]').contains("Филе Люминесцентного тетраодонтимформа");
    });

  //Открытие модального окна с заказом по клику на кнопку 'оформитт заказ'
   it("Открытие модального окна с заказом", () => {
        cy.visit("http://localhost:3000");
    cy.get('[name="open order modal"]').click();
    cy.get('[name="email"]').type("est-dat@yandex.ru");
    cy.get('[name="password"]').type("qqq111");
    cy.get('[name="btnLogin"]').click();
    cy.wait(55000)
    cy.get('[name="open order modal"]').click();
    cy.get('[name="btnModalClose"]').should('exist');
    cy.get('[name="btnModalClose"]').click();
    cy.get('[name="btnModalClose"]').should('not.exist');
   });
});
