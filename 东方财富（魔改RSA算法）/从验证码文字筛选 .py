from pprint import pprint as ppr
ocr_result=['骆,115,113|窕,238,87|啶,205,58',
'事,83,94|甩,137,43|宗,124,129',
'框,212,127|咙,189,88|洇,125,73',
'等,26,21|查,203,70|闲,101,114|吉,99,25',]

pick_words=['啶,骆,窕',
'甩,宗,事',
'咽,框,咙',
'古,杳,闲',]

ocr_dict = []
for i in ocr_result:
    ocr_dict.append({j[0]: j[2:] for j in i.split('|')})

ppr(ocr_dict)
for i in range(len(ocr_result)):
    print('='*60)
    unmatched=[]
    # 一定要用copy()，而不是直接用等于号，否则对temp的任何操作都会影响原先的字典元素
    temp = ocr_dict[i].copy()
    for j in pick_words[i].split(','):
        if j in temp.keys():
            print(j, temp.get(j))
            del temp[j]
        else:
            unmatched.append(j)
    if unmatched:
        print(f'有个别字识别不正确:\n{unmatched}\n{temp}\n尝试从剩余的字典里随机分配')
        re_allocate=0
        for k in list(temp.keys()):
            print(k, temp[k])
            del(temp[k])
            re_allocate+=1
            if re_allocate>=len(unmatched):
                break
            





