const FORM= document.getElementById('formulario')

const CITA=[]

FORM.addEventListener('submit', e =>{
    e.preventDefault()
    captureDate()
    
})

const captureDate =()=>{
    let name= document.getElementById('nombre').value
    let date= document.getElementById('fecha').value
    let time= document.getElementById('hora').value
    let symptom= document.getElementById('sintomas').value

    let registrarCita ={
        id: Math.round(Math.random()*(100-1)+1),
        name,
        date,
        time,
        symptom
    }
    console.log(registrarCita)

    const KEY = JSON.parse(localStorage.getItem('Citas'))
    if(KEY !== null){
        KEY.unshift(registrarCita)
        localStorage.setItem('Citas', JSON.stringify(KEY))
    }
    else{
        CITA.unshift(registrarCita)
        localStorage.setItem('Citas', JSON.stringify(CITA))
    }
    getLocalStorage
}


let listarCitas = document.getElementById('listarCita')

const getLocalStorage =()=>{
    listarCitas.innerHTML=''
    let traerCitaLocalStorage = JSON.parse(localStorage.getItem('Citas'))
    traerCitaLocalStorage.map(cita =>{
        const { id, date, name, time, symptom}= cita

        listarCitas.innerHTML+=
        `<td>${name}</td>
        <td>${time}</td>
        <td>${date}</td>
        <td>${symptom}</td>
        <td><button id=${id} class= "btn btn-danger">Delete</button></td>
        `
    } )
}

/// Cargar DOM 

document.addEventListener('DOMContentLoaded', getLocalStorage)
if(localstorage.Citas !== null)
///Boton de Borrar
listarCitas.addEventListener('click', e=>{

    const btnDelete= e.target.classList.contains('btn-danger')

    const id= e.target.id

    const local= JSON.parse(localStorage.getItem('Citas'))

    const buscar = local.find(data=> data.id === Number(id))

    if(btnDelete){
        local.forEach((element, index)=>{
            if(element.id=== buscar.id ){
                local.splice(index,1)

                localStorage.setItem('Citas', JSON.stringify(local))
                getLocalStorage()

            }
        })
    }
});


//// Boton Buscar

let btnBuscar = document.getElementById('btnBuscar')
let buscarNombre= document.getElementById('busqueda')

btnBuscar.addEventListener('click', e =>{
    e.preventDefault();

    let input = document.getElementById('inputBuscar').value
    let data = JSON.parse(localStorage.getItem('Citas'))

    let filtro = data.filter(datos=> datos.name.toLowerCase().includes(input.toLowerCase))
    console.log(filtro)

    buscarNombre.innerHTML=''

    filtro.lenght === 0?
            buscarNombre.innerHTML+=`<div>El nombre ${input} no existe</div>`
    :
    filtro.map(cita =>{
        const {name, date, time, symptom}= cita

        buscarNombre.innerHTML+=`
        <div>
        <div> <h1>${name}</h1></div>
         <div>
         <h3>${date}</h3>
         <h3>${time}</h3>
         </div>
         <h3>${symptom}</h3>
         </div>
        `
    })
})

let btnLimpiar= document.querySelector('btnLimpiar')

btnLimpiar.addEventListener('click')
    formulario.reset;
    getLocalStorage()
