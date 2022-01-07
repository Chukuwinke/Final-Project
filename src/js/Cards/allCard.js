import { BaseAxios } from "../CustomAxios/baseAxios"

export class AllCards extends BaseAxios{
    constructor(){
        super('https://ajax.test-danit.com/api/v2/')
        this.token = 'ec4c2bc2-374f-463a-9c35-596fa537efc8'
        this.config = {
            headers:{
                'Content-Type': 'application/json',
	            'Authorization': `Bearer ${this.token}`
            }
        }
        this.url = 'cards'
        this.cardsSection = document.querySelector('.table-responsive')
    }

    
    getCardsData(){
        return this.getData(this.url, this.config)
    }
}
