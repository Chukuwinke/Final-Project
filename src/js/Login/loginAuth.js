import { BaseAxios } from "../CustomAxios/baseAxios.js";

export class LoginAuth extends BaseAxios {
    constructor(baseUrl){
        super('https://ajax.test-danit.com/api/v2/')
        this.config = {
            headers:{
                "Content-Type" : "application/json",
            }
        }
        
    }

    getToken(emailValue, passwordValue, url){
        this.data = {
            email:`${emailValue}`,
            password:`${passwordValue}`
        }
           
        return this.postData(url, this.data, this.config)
    }

    setCookie(name, param="", maxAge=""){
        const key = name
        const value = param
        const expireAfter = maxAge
  
        document.cookie = `${key}=${value};path=/;expires=${expireAfter};`;
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
}