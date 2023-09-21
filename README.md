# gatewayApi

api gateway structure

# API Document

http://localhost:9090/api-docs/

# How to run this project

yarn start

yarn global add tsc typescript ts-node ts-node-dev
tsc --init
update tsconfig.json (allowjavascript, rootDir, outDir)

npm init --y
yarn add express
yarn add @types/express --dev

ts-node-dev server.ts

# express types

https://javascript.plainenglish.io/typed-express-request-and-response-with-typescript-7277aea028c

# what is tsc?

typescript compiler to compilete ts to js
tsc --init : to create tsconfig.json

# what is ts-node?

allow to compite .ts with tsc and run the output (js) with node,
In short, ts-node server.ts == tsc && node dist/server.js

# what is ts-node-dev?

it works like nodemon for typescript

# Deploy on Docker

First, authenticate (login) to a gitlab docker registry. [How to get deploy token?](https://docs.gitlab.com/ee/user/project/deploy_tokens/index.html#gitlab-deploy-token)

```bash
docker login -u <username> -p <deploy-token> gitlab.aitproject.com:5050
```

Second, Pull the Docker image named gateway-api from the gitlab docker registry.

```bash
docker pull gitlab.aitproject.com:5050/boripat/gatewayapi
```

Third, creates a new Docker container and starts it using the image gateway-api.

```bash
docker run -d \
  --name gateway-api-app \
  -e HOSTNAME=localhost \
  -e PORT=9090 \
  --restart always \
  -p 9090:9090 \
  gitlab.aitproject.com:5050/boripat/gatewayapi
```

The parameters are as follows:

-   `-d` runs the container in detached mode (background).
-   `--name gateway-api-app` assigns the name gateway-api-app to the new container.
-   `-e HOSTNAME=localhost -e PORT=9090` sets two environment variables HOSTNAME and PORT.
-   `--restart always` means the Docker daemon always restarts this container if it stops.
-   `-p 9090:9090` publishes the container's 9090 port to the host as port 9090.

If run in your desktop or your project terminal.

```bash
docker run -d --name gateway-api-app -e HOSTNAME=localhost -e PORT=9090 --restart always -p 9090:9090 gitlab.aitproject.com:5050/boripat/gatewayapi
```
