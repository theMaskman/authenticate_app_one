const profileDBdata = require('../Models/Profile');
const bcrypt = require('bcryptjs');

const showData = async(req, res) => {
    let apiBody = req.body;
    try{
        let userInfo = await profileDBdata.find({"email": apiBody.email });
        userInfo[0].password = "********";
        let obj = {
            status: "Success",
            info: userInfo[0]
        };
        res.send(obj);
    } catch(error) {
        console.error(error);
        formErrorObject(error);
    }
}

const formErrorObject = (Error) => {
    return ({
        status: "Failure",
        error: Error
    });
}

module.exports = { showData };