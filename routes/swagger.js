 const options = {
    definition:{
        openapi:'3.0.0',
        info:{
            title:"REST API WITH AUTHENTICATION",
            version:'1.0.0',
            description:'THIS A REST API with Authentication',

        },
        servers:{
            url:'http://localhost:3001',
            description:"Dvelopment server"
        }
    },
    components:{
        Schemas:{
          Usermodel:{
            type:"object",
            required:['Username'],
            properties:{
                Username:{
                    type:'String',
                    description:"username is compulsory"
                },
                Password:{
                    type:'String',
                    description:"password is compulsory"
                }
            }

          }
         
        },
        responses:{
            "200":{
                description:"successful",
                contents: 'application/json'
            },
            "404":{
                description:"not successful",
                contents: 'application/json'
            }
          }  
    },
    apis:['./MYTASK/routes/Users.js']

}




module.exports=options