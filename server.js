import axios from "axios";
import bodyParser from "body-parser";
import express, { response } from "express";
import ejs from "ejs"

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const apiUrl = "https://restapi.tu.ac.th/api/v1/auth/Ad/verify";
const apiToken = "TUa102b22222c092b0a4d8880665add4bfc4cd74b48ef7b7e2d657e126b6faaf63148ead8e7ce823d2587ec03686d3da84"
const config = {
    headers: {
        "Content-Type": "application/json",
        "Application-Key": `${apiToken}`
    },
};

app.get("/" , (req,res) => {
    res.render("index.ejs")
})

app.post("/" , async (req,res) => {
    const data = {
        UserName: req.body.username,
        PassWord: req.body.password,
    }

    try{
        const response = await axios.post(`${apiUrl}` , data , config)
        const responseJS = response.data
        console.log(responseJS)
        res.render("index.ejs" , {
            message: responseJS.message,
        })
    } catch (error) {
        res.render("index.ejs" , {
            error: error.response.data.message,
        })
        console.log(error.response.data)
        res.status(500);
        
    }
    
    
});

app.listen(port , () => {
    console.log(`Server running on port ${port}`);
})