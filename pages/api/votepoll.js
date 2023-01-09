import Polls from '../api/model/pollModel';
import dbConnect from './db';

export default async (req, res) => {
    await dbConnect();
    const { method } = req
    const request = req.body
    if(method == "PATCH"){
        try{
            var data = await Polls.findOne({"code":request.code})
            console.log(data)
            const newData = data.options.map((e)=>{
                if(e.value === request.value){
                    e.count++
                }
                return {value:e.value, count:e.count,_id: e._id}
            })
            data['options'] = newData
            console.log(data.options)
            const vote = {
                user: request.user,
                choice: request.value
            }
            if(!data.response){
                data['response'] = [vote]
            }else{
                data['response'].push(vote)
            }
            console.log(data['response'])
            await Polls.updateOne({"code":request.code},data)
            res.status(200).json({success:true})
        }catch(error){
            console.log(error)
            res.status(400).json({success:false})
        }
    }
}