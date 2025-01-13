FROM node:22.8
WORKDIR /app

# Copie apenas os arquivos essenciais para instalar as dependências
COPY package.json yarn.lock ./

# Instala as dependências
RUN yarn install

# Copie o restante do código
COPY . .

# Gere os arquivos do Prisma e aplique as migrações
RUN yarn prisma generate
RUN yarn prisma migrate deploy

# Compile a aplicação (caso use TypeScript ou outro processo de build)
RUN yarn build

# Exponha a porta usada pela aplicação
EXPOSE 3001

# Comando para iniciar o servidor
CMD ["node", "dist/server.js"]
