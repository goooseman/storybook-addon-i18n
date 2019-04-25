#!/usr/bin/env bash

# Configure git to be not-interactive

export GIT_MERGE_AUTOEDIT=no
git config gitflow.hotfix.finish.message "Hotfix %tag%"
git config gitflow.release.finish.message "Release %tag%"

if [[ $# -eq 0 ]] ; then
    echo 'You need to specify version (patch/minor/major)'
    exit 0
fi

# Getting the version number

VERSION=$(npm --no-git-tag-version version $1)
VERSION=$(echo $VERSION | cut -c 2-)

git checkout -- package.json || exit "$?"
git checkout -- package-lock.json || exit "$?"

if [ "$VERSION" = "" ]; then
    echo "Failed to take version"
    exit 0
fi

echo -n "Version will be $VERSION, continue? (y/n)?"

read answer
if echo "$answer" | grep -iq "^y" ;then
    echo "Lets'go!"
else
    exit 0
fi

# Pulling latest changes

git checkout master || exit "$?"
git pull || exit "$?"
git checkout develop || exit "$?"
git pull || exit "$?"

# Doing release

git flow release start $VERSION || exit "$?"

# Updating version in package.json, package-lock.json and Dockerrun.aws.json
npm --no-git-tag-version version $1
git commit -am "release: 🏹 v$VERSION" || exit "$?"

git flow release finish $VERSION || exit "$?"

# Pushing to repo

git push --all --follow-tags || exit "$?"

## Publishing

npm publish
