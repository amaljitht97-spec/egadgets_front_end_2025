import axios from "axios";

const commonApi = async (reqUrl,reqMethod,reqBody,reqHeader) => {
    const config = {
        url:reqUrl,
        method: reqMethod,
        data: reqBody,
        headers: reqHeader ? reqHeader : {"Content-Type": "application/json"}


    }
    try{
        return await axios(config)
    }
    catch(err){
        return err
    }

}

export default commonApi