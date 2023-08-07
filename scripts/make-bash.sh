#!/bin/bash

containerId=docker ps -qf ancestor=portfolio-manager-frontend:latest

docker exec -ti $containerId /bin/bash