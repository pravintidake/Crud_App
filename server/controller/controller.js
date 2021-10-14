var UserDB = require('../model/model');

//create and save new user
exports.create =(req, res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message : "Content can not be empty"});
        return;
    }

    //new user
    const user = new UserDB({
        name : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        status : req.body.status
    })

    //save user in the database
    user
        .save(user)
        .then(data => {
            // res.send(data);
            res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a user"
            });
        });
}

//retrive and return  all user/retriev and return a single user
exports.find =(req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        UserDB.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })
    }else{
        UserDB.find()
        .then(user => {
            res.send(user)
        })
        .catch(err =>{
            res.status(500).send({message : err.message ||  "Error Occurred while retieving user information"});
        });
    };
}

//update a new identified user by user id
exports.update =(req, res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message: "Data to update can't be empty"})
    }

    const id = req.params.id;
    UserDB.findByIdAndUpdate(id, req.body, {useFindAndModify : false})
    .then(data =>{
        if(!data){
            res.status(404).send({message: `Can not Update user with ${id}. Maybe user can not found`})
        }else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({message: "Error Update user Information"})
    })
}

//Delete a specified user by user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    UserDB.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}