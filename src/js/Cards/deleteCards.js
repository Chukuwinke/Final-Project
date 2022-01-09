import { BaseAxios } from "../CustomAxios/baseAxios";

export class DeleteCards extends BaseAxios {
    constructor(deletedId) {
        super('https://ajax.test-danit.com/api/v2/cards');
        // this.token = 'ec4c2bc2-374f-463a-9c35-596fa537efc8';
        
        this.url = deletedId
        
    }
    getCookies(name){
        const cookiesArr = document.cookie.split(";")
        
    
        for(let i = 0; i < cookiesArr.length; i++){
            const cookiePair = cookiesArr[i].split('=');
    
            if(name == cookiePair[0].trim()) {
                
                return cookiePair[1]
            }
        }
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