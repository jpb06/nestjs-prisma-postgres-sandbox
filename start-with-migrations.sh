#!/bin/sh

set -ex
npx prisma migrate deploy
npx prisma db seed
yarn start