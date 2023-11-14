const fs = require('fs');

for (let i = 1; i <= 1000; i++) {
    console.log(`creating page #${i}`);
    fs.copyFile("pages/dummyPage.js", `pages/dummyPage${i}.js`,
        fs.constants.COPYFILE_EXCL, (err) => { });
}

