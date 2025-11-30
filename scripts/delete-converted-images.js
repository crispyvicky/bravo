const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const EXTENSIONS = ['.jpg', '.png', '.jpeg'];

async function getFiles(dir) {
    const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
}

async function deleteOriginals() {
    console.log('Scanning for images to delete...');
    const allFiles = await getFiles(PUBLIC_DIR);
    const imageFiles = allFiles.filter(file => EXTENSIONS.includes(path.extname(file).toLowerCase()));

    console.log(`Found ${imageFiles.length} original images.`);

    for (const file of imageFiles) {
        const ext = path.extname(file);
        const webpFile = file.replace(ext, '.webp');

        if (fs.existsSync(webpFile)) {
            try {
                await fs.promises.unlink(file);
                console.log(`Deleted: ${path.relative(PUBLIC_DIR, file)}`);
            } catch (err) {
                console.error(`Failed to delete ${file}:`, err);
            }
        } else {
            console.warn(`Skipped (no WebP found): ${path.relative(PUBLIC_DIR, file)}`);
        }
    }
}

deleteOriginals();
