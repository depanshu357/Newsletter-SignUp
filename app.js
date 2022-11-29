const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const https = require("https")

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/",function(req,res){
    // console.log("activated");
    res.sendFile(__dirname + "/signup.html")
})
app.post("/",function(req,res){
    let firstName = req.body.fName;
    let lastName = req.body.LName;
    let email = req.body.email;
    console.log(firstName, lastName, email)
    let data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    let jsonData = JSON.stringify(data);

    const options = {
        method: "POST",
        auth:"depanshu:17438cdb0695896364ac5a438a864a98-us21"
    }
    
    const url = "https://us21.api.mailchimp.com/3.0/lists/4f8e9b90e3"
    
    const request = https.request(url,options,function(response){
        response.on("data",function(data){
            const dataReceived = JSON.parse(data);
            console.log(dataReceived);
            if(dataReceived.error_count){
                res.sendFile(__dirname+"/failure.html")
            }else res.sendFile(__dirname+"/success.html");
        })
    })
    request.write(jsonData);
    request.end();
})
// API Key
// 17438cdb0695896364ac5a438a864a98-us21

// list id
// 4f8e9b90e3
app.listen(3000,function(){
    console.log("App is running on http://localhost:3000")
})