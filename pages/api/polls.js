import { SupportAgentRounded } from '@mui/icons-material';
import logger from '../../services/logger';
import Polls from '../api/model/pollModel';
import dbConnect from './db';
const voucher_codes = require('voucher-code-generator');
export default async (req, res) => {
    // logger.info(`Headers: ${JSON.stringify(req.headers)} Method:${JSON.stringify(req.method)} Body:${JSON.stringify(req.body)} Query:${JSON.stringify(req.query)}`)
    await dbConnect();
    const { method } = req
    switch (method) {
        case 'PATCH':
            try{
                const request = req.body
                const sub = req.body.sub
                const code = req.body.code
                const cmd = req.body.cmd
                if(cmd === 'toggle-status'){
                    const user = await Polls.find({code: code},{"sub":1,"status":1})
                    if(user[0].sub == sub && user[0].status == 'active'){
                        console.log("%%")
                        const status = await Polls.updateOne({code: code}, { status: "inactive" })
                    }
                    if(user[0].sub == sub && user[0].status == 'inactive'){
                        console.log("&&")
                        const status = await Polls.updateOne({code: code}, { status: "active" })
                    }
                    res.status(200).json({success:true})
                    break
                } 
                const data = await Polls.findOne({"code":request.code})
                
                const newData = data.options.map((e)=>{
                    if(e.value === request.value){
                        e.count++
                    }
                    return {value:e.value, count:e.count,_id: e._id}
                })
                data['options'] = newData
                await Polls.updateOne({"code":request.code},data)
                res.status(200).json({success:true})
            }catch(error){
                console.log(error)
                res.status(400).json({success: false})
            }
            break;
        case 'GET':
            const cmd = req.query.cmd
            const code = req.query.code
            const sub = req.query.sub
            if(code){
                console.log(code)
                const poll = await Polls.findOne({"code":code})
                res.status(200).json({success:true,data: poll})
                break
            }if(sub){
                const poll = await Polls.find({"sub":sub})
                res.status(200).json({success:true,data: poll})
                break
            }
            else{
                console.log("#######")
                console.log(res.body)
                const poll = await Polls.find({})
                res.status(200).json({success:true,data: poll})

            }

            break
        case 'POST':
            console.log("This is a post request")
            try{
                const data = req.body
                console.log(data);
                const quizid = voucher_codes.generate({
                    length: 6,
                    count: 1,
                });
                data['code'] = quizid[0]
                data['status'] = 'active'
                data['report'] = false
                const options = data['options']
                const postdata = options.map((e)=>{
                    var val = {value:e,count:0}
                    return val
                })
                data['options'] = postdata
                data['response'] = [{user:"",choice:""}]
                console.log(data)
                const poll = await Polls.create(data)
                console.log(quizid);
                res.status(201).json({success: true, data:quizid})
            }catch(error){
                console.log(error)
                res.status(400).json({success: false})
            }
            break
    }
}

