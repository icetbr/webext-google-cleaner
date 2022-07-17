#!/bin/bash

PATH=$PATH:node_modules/.bin
# . ./.env
source .env

# web-ext lint: If the extension doesn’t meet the standards, it is rejected by the browser store.
_zip            () { cd source && zip -r -FS ../$WEBEXT_ID * ;}
_lint           () { web-ext lint ;}
alint           () { eslint source;}
build           () { parcel build --dist-dir dist source/manifest.json --no-content-hash --no-source-maps --no-cache --detailed-report 0 ;}
publishFirefox  () { web-ext lint && web-ext sign --channel=listed --api-key=$FIREFOX_KEY --api-secret=$FIREFOX_SECRET --id=$WEBEXT_ID ;}
uploadChrome    () { chrome-webstore-upload upload --source 827213fdc297424fa19b-3.7.3.xpi --extension-id $WEBEXT_ID --client-id $CHROME_KEY --client-secret $CHROME_SECRET --refresh-token $CHROME_REFRESH_TOKEN ;}

firstRun        () { web-ext lint && _zip ;}

"$@"
