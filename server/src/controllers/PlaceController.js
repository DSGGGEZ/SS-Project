const { Place } = require('../models')
module.exports = {
    // get all place
    async index(req, res) {
        try {
            let places = null
            const search = req.query.search
            // console.log('search key: ' + search)
            if (search) {
                places = await Place.findAll({
                    where: {
                        $or: [
                            'title', 'content', 'theme'
                        ].map(key => ({
                            [key]: {
                                $like: `%${search}%`,
                            }
                        })),
                    },
                    order: [['updatedAt', 'DESC']]
                })
            } else {
                places = await Place.findAll({
                    order: [['updatedAt', 'DESC']]
                })
            }
            res.send(places)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the places'
            })
        }
    },
    // create places
    async create(req, res) {
        console.log(JSON.stringify(req.body))
        try {
            const place = await Place.create(req.body)
            res.send(place.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create place incorrect'
            })
        }
    },
    // edit place, suspend, active
    async put(req, res) {
        try {
            await Place.update(req.body, {
                where: {
                    id: req.params.placeId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update place incorrect'
            })
        }
    },

    // delete place
    async remove(req, res) {
        try {
            const place = await Place.findOne({
                where: {
                    id: req.params.placeId
                }
            })
            if (!place) {
                return res.status(403).send({
                    error: 'The place information was incorrect'
                })
            }
            await place.destroy()
            res.send(place)
        } catch (err) {
            res.status(500).send({
                error: 'The place information was incorrect'
            })
        }
    },
    // get place by id
    async show(req, res) {
        try {
            const place = await Place.findByPk(req.params.placeId)
            res.send(place)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'The place information was incorrect'
            })
        }
    }
}
