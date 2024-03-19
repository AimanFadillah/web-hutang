const { pesanError, pesanSuccess } = require("../Functions/pesan");
const { body } = require("express-validator");
const Hutang = require("../Models/Hutang");
const checkValidate = require("../Functions/checkValidate");

const HutangController = {
    index:async function (req,res){
        try{
            const data = await Hutang.findAll({
                order:[["createdAt","DESC"]]
            });
            return pesanSuccess(res,data);
        }catch(e){
            return pesanError(res,e);
        }
    },
    store:[
        body("nama").notEmpty().withMessage("Nama wajib ada"),
        body("uang").notEmpty().withMessage("Uang wajib ada"),
        checkValidate,
        async function (req,res){
            try{
                const body = req.body;
                const data = await Hutang.create(body);
                return pesanSuccess(res,data);
            }catch(e){
                return pesanError(res,e);
            }
        }
    ],
    update:[
        body("nama").notEmpty().withMessage("Nama wajib ada"),
        body("uang").notEmpty().withMessage("Uang wajib ada"),
        checkValidate,
        async function (req,res){
            try{
                const id = req.params.id;
                const body = req.body;
                const data = await Hutang.update(body,{where:{id}});
                return pesanSuccess(res,data);
            }catch(e){
                return pesanError(res,e);
            }
        }
    ],
    destroy:async function (req,res){
        try{
            const id = req.params.id;
            const data = await Hutang.destroy({where:{id}});
            return pesanSuccess(res,data);
        }catch(e){
            return pesanError(res,e);
        }
    }
}    


module.exports = HutangController;