docker compose up -d --build
docker compose down


dir=~/dev/tomostudy/nginx/html/frontend

if [ ! -d $dir ]
then
  echo "Creating directory " . $dir
  mkdir -p $dir
fi

cp -r build/* $dir