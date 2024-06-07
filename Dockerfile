# Use a imagem oficial do Node.js como base
FROM node:latest

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código do projeto para o diretório de trabalho
COPY . .

# Defina a variável de ambiente para a chave da API do Google Maps
ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}

# Execute o build da aplicação
RUN npm run build

# Exponha a porta que a aplicação utilizará
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
