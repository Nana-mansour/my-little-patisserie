import { etat } from "./state.js";
import { chargerDonnees } from "./dataservice.js";

import {
    render,
    afficherErreur,
    afficherDetail
} from "./view.js";

function initialiserEvenements() {

    const recherche = document.getElementById("rech");
    recherche.addEventListener("input", function(event) {
        etat.search = event.target.value;
        render();
    });

    document.querySelectorAll(".statut").forEach(function(bouton) {
        bouton.addEventListener("click", function() {
            etat.status = bouton.dataset.status;
            etat.category = "toutes";
            render();
        });
    });

    document.querySelectorAll(".categorie").forEach(function(bouton) {
        bouton.addEventListener("click", function() {
            etat.category = bouton.dataset.categorie;
            etat.status = "toutes";
            render();
        });
    });

    document.getElementById("table").addEventListener("click", function(event) {
        if (event.target.classList.contains("detail")) {
            const id = Number(event.target.dataset.id);

            etat.selectedOrderId = id;
            afficherDetail(id);
        }
    });

}

async function initialiserApplication() {
    initialiserEvenements();

    try {
        const donnees = await chargerDonnees();
        console.log(donnees.customers);
         console.log(donnees.products);

        console.log(donnees.orders);


        etat.customers = donnees.customers;
        etat.products = donnees.products;
        etat.orders = donnees.orders;

        afficherErreur("");
        render();

    } catch (erreur) {
        console.log(erreur);
       
    }
}

initialiserApplication();