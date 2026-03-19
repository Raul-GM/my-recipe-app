#!/bin/bash

# 1. Cargar NVM para que 'node' y 'npx' estén disponibles
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 2. Ir a la carpeta de tu proyecto (IMPORTANTE)
cd "/Users/raul.garcia/RaulsPlayground/my-recipe-app"

# 3. Ejecutar el comando
npx -y @angular/cli mcp