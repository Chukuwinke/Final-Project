//import { BaseAxios } from "../CustomAxios/baseAxios";
import { LoginAuth } from "../Login/loginAuth";
import { CardModal } from "../Modal/cardModal";
import { DeleteCards } from "./deleteCards";

export class Visit extends LoginAuth{
    constructor(data){
        super()
        const {Doctor, FirstName, LastName, Purpose, Description, Urgency, Status, id} = data
        this.firstName = FirstName
        this.lastName = LastName
        this.doctor = Doctor
        this.purpose = Purpose
        this.description = Description
        this.urgency = Urgency
        this.status = Status
        this.id = id
        this.token = this.getCookies('token')
        this.cardsSection = document.querySelector('.table-responsive')
        this.updateTriggered = false
    }
    // CLEANUP := data parameter NOT NEEDED
    defaultCardField() {
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
                    <h6>urgency: <span class="urgency-desc">${this.urgency}</span></h6>
                    <h6>status: <span class="status-desc">${this.status}</span></h6>
                </div>
                
                <div class="d-flex mt-2">
                    <a href="#" class="btn btn-outline-warning btn-sm" id='edit-btn${this.id}'>edit</a>
                    <a class="btn btn-outline-info btn-sm ms-auto" data-bs-toggle="collapse" href="#collapseExample${this.id}" role="button" aria-expanded="false" aria-controls="collapseExample">
                        show more
                    </a>
                </div>
            </div>
        </div>
        `
        this.cardsSection.appendChild(this.card)
        this.deleteCard()
        this.updateCard()
        
    }
    deleteCard(){
        this.deleteBtn = document.getElementById(`delete-btn${this.id}`)
        this.currentCard = document.getElementById(`card${this.id}`)
        
        this.config = {
            headers:{
	            'Authorization': `Bearer ${this.token}`
            }
        }
        this.url = `cards/${this.id}`
        
        this.deleteBtn.onclick = () =>{
            this.deleteData(this.url, this.config)
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
    updateCard(){
        this.updateBtn = document.getElementById(`edit-btn${this.id}`)
        this.currentCard = document.getElementById(`card${this.id}`)

        this.updateBtn.onclick = () => {
            this.updateTriggered = true
            console.log(this.currentCard)
            const updateModal = new CardModal(this.id, this.updateTriggered)
            updateModal.createCardModal()
        }
    }

}

