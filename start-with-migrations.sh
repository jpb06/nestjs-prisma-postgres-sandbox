#!/bin/sh

set -ex
yarn prisma-merge
npx prisma migrate deploy
npx prisma db seed
yarn start