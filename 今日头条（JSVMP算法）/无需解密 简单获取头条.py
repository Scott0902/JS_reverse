import requests

headers = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',}
params = {'origin': 'toutiao_pc',}

print(f'\n头条热榜：\n{"="*30}\n')

response = requests.get('https://www.toutiao.com/hot-event/hot-board/', params=params, headers=headers)
assert response.status_code==200, f'{response.status_code} error!'
data=response.json()
#print(data)
assert data['status']=='success', data
for idx, i in enumerate(data['data'], start=1):
    print(f"{idx}：{i.get('Title')}")
    #print(f"\n新闻链接：{i.get('Url')}\n图片链接：{i.get('Image').get('url')}\n\n")


print(f'\n\n推荐热搜：\n{"="*30}\n')

response = requests.get('https://www.toutiao.com/search/suggest/hot_words/', params=params, headers=headers)
assert response.status_code==200, f'{response.status_code} error!'
data=response.json()
assert data['message']=='success', data
for idx, i in enumerate(data['data'], start=1):
    print(f"{idx}：{i.get('query')}")

