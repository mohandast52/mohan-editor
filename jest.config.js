module.exports = {
  verbose: true,
  collectCoverageFrom: [
    'components/Directory/*.{js,jsx}',
    'components/Editor/*.{js,jsx}',
    'components/Navbar/*.{js,jsx}',
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],
};
