'use strict';

const fs = require('fs');

const buildCSSTags = (files) => {
    let cssTags = '';
    files.forEach((file, idx) => {
        if (idx + 1 === files.length && files.length > 1) {
            cssTags += `\t<link rel="stylesheet" href="${file}"/>`;
        }
        else if (idx + 1 === files.length) {
            cssTags += `<link rel="stylesheet" href="${file}"/>`;
        }
        else {
            cssTags += `<link rel="stylesheet" href="${file}"/>\n`;
        }
    });
    
    return cssTags;
}

const buildJSTags = (files, requireFile) => {
    let jsTags = '';
    files.forEach((file, idx) => {
        if (idx + 1 === files.length && files.length > 1) {
            jsTags += `\t<script src="${file}"></script>`;
        }
        else if (idx + 1 === files.length) {
            jsTags += `<script src="${file}"></script>`;
        }
        else {
            jsTags += `<script src="${file}"></script>\n`;
        }
    });
    
    jsTags += `\n\t<script>require('${requireFile}')</script>`;
    
    return jsTags;
}

class InjectFiles
{
    constructor(config)
    {
        let configJS = config.files.javascripts.joinTo;
        let configCSS = config.files.stylesheets.joinTo;
        
        if (typeof configJS === 'object') {
            configJS = Object.keys(config.files.javascripts.joinTo);
        }
        else {
            configJS = [];
            configJS.push(config.files.javascripts.joinTo);
        }
        
        if (typeof configCSS === 'object') {
            configCSS = Object.keys(config.files.stylesheets.joinTo)
        }
        else {
            configCSS = []
            configCSS.push(config.files.stylesheets.joinTo);
        }
        
        this.options = {
            indexDir: `${config.paths.public}/index.html`,
            requireFile: config.plugins.filesinject ? config.plugins.filesinject.requireFile : 'index',
            javascripts: configJS,
            stylesheets: configCSS
        }
    }
    
    onCompile(files)
    {        
        // TODO: Add comments to config options?
        const cssComment = '<!-- inject:css -->';
        const jsComment = '<!-- inject:js -->';
        const target = this.options.indexDir;
        let cssTags;
        let jsTags;
        
        if (fs.existsSync(target)) {
            fs.readFile(target, 'utf-8', (err, data) => {
                if (err) throw err;
                
                if (data.includes(cssComment)) {
                    cssTags = buildCSSTags(this.options.stylesheets);
                }
                
                if (data.includes(jsComment)) {
                    jsTags = buildJSTags(this.options.javascripts, this.options.requireFile);
                }
                
                data = data.replace(cssComment, cssTags);
                data = data.replace(jsComment, jsTags);
                
                fs.writeFile(target, data, (err) => {
                    if (err) throw err;
                });
            });    
        }
    }
}

InjectFiles.prototype.brunchPlugin = true;

module.exports = InjectFiles;