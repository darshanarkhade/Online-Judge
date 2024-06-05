import { exec } from 'child_process';

const executePython = (filePath, inputPath) => {
    return new Promise((resolve, reject) => {
        exec(`< ${inputPath} python ${filePath}`, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else if (stderr) {
                reject(stderr);
            } else {
                resolve(stdout.trim());
            }
        });
    });
};

export { executePython };
