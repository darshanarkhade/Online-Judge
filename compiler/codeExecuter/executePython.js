// codeExecuter/executePython.js
import { exec } from 'child_process';

const executePython = async (filePath, inputPath, timeLimit) => {
    return new Promise((resolve, reject) => {
        const runCmd = `python ${filePath} < ${inputPath}`;
        exec(runCmd, { timeout: timeLimit * 1000 }, (execError, stdout, stderr) => {
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
    });
};

export { executePython };
