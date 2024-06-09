import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';

// Get the directory path where the current module is located
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dirInputs = path.join(__dirname, "inputs");

if(!fs.existsSync(dirInputs)) {
    fs.mkdirSync(dirInputs, { recursive: true });
}

const generateInputFile = (input) => {
    const uniqueName = uuidv4();
    const fileName = `${uniqueName}.txt`;
    const filePath = path.join(dirInputs, fileName);
    fs.writeFileSync(filePath, input);
    return filePath;
};

export {generateInputFile};

