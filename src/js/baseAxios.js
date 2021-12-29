import axios from "axios";


export class BaseAxios {
    constructor(baseUrl){
        this.baseUrl = baseUrl
        this.instance = axios.create({
            baseURL: this.baseUrl
        })
    }
    async getData(url, config = {}) {
        const data =  await this.instance.post(url, config)
        console.log(data)
        return data
    }
}