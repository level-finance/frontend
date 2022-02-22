#!/bin/sh

if [ -z "$BLOCKNATIVE_DAPP_ID" ]; then
  echo "Please set the environment variable BLOCKNATIVE_DAPP_ID to run this image."
  echo "This is your Blocknative API Key / Dapp ID in your account dashboard."
  exit 1
fi

find /usr/share/nginx/html -type f -exec sed -i 's/VABNDAPPID/'${BLOCKNATIVE_DAPP_ID}'/g' {} +;

# Portis is optional, will replace with empty string if not specified and then use default from config
find /usr/share/nginx/html -type f -exec sed -i 's/VAPORTISDID/'${PORTIS_DAPP_ID}'/g' {} +;

nginx -g "daemon off;"