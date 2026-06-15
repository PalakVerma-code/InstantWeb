import mongoose from 'mongoose';
const messageschema=new mongoose.Schema({
    role:{
        type:String,
        enum:['user','assistant'],
        required:true
    },content:{
        type:String,
        required:true
    }
},{timestamps:true});

const websiteSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        default:'My Website'
    },
    latestCode:{
        type:String,
        required:true
    },conversation:[messageschema]
    ,deployed:{
        type:Boolean,
        default:false
    },
    deploymentUrl:{
        type:String
    },
    // {/*slug is a unique identifier for the website, used in the URL*/}
    slug:{  
        type:String,
        unique:true,
       sparse:true
    }
},{timestamps:true});

export const Website=mongoose.model('Website',websiteSchema);
export default Website;