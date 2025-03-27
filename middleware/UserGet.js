const attachUser = async (req, res, next) => {
    if (req.user) {
        user = req.user
    } else {
        user = null;
    }
    next();
};

module.exports = { attachUser };