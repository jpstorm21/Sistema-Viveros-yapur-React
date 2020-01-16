# HOW TO MAKE PRODUCTION VERSION

# Move to project folder
cd "C:/wamp64/www/SIVRIDT EC/"

# Delete old dist version
rm -rf dist/

# Create dist folder
mkdir dist/

# Update routes.json for production. staticPath value must be `${basename}/static`.

# Remove express static files handler in server.js

# Update routes for static files in dist/views/index.ejs adding the staticPath value.

# Config webpack for production

# Compile react client app with webpack
NODE_ENV=production node_modules/.bin/webpack -p

# Compile server files with babel
cd src/
../node_modules/.bin/babel server.js -d ../dist --presets @babel/env
../node_modules/.bin/babel middleware/ -d ../dist/middleware --presets @babel/env
../node_modules/.bin/babel models/ -d ../dist/models --presets @babel/env
../node_modules/.bin/babel routes/ -d ../dist/routes/ --presets @babel/env
cd ..

# Copy static and view folders from src to dist
cp -r src/static/ dist/
cp -r src/views/ dist/
cp -r src/script/ dist/
cp src/config.json dist/
cp src/routes/routes.json dist/routes/

# Restore previous state for webpack config file, express static files handler, routes.json, config.json and views/index.ejs

# COMMIT