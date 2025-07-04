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

# This starts a detached container named learn-lang-container and maps port 8080 to NGINX port 443.
docker run -d -p 8080:443 --name learn-lang-container learn-lang-app
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

# Logs
docker logs learn-lang-container
```

## Troubleshooting

### Grant permission to run scripts

```
chmod +x scripts/*
```

### Matching ssl certificates
Make sure that the ssl certificate and private key match match

```
openssl rsa -noout -modulus -in private.key | openssl md5
openssl x509 -noout -modulus -in ssl-bundle.crt | openssl md5
```

 

