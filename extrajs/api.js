const app = document.getElementById('test')

const logo = document.createElement('img')
logo.src = '../img/logo.jpg'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)

var request = new XMLHttpRequest()
request.open('GET', `https://ghibliapi.herokuapp.com/films`, true)
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.forEach((dossier) => {
      const card = document.createElement('div')
      card.setAttribute('class', 'card')

      const h1 = document.createElement('h1')
      h1.textContent = dossier.title

      const p = document.createElement('p')
      dossier.description = dossier.description.substring(0, 300)
      p.textContent = `${dossier.description}...`

      container.appendChild(card)
      card.appendChild(h1)
      card.appendChild(p)
    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `It ain't working`
    app.appendChild(errorMessage)
  }
}

request.send()