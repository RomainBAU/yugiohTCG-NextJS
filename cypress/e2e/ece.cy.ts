describe("Affichage du panier", () => {
    it("devrait afficher la page du panier avec les cartes", () => {
        // Visiter la page du panier
        cy.visit("/cart");

        // Vérifier que la page se charge
        cy.url().should("include", "/cart");

        // Vérifier le titre de la page
        cy.contains("Cartes dans le panier").should("be.visible");

        // Attendre que les cartes se chargent (appel API externe)
        cy.wait(3000); // Attendre 3 secondes pour le chargement des données

        // Vérifier qu'il y a des cartes affichées
        cy.get(".card").should("have.length.greaterThan", 0);

        // Vérifier qu'au moins une carte a une image ou un message d'image indisponible
        cy.get(".card").first().within(() => {
            cy.get(".card-img-top, .bg-zinc-100").should("exist");
            cy.get(".card-title").should("exist");
            cy.contains("Type:").should("exist");
        });

        // Vérifier la pagination si elle existe
        cy.get("body").then(($body) => {
            if ($body.text().includes("Page")) {
                cy.contains("Page").should("be.visible");
                cy.contains("Précédent").should("be.visible");
                cy.contains("Suivant").should("be.visible");
            }
        });
    });

    it("devrait avoir la structure HTML correcte", () => {
        cy.visit("/cart");

        // Vérifier la présence du conteneur principal
        cy.get(".container").should("exist");

        // Vérifier que le titre est dans un h1 ou similaire
        cy.get("h1").contains("Cartes dans le panier").should("exist");

        // Vérifier la grille de cartes
        cy.get(".row").should("exist");
        cy.get(".col-12").should("exist");
    });
});