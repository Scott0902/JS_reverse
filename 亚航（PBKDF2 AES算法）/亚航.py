import requests, re
import subprocess
import execjs
#import demjson3
from datetime import datetime, timezone
from pprint import pprint

# 加载主页再从中加载JS代码，获取关键dict内容
# 发现dict内容每次都一样，因此不必要使用该函数
def get_key_dic(se):
    print('Opening main page...')
    res=se.get('https://www.airasia.com/flightstatus/en/gb', verify=False)
    assert res.status_code==200, f'{res.status_code} error!'
    html=res.text
    js_url=re.search('src="main(.*?)"', html)[1]
    print('Loading JavaScript file...', js_url)
    res=se.get('https://www.airasia.com/flightstatus/main'+js_url, verify=False)
    assert res.status_code==200, f'{res.status_code} error!'
    html=res.text
    pos=html.find('searchUrl')
    assert pos != -1, '"searchUrl" cannot be found in the javacript file!'
    p0 = pos
    p1 = p2 = 0
    while html[pos] != '{' and pos:
        pos-=1
    p1=pos
    pos=p0
    while html[pos] != '}' and pos:
        pos+=1
    p2=pos
    return demjson3.decode(html[p1:p2+1])


if __name__ == '__main__':
    
    se=requests.Session()
    requests.packages.urllib3.disable_warnings()
    se.headers.update({
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
    })


    #dic=get_key_dic(se)

    # dic的内容写死
    dic={   
        # "gcsUrl": "https://sch.apiairasia.com",
        # "searchUrl": "https://k.apiairasia.com/",
        "searchUrlNew": "https://flightstatus-7tjna4lktq-as.a.run.app/api/v2",
        # "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJMQ0FLaWhpbUxlTjZ3a1FYU2FhRTgyZTh0ZDUwM3NZUiIsImlhdCI6MTUzMzY5NzU5NSwiZXhwIjoxODQ5MzE2Nzk1LCJhdWQiOiJGbGlnaHQgU3RhdHVzIiwic3ViIjoiRmxpZ2h0IFN0YXR1cyJ9._M8lPMqvBYW20NcjeUyb0iQRrUYSjIWhGwJeDY4Apns",
        # "localeBucketUrl": "https://sch.apiairasia.com/flightstatus/main/",
        # "testData": "false",
        # "notificationUrl": "https://sch.apiairasia.com/flightstatus/notification/",
        # "readMoreUrl": "https://sch.apiairasia.com/flightstatus/main/",
        # "dateFormatUrl": "https://sch.apiairasia.com/dataformat/date/",
        # "airportTerminalUrl": "https://sch.apiairasia.com/odterminal",
        # "airportTerminalPageUrl": "https://support.airasia.com/s/airports-and-terminals",
        # "authUrl": "https://flightstatus-7tjna4lktq-as.a.run.app",
        "authUser": "fsfrontend",
        "authSecret": "fsfrontend123"
        }

    # # 调用execjs计算JavaScript的结果
    # jsfile=r'./js2 OK.js'
    # js_code = open(jsfile, 'r', encoding='utf-8').read()
    # encData = execjs.compile(js_code).call('myAES', dic["authUser"], dic["authSecret"])

    # 调用C++编译后的AES UTF-16LE.exe进行计算
    aes_exe_file = r'./AES UTF-16LE.exe'
    iso_time = datetime.now(timezone.utc).isoformat()
    # if len(iso_time)>23:
    #     iso_time=iso_time[:23]+'Z'
    dos_command = subprocess.Popen(aes_exe_file+' "fsfrontend|fsfrontend123|'+iso_time+'"', stderr=subprocess.PIPE, stdout=subprocess.PIPE)
    encData = dos_command.stdout.read().decode().strip()


    post_headers = {
        'authority': 'flightstatus-7tjna4lktq-as.a.run.app',
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7',
        'content-security-policy': "frame-ancestors'none'",
        'origin': 'https://www.airasia.com',
        'referer': 'https://www.airasia.com/',
        'strict-transport-security': 'max-age=31536000; includeSubdomains',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'x-content-type-options': 'nosniff',
        'x-frame-options': 'DENY',
    }

    json_data = {}
    #url=dic['searchUrlNew']+'?SecretPhrase='+encData
    post_url='https://flightstatus-7tjna4lktq-as.a.run.app/V2/security/Signin?SecretPhrase='+encData
    print("POST url: ", post_url)
    response = se.post(post_url, headers=post_headers, json=json_data, timeout=10)
    assert response.status_code==200, f'{response.status_code} error!'
    authorization = 'Bearer '+re.search('"(.*?)"',response.text)[1]
    print(f"\nAuthorization: {authorization}\n")

    post_headers.update({'Authorization': authorization})

    query={
        'FlightNumber': 'AK6117',
        'StartDate': '2023-08-01',
        'EndDate': '2023-09-30'
    }
    query_url = 'https://flightstatus-7tjna4lktq-as.a.run.app/api/v2/GetByFlightNumberRange'
    response=se.get(query_url, params=query, headers=post_headers)
    assert response.status_code==200, f'{response.status_code} error!'
    flight_data=response.json()
    pprint(flight_data)


