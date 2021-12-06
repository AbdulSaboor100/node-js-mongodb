import  mongoose  from "mongoose";

let studentSchema = mongoose.Schema({
    name : {
        type : String,
        requied : true
    },
    email : {
        type : String,
        requied : true,
        unique : true
    },
    password : {
        type : Number,
        requied : true
    },
    created_at : {
        type : Number,
        date : new Date()
    }
})

let AppUser = mongoose.model('user' , studentSchema);

export default AppUser;