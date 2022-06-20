const fs = require('fs').promises;

const readContent = async (filePath) => {
    const content = await fs.readFile(filePath, 'utf-8');
    const contentJSON = JSON.parse(content);
    return contentJSON;
};

const writeContent = async (filePath, content) => {
    const file = await fs.writeFile(filePath, content);
    const fileJSON = JSON.stringify(file);
    return fileJSON;
};

module.export = {
    readContent,
    writeContent,
};