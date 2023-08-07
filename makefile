include .env 

build:
	docker build -t ${DOCKER_BUILD_NAME} ${DOCKER_BUILD_PATH}

start:
	docker run -d --network=${DOCKER_BACKEND_NETWORK} -p ${DOCKER_FRONTEND_RUN_PORT}:4200 -v ${DOCKER_FRONTEND_VOLUME_TO_COPY}:/usr/src/app ${DOCKER_BUILD_NAME}

id:
	echo "CONTAINER ID" && docker ps -qf ancestor=${DOCKER_BUILD_NAME}:latest

# bash:
# 	sh ./scripts/make-bash.sh