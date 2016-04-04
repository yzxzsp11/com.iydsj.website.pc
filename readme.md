# 基于 Gulp 和 webpack、less 的模块化前端开发模式

## 目录介绍

```
|— dist                             # 输出目录
|— src
	|— html                         # html源文件
	|— js                           # js源文件
		|— component       		    # 可复用js组件
		|— lib                      # 库文件
		|— page                     # 页面主js
	|— less                         # less源文件
		|— base                     # less基类方法
			|— variable.less    	# less 变量定义文件
			|— reset.less    		# 重置样式
			|— unit.less    		# 单元全局文件
		|— component       		    # 组件化less文件，可具体到页面级
		|— entry                
			|— index.less 		    # less入口文件
		|— lib                      # css库
		|— page                     # 对应到每个页面 一个html 一个文件
		|— partial                  # 公用部分文件
	|— images                       # 原始图片
|— gulpfile.js 			            # Gulp入口
|— package.json 		   
|— webpack.config.js
```
## 如何安装？

	1. 安装 node.js并全局安装gulp
	2. cd /your/file/path/com.iydsj.website.pc
	3. npm install
	4. gulp

## 打包方式

js打包

    * 一个页面打包一个js文件
    * 所有的类库打包成一个core_js文件
    * 开发过程中使用 js-dev中的文件 ，上线前统一改成 js目录下的.min文件

css打包

    * 第三方的类库
    * 所有页面引用的css打包成一个css文件
    
## 如何在Less寻找需要找到的样式并修改？

    1. 通过chrome浏览器找到根级class
    2. 根据根级class名找到对应less文件
    3. 在对应的less文件中修改需要修改的部分，并保持css命名空间规范