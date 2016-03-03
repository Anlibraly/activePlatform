
function ajaxRequestCloudApi(url, method, bodyParam, callBack) {
    var common_url = 'https://api.leancloud.cn/1.1';
    $.ajax({
        url: common_url + url,
        method: method,
        cache: false,
        timeout: 30,
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            "X-LC-Id": "nWlsDnfd9sa2y8nCa5ct1BE2-gzGzoHsz",
            "X-LC-Key": "DFHJGPcAg3mfweB4X1LSarJa",
        },
        data: {
            body: bodyParam
        }
    }, function(ret,err) {
        callBack(ret,err);
    });
}
