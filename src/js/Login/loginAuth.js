import { BaseAxios } from "../CustomAxios/baseAxios.js";

export class LoginAuth extends BaseAxios {
    constructor(baseUrl){
        super('https://ajax.test-danit.com/api/v2/cards/')
        this.config = {
            headers:{
                "Content-Type" : "application/json",
            }
        }
        
    }

    getToken(emailValue, passwordValue){
        this.data = {
            email:`${emailValue}`,
            password:`${passwordValue}`
        }
           
        return this.postData('login',this.data, this.config)
    }
}