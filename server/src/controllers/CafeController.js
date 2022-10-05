const { Cafe } = require('../models')
module.exports = {
    // get all cafe
    async index(req, res) {
        try {
            const cafe = await Cafe.findAll()
            res.send(cafe)
        } catch (err) {
            res.status(500).send({
                error: 'The cafes information was incorrect'
            })
        }
    },
    // create cafe
    async create(req, res) {
        console.log(JSON.stringify(req.body))
        try {
            const cafe = await Cafe.create(req.body)
            res.send(cafe.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create cafe incorrect'
            })
        }
    },
    // edit cafe, suspend, active
    async put(req, res) {
        try {
            await Cafe.update(req.body, {
                where: {
                    id: req.params.cafeId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update cafe incorrect'
            })
        }
    },
    
// delete cafe
async remove(req, res) {
        try {
            const cafe = await Cafe.findOne({
                where: {
                    id: req.params.cafeId
                }
            })
            if (!cafe) {
                return res.status(403).send({
                    error: 'The cafe information was incorrect'
                })
            }
            await cafe.destroy()
            res.send(cafe)
        } catch (err) {
            res.status(500).send({
                error: 'The cafe information was incorrect'
            })
        }
    },
    // get cafe by id
    async show(req, res) {
        try {
            const cafe = await Cafe.findByPk(req.params.cafeId)
            res.send(cafe)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'The cafe information was incorrect'
            })
        }
    }
}
