import { Visit } from "./visit";


export class VisitCardiologist extends Visit{
    constructor(data){
        super(data)
        const {Pressure, prevDiseases, Age, id} = data
        this.pressure = Pressure
        this.previousDisease = prevDiseases
        this.age = Age
        this.id = id
    }
    cardiologistData(){
        this.therapistField = document.querySelector(`#card${this.id} .Data__box`)
        this.patientData = document.createElement('div')
        this.patientData.innerHTML=`
            <h6>Blood Pressure:</h6> <span>${this.pressure}</span>
            <h6>Previous Diseases:</h6> <span>${this.previousDisease}</span>
            <h6>Age:</h6> <span>${this.age}</span>
        `
        this.therapistField.appendChild(this.patientData)
    }
    render(){
        this.defaultCardField()
        this.cardiologistData()
    }
}

