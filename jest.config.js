module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-vector-icons|react-native-chart-kit|react-native-svg)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.(test|spec).(ts|tsx|js)'],
};

