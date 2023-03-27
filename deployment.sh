#!/bin/sh
SERVER_IP="130.162.38.88"
KEY_PATH="/Users/juuppikkemaat/oracle.pub"
# Usage:
#  build - Create/Update docker container for the backend application
#  run   - Run the backend as a container detached.
#  stop  - Stop the backend container and remove it.

if [ $# == 0 ]
then
    echo "Please supply a command."
    echo "Commands: deploy"
else
    if [ $1 == "deploy" ]
    then
        echo "Stopping the backend containers."
        ssh -i $KEY_PATH ubuntu@$SERVER_IP 'CONTAINERS=$(sudo docker ps -a -q --format="{{.ID}}") && sudo docker stop $CONTAINERS'
        echo "Removing the backend containers"
        ssh -i $KEY_PATH ubuntu@$SERVER_IP 'CONTAINERS=$(sudo docker ps -a -q --format="{{.ID}}") && sudo docker rm $CONTAINERS'

        echo "Starting the container on server."
        ssh -i $KEY_PATH ubuntu@$SERVER_IP "cd testregex && git pull && cd webapp && npm install && npm run build && cd .. && sudo docker build -t testregex . && sudo docker run -d -p 80:3000 testregex"
    fi
fi