#!/bin/bash
# bin/build-copy.sh

MODULE_NAME=event-insight-wp
TARGET_DIR=../event-insight-wp/event-insight/assets/

# Build the module.
npm run build

# Copy the minified package to the WP repo.
cp "./dist/$MODULE_NAME.umd.min.js" "$TARGET_DIR"
cp "./dist/$MODULE_NAME.umd.min.js.map" "$TARGET_DIR"

# Only copy the css file if it exists!
CSS="./dist/$MODULE_NAME.css"
if [ -f "$CSS" ]; then
  cp "$CSS" "$TARGET_DIR"
fi

# Recursively copy any other necessary assets.
# cp -R ./dist/fonts "$TARGET_DIR"
# cp -R ./dist/img "$TARGET_DIR"
