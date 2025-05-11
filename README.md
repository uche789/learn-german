# Learn language App

A personal language learning application.

## Technologies
The following technologies, libraries, APIs, and framework(s) were used:
- React
- GraphQL
- Contentful
- Typescript
- Vite


## Docker

Starting:

```bash
docker stop learn-lang-container
docker rm learn-lang-container
docker build . -t learn-lang-app

# This starts a detached container named learn-lang-container and maps port 8080 to NGINX port 80.
docker run -d -p 8080:80 --name learn-lang-container learn-lang-app
```

Optional

```bash
# remove dangling images and free space
docker image prune -f

# build with no cache
docker build --no-cache . -t learn-lang-app
```

ssh into machine

```bash 
# find container name or ID
docker ps

# SSH into container using name or ID
docker exec -it learn-lang-container sh
docker exec -it <container_name_or_id> sh
```

## Permissions

chmod +x scripts/*