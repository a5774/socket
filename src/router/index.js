const fs = require('fs');
// 动态加载Router
const useRoutes = function () {
    // sync read dir 
    fs.readdirSync(__dirname, "utf-8",).forEach(file => {
        if (file === 'index.js') return;
        // console.log( file );
        // require 相对路径参考于当前module
        const router = require(`./${file}`);
        this.use(router.routes())
        this.use(router.allowedMethods())
    })
}
module.exports = useRoutes;