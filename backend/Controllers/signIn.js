const dbData = require('../Models/Signin');
const profileDB = require('../Models/Profile');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async(req, res) => {
    let newUserInfo = req.body;
    try {
        let checkDuplicacy = await dbData.find({"email": newUserInfo.email});
        if(checkDuplicacy.length>0){
            let obj= {
                status: "Duplicate",
                message: "User already exists"
            }
            return res.send(obj);
        }
        newUserInfo.password = await bcrypt.hash(newUserInfo.password, 12);
        let userData = new dbData(newUserInfo);
        let profile = new profileDB(newUserInfo);
        let savedUser = await userData.save();
        let profileSaved = await profile.save();
        let obj = {
            status: "Success",
            userInfo: savedUser.email && savedUser.email
        }
        res.send(obj);
    } catch(error) {
        console.error(error);
        res.send(formErrorObject);
    }
}

const login = async(req, res) => {
    let { email, password } = req.body;
    try {
        if(! await dbData.find({"email": email})){
            let obj = {
                status: "Error",
                message: "Email is not registered"
            }
            return res.send(obj);
        }
        let userDBInfo = await dbData.find({"email": email});
        let check = await bcrypt.compare(password, userDBInfo[0].password);
        if(check){
            obj = {
                status: "Success",
                userInfo: userDBInfo.email && userDBInfo.email
            }
            res.send(obj);
        }
        else{
            let obj = {
                status: "Error",
                message: "Invalid creditonals"
            }
            res.send(obj);
        }
    } catch(error) {
        console.error(error);
        res.send(formErrorObject);
    }
}

const formErrorObject = (Error) => {
    return ({
        status: "Failure",
        error: Error
    });
}

module.exports = { register, login };