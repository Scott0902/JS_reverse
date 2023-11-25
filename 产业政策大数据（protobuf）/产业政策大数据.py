import requests, execjs
from pprint import pprint


def run_my_js(js_file_path, param):
    with open(js_file_path, 'r', encoding='utf-8') as f:
        js_file_code=f.read()
    hex_str = execjs.compile(js_file_code).call('PolicyInfoSearchParam_encode', param)
    dec_arr=[]
    for i in range(0, len(hex_str), 2):
        dec_arr.append(int(hex_str[i:i+2], 16))
    return bytes(dec_arr)

js_file_path=r'./protobufjs.js'

param = {
"pageNum": 1,
"pageSize": 10,
"word": "数字经济",
"policyType": 0,
"industry": -1,
"department": 0,
"startTime": "",
"endTime": "",
"province": -1,
"city": -1,
"downtown": -1,
"garden": 0,
"sorttype": 1,
"wholews": 1,
"type": 0,
"customerIndt": 0,
}


data = run_my_js(js_file_path, param)

headers = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7',
    'Accept-Encoding': 'gzip, deflate',
    'Content-Type': 'application/octet-stream',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
}

response = requests.post(
    'http://www.spolicy.com/info_api/policyinfoSearchController/searchEsPolicyinfo',
    headers=headers,
    data=data,
    verify=False,
)
response.encoding='utf-8'
res=response.json()
pprint(res)
