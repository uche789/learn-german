docker stop learn-lang-container
docker rm learn-lang-container
docker build . -t learn-lang-app
docker run -d -p 8080:80 --name learn-lang-container learn-lang-app