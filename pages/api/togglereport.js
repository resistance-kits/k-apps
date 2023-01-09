import Polls from '../api/model/pollModel';
import dbConnect from './db';

export default async (req, res) => {
    await dbConnect();
    const { method } = req
    const code = req.body.code
    const sub = req.body.sub
    if(method == "PATCH"){
        try{
            const user = await Polls.find({code: code},{"sub":1,"report":1})
            if(user[0].sub == sub && user[0].report == true){
                console.log("%%")
                const report = await Polls.updateOne({code: code}, { report: false})
            }
            if(user[0].sub == sub && user[0].report == false){
                console.log("&&")
                const report = await Polls.updateOne({code: code}, { report: true })
            }
            res.status(200).json({success:true})
        }catch(error){
            console.log(error)
            res.status(400).json({success:false})
        }
    }
}