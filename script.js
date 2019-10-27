
let app = new Vue({
    el: '#app',
    data: {
        term1data: {},
        term2data: {},
        loading: false,
        term1: 'strewn',
        term2: 'balloon',
        comments: {},
        poemLine1: '',
        poemLine2: '',
    },
    created() {
        this.poetrydb();
    },
    computed: {
        
    },
    watch: {
        term1(value, oldvalue) {
            if (oldvalue === '') {
                this.term1 = value;
            }
        },
        term2(value, oldvalue) {
            if (oldvalue === '') {
                this.term2= value;
            }
        },
    },
    methods: {
        async poetrydb() {
            this.loading = true;
            if (this.term1 != '' && this.term2 != '') {
                try {
                    const response1 = await axios.get('http://poetrydb.org/lines/' + this.term1)
                    .catch(error => {
                        this.term1 = "";
                    });
                    this.term1data = response1.data;
                    
                }
                catch (error) {
                    console.log(error);
                }
                try {
                    const response2 = await axios.get('http://poetrydb.org/lines/' + this.term2)
                    .catch(error => {
                        this.term2 = "";
                    });
                    this.term2data = response2.data;
                }
                catch (error) {
                    console.log(error);
                }
            }
            this.loading = false;
        },
        generatePoem() {
            this.poetrydb();

            this.poemLine1 = '';
            this.poemLine2 = '';

            var found1 = false;
            for (var i = 0; i < this.term1data.length; i++) {
                var poem = this.term1data[i];
                for (var k = 0; k < poem.lines.length; k++) {
                    var line = poem.lines[k];
                    var n = line.split(" ");
                    var lastword = n[n.length - 1];
                    lastword = 	lastword.substring(0, lastword.length - 1);
                    if (lastword === this.term1) {
                        var cleanLine = line.substring(0, line.length - 1);
                        this.poemLine1 += cleanLine + '\n';
                        found1 = true;
                        break;
                    }
                }
                if (found1 === true) {
                    break;
                }
            }
            if (found1 === false) {
                this.poemLine1 = "Word 1 is invalid or not found";
            }
            
            var found2 = false;
            for (var i = 0; i < this.term2data.length; i++) {
                var found2 = false;
                var poem = this.term2data[i];
                for (var k = 0; k < poem.lines.length; k++) {
                    var line = poem.lines[k];
                    var n = line.split(" ");
                    var lastword = n[n.length - 1];
                    lastword = 	lastword.substring(0, lastword.length - 1);
                    if (lastword === this.term2) {
                        var cleanLine = line.substring(0, line.length - 1);
                        this.poemLine2 += cleanLine + '\n';
                        found2 = true;
                        break;
                    }
                }
                if (found2 === true) {
                    break;
                }
            }
            if (found2 === false) {
                this.poemLine2 += "Word 2 is invalid or not found";
            }
            
        },
    }
});
