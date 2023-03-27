# base node image
FROM node:16-bullseye-slim AS base

# Install dependencies
RUN apt-get update && apt-get install -y openssl make g++ gcc python3

# set for base and all that inherit from it
ENV NODE_ENV=production

# Install all node_modules, including dev dependencies
FROM base AS deps

RUN mkdir /app
WORKDIR /app

ADD package.json yarn.lock ./
RUN yarn install --production=false

# Build the app
FROM base AS build

RUN mkdir /app
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
ADD . .

RUN yarn prisma-merge
RUN yarn prisma-gen
ADD prisma .
RUN yarn build

# Finally, build the production image with minimal footprint
FROM base

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=build /app/node_modules/.bin /app/node_modules/.bin
COPY --from=build /app/dist /app/dist
ADD . .

COPY ./start-with-migrations.sh /
RUN chmod +x /start-with-migrations.sh
ENTRYPOINT ["/start-with-migrations.sh"]
