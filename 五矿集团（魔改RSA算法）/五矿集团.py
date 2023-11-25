# 不用json库的json.dumps，直接使用str()把字典转换为字符串
# 但str()有个坑：会把字典的双引号全部改为单引号
# 所以必须将str()转换后的单引号全部改为双引号

from time import time
from pprint import pprint
import requests
import hashlib
import execjs


def js_rsa_encrypt(js_file_path, input_text, pubKey):
    with open(js_file_path, 'r', encoding='utf-8') as f:
        js_file_code = f.read()
    result = execjs.compile(js_file_code).call('myrsa', input_text, pubKey)
    return result


def get_md5(text):
    myMd5 = hashlib.md5()
    myMd5.update(text.encode())
    return myMd5.hexdigest()


if __name__ == '__main__':
        
    js_file_path = r'./long_RSA_encrypt.js'
    requests.packages.urllib3.disable_warnings()
    se = requests.Session()
    se.headers.update({"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"})
    public_key = se.get("https://ec.minmetals.com.cn/open/homepage/public", verify=False).text
    data = {"inviteMethod": "",
            "businessClassfication": "",
            "mc": "",
            "lx": "ZBGG",
            "dwmc": "",
            "pageIndex": 1
            }
    data_str = str(data).replace(' ','').replace("'",'"')
    sign = get_md5(data_str)
    data.update({"sign": sign, "timeStamp": int(time()*1000)})
    data_str = str(data).replace(' ','').replace("'",'"')

    url = 'https://ec.minmetals.com.cn/open/homepage/zbs/by-lx-page'
    param = js_rsa_encrypt(js_file_path, data_str, public_key)
    # print(f"var data='{data_str}'\nkey='{public_key}',\nparam='{param}';")
    se.headers.update({"Content-Type": "application/json",
                       "Origin": "https://ec.minmetals.com.cn",
                       "referer": "https://ec.minmetals.com.cn/"})
    payload = {"param": param}
    # print(f'\nlength of param: {len(param)}')
    res = se.post(url, json=payload, verify=False)
    if res.text[:2] != '非法':
        #print('获取成功\n', res.text[:100])
        pprint(res.text)
