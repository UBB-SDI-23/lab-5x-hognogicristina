module.exports = (app) => {
    const controllerCat = require("../controllers/cats_controller.js")

    app.get('/cats', controllerCat.getCat, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.netlify.app")
    })
    app.get('/cats/:id', controllerCat.getOneCat, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.netlify.app")
    })
    app.post('/cats_add', controllerCat.createCat, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.netlify.app")
    })
    app.delete('/cats_delete/:id', controllerCat.deleteCat, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.netlify.app")
    })
    app.put('/cats_update/:id', controllerCat.updateCat, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.netlify.app")
    })
    app.get('/cats_filter/:weight', controllerCat.filterCat, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.netlify.app")
    })
    app.get('/cats_statistic/:breed', controllerCat.getStatisticsBreed, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.netlify.app")
    })
}