const ProductActiveLogModel = require("../models/ActiveLogModel");

const ActiveLogController = async (req, res) => {
    try {
        const logs = await ProductActiveLogModel.find().populate('productId userId').sort({ actionTime: -1 });
        res.render("pages/ActiveLog", {logs});
    } catch (err) {
        console.log("ActiveLog Error", err.message);
    }
};

const ActiveLogDelete = async (req, res) => {
    try {
        await ProductActiveLogModel.findByIdAndDelete(req.params.id);
        res.redirect("/ActiveLogShow");
    } catch (err) {
        console.log("ActiveLog Delete Error", err.message);
    }
};

module.exports = { ActiveLogController, ActiveLogDelete };