import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';

// Get the directory path where the current module is located, for es6 modules use fileURLToPath() and dirname()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// dirCodes- Path to the directory where the codes will be stored
// __dirname is the directory where the current file is located, in this case, it is the backend directory
// codes is the directory where the codes will be stored
// path.join() is used to join the __dirname and codes directory
const dirCodes = path.join(__dirname, "codes");

// // Check if the directory exists, if not, create the directory
if(!fs.existsSync(dirCodes)) {
    //recursive: true is used to create the directory and its parent directories if they do not exist
    fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = (code, language) => {

    if(language=='java'){
        const className = code.match(/class\s+(\w+)/);
        if (!className) {
            throw new Error('Class name not found in the code');
        }
        const uniqueName = className[1];
        // console.log(uniqueName);
        const fileName = `${uniqueName}.java`;
        const filePath = path.join(dirCodes, fileName);
        fs.writeFileSync(filePath, code);
        return filePath;
    }
    // Generate a unique name for the file using uuidv4() and append the language extension
    const uniqueName = uuidv4();
    // Create the file name by joining the unique name and the language extension
    const fileName = `${uniqueName}.${language}`;
    // Create the file path by joining the directory path and the file name
    const filePath = path.join(dirCodes, fileName);
    // Write the code to the file
    fs.writeFileSync(filePath, code);

    return filePath;
};

export { generateFile };
