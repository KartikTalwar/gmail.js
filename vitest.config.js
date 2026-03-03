import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        // Match the same test patterns as Jest: test/test.*.js
        include: ['test/test.*.js'],
        
        // Collect coverage
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
        },
        
        // Environment
        environment: 'node',
        
        // Pass globals that the tests expect
        globals: {},
        
        // Clear mocks between tests
        clearMocks: true,
        
        // Set up test timeout
        hookTimeout: 10000,
    },
});
