// codeExecuter/executeCpp.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = async (filePath, inputPath, timeLimit) => {
    const uniqueName = path.basename(filePath, path.extname(filePath));
    const outputFilePath = path.join(outputPath, `${uniqueName}.out`);
    return new Promise((resolve, reject) => {
        const compileCmd = `g++ ${filePath} -o ${outputFilePath}`;
        const runCmd = `${outputFilePath} < ${inputPath}`;

        exec(compileCmd, (compileError, _, compileStderr) => {
            if (compileError) {
                reject(new Error(`Compilation Error: ${compileStderr}`));
                return;
            }

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
    });
};

export { executeCpp };
