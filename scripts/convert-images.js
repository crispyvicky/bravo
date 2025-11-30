const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '../public');
const SRC_DIRS = [
    path.join(__dirname, '../src'),
    path.join(__dirname, '../pages'),
    path.join(__dirname, '../data') // Added data directory as it was mentioned in exploration
];

const EXTENSIONS = ['.jpg', '.png', '.jpeg'];

async function getFiles(dir) {
    const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
}

async function convertImages() {
    console.log('Scanning for images...');
    const allFiles = await getFiles(PUBLIC_DIR);
    const imageFiles = allFiles.filter(file => EXTENSIONS.includes(path.extname(file).toLowerCase()));

    console.log(`Found ${imageFiles.length} images.`);

    const conversionMap = {};

    for (const file of imageFiles) {
        const ext = path.extname(file);
        const newFile = file.replace(ext, '.webp');
        const relativeOld = path.relative(PUBLIC_DIR, file).replace(/\\/g, '/');
        const relativeNew = path.relative(PUBLIC_DIR, newFile).replace(/\\/g, '/');

        try {
            await sharp(file)
                .webp({ quality: 80 })
                .toFile(newFile);
            console.log(`Converted: ${relativeOld} -> ${relativeNew}`);
            conversionMap[relativeOld] = relativeNew;

            // Handle cases where the reference might include a leading slash
            conversionMap[`/${relativeOld}`] = `/${relativeNew}`;

        } catch (err) {
            console.error(`Failed to convert ${file}:`, err);
        }
    }

    return conversionMap;
}

async function updateReferences(conversionMap) {
    console.log('Updating references...');

    let allSourceFiles = [];
    for (const dir of SRC_DIRS) {
        if (fs.existsSync(dir)) {
            const files = await getFiles(dir);
            allSourceFiles = allSourceFiles.concat(files);
        }
    }

    // Filter for text files we want to update
    const sourceFiles = allSourceFiles.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.json'].includes(ext);
    });

    for (const file of sourceFiles) {
        let content = await fs.promises.readFile(file, 'utf8');
        let originalContent = content;
        let modified = false;

        for (const [oldPath, newPath] of Object.entries(conversionMap)) {
            // Simple string replacement - this might need to be more robust with regex if needed
            // but for now we'll try direct replacement of the path strings
            if (content.includes(oldPath)) {
                // Use a global replace to catch all instances
                const regex = new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                content = content.replace(regex, newPath);
                modified = true;
            }
        }

        if (modified) {
            await fs.promises.writeFile(file, content, 'utf8');
            console.log(`Updated references in: ${path.relative(path.join(__dirname, '..'), file)}`);
        }
    }
}

async function main() {
    try {
        const conversionMap = await convertImages();
        await updateReferences(conversionMap);
        console.log('Done!');
    } catch (err) {
        console.error('Error:', err);
    }
}

main();
