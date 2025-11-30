const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

const PUBLIC_DIR = path.join(__dirname, '../public');
const SRC_DIRS = [
    path.join(__dirname, '../src'),
    path.join(__dirname, '../pages'),
    path.join(__dirname, '../data')
];

const MEDIA_FILES = [
    { path: 'apple/frame.mp4', type: 'video' },
    { path: 'GIF/RATT-unscreen.gif', type: 'gif' }
];

async function getFiles(dir) {
    const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
}

function convertFile(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        console.log(`Converting ${inputPath} to ${outputPath}...`);
        const command = `"${ffmpegPath}" -i "${inputPath}" -c:v libvpx-vp9 -b:v 1M -crf 30 -b:a 128k "${outputPath}" -y`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error converting ${inputPath}:`, error);
                reject(error);
                return;
            }
            console.log(`Converted ${inputPath}`);
            resolve();
        });
    });
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

    const sourceFiles = allSourceFiles.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.json'].includes(ext);
    });

    for (const file of sourceFiles) {
        let content = await fs.promises.readFile(file, 'utf8');
        let modified = false;

        for (const [oldPath, newPath] of Object.entries(conversionMap)) {
            if (content.includes(oldPath)) {
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
    const conversionMap = {};

    for (const media of MEDIA_FILES) {
        const inputPath = path.join(PUBLIC_DIR, media.path);
        const ext = path.extname(inputPath);
        const outputPath = inputPath.replace(ext, '.webm');

        if (fs.existsSync(inputPath)) {
            try {
                await convertFile(inputPath, outputPath);

                const relativeOld = media.path.replace(/\\/g, '/');
                const relativeNew = relativeOld.replace(ext, '.webm');

                conversionMap[relativeOld] = relativeNew;
                conversionMap[`/${relativeOld}`] = `/${relativeNew}`;

            } catch (err) {
                console.error(`Failed to process ${media.path}`);
            }
        } else {
            console.warn(`File not found: ${inputPath}`);
        }
    }

    await updateReferences(conversionMap);
    console.log('Done!');
}

main();
