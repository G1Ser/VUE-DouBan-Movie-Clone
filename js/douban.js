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