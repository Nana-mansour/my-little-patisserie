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




