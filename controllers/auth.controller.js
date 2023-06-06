exports.login=(req, res)=>{
    const {username, password} = req.body
    /** TODO : OPTIONAL MODULE
     * check if the username exists in database
     * if true: return a token as cookie
     * its for the frontend 
     */
    return res.status(200).json({loggedin:'ok'})
}

exports.logout=(req, res)=>{
    return res.status(200).json({loggedout:'ok'})
}