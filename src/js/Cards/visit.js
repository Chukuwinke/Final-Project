import { BaseAxios } from "../CustomAxios/baseAxios";
import { DeleteCards } from "./deleteCards";

export class Visit extends BaseAxios{
    constructor(data){
        super('https://ajax.test-danit.com/api/v2/cards/')
        const {Doctor, FirstName, LastName, Purpose, Description, Urgency, Status, id} = data
        this.firstName = FirstName
        this.lastName = LastName
        this.doctor = Doctor
        this.purpose = Purpose
        this.description = Description
        this.urgency = Urgency
        this.status = Status
        this.id = id
        
        this.cardsSection = document.querySelector('.table-responsive')
        
    }
    // CLEANUP := data parameter NOT NEEDED
    defaultCardField(data) {
        //this.cardContainer = document.createElement('ul')
        this.card = document.createElement('li')
        this.card.className = 'me-4'
        this.card.setAttribute('id', `card${this.id}`)
        this.card.innerHTML =`
        <div class="card" id=card style="width: 18rem;">
            <div class="card-body">
                <div class="d-flex justify-content-end w-100">
                    <button type="button" class="btn-close ms-auto" id="delete-btn${this.id}" aria-label="Close"></button>
                </div>
                <h6 class="card-title">Patient: <span> ${this.firstName} ${this.lastName} </span></h6>
                <h6 class="card-subtitle mb-2 text-muted">Doctor: ${this.doctor}</h6>
                <div class="collapse Data__box" id="collapseExample${this.id}">
                    <div>
                        <h6>purpose of the visit: </h6>
                        <p>${this.purpose}</p>
                    </div>
                    <div class="">
                        <h6>description of the visit: </h6>
                        <p>
                            ${this.description}
                        </p>
                    </div>
                    <h6>urgency: ${this.urgency}</h6>
                    <h6>status: ${this.status}</h6>
                </div>
                
                <div class="d-flex mt-2">
                    <a href="#" class="btn btn-outline-warning btn-sm" >edit</a>
                    <a class="btn btn-outline-info btn-sm ms-auto" data-bs-toggle="collapse" href="#collapseExample${this.id}" role="button" aria-expanded="false" aria-controls="collapseExample">
                        show more
                    </a>
                </div>
            </div>
        </div>
        `
        this.cardsSection.appendChild(this.card)
        this.deleteCard()
        
    }
    deleteCard(){
        this.deleteBtn = document.getElementById(`delete-btn${this.id}`)
        this.currentCard = document.getElementById(`card${this.id}`)
        
        this.config = {
            headers:{
	            'Authorization': `Bearer ${this.token}`
            }
        }
        this.url = `${this.id}`
        
        this.deleteBtn.onclick = () =>{
            const deleteLogic = new DeleteCards(this.url)
            deleteLogic.delete()
            .then(response => {
                if(response.status == 200){
                    this.cardsSection.removeChild(this.card)
                    const card = document.querySelector('.card')
                    if(!card){
                        this.noCardsDisplay = document.createElement('li')
                        this.noCardsDisplay.className = 'nocard-container'
                        this.noCardsDisplay.innerHTML = `
                            <h4 class="nocard-text">No Cards Available</h4>
                        `
                        this.cardsSection.appendChild(this.noCardsDisplay)
                    }
                }
                
            })

            
        }

    }
}

