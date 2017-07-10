const fs = require('fs');
const css = require('css');
const crypto = require('crypto');

function loadCss(cssFile){
    return fs.readFileSync(cssFile, 'UTF-8');
}

module.exports = {
    transformCss: function (cssFile){
        var content = loadCss(cssFile);
        var hash = crypto.createHash('md5').update(content).digest("hex").substr(0, 8);

        var ast = css.parse(content);
        // console.log(JSON.stringify(ast, null, 3));

        ast.stylesheet.rules.forEach((rule) => {
            rule.selectors = rule.selectors.map((selector) => {
                return selector.split(' ').map((name) => {
                    return `${name}[${hash}]`;
                }).join(' ');
            });
        });

        return {
            css: css.stringify(ast),
            hash: hash
        };
    },
    transformCssUsingUuid: function (cssFile){
        var content = loadCss(cssFile);
        var hash = crypto.createHash('md5').update(content).digest("hex").substr(0, 8);
        var ast = css.parse(content);
        var selectors = {};
        ast.stylesheet.rules.forEach((rule) => {
            rule.selectors = rule.selectors.map((selector) => {
                return selector.split(' ').map((name) => {
                    let newName = name.substr(1);
                    let newSelector = `_${hash}__${newName}`;
                    selectors[newName] = newSelector;
                    return `.${newSelector}`;
                }).join(' ');
            });
        });

        return {
            css: css.stringify(ast),
            hash: hash,
            selectors: selectors
        };
    }
};