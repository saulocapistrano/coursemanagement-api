# Imagem base oficial do Node
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante da aplicação
COPY . .

# ⚠️ GERA O CLIENT DO PRISMA
RUN npx prisma generate

# Expõe a porta do app (mapeada no docker-compose)
EXPOSE 3000

# Comando para subir a aplicação
CMD ["npm", "run", "dev"]
