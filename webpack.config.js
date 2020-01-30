
//これがなければ
module.exports = {
    mode: "development",
    entry: `./src/index.js`,
    output: {
        //出力ファイルのディレクトリ名
        path: `${__dirname}/dist`,
        //出力ファイル名
        filename: "main.js"
    }
}