module.exports = {
  // Racine du projet (l'endroit où se trouvent les fichiers de test)
  roots: ['<rootDir>/src'],

  // Extensions de fichiers à considérer pour les tests
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],

  // Configuration pour transformer les fichiers JavaScript avec Babel
  transform: {
    '^.+\\.js$': 'babel-jest',
  },

  // Répertoire où seront stockés les rapports de couverture
  coverageDirectory: '<rootDir>/coverage',

  // Liste de fichiers/chemins à ignorer pour les tests
  testPathIgnorePatterns: ['/node_modules/'],

  // Module d'environnement pour les tests (peut être "jsdom", "node", etc.)
  testEnvironment: 'jsdom',

  // Liste des modules qui ne doivent pas être transformés par Babel
  transformIgnorePatterns: [
    '/node_modules/(?!axios)/', // Ignorer node_modules sauf axios
  ],

  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

  // D'autres configurations spécifiques au projet
};