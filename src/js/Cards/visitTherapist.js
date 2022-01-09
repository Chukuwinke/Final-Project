import { Visit } from "./visit";

export class VisitTherapist extends Visit{
    constructor(data){
        super(data)
        const {Age, id} = data
        this.age = Age
        this.id = id

    }
    therapistData(){
        this.therapistField = document.querySelector(`#card${this.id} .Data__box`)
        this.patientData = document.createElement('div')
        this.patientData.innerHTML=`<h6> Age:</h6> <span>${this.age}</span>`
        this.therapistField.appendChild(this.patientData)

    }
    render(){
        this.defaultCardField()
        this.therapistData()

    }
}
