import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { exec, execFile } from 'child_process';

// We are making a new directory to store the executable files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// For the output directory
const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = async (filePath, inputPath, timeLimit) => {
    // Get the file name without the extension
    const uniqueName = path.basename(filePath, path.extname(filePath));
    const outputFilePath = path.join(outputPath, `${uniqueName}.exe`);

    return new Promise((resolve, reject) => {
        // Compile the C++ code
        exec(`g++ ${filePath} -o ${outputFilePath}`, (compileError, _, compileStderr) => {
            if (compileError) {
                reject(new Error(`Compilation Error: ${compileStderr}`));
                return;
            }

            // Execute the compiled program
            const child = execFile(outputFilePath, { timeout: timeLimit * 1000 }, (execError, stdout, stderr) => {
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

            // Pipe input file to the child process
            fs.createReadStream(inputPath).pipe(child.stdin);
        });
    }); 
};

export { executeCpp };
