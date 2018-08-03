var express = require('express')
var hbs = require('hbs')
var axios = require('axios')

var app = express();

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper("getCurrentYear", () => new Date().getFullYear())
hbs.registerHelper("toUpper", (text) => text.toUpperCase())

app.set("view engine", "hbs")
app.use(express.static(__dirname + "/public"))

app.use((res, resp, next) => {
    console.log("Testing middleware")
    next();
})

app.get("/", (req, resp) => {
    // resp.writeHead(200, {'Content-Type': 'text/html'})
    // resp.write("<H2>Hello Express Application </h2>");
    // resp.end()
    resp.render('homepage', {
        message:"Home page"
    })
})

app.get("/about", (req, resp) => {

    setTimeout(() => {
        resp.render('about', {
            message: "Aboutus"
        })
    }, 10000)
    
})

app.get("/blogs", async (req,res) => {
    var blogsData = []
    try{
        var response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        blogsData = response.data
    } catch(err) {

    }
    
    res.render("blogs", {
        blogs: blogsData
    })
})

app.listen(8080, () => {
    console.log("Express server started...")
})