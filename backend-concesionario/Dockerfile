# Usar la imagen oficial de Node.js
FROM node:20

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./
COPY . .

# Instalar dependencias
RUN npm install

# Exponer el puerto de la API
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start"]
