import axios from "axios";


export class BaseAxios {
    constructor(baseUrl){
        this.baseUrl = baseUrl
        this.instance = axios.create({
            baseURL: this.baseUrl,
            
        })
    }
    async postData(url, body, config = {}) {
        try {
            const data =  await this.instance.post(url, body, config)
            return data
        } catch (error) {
            console.error(error); 
        }
        
    }
    async getData(url, config = {}){
        const {data} = await this.instance.get(url, config)
        //console.log(data)
        return data
    }

    async deleteData(url, config = {}){
        return await this.instance.delete(url, config)
        // console.log(data)
        //return data
        
    }
    async updateData(url, body, config = {}){
        return await this.instance.put(url, body, config)
    }
}