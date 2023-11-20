new Vue({
    el: ".subit-box",
    data: {
        id: "",
        name: "",
        poster: "",
        director: "",
        actor: [],
        time: "",
        duration: "",
        type: "",
        rate: "",
        introduce: "",
    },
    computed: {
        isFormValid() {
            return this.id !== "" && this.name !== "" && this.poster !== "" && this.director !== "" && this.actor !== "" &&
                this.time !== "" && this.duration !== "" && this.type !== "" && this.rate !== "" && this.introduce !== "";
        }
    },
    methods: {
        sumbit() {
            //使用Axios发送POST请求
            axios.post("http://localhost:3000/movies", {
                id: this.id,
                name: this.name,
                poster: this.poster,
                director: this.director,
                actor: this.actor,
                time: this.time,
                duration: this.duration,
                type: this.type,
                rate: this.rate,
                introduce: this.introduce
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error("提交数据时发生错误：", error);
                })
        }
    }
})
new Vue({
    el: ".information-box",
    data: {
        //用于存储从data.json获取的电影数据
        movies: []
    },
    mounted() {
        //使用Axios发送GET请求
        axios.get("http://localhost:3000/movies")
            .then(response => {
                this.movies = response.data;
            })
            .catch(error => {
                console.error("Error loading data:", error)
            })
    },
    methods: {
        deleteMovie(id) {
            //使用Axios发送DELETE请求
            axios.delete(`http://localhost:3000/movies/${id}`)
                .then(response => {
                    console.log("删除成功", response.data);
                })
                .catch(error => {
                    console.error("删除数据时发生错误：", error)
                })
        }
    }
})