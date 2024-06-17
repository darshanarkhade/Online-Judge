import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { exec, execFile } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeJava = async (filePath, inputPath, timeLimit) => {
    const uniqueName = path.basename(filePath, path.extname(filePath));
    const classFilePath = path.join(outputPath, `${uniqueName}.class`);

    return new Promise((resolve, reject) => {
        // Compile the Java file
        exec(`javac -d ${outputPath} ${filePath}`, (compileError, _, compileStderr) => {
            if (compileError) {
                reject(new Error(`Compilation Error: ${compileStderr}`));
                return;
            }
            // Execute the compiled Java class
            const child = execFile('java', ['-cp', outputPath, uniqueName], { timeout: timeLimit * 1000 }, (execError, stdout, stderr) => {
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
                // Cleanup the compiled class file
                fs.unlink(classFilePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete class file: ${classFilePath}`, err);
                    }
                });
                
            });

            // Pipe input file to the child process
            fs.createReadStream(inputPath).pipe(child.stdin);
        });
    });
};

export { executeJava };
