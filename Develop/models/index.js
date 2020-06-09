const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {};

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(`.\\${file}`)
        const modelName = path.basename(file,'.js')[0].toUpperCase() + path.basename(file,'.js').slice(1)
        db[modelName] = model;
    });

module.exports = db;

// const modelsPath = path.resolve(__dirname, 'models')
// fs.readdirSync(modelsPath).forEach(file => {
//     require(modelsPath + '/' + file);
// })

