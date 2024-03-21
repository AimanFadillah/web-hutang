const { pesanError, pesanSuccess } = require("../Functions/pesan");
const { body } = require("express-validator");
const Hutang = require("../Models/Hutang");
const checkValidate = require("../Functions/checkValidate");
const { Op } = require("sequelize");

const HutangController = {
    index: async function (req, res) {
        try {
            const perpage = 20;
            const page = req.query.page || 1;
            const data = await Hutang.findAll({
                order: [["createdAt", "DESC"]],
                where: { nama: { [Op.like]: `%${req.query.search || ""}%` } },
                limit: perpage,
                offset: (page - 1) * perpage
            });
            return pesanSuccess(res, data);
        } catch (e) {
            return pesanError(res, e);
        }
    },
    store: [
        body("nama").notEmpty().withMessage("Nama wajib ada"),
        body("uang").notEmpty().withMessage("Uang wajib ada"),
        checkValidate,
        async function (req, res) {
            try {
                const body = req.body;
                const data = await Hutang.create(body);
                return pesanSuccess(res, data);
            } catch (e) {
                return pesanError(res, e);
            }
        }
    ],
    update: [
        body("nama").notEmpty().withMessage("Nama wajib ada"),
        body("uang").notEmpty().withMessage("Uang wajib ada"),
        checkValidate,
        async function (req, res) {
            try {
                const id = req.params.id;
                const body = req.body;
                const data = await Hutang.update(body, { where: { id } });
                return pesanSuccess(res, data);
            } catch (e) {
                return pesanError(res, e);
            }
        }
    ],
    destroy: async function (req, res) {
        try {
            const id = req.params.id;
            const data = await Hutang.destroy({ where: { id } });
            return pesanSuccess(res, data);
        } catch (e) {
            return pesanError(res, e);
        }
    }
}


module.exports = HutangController;