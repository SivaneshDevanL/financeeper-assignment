const mongoose=require('mongoose');

const marioschema=new mongoose.Schema(
    { any: {} },
    { collection: "files", strict: false }
)
const mariomodel=mongoose.model("files",marioschema);

module.exports=mariomodel