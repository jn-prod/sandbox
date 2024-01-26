const fs = require('fs');

const FOLDER = '/home/nicolas/Dropbox/Notes/Bullet Journal'
const MERGED_FILENAME = 'merged-files.md'
const OUTPUT = `${FOLDER}/${MERGED_FILENAME}`
const TAB = '\u0009';
const report = {
    count: null,
    ok: null,
    ko: null
}

const initReport = filesCount => {
    report.count = filesCount;
    report.ok = 0;
    report.ko = 0;
}

const getFiles = folder => fs
    .readdirSync(folder)
    .filter(filename => (filename.includes('.md') && filename !== MERGED_FILENAME));

const getFile = filePath => fs.readFileSync(filePath, 'utf8');

const mergeFiles = files => {
    if (!fs.existsSync(OUTPUT)) fs.writeFileSync(OUTPUT, '');
    
    files.forEach((filename, i) => {
        const title = filename.replace('.md', '');
        const file = getFile(`${FOLDER}/${filename}`)
            .replaceAll('\n\n\n', '\n') // clean double line returns
            .replaceAll('\n\n', '\n') // clean double line returns
            .replaceAll('\n', `\n${TAB}`); // change line return by tab chars
        const data = `${title}\n${TAB}${file}\n`;

        try {
            fs.appendFileSync(OUTPUT, data);
            report.ok = report.ok + 1;

            console.log(`${i}/${files.length}: ${filename}`);
        } catch(err) {
            report.ko = report.ko + 1;

            console.error(err);
        }
    })
}

const migrateFilesFrom = path => {
    try {
        const files = getFiles(path);
        initReport(files.length);
        console.log(files.length);

        mergeFiles(files)

        console.log(report);

        return;
    } catch(err) {
        console.error(err);
    }
}

const run = () => migrateFilesFrom(FOLDER);

run()