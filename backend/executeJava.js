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

    //for java execution we have to compile the java file first and then run the class file
    //get the file name without extension
    const uniqueName = path.basename(filePath).split('.')[0];
    
    // console.log(outputFilePath); 
    return new Promise((resolve, reject) => {
        // console.log(`javac -d ${outputPath} ${filePath} && java -cp ${outputPath} ${uniqueName}`);
        exec(`javac -d ${outputPath} ${filePath} && java -cp ${outputPath} ${uniqueName}`, (error, stdout, stderr) => {
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

export { executeJava };
