export const aboutUs = {
  openAndValidate() {
    cy.contains("a", "About us").click();
    cy.get("#videoModal", { timeout: 10000 }).should("be.visible");

    cy.get("#videoModalLabel")
      .should("be.visible")
      .and("contain.text", "About us");

    cy.get("#videoModal video").should("exist");

    
    cy.get("#videoModal video").then(($video) => {
      const videoSrc = $video.attr("src");

      if (videoSrc) {
        expect(videoSrc, "video src attribute").to.not.be.empty;
      } else {
        cy.wrap($video)
          .find("source")
          .should("have.attr", "src")
          .and("not.be.empty");
      }
    });

  },
};
