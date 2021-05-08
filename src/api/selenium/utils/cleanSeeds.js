import { execSync } from 'child_process';


export function cleanSeeds() {
    execSync(`./bin/fill_test_data.sh ${process.env.BACKEND_DIR}`, { stdio: 'inherit' });
}

cleanSeeds();
