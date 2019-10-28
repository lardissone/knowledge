# Delete all containers that matches a string

For example if you want to delete all containers that contains the string `scraper`:

`docker stop (docker ps -a |grep scraper|awk '{print $1;}') && docker rm (docker ps -a |grep scraper|awk '{print $1;}')`
