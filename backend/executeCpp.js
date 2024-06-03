import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { exec } from 'child_process';

//we are making new directory to store the executable files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// for the output directory
const outputPath = path.join(__dirname, "outputs");

if(!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filePath, inputPath) => {
    // Get the file name without the extension
    const uniqueName = path.basename(filePath.split('.')[0]); 

    // Create the output file name by appending .txt to the unique name
    const outputFileName= `${uniqueName}.out`;

    // Create the output file path by joining the output directory and the unique name
    const outputFilePath = path.join(outputPath, outputFileName);

    // Execute the code using the system command
    return new Promise (
        (resolve, reject) => {
            // The exec function executes a system command. Here, we use it to run the g++ command to 
            // compile C++ code. -o sets the output file path. We then change to the output directory 
            // using cd and execute the compiled file with &&. The callback function is called after 
            // command execution

        exec(`g++ ${filePath} -o ${outputFilePath} && cd ${outputPath} && ./${outputFileName} < ${inputPath}`, (error, stdout, stderr) => {
            // If there is an error or stderr, reject the promise
            if (error) {
                reject(error);
            }
            if (stderr) {
                reject(stderr);
            }
            // If the code is executed successfully, resolve the promise with the output
            //we are returning the output of the code
            resolve(stdout);
        });
        }
    )
};

export { executeCpp };
