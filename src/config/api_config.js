var DOMAIN = '';
var API_DOMAIN = 'http://lcrmapipingan.lcrmyfbkudu.lunz.cn'


if (process.env.VUE_APP_DOMAIN == 'localhost') {
    DOMAIN = 'http://localhost';
} else if (process.env.VUE_APP_DOMAIN == 'http://lcrmapipingan.lcrmyfbkudu.lunz.cn') {
    DOMAIN = 'http://lcrmapipingan.lcrmyfbkudu.lunz.cn'
}


var api_config = {
    api_http: API_DOMAIN,
};

export default api_config;