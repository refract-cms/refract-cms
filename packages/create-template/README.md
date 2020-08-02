# Refract-CMS Project

## Setup docker

Start a mongo process in the background using docker:

```
docker-compose up -d
```

## Start Refract-CMS

```
npm install
npm start
```

## Development links

| Name               | Url                                            |
| ------------------ | ---------------------------------------------- |
| Dashboard          | <http://localhost:3000>                        |
| GraphiQL           | <http://localhost:3000/cms/graphql>            |
| GraphQL Playground | <http://localhost:3000/cms/graphql-playground> |
| Mongo Express      | <http://localhost:8081>                        |

## Run in production

```
npm run build
npm start
```
