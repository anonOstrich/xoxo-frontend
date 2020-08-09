const fs = require('fs').promises;
const path = require("path");


(async () => {
    try {
        await fs.rmdir('./dist', {recursive: true});
        await fs.rmdir('./ts-to-js', {recursive: true})
        await fs.mkdir('./dist');
        await copyFolder('./src', './dist')
    } catch (e) {
        console.log('Something went wrong: ', e);
    }
})();


const copyFolder = async (src, dst) => {
    let files = await fs.readdir(src)
    
    files.forEach(async fileName => {
        const srcPath = path.join(src, fileName);
        const dstPath = path.join(dst, fileName);

        const fileStats = await fs.stat(srcPath)
        if (fileStats.isDirectory() && !srcPath.includes('/ts')) {
            fs.mkdir(dstPath)
            await copyFolder(srcPath, dstPath)
        } else {
             await fs.copyFile(srcPath, dstPath)
        }
    })
};
