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

const executeJava = (filePath, inputPath ) => {

    //for java execution we have to compile the java file first and then run the class file
    //get the file name without extension
    const uniqueName = path.basename(filePath).split('.')[0];
    
    // console.log(outputFilePath); 
    return new Promise((resolve, reject) => {
        // console.log(`javac -d ${outputPath} ${filePath} && java -cp ${outputPath} ${uniqueName}`);
        // explain the commandstep by step
        // javac -d ${outputPath} ${filePath} : compile the java file and store the class file in the
        // specified directory -d ${outputPath}
        // java -cp ${outputPath} ${uniqueName} : run the class file with the specified 
        // classpath -cp ${outputPath} and the class name ${uniqueName}
        exec(`javac -d ${outputPath} ${filePath} && java -cp ${outputPath} ${uniqueName} < ${inputPath}`, (error, stdout, stderr) => {
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
