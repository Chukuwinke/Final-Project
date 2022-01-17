import { AllCards } from "./Cards/allCard"
import { Login } from "./Login/login"
import { CardModal } from "./Modal/cardModal"
import { VisitCardiologist } from "./Cards/visitCardiologist"
import { VisitTherapist } from "./Cards/visitTherapist"
import { VisitDentist } from "./Cards/visitDentist"
import { LoginAuth } from "./Login/loginAuth"

export class DashBoard extends LoginAuth {
    constructor(){
        super()
        this.main = document.querySelector('.main')
        this.newUserKey = 'isLoggedIn'
    }
    addDashBoard(){
        this.dashboardContainer = document.createElement('div')
        this.dashboardContainer.className = 'dshboard-container'
        this.dashboardContainer.innerHTML =`
        <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <div class="navbar-brand col-md-3 col-lg-2 me-0 px-3">
        <img class="logo" src="images/content/infinityLogo.svg" alt="">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Appointment Tracker</a>
        </div>
            
          <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class=" w-100" aria-label="Search"></div>
          <div class="nav-item text-nowrap">
            <a class="nav-link px-3 create-visit-btn" href="#">Create Visit</a>
            </div>
          <div class="navbar-nav">
            <div class="nav-item text-nowrap">
            <a class="nav-link px-3 auth" href="#">Sign out</a>
            </div>
          </div>
          
        </header>
        <div class="container-fluid">
        <div class="row">
            <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div class="position-sticky pt-3">
            <input class="form-control form-control-dark w-100" id="search-input" type="text" placeholder="Search" aria-label="Search">
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>search by status</span>
                        <a class="link-secondary" href="#" aria-label="Add a new report">
                            <span data-feather="plus-circle"></span>
                        </a>
                        </h6>
                        <div>
                            <select class="status form-select" id="status" aria-label="Default select example">
                                <option value="1">All</option>
                                <option value="2">Open</option>
                                <option value="3">Closed</option>
                            </select>
                        </div>
                        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>Search by urgency</span>
                        <a class="link-secondary" href="#" aria-label="Add a new report">
                            <span data-feather="plus-circle"></span>
                        </a>
                        </h6>
                        <div>
                            <select class="form-select" id="urgency"aria-label="Default select example">
                                <option value="1">All</option>
                                <option value="2">Regular</option>
                                <option value="3">Priority</option>
                                <option value="3">Urgent</option>
                            </select>
                        </div>
            </div>
            </nav>
            <div class="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-sm-3">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center  pb-2 mb-3 border-bottom">
                <h1 class="h2">Dashboard</h1>
                
            </div>
            <ul class="table-responsive d-flex justify-content-start">
                
            </ul>
            </div>
        </div>
        </div>
        `
        this.main.appendChild(this.dashboardContainer)
        
        this.cardsContainer = document.querySelector('.table-responsive')
        this.createCardBtn = document.querySelector('.create-visit-btn')
        this.authBtn = document.querySelector('.auth')
        this.searchInput = document.getElementById('search-input')
        this.urgencyselect = document.getElementById('urgency')
        this.statusSelect = document.getElementById('status')
        
        // CREATE CARD BUTTON
        this.createCardBtn.onclick = () =>{
            const modal = new CardModal();
            modal.createCardModal()
            
        }
        // SIGN OUT BUTTON
        this.authBtn.onclick = () => {
            //this.cardsContainer.removeChild(this.noCardsDisplay)
            
            document.cookie = `isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
            document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
            //remember remove dashboard from main
            
            this.main.removeChild(this.dashboardContainer)
            this.authCheck()
            
        }
        this.searchInput.onkeyup = () =>{
            this.filterCard()
        }
        
        this.filterDropdown(this.urgencyselect, 'urgency-desc')
        this.filterDropdown(this.statusSelect, 'status-desc')
        
    }

    // CHECK IF IT IS A NEW USER
    authCheck(){ 
        this.loggedIn = this.getCookies(this.newUserKey)
        this.addDashBoard()
        this.cardsContainer.innerHTML= ''
        if(this.loggedIn == 'true'){
            const expiryDate = new Date()
            expiryDate.setMonth(expiryDate.getMonth() + 1)
            this.renderDashBoard()
            this.setCookie(this.newUserKey, true, expiryDate.toGMTString());

        }
        else if(!this.loggedIn){
            const login = new Login()
            //this.addDashBoard()
            
            this.authBtn.innerHTML = 'Sign in'
            //this.cardsContainer.innerHTML= ''

            // should display no cards if no user not logged in
            this.noCards()
            this.createCardBtn.style.display ='none'

            this.authBtn.onclick = () => {
                this.main.removeChild(this.dashboardContainer)
                login.start()
            }
            
        }
    }
    // RENDER ALL AVAILABLE CARDS TO DASHBOARD
    renderDashBoard(){
        
        const cardsDisplay = new AllCards()
        
        cardsDisplay.getCardsData().then(Response => {
            
            if(Response.length == 0){
                // should display no cards if there are no cards available
                this.noCards()
            }
            else{
                Response.forEach(element => {
                
                    if(element.Doctor == 'Cardiologist'){
                        const visitCard = new VisitCardiologist(element)
                        visitCard.render()
                    }
                    if(element.Doctor == 'Therapist'){
                        const visitCard = new VisitTherapist(element)
                        visitCard.render()
                    }
                    if(element.Doctor == 'Dentist'){
                        const visitCard = new VisitDentist(element)
                        visitCard.render()
                    }
                });
            }
            
        })
    }
    // FILTER CARDS
    filterCard(){
        this.cards = this.cardsContainer.getElementsByTagName('li')
        const filter = this.searchInput.value.toUpperCase();
        for (let i = 0; i < this.cards.length; i++) {
            const patient = this.cards[i].querySelector('.card-title span')
            const txtValue = patient.textContent || patient.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                this.cards[i].style.display = "";
            } else {
                this.cards[i].style.display = "none";
            }
        }
    }
    // FILTER CARDS DROPDOWN
    filterDropdown(selection, elementName ){
        
        //console.log(param)
        selection.onchange = () =>{
            const dropdownText = selection.options[selection.selectedIndex].innerHTML;
            console.log(dropdownText)

            this.cards = this.cardsContainer.getElementsByTagName('li')
            const filter = dropdownText.toUpperCase();
            if(dropdownText == 'All'){
                for (let i = 0; i < this.cards.length; i++) {
                    const scard = this.cards[i].querySelector(`.${elementName}`).closest("li")
                    console.log(scard)
                    scard.style.display = ""
                }
            }
            else{
                for (let i = 0; i < this.cards.length; i++) {
                    const searchedItem = this.cards[i].querySelector(`.${elementName}`)
                    const txtValue = searchedItem.textContent || searchedItem.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        this.cards[i].style.display = "";
                    } else {
                        this.cards[i].style.display = "none";
                    }
                }
            }
            
        }
       
    }
    // IF THERE ARE NO CARDS RENDER NO CARDS
    noCards(){
        this.noCardsDisplay = document.createElement('li')
        this.noCardsDisplay.className = 'nocard-container'
        this.noCardsDisplay.innerHTML = `
            <h4 class="nocard-text ">No Cards Available</h4>
        `
        this.cardsContainer.appendChild(this.noCardsDisplay)
    }
}