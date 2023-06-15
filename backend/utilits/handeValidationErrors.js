const {validationResult} = require("express-validator");
const handleValidationErrors = (req, res, next) => {
    // помогает устрановить ошибки валидации на сервере.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    };
    next();
}
module.exports = handleValidationErrors;