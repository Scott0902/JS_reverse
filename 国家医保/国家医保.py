import requests, execjs
from time import time

def get_data(se, url, encData_param, timestamp):
    now=time()
    encData = execjs.compile(js_code2).call('get_enc_data', encData_param)
    print(f'encData used time: {time()-now:.3f}s.')

    now=time()
    signData_param_encode_text = 'appCode=T98HPCGN5ZVVQBS8LZQNOAEXVI9GYHKQ&data='+str(encData_param).replace("'",'"').replace(' ','')+'&encType=SM4&signType=SM2&timestamp='+timestamp+'&version=1.0.0&key=NMVFVILMKT13GEMD3BKPKCTBOQBPZR2P';
    signData_encode_key = '009c4a35d9aca4c68f1a3fa89c93684347205a4d84dc260558a049869709ac0b42'
    signData = execjs.compile(js_code3).call('get_sign_data', signData_param_encode_text, signData_encode_key)
    print(f'signData used time: {time()-now:.3f}s.')

    now=time()
    json_data = {
        'data': {
            'data': {'encData': encData},
            'signData': signData,
            'timestamp': timestamp,
            'appCode': 'T98HPCGN5ZVVQBS8LZQNOAEXVI9GYHKQ',
            'version': '1.0.0',
            'encType': 'SM4',
            'signType': 'SM2',
        },
    }

    response = se.post(url, json=json_data, verify=False)
    assert response.status_code==200, f'{response.status_code} error!'
    print(f'get response used time: {time()-now:.3f}s.')

    return response.json()


if __name__ == '__main__':
    jsfiles=[r'./x-tif-signature (SHA256).js',    # x-tif-signature
             r'./encData.js',  # encData
             r'./signData.js'
            ]

    js_code1 = open(jsfiles[0], 'r', encoding='utf-8').read()
    js_code2 = open(jsfiles[1], 'r', encoding='utf-8').read()
    js_code3 = open(jsfiles[2], 'r', encoding='utf-8').read()

    pageNum=1
    pageSize=10
    regnCode=440100

    all_params={
                0:{'url':'https://fuwu.nhsa.gov.cn/ebus/fuwu/api/pss/pw/sysDict/selectByKeys',
                   'encData_param': '{"keys":""}',
                  },
                1:{'url':'https://fuwu.nhsa.gov.cn/ebus/fuwu/api/nthl/api/fixed/queryDicByType',
                   'encData_param': '{"type":"MEDINSLV"}',
                  },
                2:{'url':'https://fuwu.nhsa.gov.cn/ebus/fuwu/api/nthl/api/fixed/queryDicByType',
                   'encData_param': '{"type":"MEDINS_TYPE"}',
                  },
                3:{'url':'https://fuwu.nhsa.gov.cn/ebus/fuwu/api/nthl/api/CommQuery/queryFixedHospital',
                   'encData_param': '{"pageNum":"1","pageSize":"50","queryDataSource":"es","regnCode":"440100"}',
                  },
                4:{'url':'https://fuwu.nhsa.gov.cn/ebus/fuwu/api/nthl/api/CommQuery/queryDrugTypeInfo',
                   'encData_param': '{"drugCategory":"2","pageNum":"1","pageSize":"100"}'
                  },
                 }

    se=requests.Session()
    requests.packages.urllib3.disable_warnings()

    node_result = execjs.compile(js_code1).call('get_x_tif_signature', '')
    timestamp, x_tif_nonce, x_tif_signature = node_result.split('\n')

    headers = {
        'Accept': 'application/json',
        'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'Origin': 'https://fuwu.nhsa.gov.cn',
        'Referer': 'https://fuwu.nhsa.gov.cn/nationalHallSt/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'channel': 'web',
        'contentType': 'application/x-www-form-urlencoded',
        'x-tif-nonce': x_tif_nonce,
        'x-tif-paasid': 'undefined',
        'x-tif-signature': x_tif_signature,
        'x-tif-timestamp': timestamp,
    }

    se.headers.update(headers)
    i=4
    result = get_data(se, all_params[i]['url'], all_params[i]['encData_param'], timestamp)
    assert result.get('type')=='success', result.get('message')
    if i==0:
        print(result)
    else:
        now=time()
        decData=execjs.compile(js_code2).call('get_dec_data', result['data']['data']['encData'])
        print(f'decrypt data used time: {time()-now:.3f}s.\n')
        print(decData)
    