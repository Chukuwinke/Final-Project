import { BaseAxios } from "../CustomAxios/baseAxios"

export class AllCards extends BaseAxios{
    constructor(){
        super('https://ajax.test-danit.com/api/v2/')
        //CLEAN UP:= CURRENTLY TOKEN IS HARD CODED IT MUST BE PASSED INTO THE CONSTRUCTOR
        this.url = 'cards'
        //CLEAN UP:= CARDSECTION VARIABLE NO LONGER NECESSARY HERE
        this.cardsSection = document.querySelector('.table-responsive')
    }

    
    getCardsData(){
        this.token = this.getCookies('token')
        console.log(this.token)
        this.config = {
            headers:{
                'Content-Type': 'application/json',
	            'Authorization': `Bearer ${this.token}`
            }
        }
        return this.getData(this.url, this.config)
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
