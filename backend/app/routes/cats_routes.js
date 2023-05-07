module.exports = (app) => {
    const controllerCat = require("../controllers/cats_controller.js")

    app.get('/cats', (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
        const page = parseInt(req.query.page) || 1
        const pageSize = parseInt(req.query.pageSize) || 5
        controllerCat.getCat(req, res, page, pageSize)
    })
    app.get('/cats/:id', controllerCat.getOneCat, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
    })
    app.post('/cats_add', controllerCat.createCat, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
    })
    app.delete('/cats_delete/:id', controllerCat.deleteCat, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
    })
    app.put('/cats_update/:id', controllerCat.updateCat, (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
    })
    app.get('/cats_filter/:weight', (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
        const page = parseInt(req.query.page) || 1
        const pageSize = parseInt(req.query.pageSize) || 5
        controllerCat.filterCat(req, res, page, pageSize)
    })
    app.get('/cats_statistic/:breed', (req, res) => {
        res.header("Access-Control-Allow-Origin", "https://meow-adopt-a-cat.onrender.com")
        const page = parseInt(req.query.page) || 1
        const pageSize = parseInt(req.query.pageSize) || 5
        controllerCat.getStatisticsBreed(req, res, page, pageSize)
    })
}