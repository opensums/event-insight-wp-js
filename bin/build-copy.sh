#!/bin/bash

# Build the module.
npm run build

# Copy the minified package to the WP repo.
cp ./dist/event-insight-wp.min.js ../event-insight-wp/event-insight/assets/event-insight-wp.min.js
