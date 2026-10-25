My Little Patisserie

Description

My Little Patisserie est une application de gestion des commandes d'une pâtisserie.

Technologies

- HTML5
- CSS3
- Bootstrap 5
- JavaScript avec modules ES
- JSON
- Git et GitHub

Structure du projet

- index.html : structure de la page.
- style.css: mise en forme.
- customers.json : données des clients.
- products.json: données des produits.
- orders.json : données des commandes.
- state.js : état initial de l'application.
- dataService.js : chargement des fichiers JSON.
- selectors.js : relations entre les entités, filtres et calculs.
- view.js : affichage et mise à jour du DOM.
- app.js : initialisation et gestion des événements.


Réponses aux questions de compréhension:

1. Pour éviter de répéter les mêmes informations plusieurs fois et pour économiser de la place si un client change d'adresse il suffit de la modifier à un seul endroit.

2. Les données JSON sont brutes et stockées sur le disque les données calculées sont créées en direct par le code JavaScript comme le prix total d'une commande.

3. On prend le customerId écrit dans la commande et on cherche le client qui possède ce même identifiant dans la liste des clients.

4. On lit le productId dans la commande puis on cherche ce produit par son identifiant unique dans le catalogue des produits.

5. find() s'arrête dès qu'il trouve le premier élément qui correspond alors que filter() parcourt toute la liste jusqu'au bout pour renvoyer tous les éléments qui correspondent.

6. Parce que l'application vient de s'ouvrir et que les fichiers JSON n'ont pas encore eu le temps d'être lus et chargés.

7. Son rôle est de charger toutes les données JSON nécessaires On attend la fin du chargement pour le premier rendu sinon l'interface va s'afficher vide.

8. Son rôle est de fabriquer et d'afficher le HTML sur l'écran On l'appelle à chaque fois que l'utilisateur fait une action ou que les données changent pour actualiser la page.

9. Son unique travail est de gérer les données. Modifier le visuel de la page est le travail exclusif du fichier de la vue.

10. Son rôle est seulement de s'occuper de l'affichage Elle ne doit pas se mélanger avec la logique de récupération des données.

11. Le fichier JSON est lu par le service de données Ces données sont stockées dans le state. La vue prend ce state utilise les infos des clients et des produits pour générer le HTML final.

12. On cherche tous les produits qui appartiennent à cette catégorie Ensuite on filtre les commandes pour garder uniquement celles qui contiennent au moins un de ces produits.

13. Il faut ouvrir les outils de développement puis regarder les messages d'erreur dans l'onglet Console et vérifier le statut du fichier dans l'onglet Network.

14. git add sélectionne les fichiers modifiés git commit valide et enregistre ces modifications sur l'ordinateur. git push envoie ces enregistrements sur le site GitHub.

15. Cela prouve au professeur que le travail a été fait étape par étape Cela permet aussi de revenir en arrière facilement si on fait une erreur de code.