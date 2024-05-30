import { exec } from 'child_process';

const executePython = (filePath) => {
    return new Promise((resolve, reject) => {
        exec(`python ${filePath}`, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else if (stderr) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
};

export { executePython };
