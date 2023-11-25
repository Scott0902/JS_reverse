import requests, execjs
from urllib.parse import urlencode
from pprint import pprint
from time import time

if __name__ == '__main__':
        
    se=requests.Session()
    requests.packages.urllib3.disable_warnings()
    se.headers.update({'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',})

    url='https://www.toutiao.com/api/pc/list/feed'
    
    params={
        'channel_id': 3189399007,
        'min_behot_time': int(time()),
        'offset': 0,
        'refresh_count': 1,
        'category': 'pc_profile_channel',
        #'client_extra_params': '{"short_video_item":"filter"}',
        'aid': 24,
        'app_name': 'toutiao_web',
    }
    
    url += '?'+urlencode(params)
    jsfile = r'./toutiao.js'
    js_code = open(jsfile, 'r', encoding='utf-8').read()
    signature = execjs.compile(js_code).call('get_signature', url)
    assert signature != '', '获取signtaure失败！'

    url += '&_signature=' + signature
    response = se.get(url, verify=False)
    assert response.status_code==200, f'{response.status_code} error!'
    data=response.json()
    assert data['message']=='success', data

    for idx, i in enumerate(data['data'], start=1):
        print(f'\n【{idx}】')
        abstract=i.get('Abstract')
        if abstract:
            print(i.get('Abstract'))
            print(i.get('title'))
            print('新闻链接：',i.get('article_url'))
        else:
            data2=i.get('data')
            if data2:
                for idx2,j in enumerate(data2, start=1):
                    print(f'（{idx} - {idx2}）')
                    activity=j.get('activity')
                    if activity:
                        print(activity.get('name'))
                    else:
                        print(j.get('share').get('share_desc'))
                    print(j.get('share').get('share_title'))
                    print('新闻链接：',j.get('share').get('share_url'))
                    video=j.get('video')
                    if video:
                        print("视频链接：",video.get('download_addr').get('url_list')[0])
                    print()
            else:
                title=i.get('share_info').get('title')
                if title=='':
                    title=i.get('share').get('share_title')
                print(title)
                print(i.get('share_info').get('share_url'))
        print()

