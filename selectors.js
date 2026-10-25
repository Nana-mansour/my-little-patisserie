import { etat } from "./state.js";

export function trouverClient(id) {
    return etat.customers.find(function(client) {
        return client.id === id;
    });
}

export function trouverProduit(id) {
    return etat.products.find(function(produit) {
        return produit.id === id;
    });
}

export function calculerTotal(commande) {
    let total = 0;

    commande.items.forEach(function(item) {
        const produit = trouverProduit(item.productId);

        if (produit) {
            total = total + produit.price * item.quantity;
        }
    });

    return total;
}

export function preparerCommande(commande) {
    const client = trouverClient(commande.customerId);
    const lignes = [];

    commande.items.forEach(function(item) {
        const produit = trouverProduit(item.productId);

        if (produit) {
            lignes.push({
                name: produit.name,
                price: produit.price,
                quantity: item.quantity,
                total: produit.price * item.quantity,
                category: produit.category
            });
        } else {
            lignes.push({
                name: "Produit inconnu",
                price: 0,
                quantity: item.quantity,
                total: 0,
                category: ""
            });
        }
    });

    let nomClient = "Client inconnu";
    let villeClient = "Ville inconnue";

    if (client) {
        nomClient = client.Name;
        villeClient = client.city;
    }

    return {
        id: commande.id,
        customer: nomClient,
        city: villeClient,
        date: commande.date,
        status: commande.status,
        items: lignes,
        total: calculerTotal(commande)
    };
}

export function filtrerCommandes() {
    const commandes = [];

    etat.orders.forEach(function(commande) {
        const client = trouverClient(commande.customerId);

        let nomClient = "";

        if (client) {
            nomClient = client.Name;
        }

        const recherche = nomClient.toLowerCase()
            .includes(etat.search.toLowerCase());

        let bonStatut = true;

        if (etat.status !== "toutes") {
            bonStatut =
                commande.status.toLowerCase() ===
                etat.status.toLowerCase();
        }

        let bonneCategorie = false;

        if (etat.category === "toutes") {
            bonneCategorie = true;
        } else {
            commande.items.forEach(function(item) {
                const produit = trouverProduit(item.productId);

                if (produit &&
                    produit.category.toLowerCase() ===
                    etat.category.toLowerCase()) {
                    bonneCategorie = true;
                }
            });
        }

        if (recherche && bonStatut && bonneCategorie) {
            commandes.push(commande);
        }
    });

    return commandes;
}

export function calculerIndicateurs() {
    let reservations = etat.orders.length;
    let livrees = 0;
    let annulees = 0;
    let total=0;

    etat.orders.forEach(function(commande) {
        if (commande.status.toLowerCase() === "livree") {
            livrees = livrees + 1;
        }

        if (commande.status.toLowerCase() === "annulee") {
            annulees = annulees + 1;
        }

        total = total + calculerTotal(commande);
    });

    return {
        reservations: reservations,
        livrees: livrees,
        annulees: annulees,
        total: total +" "+"MAD"
    };
}