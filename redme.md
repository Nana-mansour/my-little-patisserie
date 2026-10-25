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


# my-little-patisserie
• dataservice.js :   Il utilise l'API Fetch pour charger les fichiers JSON  gère les erreurs de réseau et renvoie les données brutes prêtes à être stockées.

• state.js  : Il définit et maintient l'état mémoire de l'application. 

• selector.js  : Ce script regroupe l'accès aux éléments HTML de la page. 

• view.js (Affichage et Rendu graphique) : Ce module s'occupe exclusivement de la manipulation du DOM pour l'affichage visuel. 

• app.js (Point d'entrée et Orchestration) : Au chargement de la page, il appelle la fonction d'initialisation, déclenche le chargement des données via dataservice.js, initialise le state.js, configure les écouteurs d'événements sur les éléments de selector.js, et demande à view.js de faire le premier affichage.

les 3 fichiers JSON:
• customers.json : Ce fichier contient la liste de tous les clients de l'application. Chaque client est représenté par un objet possédant un identifiant unique , son nom complet, sa ville et son active.

• products.json: Ce fichier répertorie l'ensemble des articles disponibles à la vente. Chaque produit possède un identifiant unique , un nom, un prix unitaire,une catégorie et le stock diponible.

• orders.json : C'est le fichier centralisant les transactions. Chaque commande comporte :
	• Un identifiant unique de commande.
	• L'identifiant du client ayant passé la commande.
	• La date de la commande.
	• Le statut de la commande.
	• Un tableau de produits commandés ("items" ou "products").


  • customers.json: Ce fichier contient la liste de tous les clients de l'application.
  
• products.json: Ce fichier répertorie l'ensemble des articles disponibles à la vente. 

• orders.json : C'est le fichier centralisant les transactions. Chaque commande comporte :
	• Un identifiant unique de commande.
	• L'identifiant du client ayant passé la commande, faisant office de clé étrangère vers customers.json.
	• La date de la commande.
	• Le statut de la commande.
	• Un tableau de produits commandés ("items" ou "products"), où chaque élément contient l'identifiant du produit ("product_id"), reliant la ligne à products.json, et la quantité achetée ("quantity").


  • Relation Client - Commande : Un client peut passer une ou plusieurs commandes mais En revanche, une commande spécifique n'appartient qu'à un seul et unique client.
  
• Relation Commande - Produit  : Une commande peut contenir plusieurs produits différents et un même produit peut être acheté dans plusieurs commandes distinctes Cette relation se matérialise à l'intérieur de chaque commande par une liste de lignes de commande (le tableau d'articles).

Le chargement des données se fait de manière asynchrone dès le démarrage de l'application via le fichier dataservice.js. Pour optimiser les performances et éviter de bloquer l'interface, l'application utilise Promise.all() combiné avec l'API fetch().


Le state C'est un objet  conservé en mémoire vive qui remplit deux rôles majeurs :
• Mise en cache des données : Il stocke les listes complètes des clients, produits et commandes après leur chargement initial, évitant ainsi d'avoir à relire les fichiers JSON à chaque interaction.
• Suivi de l'interface : Il garde une trace en temps réel de l'état de l'interface utilisateur, comme l'identifiant de la commande actuellement sélectionnée pour l'affichage du détail, ou les filtres et critères de recherche actifs.

rôle de la fonction d'initialisation:

 la fonction d'initialisation est le point d'entrée et le déclencheur de l'application. 

rôle de la fonction rendu :

 cette fonction est responsable de la mise à jour dynamique de l’interface graphique (DOM) à partir de l’état actuel du state.

 L’utilisation de find(), map(), filter() et forEach():

• filter() : Utilisée pour restreindre la liste des commandes ou des clients affichés en fonction des critères de recherche saisis par l'utilisateur.

• find() : Employée pour retrouver un objet unique et précis.

• map() : Utilisée pour transformer les tableaux de données brutes en un nouveau tableau.

• forEach() : Utilisée pour parcourir des listes sans les modifier, notamment pour attacher des écouteurs d'événements sur chaque ligne de commande générée.


Le calcul du montant d’une ligne de commande

Pour chaque article présent au sein d’une commande, le montant de la ligne est calculé dynamiquement. la formule mathématique :
Montant de la ligne=Prix unitaire du produit*Quantité commandée

Le montant total d'une commande s'obtient en accumulant les montants de chacune de ses lignes l’application utilise la méthode reduce()  sur le tableau des articles de la commande Elle calcule le montant de chaque ligne, puis additionne le tout pour obtenir la somme finale globale facturée au client.



L’interface propose une réactivité en temps réel grâce à des écouteurs d'événements de type input ou change :
• Une barre de recherche textuelle permet de filtrer les commandes par le nom du client.
• Des menus déroulants ou des boutons de sélection permettent de filtrer les commandes selon leur statut.
Chaque action de filtrage met à jour les critères dans le state et déclenche immédiatement la fonction de rendu pour rafraîchir l'affichage.


Lorsqu'un utilisateur clique sur une commande de la liste principale, un écouteur d'événement capture l'ID de la commande sélectionnée. Cet ID est enregistré dans le state, puis la fonction de rendu dédiée aux détails extrait les informations complètes de cette commande. Elle construit une fenêtre modale ou un volet latéral affichant les informations du client concerné ainsi que le tableau complet des produits achetés avec leurs sous-totaux.


Pour rendre l'application robuste et éviter les plantages, des blocs try / catch encadrent les opérations sensibles comme les requêtes de chargement fetch(). En cas de problème de réseau ou de fichier JSON manquant, l’erreur est capturée dans le catch, et une fonction de rendu d’erreur injecte un message visuel clair dans le HTML pour avertir l'utilisateur.


• Difficulté rencontrée : Lors de la phase de publication du projet, une difficulté est survenue dans le terminal lors de la tentative d'initialisation du dépôt avec la commande git init. Le terminal a renvoyé des messages d'erreur en rouge, bloquant le processus de versioning local Ce problème était lié  à l'absence de l'installation globale de Git sur la machine.


• Solution apportée : Pour résoudre ce blocage et finaliser le projet l'alternative a été d'utiliser directement l'interface graphique de GitHub (le site web) ou l'application GitHub Desktop En créant le dépôt directement en ligne il a été possible d'y glisser et déposer les fichiers du projet (app.js, state.js, etc.) afin de publier la version finale demandée et de générer le lien de rendu pour le projet


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
