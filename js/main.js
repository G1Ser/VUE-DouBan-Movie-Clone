new Vue({
    el: ".view",
    data: {
        types: [
            { id: 1, type: "爱情" },
            { id: 2, type: "动画" },
            { id: 3, type: "动作" },
            { id: 4, type: "犯罪" },
            { id: 5, type: "剧情" },
            { id: 6, type: "科幻" },
            { id: 7, type: "悬疑" }
        ],
        movies: [],
        //选中的电影类型
        currentType: '',
        currentMovie: null,
        time: null,
        //控制信息框展示的方向
        direction:null,
    },
    filters: {
        minute: function (p) {
            return p + "分钟"
        },
        postfix: function (p) {
            return p + "(导演)"
        }
    },
    computed: {
        filtermovie() {
            //过滤相同类型的电影
            if (this.currentType) {
                return this.movies.filter(movie => movie.type === this.currentType);
            }
            return this.movies;
        },
        detailboxdirection(){
            if(this.direction){
                return {left : "100%"};
            }else{
                return {right:"100%"};
            }
        }
    },
    mounted() {
        axios.get("http://localhost:3000/movies")
            .then(response => {
                this.movies = response.data;
            })
            .catch(error => {
                console.error("Error loading data:", error)
            });
    },
    methods: {
        selectType(type) {
            this.currentType = type;
        },
        showDetails(movie, event) {
            //获取可视区域的长度
            const width = document.documentElement.clientWidth;
            //获取鼠标的X坐标
            const mouseX = event.clientX;
            //图片的宽度
            const ImgWidth = 170;
            //信息框的宽度
            const BoxWidth = 350;
            this.direction = mouseX+ImgWidth+BoxWidth>width?false:true;
            clearTimeout(this.time);
            this.time = setTimeout(() => {
                this.currentMovie = movie;
            }, 500);
        },
        hideDetails() {
            clearTimeout(this.time);
            this.currentMovie = null;
        },
    }
})