# https://www.endata.com.cn/BoxOffice/BO/Month/oneMonth.html
# 获取艺恩网单月票房数据
import base64
import binascii
import json
import re
import requests
from Crypto.Cipher import DES
from pprint import pprint as ppr
from urllib.parse import urlencode
from datetime import datetime

def des_decrypt_from_base64(key, iv, ciphertext):
    des = DES.new(key, DES.MODE_CBC, iv)
    plaintext = des.decrypt(base64.b64decode(ciphertext))
    return plaintext.decode('utf-8')

def change_str(long_str, key, num):
    if key == 0:
        return long_str[num:]

    changed_str = long_str[0:key]
    return changed_str + long_str[key+num:]

def parse(long_str):    # 将POST请求获得的长字节码分离出正确的加密长字节码和解密key
    if long_str is None or len(long_str) <= 16:
        return long_str
    key = int(long_str[-1], 16) + 9
    v2 = int(long_str[key], 16)
    long_str = change_str(long_str, key, 1)
    key = long_str[v2:v2+8]
    long_str = change_str(long_str, v2, 8)
    return long_str, key

def des_ecb_decrypt_from_hex(key, ciphertext):
    if type(key)==str:
        key=bytes(key, encoding='utf-8')
    des = DES.new(key, DES.MODE_ECB)
    ciphertext_bytes = binascii.unhexlify(ciphertext)
    plaintext_bytes = des.decrypt(ciphertext_bytes)
    return plaintext_bytes.decode('utf-8')


def get_box_office_data(month):
    data = {'startTime': month+'-01', 'MethodName':'BoxOffice_GetMonthBox'}
    headers = {#'content-length': str(len(urlencode(data))),
               'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',}
    url = 'https://www.endata.com.cn/API/GetData.ashx'
    res = requests.post(url, data=data, headers=headers)
    assert res.status_code==200, f'{res.status_code} error!'
    long_str = res.text
    long_str, key = parse(long_str)
    try:
        text = des_ecb_decrypt_from_hex(key, long_str)
    except Exception as err:
        print(month, url, err, sep='\n')
        return
    try:
        text2 = "{"+re.search('{(.*)}', text)[1]+"}"
        json_data = json.loads(text2)
        print(f"\n{month}\n{'='*60}\n排名\t片名\t\t\t票房\t上映日期\n{'='*60}")
        for i in json_data["Data"]["Table"]:
            print(f'{i["Irank"]}\t{i["MovieName"]}\t\t{i["boxoffice"]}\t{i["releaseTime"]}')
        print(f'{"="*60}\n')
    except Exception:
        print(f'JSON信息不正确，解析错误。\n{text}')


def get_history_move_box():
    first_month = '2022-08'
    current_month = datetime.now().strftime("%Y-%m")
    month_range = []
    month_range.append(first_month+'-01')
    while first_month != current_month:
        year=first_month[:4]
        month=first_month[-2:]
        month=f'{(int(month)+1):02}'
        if int(month)>12:
            month='01'
            year=str(int(year)+1)
        first_month=year+'-'+month
        month_range.append(first_month)
        get_box_office_data(first_month)

def get_current_month_move_box():
    current_month = datetime.now().strftime("%Y-%m")
    get_box_office_data(current_month)


if __name__ == '__main__':
    get_current_month_move_box()
    #get_history_move_box()
