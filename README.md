Cette partie concerne le frontend de mon projet

- Création d'un one page application en ReactJS
- Deploiment sur kubernetes avec conteneurs docker

- Il s'agit d'une simple application de gestionnaire de patrimoine permettant d'afficher la totalité de son patrimoine ainsi que son évolution dans le temps
- L'application posséde un login et un register, ainsi que plusieurs pages pour différents services
- L'application est en cours d'amélioration, d'autres services sont en cours de constructions, notamment la possibilités  de récuperer des données automatiques via des API tiers comme BINANCE par exemple.

Concernant kubernetes

- le backend et le frontend sont sur kubernetes et communiquent via un ingress controleur
- Chaque microservices possédent 3 replicas (3 pods) afin d'assurer un fonctionnement optimal et une bonne répartition des charges
- Chaque microservices possédent ça propre base de données héberger par google kubernetes 
