import { Visit } from "./visit";

export class VisitDentist extends Visit{
    constructor(data){
        super(data)
        const {prevVisit} = data
        this.previousVisit = prevVisit
    }
    dentistData(){
        this.therapistField = document.querySelector('.Data__box')
        this.patientData = document.createElement('div')
        this.patientData.innerHTML=`
            <h6>Blood Pressure:</h6> <span>${this.previousVisit}</span>
        `
        this.therapistField.appendChild(this.patientData)
    }
    render(){
        this.defaultCardField()
        this.dentistData()
    }
}






















/**
 * 
 * import { BaseVisit } from "./visit"
export class VisitDentist extends BaseVisit{
    constructor(){
        super()
        this.fieldContainer = document.createElement('div')
    }
    dentistFields(){
        this.fieldContainer.innerHTML = `
            <h6>Date of last visit</h3>
            <div class="input-group date" id="datepicker">
            <input type="date" id="last-visit" class="form-control form-control-sm" name="lastVisit">
            </div>
        `
        
        return this.fieldContainer

    }
   getInput(doctorType){
        this.description = document.getElementById('exampleFormControlTextarea1')
       this.purposeOfVisit = document.getElementById('exampleFormControlInput1')
       this.lastVisit = document.getElementById('last-visit')
       this.data ={
           Doctor: `${doctorType}`,
           Purpose: `${this.purposeOfVisit.value}`,
           Description: `${this.description.value}`,
           prevVisit: `${this.lastVisit.value}`,

       }
       this.sendInput(this.data)
   }
}
 */