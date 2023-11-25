import re
import subprocess

inputfile = r'D:\PY\JS逆向\猿人学\第4关\jquery输出function.js'
outputfile = r'D:\PY\JS逆向\猿人学\第4关\jquery输出function-.js'
line_num_file = r'D:\PY\JS逆向\猿人学\第4关\jquery输出line number.js'
with open(inputfile,'r',encoding='utf-8') as f:
    js=f.read().splitlines()

funcs=[]
func_name=''

patterns = [
            re.compile(',\\s*([^=]+)\\s*=\\s*function\\b'), # , xxx = function ... {
            re.compile('\(.*?function(.*?){'),          # !(!function(e){
            re.compile('(.*)\s*=\s*.*?function.*?{'),   # xxx = function ... {
            re.compile('(.*?): function(.*?){'),        # xxx: function ...{
            re.compile('function\s*(.*?){'),            # function ... {
            re.compile('\(function(.*?){'),             # (function ... {
           ]
for i in range(len(js)):
    if "function" in js[i]:
        if "{}" in js[i] or '"function"' in js[i]:  # 跳过 function ... {} 空函数和"function"
            print(f"Skip: {js[i]}")      
            continue
        r=None
        matched_result = []
        for j in patterns:
            r=re.search(j, js[i])
            if r!=None:matched_result.append(r[1])

        if matched_result:
            # if len(matched_result)>1:
            #     print(f'matched more functions: {matched_result}')
            #     func_name=min(matched_result, key=len)
            # else:
            #     func_name=matched_result[0]
            # func_name=func_name.strip().strip('"') # 去掉空格和双引号
            #js[i]=f'{js[i]} console.log("{func_name}");\t// :{i+1}'
            #funcs.append([func_name, i+1])
            # 不记录函数名，改为行号
            js[i]=f'{js[i]} console.log({i+1});'
            funcs.append(i+1)
        else:
            print("Failed to match: ", js[i])

with open(outputfile,'w',encoding='utf-8') as f2:
    for i in js:
        f2.write(i+"\n")

nodejs = subprocess.Popen('node "'+outputfile+'"', stderr=subprocess.PIPE, stdout=subprocess.PIPE)
run_result = nodejs.stdout.read().decode()
run_status_code = nodejs.wait()
assert run_status_code==0, run_result
used_func = set(run_result.split('\n'))
if len(used_func)!=0 and len(used_func)<len(funcs):
    # print("\n\nUsed functions:\n")
    # for i in funcs:
    #     print(f"Line: {i[1]}\t{i[0]}")
    print("\n\nNot used functions:\n")
    with open(line_num_file, 'w', encoding='utf-8') as f:
        for i in funcs:
            #if not i[0] in used_func:
            #检查行号，不是检查函数名称
            if not str(i) in used_func:
                # print(f"Line: {i[1]}\t{i[0]}")
                # f.write(f'{i[1]}\n')
                print(f"Line: {i}")
                f.write(f'{i}\n')                