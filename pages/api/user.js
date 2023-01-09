import Users from '../api/model/userModel';
import dbConnect from './db';
const voucher_codes = require('voucher-code-generator');
export default async (req, res) => {
    // logger.info(`Headers: ${JSON.stringify(req.headers)} Method:${JSON.stringify(req.method)} Body:${JSON.stringify(req.body)} Query:${JSON.stringify(req.query)}`)
    await dbConnect();
    const { method } = req
    switch (method) {
        case 'GET':
            const sub = req.query.sub
            if(sub){
                console.log(sub)
                const user = await Users.findOne({"sub":sub})
                res.status(200).json({success:true,data: user})
                break
            }
            else{
                console.log("#######")
                console.log(res.body)
                const user = await Users.find({})
                res.status(200).json({success:true,data: user})

            }

            break
        case 'POST':
            console.log("This is a user post request")
            try{
                const data = req.body;
                if(req.body.email.endsWith("karunya.edu.in")){
                    data['role'] = 'student'
                }
                else if(req.body.email.endsWith("karunya.edu")){
                    data['role'] = 'staff'
                }
                const use = await Users.create(data)
                console.log(data)
                res.status(201).json({success: true, data:data})
            }catch(error){
                console.log(error)
                res.status(200).json({success: true})
            }
            break
    }
}

