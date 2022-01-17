
import { VisitCardiologist } from "../Cards/visitCardiologist";
import { VisitDentist } from "../Cards/visitDentist";
import { VisitTherapist } from "../Cards/visitTherapist";
import { LoginAuth } from "../Login/loginAuth";


export class CardModal extends LoginAuth {
  constructor(id ='', updateTriggered = false) {
    super()
    this.url = '/cards'
    this.token = this.getCookies('token')
    this.config ={
        headers:{
            "Content-Type" : "application/json",
            'Authorization': `Bearer ${this.token}`
        }
    }
    this.id = id
    this.updateTriggered = updateTriggered
    this.body = document.querySelector("body");
    this.fieldContainer = document.createElement("div");
    this.errorModal = document.createElement('div')
  }
  // CREATE THE MODAL WITH DEFAULT FIELDS
  createCardModal() {
    
    this.modal = document.createElement("div");
    this.modal.innerHTML = `
        <div class="modal modal-sheet  d-block bg-secondary  py-5" tabindex="-1" role="dialog" id="modalSheet">
            <div class="modal-dialog" role="document">
                    <div class="modal-content rounded-6 shadow">
                    <div class="modal-header border-bottom-0 mb-3">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="btn-close" id="modal-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body py-0">
                    <label for="doctor-Input" class="form-label">Choose Doctor</label>
                    <select class="form-select form-select-sm mb-3" id="doctor-Input" aria-label="Default select example">
                        <option selected>none</option>
                        <option value="1">Cardiologist</option>
                        <option value="2">Dentist</option>
                        <option value="3">Therapist</option>
                    </select>
                    
                    <div class="input-group mb-3">
                      <div class="input-group-text w-100">Patient Given Names</div>
                      <input type="text" aria-label="First name" placeholder ="First Name" class="form-control first-name__input">
                      <input type="text" aria-label="Last name" placeholder ="Last Name" class="form-control last-name__input">
                    </div>
                    <div class="mb-3 ">
                        <label for="exampleFormControlInput1" class="form-label">purpose of the visit</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" >
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">description of the visit</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <label for="urgencyInput" class="form-label">Choose Urgency</label>
                    <select class="form-select form-select-sm mb-3" id="urgency-Input" name="urgencyInput" aria-label="Default select example">
                        <option selected value="1">Regular</option>
                        <option value="2">Priority</option>
                        <option value="3">Urgent</option>
                    </select>
                    <label for="statusInput" class="form-label">Choose Status</label>
                    <select class="form-select form-select-sm mb-3" id="status-Input" name="statusInput" aria-label="Default select example">
                        <option selected value="1">Open</option>
                        <option value="2">Closed</option>
                    </select>
                    <div class="special-field" ></div>
                </div>
                
                <div class="modal-footer flex-column border-top-0">
                    <button type="button" class="btn btn-lg btn-primary w-100 mx-0 mb-2" id="save-btn">Save changes</button>
                </div>
                    
                    </div>
            </div>
        </div>
      `;
    this.body.appendChild(this.modal);
    this.cardsContainer = document.querySelector('.table-responsive')
    this.saveBtn = document.getElementById("save-btn");
    this.selectedFieldContainer = document.querySelector(".special-field");
    this.description = document.getElementById('exampleFormControlTextarea1')
    this.purposeOfVisit = document.getElementById('exampleFormControlInput1')
    this.urgency = document.getElementById('urgency-Input')
    this.status = document.getElementById('status-Input')
    this.firstName = document.querySelector('.first-name__input')
    this.lastName = document.querySelector('.last-name__input')
    this.noCardsDisplay = document.querySelector('.nocard-container')

    const [statusValue, statusText] = this.modalDropdown(this.status)
    const [urgencyValue, urgencyText] = this.modalDropdown(this.urgency)
    
    this.urgencyText = urgencyText
    this.urgencyValue = urgencyValue
    this.statusValue = statusValue
    this.statusText = statusText


    //logic to switch status
    this.status.onchange = () => {
      const [statusValue, statusText] = this.modalDropdown(this.status)
      this.statusValue = statusValue
      this.statusText = statusText
    }
    
    //logic to switch urgency
    this.urgency.onchange = () => {
      const [urgencyValue, urgencyText] = this.modalDropdown(this.urgency)
      this.urgencyText = urgencyText
      this.urgencyValue = urgencyValue  
    }

    //Remove Modal
    this.modalCancel = document.getElementById('modal-close')
    this.modalCancel.onclick = () => {
      this.body.removeChild(this.modal)
      
    }

    

    this.switchFields();
  }

  modalDropdown(param){
      const dropdownValue = param.options[param.selectedIndex].value;
      const dropdownText = param.options[param.selectedIndex].innerHTML;
      return [dropdownValue, dropdownText]
  }
  // DENTIST FIELD
  dentistFields() {
    this.fieldContainer.innerHTML = `
            <h6>Date of last visit</h3>
            <div class="input-group date" id="datepicker">
            <input type="date" id="last-visit" class="form-control form-control-sm" name="lastVisit">
            </div>
        `;

    this.selectedFieldContainer.appendChild(this.fieldContainer);
  }

  // CARDIOLOGIST FIELD
  cardiologistFields() {
    this.fieldContainer.innerHTML = `
          <label for="pressureInput1" class="form-label">Normal Blood Pressure:</label>
          <input type="text" class="form-control mb-2" id="pressureInput1" >

          <label for="cardiovascularInput1" class="form-label">previous cardiovascular diseases:</label>
          <input type="text" class="form-control mb-2" id="cardiovascularInput1" >

          <label for="ageInput1" class="form-label">Age:</label>
          <input type="text" class="form-control" id="ageInput1" >
          
      `;
    this.selectedFieldContainer.appendChild(this.fieldContainer);
  }

  // THERAPIST FIELD
  therapistFields() {
    this.fieldContainer.innerHTML = `
      <label for="ageInput1" class="form-label">Age:</label>
      <input type="text" class="form-control" id="ageInput1" >
      `;
    this.selectedFieldContainer.appendChild(this.fieldContainer);
  }

  // LOGIC TO SWITCH FIELDS
  switchFields() {
    this.cardTypeModal = document.getElementById("doctor-Input");

    this.cardTypeModal.onchange = (e) => {
      // REMOVE FIELD IF ANY
      if (this.selectedFieldContainer.innerHTML != "") {
        this.selectedFieldContainer.removeChild(
          this.selectedFieldContainer.lastChild
        );
      }
      // GET THE CURRENT SELECTED VALUE
      const [selectedValue, selectedText] = this.modalDropdown(this.cardTypeModal)
      
      switch(selectedValue){
        case '1':
          this.cardiologistFields();
          this.bloodPressure = document.getElementById('pressureInput1')
          this.prevDiseases = document.getElementById('cardiovascularInput1')
          this.age = document.getElementById('ageInput1')
          break;
        case '2':
          this.dentistFields();
          this.lastVisit = document.getElementById('last-visit')
          break;
        case '3':
          this.therapistFields();
          this.age = document.getElementById('ageInput1')
          break;
        default:
          console.log('none')
      }
      this.saveBtn.onclick = () => {
        const fieldsData = this.dataFactory(selectedValue, selectedText)
        console.log(fieldsData)
        if(this.updateTriggered){
          fieldsData.id = this.id
          console.log(fieldsData)
          console.log('updating....')
          this.updateInput(fieldsData)
        }
        else{
          this.sendInput(fieldsData)
        }
        
      }
      
      
    };
  }
  // CREATE OBJECT TEMPLATE FROM MODAL INPUT
  dataFactory(selectedValue, selectedText){
      let specifcData;
      const defaultData = {
            Doctor: `${selectedText}`,
            FirstName: `${this.firstName.value}`,
            LastName: `${this.lastName.value}`,
            Purpose: `${this.purposeOfVisit.value}`,
            Description: `${this.description.value}`,
            Urgency: `${this.urgencyText}`,
            Status: `${this.statusText}`,
      }
      if(selectedValue == '1'){
        specifcData = {
            Pressure: `${this.bloodPressure.value}`,
            prevDiseases: `${this.prevDiseases.value}`,
            Age: `${this.age.value}`,
        }
      }
      else if(selectedValue == '2'){
        specifcData ={
            prevVisit: `${this.lastVisit.value}`,
        }
      }
      else if(selectedValue == '3'){
        specifcData = {
          Age: `${this.age.value}`,
        }
      }
      return {...defaultData, ...specifcData}
     
  }
  // SEND INPUT TO BACKEND AND RENDER CARD TO DASHBOARD WITH RESPONSE
  sendInput(fieldsData){
    const responseData = this.postData(this.url, fieldsData, this.config)
      responseData.then(response => {
          if(response && response.status == 200){
            if(this.noCardsDisplay){
              this.cardsContainer.removeChild(this.noCardsDisplay)
            }
            const {data} = response
            this.responseCard(data)
            this.body.removeChild(this.modal)
          }
          else{
            this.errorModal.classList.add('modal-error', 'alert', 'alert-danger', 'd-flex', 'align-items-center')
            this.errorModal.innerHTML = `
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
            <div>
              OOPS!! something went wrong
            </div>
            `
            this.modal.appendChild(this.errorModal)
          }
      })
      
  }
  
  responseCard(data){
    if(data.Doctor == 'Cardiologist'){
      const visit = new VisitCardiologist(data)
      visit.render()
    }
    else if(data.Doctor == 'Dentist'){
      const visit = new VisitDentist(data)
      visit.render()
    }
    else if(data.Doctor == 'Therapist'){
      const visit = new VisitTherapist(data);
      visit.render()
    }
  }
  updateInput(fieldsData){
    const updateUrl = `${this.url}/${this.id}`
    const outdatedCard = document.getElementById(`card${this.id}`)
    const responseData = this.updateData(updateUrl, fieldsData, this.config)
      responseData.then(response => {
          if(response && response.status == 200){
            if(this.noCardsDisplay){
              this.cardsContainer.removeChild(this.noCardsDisplay)
            }
            this.cardsContainer.removeChild(outdatedCard)
            const {data} = response
            this.responseCard(data)
            this.body.removeChild(this.modal)
          }
      })
  }
}
