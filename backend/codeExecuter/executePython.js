import { exec } from 'child_process';
import fs from 'fs';

const executePython = async (filePath, inputPath, timeLimit) => {
    return new Promise((resolve, reject) => {
        const command = `python ${filePath}`;
        const child = exec(command, { timeout: timeLimit * 1000 }, (execError, stdout, stderr) => {
            if (execError) {
                if (execError.killed) {
                    reject(new Error('Time Limit Exceeded'));
                } else {
                    reject(execError);
                }
            } else if (stderr) {
                reject(new Error(stderr));
            } else {
                resolve(stdout.trim());
            }
        });

        fs.createReadStream(inputPath).pipe(child.stdin);
    });
};

export { executePython };
