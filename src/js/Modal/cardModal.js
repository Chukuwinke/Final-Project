
import { VisitCardiologist } from "../Cards/visitCardiologist";
import { VisitDentist } from "../Cards/visitDentist";
import { VisitTherapist } from "../Cards/visitTherapist";
import { BaseAxios } from "../CustomAxios/baseAxios";



const getCookie = (name) => {
  const cookiesArr = document.cookie.split(";")
  console.log(cookiesArr)

  for(let i = 0; i < cookiesArr.length; i++){
      const cookiePair = cookiesArr[i].split('=');

      if(name == cookiePair[0].trim()) {
          console.log(cookiePair[1])
          return cookiePair[1]
      }
  }
}

export class CardModal extends BaseAxios {
  constructor() {
    super('https://ajax.test-danit.com/api/v2/')
    this.token = getCookie('token')
    this.url = 'cards'
    this.config ={
        headers:{
            "Content-Type" : "application/json",
            'Authorization': `Bearer ${this.token}`
        }
    }
    this.body = document.querySelector("body");
    this.fieldContainer = document.createElement("div");
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
      console.log(this.statusText)
    }
    console.log(this.statusText)
    
    //logic to switch urgency
    this.urgency.onchange = () => {
      const [urgencyValue, urgencyText] = this.modalDropdown(this.urgency)
      this.urgencyText = urgencyText
      this.urgencyValue = urgencyValue  
      //console.log(this.urgencyText)
    }
    console.log(this.urgencyText)

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
      
        
      if (selectedValue == "1") {
        //console.log("cardio");
        this.cardiologistFields();
        const bloodPressure = document.getElementById('pressureInput1')
        const prevDiseases = document.getElementById('cardiovascularInput1')
        this.age = document.getElementById('ageInput1')
        this.saveBtn.onclick = () => {
          console.log(selectedText);
          this.data ={
            Doctor: `${selectedText}`,
            FirstName: `${this.firstName.value}`,
            LastName: `${this.lastName.value}`,
            Purpose: `${this.purposeOfVisit.value}`,
            Description: `${this.description.value}`,
            Urgency: `${this.urgencyText}`,
            Status: `${this.statusText}`,
            Pressure: `${bloodPressure.value}`,
            prevDiseases: `${prevDiseases.value}`,
            Age: `${this.age.value}`,
 
        }
        this.sendInput(this.data)
        };
        
      } else if (selectedValue == "2") {
        //console.log("dent");
        this.dentistFields();
        this.lastVisit = document.getElementById('last-visit')
        this.saveBtn.onclick = () => {
          console.log(selectedText);
          this.data ={
            Doctor: `${selectedText}`,
            FirstName: `${this.firstName.value}`,
            LastName: `${this.lastName.value}`,
            Purpose: `${this.purposeOfVisit.value}`,
            Description: `${this.description.value}`,
            Urgency: `${this.urgencyText}`,
            Status: `${this.statusText}`,
            prevVisit: `${this.lastVisit.value}`,
          }
          this.sendInput(this.data)
        };
      } else if (selectedValue == "3") {
        //console.log("thera");
        this.therapistFields();
        this.age = document.getElementById('ageInput1')
        this.saveBtn.onclick = () => {
          console.log(selectedText);
          this.data ={
            Doctor: `${selectedText}`,
            FirstName: `${this.firstName.value}`,
            LastName: `${this.lastName.value}`,
            Purpose: `${this.purposeOfVisit.value}`,
            Description: `${this.description.value}`,
            Urgency: `${this.urgencyText}`,
            Status: `${this.statusText}`,
            Age: `${this.age.value}`,
          }
          //console.log(this.data)
            this.sendInput(this.data, selectedValue)
            
        };
      } else {
        return;
      }
    };
  }
  // SEND INPUT TO BACKEND AND RENDER CARD TO DASHBOARD WITH RESPONSE
  sendInput(fieldsData, selected){
    const responseData = this.postData(this.url, fieldsData, this.config)
      responseData.then(response => {
          //console.log(response)
          if(response.status == 200){
            
              this.cardsContainer.removeChild(this.noCardsDisplay)
          
            const {data} = response
            if(selected = '1'){
              const visit = new VisitCardiologist(data)
              visit.render()
            }
            else if(selected = '2'){
              const visit = new VisitDentist(data)
              visit.render()
            }
            else if(selected = '3'){
              const visit = new VisitTherapist(data);
              visit.render()
            }
            

            // console.log(data)
            // return data
          }
      })
      this.body.removeChild(this.modal)
  }
}

