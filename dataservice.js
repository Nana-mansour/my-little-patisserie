export async function chargerFichier(url) {
    const reponse = await fetch(url);

    if (!reponse.ok) {
        throw new Error("Impossible de charger : " + url);
    }

    return await reponse.json();
}

export async function chargerDonnees() {
    const customers = await chargerFichier("./customers.json");
    const products = await chargerFichier("./products.json");
    const orders = await chargerFichier("./orders.json");

    return {
        customers: customers,
        products: products,
        orders: orders
    };
}