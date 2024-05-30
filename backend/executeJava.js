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

const executeJava = (filePath) => {
    //new method for java execution
    // console.log(filePath);
    const uniqueName = path.basename(filePath).split('.')[0];

    const codeDir = path.dirname(filePath);
    // console.log(codeDir);
    // console.log(outputFileName);
    const outputFilePath = path.join(codeDir, uniqueName);
    // console.log(outputFilePath);
    return new Promise((resolve, reject) => {
        console.log(`javac ${filePath} && java ${outputFilePath}`);
        exec(`javac ${filePath} && java ${outputFilePath} `, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else if (stderr) {
                reject(stderr);
            } else {
                console.log(stdout);
                resolve(stdout);
            }
        });
    });


};

export { executeJava };
