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

# Etapa 2: Servir a aplicação
# Use uma imagem menor para a etapa de produção
FROM node:18-alpine AS runner

# Defina a variável de ambiente NODE_ENV para produção
ENV NODE_ENV=production

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos necessários da etapa de construção
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Exponha a porta que a aplicação irá utilizar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["yarn", "start"]  # Ou "npm", "start" se você usar npm
