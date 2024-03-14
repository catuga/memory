#!/usr/bin/env sh

# Abort on errors
set -e

# Build
npm run build

# Navigate into the build output directory
cd dist

# If you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# If you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/catuga/memory.git main:gh-pages

cd -
