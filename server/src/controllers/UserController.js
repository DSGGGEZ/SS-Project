const {User} = require("../models");

module.exports = {
    //get all user
    async index(req,res){
        //res.send('เรียกข้อมูลผู้ใช้งานทั้งหมด');
        try{
            const users = await User.findAll();
            res.send(users);
        }
        catch(err){
            res.status(500).send({
                error: 'The users information was incorrect'
            });
        }
    },
    async show(req,res){
        try{
            const user = await User.findByPk(req.params.userId);
            res.send(user);
        }
        catch(err){
            res.status(500).send({
                error: 'The users information was incorrect'
            });
        }
    },
    async create(req,res){
        try{
            const user = await User.create(req.body)
            res.send(user.toJSON())
        } catch(err){
            res.status(500).send({
                error: 'Create user incorrect'
            })
        }
    },
    async put(req,res){
        try{
            await User.update(req.body,{
                where: {
                    id: req.params.userId
                }
            })
            res.send(req.body)
        } catch(err){
            res.status(500).send({
                error: 'Update user incorrect'
            })
        }
    },
    async remove(req,res){
        try{
            const user = await User.findOne({
                where: {
                    id: req.params.userId
                }
            })
            if(!user){
                return res.status(403).send({
                    error: 'The user information was incorrect'
                })
            }
            await user.destroy()
            res.send(user)
        } catch(err){
            res.status(500).send({
                error: 'Remove user incorrect'
            })
        }
    }
}
