#!/bin/bash

echo "Starting project setup..."

# Load nvm
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# 1. Check if nvm is installed
if command -v nvm >/dev/null 2>&1; then
    echo "Setting Node.js version to 22..."
    nvm install 22
    nvm use 22
else
    echo "nvm is not installed. Please ensure Node.js version 22 is installed and in use."
fi

# Verify Node.js version
NODE_VERSION=$(node -v)
echo "Current Node.js version: $NODE_VERSION"

# 2. Install root npm dependencies
echo "Installing root npm dependencies..."
npm install

# 3. Install front-end npm dependencies
echo "Installing front-end npm dependencies..."
cd front-end
npm install
cd ..



echo "Setup complete!"
