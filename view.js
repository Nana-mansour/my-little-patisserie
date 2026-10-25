import { etat } from "./state.js";

import {
    filtrerCommandes,
    preparerCommande,
    calculerIndicateurs
} from "./selectors.js";

export function afficherErreur(message) {
    document.getElementById("erreur").textContent = message;
}

export function afficherIndicateurs() {
    const indicateurs = calculerIndicateurs();

    document.getElementById("reserv").textContent =
        indicateurs.reservations;

    document.getElementById("conf").textContent =
        indicateurs.livrees;

    document.getElementById("annulee").textContent =
        indicateurs.annulees;

    document.getElementById("total").textContent =
        indicateurs.total;
}

export function afficherCommandes() {
    const tableau = document.getElementById("table");
    tableau.innerHTML = "";

    const commandes = filtrerCommandes();

    commandes.forEach(function(commande) {
        const details = preparerCommande(commande);
        const ligne = document.createElement("tr");

        let produits = "";
        let categories = "";

        details.items.forEach(function(item) {
            if (produits !== "") {
                produits = produits + ", ";
            }

            produits = produits + item.name + " x " + item.quantity;

            if (!categories.includes(item.category) && item.category !== "") {
                if (categories !== "") {
                    categories = categories + ", ";
                }

                categories = categories + item.category;
            }
        });

        const celluleId = document.createElement("td");
        celluleId.textContent = details.id;
        ligne.appendChild(celluleId);

        const celluleNom = document.createElement("td");
        celluleNom.textContent = details.customer;
        ligne.appendChild(celluleNom);

        const celluleProduit = document.createElement("td");
        celluleProduit.textContent = produits;
        ligne.appendChild(celluleProduit);

        const celluleCategorie = document.createElement("td");
        celluleCategorie.textContent = categories;
        ligne.appendChild(celluleCategorie);

        const cellulePrix = document.createElement("td");
        cellulePrix.textContent = details.total.toFixed(2) + " MAD";
        ligne.appendChild(cellulePrix);

        const celluleDate = document.createElement("td");
        celluleDate.textContent = details.date;
        ligne.appendChild(celluleDate);

        const celluleStatut = document.createElement("td");
        celluleStatut.textContent = details.status;
        ligne.appendChild(celluleStatut);

        const celluleDetail = document.createElement("td");
        const bouton = document.createElement("button");

        bouton.type = "button";
        bouton.className = "btn btn-sm btn-primary detail";
        bouton.textContent = "Détail";
        bouton.dataset.id = details.id;

        celluleDetail.appendChild(bouton);
        ligne.appendChild(celluleDetail);

        tableau.appendChild(ligne);
    });

    if (commandes.length === 0) {
        tableau.innerHTML =
            '<tr><td colspan="8">Aucune commande trouvée.</td></tr>';
    }
}

export function afficherDetail(id) {
    const zone = document.getElementById("detail");
    let commandeTrouvee = null;

    etat.orders.forEach(function(commande) {
        if (commande.id === id) {
            commandeTrouvee = commande;
        }
    });

    if (commandeTrouvee === null) {
        zone.textContent = "Commande introuvable.";
        return;
    }

    const details = preparerCommande(commandeTrouvee);

    zone.innerHTML = "";

    const titre = document.createElement("h3");
    titre.textContent = "Commande #" + details.id;
    zone.appendChild(titre);

    const client = document.createElement("p");
    client.textContent = "Client : " + details.customer;
    zone.appendChild(client);

    const ville = document.createElement("p");
    ville.textContent = "Ville : " + details.city;
    zone.appendChild(ville);

    const date = document.createElement("p");
    date.textContent = "Date : " + details.date;
    zone.appendChild(date);

    const statut = document.createElement("p");
    statut.textContent = "Statut : " + details.status;
    zone.appendChild(statut);

    const sousTitre = document.createElement("h4");
    sousTitre.textContent = "Produits commandés";
    zone.appendChild(sousTitre);

    const liste = document.createElement("ul");

    details.items.forEach(function(item) {
        const element = document.createElement("li");

        element.textContent =
            item.name +
            " - Prix : " + item.price + " MAD" +
            " - Quantité : " + item.quantity +
            " - Total : " + item.total.toFixed(2) + " MAD";

        liste.appendChild(element);
    });

    zone.appendChild(liste);

    const total = document.createElement("p");
    total.textContent =
        "Total : " + details.total.toFixed(2) + " MAD";

    zone.appendChild(total);
}

export function render() {
    afficherIndicateurs();
    afficherCommandes();

    if (etat.selectedOrderId !== null) {
        afficherDetail(etat.selectedOrderId);
    }
}