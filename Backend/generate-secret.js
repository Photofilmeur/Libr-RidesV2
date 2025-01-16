
const fs = require('fs');
const crypto = require('crypto');

// Génère un secret JWT aléatoire
function generateJwtSecret() {
  return crypto.randomBytes(32).toString('base64');
}

// Écrit le secret généré dans un fichier .env
function writeJwtSecretToFile(secret) {
  fs.writeFile('.env', `JWT_SECRET=${secret}`, function (err) {
    if (err) throw err;
    console.log(`JWT secret has been saved to .env file.`);
  });
}

// Génère le secret JWT et l'écrit dans le fichier .env
const jwtSecret = generateJwtSecret();
writeJwtSecretToFile(jwtSecret);
