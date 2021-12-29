import { BaseAxios } from "./baseAxios.js";

export class LoginAuth extends BaseAxios {
    constructor(baseUrl){
        super('https://ajax.test-danit.com/api/v2/cards/')

        this.config = {
            data: {
                email: 'rittnerodigwe@gmail.com',
                password: 'privatewd'
            },
            headers: {
                'Content-Type': 'application/json'
            },
        }
    }

    getToken(){
        
        return this.getData('login', this.config)
    }
}