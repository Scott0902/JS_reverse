import re, requests, os
# import subprocess
import execjs
import demjson3
from time import time
from random import randint


def search_var_name(long_str, var_name,):
	result = None
	var_name_search_pattern = [var_name+'\"&&\w+\[\"(.*?)\"]', var_name+'\"\)&&\w+\[\"(.*?)\"]']

	for i in var_name_search_pattern:
		match=re.search(i, long_str)
		if match:
			result=match[1]
			return result
	
	if result==None:
		ob_name_search_pattern=['\'(\w+)\':\"'+var_name+'\"', '\"(\w+)\"\]=\"'+var_name+'\"', '\"(\w+)\"\]=\"'+var_name+'\"']
		for i in ob_name_search_pattern:
			match=re.search(i, long_str)
			if match:
				ob_name=match[1]
				break

		var_name_search_pattern = ['\"'+ob_name+'\"\]\)&&\w+\[\"(\w+)\"\]', '\"'+ob_name+'\"\]\)&&\w+\[\"(\w+)\"\]', '\"'+ob_name+'\"\]&&\w+\[\"(\w+)\"\]']
		for i in var_name_search_pattern:
			match=re.search(i, inputfile)
			if match:
				result=match[1]
				return result
	return None


if __name__ == '__main__':

	cwd='D:\\PY\\JS逆向\\查IP'
	os.chdir(cwd)

	host='https://www.whatismyipaddress.com'

	headers = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.62',}	
	response = requests.get(host, headers=headers)
	res=response.text

	# 提取window._cf_chl_opt对象并转换为Python字典
	cf_chl_opt_str=re.search('_cf_chl_opt=({.*?});', res)[1]
	cf_chl_opt_str=cf_chl_opt_str.replace("Math.floor(Date.now() / 1000)", str(int(time())))
	cf_chl_opt = demjson3.decode(cf_chl_opt_str)
	
	js_file_path=None
	shift_num=None
	shift_func_name=None

	try:
		js_file_path = re.search('cpo.src=\'(.*?)\'', res)[1]
	except Exception:
		js_file_path = re.search('cpo.src\s+=\s+\'(.*?)\'', res)[1]
	assert js_file_path!=None, '找不到JavaScript文件的路径！'

	# try:
	# 	cRay = re.search('cRay: \'(.*?)\'', response.text)[1]
	# except Exception:
	# 	cRay = re.search('cRay:\'(.*?)\'', response.text)[1]
	cRay = cf_chl_opt['cRay']


	response = requests.get(host+js_file_path, headers=headers)
	inputfile = response.text 
	assert inputfile.startswith('window'), 'JavaScript文件不是以window开头，请检查一下'


	parseInt = re.findall('parseInt\((\w+\(\d+\))\)', inputfile) # 查找parseInt，保护parseInt的数组名不用替换
	

	try:	# 查找大数组移位的函数名
		shift_func_name = re.search('for\(\w+=(\w+),', inputfile, re.DOTALL)[1]
		try:
			# 有bug，原以为可以匹配b=function，但实际上会匹配gb=function、Hb=function等
			# shift_num = re.search(shift_func_name+'=function.*?return \w+=\w+(.*?),', inputfile)[1]
			# 正则表达式必须强调shift_func_name左边没有字母
			shift_num = re.search('(?<![a-zA-Z])'+shift_func_name+'=function.*?return \w+=\w+(.*?),', inputfile)[1]
		except Exception as err:
			raise TypeError('找不到大数组移位的数值')
	except Exception as err:
		raise TypeError('找不到大数组移位的函数名')

	try:	# 查找大数组的函数名
		big_array_name = re.search('function '+shift_func_name+'.*?return \w+=(\w+)\(\)', inputfile)[1]
	except Exception as err:
		raise TypeError('找不到大数组的函数名')



	pre_text='''var window=global;
document=window.document={};
window._cf_chl_opt={};
document.readyState='complete';
'''

	# 插入自定义的语句
	temp_file = f'{cRay}_big_array.txt'
	# insert_text=f"CALL={shift_func_name},"
	# insert_text+="console.log(JSON.stringify(" + big_array_name + "())),"
	# insert_text+="fs.writeFile('./" + temp_file + "', JSON.stringify(" + big_array_name + "()), (err)=>{if(err){console.log(err)}console.log('Output big array to file successfully.')}),"

	insert_position=inputfile.find('this||self,')+len('this||self,')
	# inputfile = pre_text + inputfile[:insert_position] + insert_text + inputfile[insert_position:]
	inputfile = pre_text + inputfile


	generate_big_array_text = re.search('(function ' + big_array_name + '\(.*?' + big_array_name + '\(\)})', inputfile)[1]
	generate_big_array_text += '\n' +re.search('(function '+shift_func_name+'\(.*?\)})', inputfile)[1]
	generate_big_array_text += '\n!' + re.search(',(function.*?for\(.*?}}\(\w+,\d+\),)', inputfile)[1]
	if generate_big_array_text[-1]==',':
		generate_big_array_text = generate_big_array_text[:-1] + ';'
	generate_big_array_text += '\nfunction output_big_array() {return JSON.stringify(' + big_array_name + '());}'
	big_array = eval(execjs.compile(generate_big_array_text).call('output_big_array'))


	outputfile1=f'./{cRay}_js2.js'
	with open(outputfile1, 'w', encoding='utf-8') as f:
		f.write(inputfile)

	# 从命令行里执行js代码并返回结果
	# nodejs = subprocess.Popen('node '+outputfile1, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
	# node运行错误会导致卡死
	# returned_text = nodejs.stdout.read().decode()
	# returned_text = subprocess.getoutput(f'node "{outputfile1}"')
	# try:
	# 	big_array_str = re.search('\[(.*)\]', returned_text)[1]
	# 	big_array = eval('[' + big_array_str + ']')
	# except Exception as err:
	# 	raise TypeError('找不到大数组的字符串')


	if shift_num.startswith('-'):
		XX = lambda n: big_array[n - int(shift_num[1:])]
	elif shift_num.startswith('+'):
		XX = lambda n: big_array[n + int(shift_num[1:])]
	else:
		raise TypeError('shitft_num字符串不正确：'+shift_num)


	# 去除parseInt的数组
	ll=list(set(re.findall('(\w+\(\d+\))', inputfile)))
	for i in parseInt:
		if i in ll:
			ll.remove(i)
	total=len(ll)

	# 批量替换并写入新js文件
	outputfile2=f'./{cRay}_js2_2.js'
	for idx, i in enumerate(ll, start=1):
		num=int(re.search('\((\d+)\)', i)[1])	# 注意：括号\(和\)千万不要漏，否则会产生严重替换后果
		new_text=XX(num)
		if '"' in new_text:	# 处理双引号问题
			new_text=new_text.replace('"', '\\"')
		new_text='"' + new_text + '"'
		print(f"({idx}/{total}) {i} ==> XX({num}) ==> {new_text[:30]}", end='\r', flush=True)
		inputfile=inputfile.replace(i, new_text)
	print('\n')

	# delete_text_pattern = [',(function.*?for\(.*?}}\(\w+,\d+\),)', 
	# 						  '(function ' + big_array_name + '\(.*?' + big_array_name + '\(\)})',
	# 						  '(function '+shift_func_name+'\(.*?{.*?})function',
	# 						 ]

	# for i in delete_text_pattern:
	# 	delete_part=re.search(i, inputfile)
	# 	# 不能用delete_part.end()，位置会偏移
	# 	# inputfile = inputfile[:delete_part.start()] + inputfile[delete_part.end():]
	# 	delete_text_length=len(delete_part[1])
	# 	inputfile = inputfile[:delete_part.start()] + inputfile[(delete_part.start()+delete_text_length):]

	with open(outputfile2, 'w', encoding='utf-8') as f2:
		f2.write(inputfile)
	
	operation_list = {'mousemove':'', 'touchstart':'', 'click':'', 'wheel':'', 'pointermove':'', 'pointerover':'', 'keydown':''}
	for i in operation_list:
		var_name=search_var_name(inputfile, i)
		if(var_name):
			operation_list.update({i:var_name})
			print(f'{i} ==> {var_name}')
		else:
			print('Failed to search:', i)
	# 各项操作对应的变量名：
	# mousemove ==> zVPs2
	# touchstart ==> guUl9
	# click ==> vNxUXF8
	# wheel ==> RdZTbB2
	# pointermove ==> gauD0
	# pointerover ==> JxhU8
	# keydown ==> FhXKw9

	# 伪造键盘鼠标操作数
	operation_list_2={}
	for k,v in operation_list.items():
		if k=='mousemove':
			operation_list_2.update({v: randint(100, 500)})
		elif k=='click':
			operation_list_2.update({v: randint(0, 2)})
		elif k=='pointermove':
			operation_list_2.update({v: randint(10, 100)})
		elif k=='pointerover':
			operation_list_2.update({v: randint(1, 10)})
		else:
			operation_list_2.update({v: 0})

	# 查找“主线程”中为0的一个变量
	try:
		uncertain_name=re.search(',(\w+)=0,\w+\(\),', inputfile)[1]
	except Exception as err:
		raise TypeError('找不到“主线程”中为0的一个变量')
	try:
		uncertain_key=re.search('\w+\[\"(\w+)\"\]='+uncertain_name, inputfile)[1]
		operation_list_2.update({uncertain_key:1})
	except Exception as err:
		raise TypeError('找不到“主线程”中为0的变量对应的混淆变量名')



	match=re.findall('setTimeout.*?\[\"(\w+)\"\],\d+,\w+,{(.*?)}', inputfile)
	assert match!=None and len(match)==1, '查找setTimeout函数错误'
	call_xhr_func_name=match[0][0]

	# 'gjJw8':fy["_cf_chl_opt"]["cType"],
	# 'cjLL8':fy["_cf_chl_opt"]["cNounce"],
	# 'YMPhv8':fy["_cf_chl_opt"]["cvId"],
	# 'JtXT7':0,
	# 'Ewdi8':0,
	# 'NeUtpl3':1,
	# 'fAdNmY5':fy["_cf_chl_opt"]["cRq"],
	# 'vruOBE0':fy["vruOBE0"],
	# 'guqU9':c["BXPEn"](fy["top"],fy["self"])

	temp_list=match[0][1].split(",'")
	for i in range(len(temp_list)):
		if "cf_chl_opt" in temp_list[i]:
			key=re.search('cf_chl_opt\[\"(\w+)\"\]', temp_list[i])[1]
			value=cf_chl_opt.get(key)
			if type(value)==str:
				value='"'+value+'"'
			elif type(value)==dict:
				value=str(value)
			temp_list[i]=re.sub('cf_chl_opt\[\"\w+\"\]', value, temp_list[i])
		elif "top" in temp_list[i]:
			temp_list[i]=re.sub(':(.*?)$', ": False", temp_list[i])
	



	obj_str=match[0][1]
	obj_str=re.sub(':\w+\[\"_cf_chl_opt\"\]', ": cf_chl_opt", obj_str)
	obj_str=re.sub(':\w+\[\"top\"\].*?$', ": false", obj_str)
	obj_str=re.sub(':\w+\[\"\w+\"\]', ': '+str(operation_list)+',', obj_str)

	temp_list=obj_str.split(',')
	params={}
	for i in range(len(temp_list)):
		if "cf_chl_opt" in temp_list[i]:
			key=re.search('cf_chl_opt\[\"(\w+)\"\]', temp_list[i])[1]
			value=cf_chl_opt.get(key)
			if type(value)==str:
				value='"'+value+'"'
			elif type(value)==dict:
				value=str(value)
			temp_list[i]=re.sub('cf_chl_opt\[\"\w+\"\]', value, temp_list[i])
	new_obj_str='{' + ','.join(temp_list) + '}'
	new_obj_str=new_obj_str.replace('\'','"')
	params=json.loads(new_obj_str)

	print(params)