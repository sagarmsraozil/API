const dataValidation = (data,userData)=>{
    let userNames = data.map((val)=>{return val['username']});
    let emails = data.map((val)=>{return val['email']});
    if(userNames.includes(userData['username']))
    {
        return "Username already exists!!";
    }
    else if(emails.includes(userData['email']))
    {
        return "Email already exists!!";
    }
    else
    {
        return true;
    }
}

module.exports = {dataValidation};