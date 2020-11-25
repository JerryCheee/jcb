//服务器域名  

module.exports = {
    // domain: process.env.NODE_ENV == 'development' ? 'http://jincaibao-dev.utools.club/jcb-collect/api' : 'http://jincaibao-dev.utools.club/jcb-collect/api', //测试服
    // domain: process.env.NODE_ENV == 'development' ? 'https://jincaibao.utools.club/jcb-collect/api' : 'https://jincaibao.utools.club/jcb-collect/api', //测试服
    domain: process.env.NODE_ENV == 'development' ? 'http://192.168.2.108:8001/jcb-collect/api' : 'http://192.168.2.108:8001/jcb-collect/api', //测试服
    appid: 'wx6661091e9a586849'
}