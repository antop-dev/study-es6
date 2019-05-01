const path = require('path');

module.exports = {

    /**
     *  해당 디렉토리에서 디렉토리와 파일 목록을 추출한다.
     *
     * @param fs file system
     * @param dir 디렉토리
     * @param exp 표현식
     */
    dir: function (fs, dir, exp) {
        return fs.readdirSync(dir).filter(filename => {
            let _path = path.join(dir, filename);
            let stat = fs.statSync(_path);

            if (stat.isDirectory()) {
                const children = this.dir(fs, _path, exp);
                return children.length > 0;
            } else {
                return !exp || exp.test(filename);
            }
        });
    },
    /**
     * 해당 디렉토리 안의 내용을 트리 구조로 추출한다.
     *
     * @param fs
     * @param dir 디렉토리
     * @param exp 표현식
     * @returns {*} name, path, type
     */
    dirTree: function (fs, dir, exp) {
        return this.dir(fs, dir, exp).map(filename => {
            let _path = path.join(dir, filename);
            let stat = fs.statSync(_path);

            const obj = {
                name: filename,
                path: _path,
                type: 'file'
            };

            if (stat.isDirectory()) {
                obj.type = 'directory';
                obj.children = this.dirTree(fs, _path, exp);
            }

            return obj;
        });
    }
};
