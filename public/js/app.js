
console.log('client side javascript file is laoded!')




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = "Loading"
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {

                messageOne.textContent = `Something went wrong`
                messageTwo.textContent = `There was an error: ${data.error}`


            } else {
                messageOne.textContent = `${data.searchLocation}`

                messageTwo.textContent = `Currently in ${data.forecast.location.name}, ${data.forecast.location.region} it's ${data.forecast.current.weather_descriptions[0]} the temperature is ${data.forecast.current.temperature} it feels like ${data.forecast.current.feelslike}.  Winds are out of the ${data.forecast.current.wind_dir} at ${data.forecast.current.wind_speed}`





            }
        })

    }
    )
})