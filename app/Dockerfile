# Usa a imagem node:18-alpine como base
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Expõe a porta que a aplicação usa
EXPOSE 3333

# Comando para rodar a aplicação em desenvolvimento (com hot-reload usando tsx)
CMD ["npm", "run", "dev"]