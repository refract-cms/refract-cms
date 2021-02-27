# Refract-CMS Project

## Prequisites

- Install NodeJS
- Install Docker

## Start Refract-CMS

```bash
npm install
npm run dev
```

## Development links

| Name               | Url                                            |
| ------------------ | ---------------------------------------------- |
| Dashboard          | <http://localhost:3000>                        |
| GraphiQL           | <http://localhost:3000/cms/graphql>            |
| GraphQL Playground | <http://localhost:3000/cms/graphql-playground> |
| Mongo Express      | <http://localhost:8081>                        |

## Run in production

### Docker-compose

```bash
docker-compose -f ./docker-compose.prod.yml up --build
```

### Docker

```bash
docker build -t myapp_cms .
docker run -p "3000:3000" -e MONGO_URI="mongodb://..." -e ADMIN_USERNAME="admin" -e ADMIN_PASSWORD="..." -e JWT_SECRET="secret123" myapp_cms
```

### Node

The following environment variables must be set:

- MONGO_URI
- ADMIN_USERNAME
- ADMIN_PASSWORD
- JWT_SECRET

```bash
npm run build
npm run start:prod
```
