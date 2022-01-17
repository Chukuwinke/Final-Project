//import { BaseAxios } from "../CustomAxios/baseAxios"
import { LoginAuth } from "../Login/loginAuth"

export class AllCards extends LoginAuth{
    constructor(){
        super()
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
    
}
