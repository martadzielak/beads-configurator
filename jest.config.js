/** @type {import('jest').Config} */
module.exports = {
	testEnvironment: 'jsdom',
	roots: ['<rootDir>/src'],
	testMatch: ['**/__tests__/**/*.(test|spec).(ts|tsx)'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
			transform: {
				'^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.jest.json', diagnostics: false }],
			},
		transformIgnorePatterns: [
			'/node_modules/(?!(react-colorful)/)'
		],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'^next/image$': '<rootDir>/__mocks__/nextImageMock.tsx',
		'\\.(png|jpg|jpeg|gif|webp|svg|ico)$': '<rootDir>/__mocks__/fileMock.js',
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
		setupFiles: [],
		setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
			globals: {},
};
