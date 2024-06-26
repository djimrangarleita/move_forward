import { startApp } from './run';
import { config } from './config';

async function main() {
    try {
        const {app} = await startApp();

        app.listen(config.APP_PORT, () => {
            console.log(`Server listening on port ${config.APP_PORT}...`);
        });
    } catch (error) {
        console.log('Exiting app...');
        process.exit(1);
    }
}

main();