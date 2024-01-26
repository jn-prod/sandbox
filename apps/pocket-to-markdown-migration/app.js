const md2json = require('md-2-json');
const fs = require('fs');
const path = require('path')

const importFile = require('./imports/get-1601881601216.json') //edit me

const exportsDir = './exports'

function saveDataInMarkdown (fileName, data) {
    const parsedData = {}
    parsedData[data.resolved_title] = {
        raw: data.excerpt,
        link: {
            raw: data.resolved_url
        }
    }

    const content = md2json.toMd(parsedData);

    fs.open(path.resolve(__dirname, `${exportsDir}/${fileName}.md`), 'w', (err, file) => {
        if (err) throw err;
        console.log('Created.' + file);
        fs.writeFile(path.resolve(__dirname, `${exportsDir}/${fileName}.md`), content, (err) => {
            console.log(err)
            console.log('Saved.');
        });
      })
}

function app (datas) {
    for (const el in datas.list) {
        const fileName = el
        const data = datas.list[el]
        saveDataInMarkdown(fileName, data)
    }
}

app(importFile);