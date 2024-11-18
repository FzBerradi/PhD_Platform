# Étape 1: Utiliser Node.js pour la construction de l'application Angular
FROM node:18 as build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet Angular dans le conteneur
COPY . /app

# Installer les dépendances
RUN npm install

# Construire l'application Angular en mode production
RUN npm run build --prod

# Étape 2: Utiliser Nginx pour servir l'application Angular
FROM nginx:alpine

# Copier les fichiers construits dans le dossier de distribution Nginx
COPY --from=build /app/dist/my-angular-app /usr/share/nginx/html

# Exposer le port 80 pour Nginx
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
