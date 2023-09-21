module.exports = {
    apps: [
        {
            name: 'Application',
            script: './src/index.ts',
            env: {
                PORT: 9900,
                NODE_ENV: 'production',
            },
            // env_production: {
            //     PORT: 3000,
            //     NODE_ENV: 'production',
            // },
        },
    ],
};
