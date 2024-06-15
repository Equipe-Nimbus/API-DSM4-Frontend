# Etapa 1: Construir o projeto
# Use uma imagem oficial do Node.js como imagem base
FROM node:18-alpine AS builder

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie apenas os arquivos de dependências do projeto para o container
COPY package.json package-lock.json* yarn.lock* ./

# Instale as dependências
RUN yarn install --frozen-lockfile || npm install

# Copie o restante do código do projeto
COPY . .

# Construir a aplicação Next.js para produção
RUN yarn build || npm run build

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Exponha a porta que a aplicação irá utilizar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"] 
