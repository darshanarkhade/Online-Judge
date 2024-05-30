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

const executePython = (filePath) => {
    const uniqueName = path.basename(filePath).split('.')[0]; 
    const outputFileName = `${uniqueName}.txt`;
    const outputFilePath = path.join(outputPath, outputFileName);
    console.log(outputFilePath);
    return new Promise((resolve, reject) => {
        exec(`python ${filePath}`, (error, stdout, stderr) => {
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

export { executePython };
