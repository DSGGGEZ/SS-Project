const UserController = require('./controllers/UserController.js');
const UserAuthenController = require('./controllers/UserAuthenController');
const isAuthenController = require('./authen/isAuthenController')
const BlogController = require('./controllers/BlogController');
const PlaceController = require('./controllers/PlaceController');
const Blog = require('./models/Blog.js');
const Place = require('./models/Place.js');

let multer = require("multer")

// upload section
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/uploads");
    },
    filename: function (req, file, callback) {
        // callback(null, file.fieldname + '-' + Date.now());
        console.log(file);
        callback(null, file.originalname);
    }
})
let upload = multer({ storage: storage }).array("userPhoto", 10)


module.exports = (app) => {
    app.post('/user', UserController.create)
    app.put('/user/:userId', UserController.put)
    app.delete('/user/:userId', UserController.remove)
    app.get('/user/:userId', UserController.show)
    app.get('/users', isAuthenController, UserController.index)
    app.post('/login', UserAuthenController.login)
    //blog route
    app.post('/blog', BlogController.create)
    app.put('/blog/:blogId', BlogController.put)
    app.delete('/blog/:blogId', BlogController.remove)
    app.get('/blog/:blogId', BlogController.show)
    app.get('/blogs', BlogController.index)
    //place route
    app.post('/place', PlaceController.create)
    app.put('/place/:placeId', PlaceController.put)
    app.delete('/place/:placeId', PlaceController.remove)
    app.get('/place/:placeId', PlaceController.show)
    app.get('/places', PlaceController.index)
    //upload route
    app.post('/upload', function (req, res) {
        upload(req, res, function (err) {
            // isUserAuthenicated,
            if (err) {
                return res.end("Error uploading file.")
            }
            res.end("File is uploaded")
        })
    })
    app.post('/upload/delete', async function (req, res) {
        try {
            const fs = require('fs');
            console.log(req.body.filename)
            fs.unlink(process.cwd() + '/public/uploads/' + req.body.filename,
                (err) => {
                    if (err) throw err;
                    res.send("Delete sucessful")
                    // console.log('successfully deleted material file');
                });
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to delete file the material'
            })
        }

    })
}