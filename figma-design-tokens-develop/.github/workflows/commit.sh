git config user.email "tanishraj91@gmail.com"
git config user.name "tanishraj"
set -ex

git add .
hub commit -m "update token to css"
hub push -u origin master
