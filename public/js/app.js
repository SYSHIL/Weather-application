console.log('Client side javascript file is loaded!')
// fetch is a browser based api


// Setup a call to fetch to fetch weather for boston


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weatherReport = document.querySelector('.weather-report')
weatherForm.addEventListener('submit',(e)=>{
        e.preventDefault() // prevents default behaviour which refreshes the browser
        const location = search.value
        if(location){
            fetch(`http://localhost:3000/weather?address=${location}`).then((res)=>{
                res.json().then((data)=>{
                    if(data.error){
                        console.log(data.error)
                        return
                    }
                    weatherReport.textContent=''
                    let br = document.createElement('br')
                    let textNode = document.createTextNode("Location : " + data.location)
                    weatherReport.appendChild(textNode)
                    weatherReport.appendChild(br);

                    br = document.createElement('br')
                    textNode = document.createTextNode("Temperature : " +data.temperature)
                    weatherReport.appendChild(textNode)
                    weatherReport.appendChild(br);

                    textNode = document.createTextNode("Description : " +data.description)
                    weatherReport.appendChild(textNode)

                
                })
            })
        }
        else{
            weatherReport.textContent=''
            let textNode = document.createTextNode("Please enter a valid location")
            weatherReport.appendChild(textNode)
        }
})











