
const loginRequired = (req, res, next) => {
    if(req.user) {
        next();
    } else {
        //Unauthorized
        res.status(401).json({
        msg: "Unauthorised user!!"
    })
    }
};

// const loginRequired = (req, res, next) => {
//     if(req.em) {
//         next();
//     } else {
//         //Unauthorized
//         res.status(401).json({
//         msg: "Unauthorised user!!"
//     })
//     }
// };

// const adminRequired = (req, res, next) => {
//     if(req.user.role === admin) {
//         next();
//     } else {
//         //Unauthorized
//         res.status(401).json({
//         msg: "Unauthorised user!!"
//     })
//     }
// };



module.exports = {
    loginRequired
};