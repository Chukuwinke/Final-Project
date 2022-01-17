//import { BaseAxios } from "../CustomAxios/baseAxios";
import { LoginAuth } from "../Login/loginAuth";

export class DeleteCards extends LoginAuth {
    constructor(deletedId) {
        super();
        // this.token = 'ec4c2bc2-374f-463a-9c35-596fa537efc8';
        
        this.url = `cards/${deletedId}`
        
    }
    delete(){
        this.token = this.getCookies('token')
        console.log(this.token)
        this.config = {
            headers:{
	            'Authorization': `Bearer ${this.token}`

            }
        }
        return this.deleteData(this.url, this.config)
    }
}