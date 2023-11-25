import execjs, requests, json
from pprint import pprint as ppr

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',}

data = {
    'time_interval': '',
    'tag': '',
    'tag_type': '',
    'province': '',
    'lunci': '',
    'page': '1',
    'num': '8',
    'unionid': '',
}

res = requests.post('https://vipapi.qimingpian.cn/search/recommendedItemList', headers=headers, data=data)
assert res.status_code==200, f'{res.status_code} error'
data = res.json()['encrypt_data']

js_code = open(r'D:\PY\JS逆向\企名科技\企名科技.js', 'r', encoding='utf-8').read()
result = json.loads(execjs.compile(js_code).call('s', data))
ppr(result)
