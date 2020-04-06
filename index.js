const express = require('express');
const server = express();
const shortid = require('shortid');

//variables
const port = 5001;
const users = [];

//globally used middleware
server.use(express.json());

// users endpoints
server.get('/', (req,res)=> {
    res.status(200).json({message: 'API is running'})
});

server.post('/api/users', validation, (req,res)=>{
    const user = req.body;
    user.id = shortid.generate();
    users.push(user);
    res.status(201).json(user)
})

server.get('/api/users' , (req,res)=>{
    res.status(200).json(users)
})

server.get('/api/users/:id', (req,res)=> {
    const requestedUser = users.find(user => user.id == req.params.id)
    if(requestedUser){
        return res.status(200).json(requestedUser)
    }else{
        return res.status(404).json({message: 'that id doesnt match any in our records, check id please'})
    }
})

//validation middleware 
function validation  (req, res , next){
    if(req.body.name == undefined || req.body.bio == undefined || req.body.bio === '' || req.body.name == ''){
         return res.status(404).json({message: 'your missing either a name or bio property'})
    }else{
        return next()
    }
}

//port listening function
server.listen(port, ()=>{
    console.log(`listening on port ${port}`)
});