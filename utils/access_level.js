const access = (req, res) => {
    Employee.findOne({
        access: req.body.access_level
    })
    .then((employee) => {
    if (!employee || employee(req.body.password) !== 1) {
            res.status(401).json({
                msg: 'Authentication failed. Invalid you dont have access to this section.'
            });
        } else {
            //This is where we generate a token
            let token = jwt.sign({
                email: employee.email,
                first_name: employee.first_name,
                last_name: employee.last_name,
                access_level: employee.access_level,
                _id: employee.id
            }, process.env.APP_KEY);

            res.status(200).json({
                msg: 'All good!',
                token
            });
        }
    })
    .catch((err) => {
        //res.status()
        throw err;
    })
};

module.exports = access;