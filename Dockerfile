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

# Execute o build da aplicação
RUN npm run build

# Exponha a porta que a aplicação utilizará
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]