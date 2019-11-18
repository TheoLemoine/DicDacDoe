module.exports = {
    // An array of directory names to be searched recursively up from the requiring module's location
    moduleDirectories: ['node_modules'],

    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['**/*.[jt]s?(x)'],

    // An array of file extensions your modules use
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

    // The root directory that Jest should scan for tests and modules within
    rootDir: 'src/test',

    // The glob patterns Jest uses to detect test files
    testMatch: ['**/test/**/*.[jt]s?(x)'],

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ['\\\\node_modules\\\\'],

    // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
    testURL: 'http://localhost',
}
