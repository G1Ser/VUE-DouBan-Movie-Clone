# 豆瓣电影界面
本项目是基于Vue、Json-Server、HTML、CSS、JavaScript和Axios技术栈开发的豆瓣电影界面克隆。通过这个项目，我旨在学习和实践前端技术开发，了解Node.js和VUE技术的应用。
## 1.配置开发环境
首先我们安装[node.js](https://nodejs.org/en),安装完成后初始化开发环境，并且安装VUE、Json-Server和Axios：
```javascript
//初始化开发环境
npm init -y
//局部安装json-server
npm i json-server -D
//局部安装axios
npm i axios -D
//局部安装vue
npm i vue@2 -D
```
## 2.项目内容
查看[豆瓣电影](https://movie.douban.com/)界面，模仿该界面实现电影轮播界面和电影查看界面两个功能：
![电影轮播](https://github.com/G1Ser/VUE-DouBan-Movie-Clone/blob/main/GIF/%E8%BD%AE%E6%92%AD.gif "电影轮播")
 
![电影查看](https://github.com/G1Ser/VUE-DouBan-Movie-Clone/blob/main/GIF/%E6%9F%A5%E7%9C%8B.gif "电影查看")
### 2.1.项目部署
• 前端：

HTML：用于部署网页内容和结构。

CSS：用于美化网页，设置元素的属性等视觉效果。

Vue:在该项目中，Vue负责管理和呈现用户界面，实现管理员对电影数据的添加、下架操作、电影轮播和电影查看界面的功能。

• 后端模拟：

Json-server:在该项目中，它用来模拟后端服务器，用于模拟服务器对本地的响应。

• 前后端连接：

Axios：在该项目中，它用于Live Server和Node.js发出HTTP请求，负责从Vue前端向Json-Server后端发送请求，并处理返回的数据。
 
![Simple Drawing](https://github.com/G1Ser/VUE-DouBan-Movie-Clone/blob/main/GIF/Simple%20Drawing.png "Simple Drawing")
### 2.2. 模拟数据源
```
//打开数据源
npm run dev
```
管理员通过系统将电影名称、电影海报、电影导演、电影演员、上映时间、电影时长、电影类型、电影评分和电影简介录入数据库中，也可以通过下架电影来移除该电影数据,相关数据存放在.db/movies_information.xlsx里。

![数据管理](https://github.com/G1Ser/VUE-DouBan-Movie-Clone/blob/main/GIF/%E6%95%B0%E6%8D%AE%E7%AE%A1%E7%90%86.gif "数据管理")

### 2.3.用户界面设计
• 轮播效果：
基于Axios对Json-Server发送GET请求获得数据，通过设置切片和定时器来进行实现
```javascript
new Vue({
    el: ".show",
    data: {
        //从数据库加载电影数据
        movies: [],
        //当前显示电影的索引
        currentIndex: 0
    },
    computed: {
        //每次仅展示五部电影
        currentMovies() {
            let endIndex = this.currentIndex + 5;
            //如果不足五部电影就调整数组长度
            endIndex = endIndex > this.movies.length ? this.movies.length : endIndex;
            return this.movies.slice(this.currentIndex, endIndex);
        }
    },
    mounted() {
        //使用Axios加载数据到Movies
        axios.get("http://localhost:3000/movies")
            .then(response => {
                this.movies = response.data;
            })
            .catch(error => {
                console.error("Error loading data:", error)
            });
        setInterval(()=>{
            //循环展示电影
            this.currentIndex += 5;
            if(this.currentIndex >= this.movies.length){
                this.currentIndex = 0;
            }
        },5000);
    }
})
```

• 电影查看效果：
通过绑定点击事件，将点击的类型与电影数据的类型进行匹配，展示与点击同类型的电影列表。
```javascript
<ul class="view-type">
  <!-- href="javascript:void(0)"可以避免刷新浏览器 -->
  <li v-for="type in types" :key="type.id"><a href="javascript:void(0)"@click="selectType(type.type)">{{type.type}}</a></li>
</ul>
<br>
<ul class="view-movie">
  <li v-for="movie in filtermovie" :key="movie.id">
</ul>
```
```javascript
filtermovie() {
//过滤相同类型的电影
if (this.currentType) {
  return this.movies.filter(movie => movie.type === this.currentType);
  }
return this.movies;
}
```
