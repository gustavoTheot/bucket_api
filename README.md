# Instalações necessárias

```
# Cria packege.json
npm init -y

# Instala o typescript como dependencia node
npm i typescript @types/node tsx dotenv -D

# Instala o fastify - Criar instancia de um serviço
npm i fastify

# Instala o CORS - Mecanismo para verificar que os navegadores verifiquem se uma solicitação foi autorizada antes de transferir os dados
npm install @fastify/cors

# Instalando o MongoDB - Serve para usarmos dependencias do mongoDB para está construindo o DB não relacional 
npm i mongoose

# Ajuda a trabalhar cojunto de parte como objeto
npm i @fastify/multipart

# Dependencias para realizar eventos no S3
npm i @aws-sdk/client-s3 @aws-sdk/lib-storage @aws-sdk/s3-request-presigner
```

# Executar comando

```
# Cria os containers e executa
docker-compose up -d

# Executa a aplicação
npm run dev
```
