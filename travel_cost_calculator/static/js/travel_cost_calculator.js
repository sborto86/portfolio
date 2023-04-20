// defining general parameters
var apiURL = 'https://api.travelcostcalculator.com/'
var numHotels = 5
// var pluginURL = pluginURL
var tccStyleLoaded = false
// responsive HTML
window.addEventListener('resize', responsiveHTML)
function responsiveHTML () {
  var details = document.querySelectorAll('.result-summary-body .int-link a')
  if (window.matchMedia('(max-width: 767.98px)').matches) {
    for (var i in details) {
      details[i].innerHTML = '<img src="' + pluginURL + 'img/details.png" alt="details" height="15" width="15">'
    }
  } else {
    for (i in details) {
      details[i].innerHTML = 'Check details'
    }
  }
}
function responsiveDetails (element) {
  if (window.matchMedia('(max-width: 767.98px)').matches) {
    element.innerHTML = ''
    var image = document.createElement('img')
    image.setAttribute('src', pluginURL + 'img/details.png')
    image.setAttribute('alt', 'details')
    image.setAttribute('height', '15')
    image.setAttribute('width', '15')
    element.appendChild(image)
  }
}
// generate HTMl functions
function resultsHTML () {
  var resultsElements = {
    0: {
      name: 'Accommodation',
      code: 'accommodation',
      id: 'result-accommodation'
    },
    1: {
      name: 'Transportation',
      code: 'transport',
      id: 'result-transport'
    },
    3: {
      name: 'Food & Drink',
      code: 'food',
      id: 'result-food'
    }
  }
  var resultsOptional = {
    0: {
      name: 'Travel Insurance',
      code: 'insurance',
      id: 'result-insurance'
    },
    1: {
      name: 'VPN for China',
      code: 'vpn',
      id: 'result-vpn'
    }
  }
  var input = getFormData()
  var element
  var span
  var heading
  var subheading
  var link
  var wrapper
  var body
  // summary results
  document.getElementById('summary-section').innerHTML = ''
  heading = document.createElement('h2')
  heading.innerHTML = 'Results Summary'
  document.getElementById('summary-section').appendChild(heading)
  wrapper = document.createElement('div') // visions
  wrapper.setAttribute('class', 'summary-section-wrapper') // visions
  body = document.createElement('div') // visions
  body.setAttribute('class', 'result-summary-body') // visions
  wrapper.appendChild(body)
  document.getElementById('summary-section').appendChild(wrapper)
  for (var i in resultsElements) {
    element = document.createElement('div')
    heading = document.createElement('div')
    subheading = document.createElement('div')
    element.id = resultsElements[i].code + '-summary'
    element.setAttribute('class', 'summary-section')
    heading.setAttribute('class', 'summary-heading')
    subheading.setAttribute('class', 'title')
    subheading.innerHTML = resultsElements[i].name
    heading.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'total-amount')
    subheading.id = resultsElements[i].code + '-amount'
    subheading.innerHTML = 0.00
    heading.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'currency')
    subheading.innerHTML = input.currency
    heading.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'int-link')
    link = document.createElement('a')
    link.setAttribute('href', '#' + resultsElements[i].id)
    link.innerHTML = 'Check details'
    responsiveDetails(link)
    subheading.appendChild(link)
    heading.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'book-link')
    heading.appendChild(subheading)
    element.appendChild(heading)
    body.appendChild(element) // ** body
  }
  for (var k in resultsOptional) {
    element = document.createElement('div')
    heading = document.createElement('div')
    subheading = document.createElement('div')
    element.id = resultsOptional[k].code + '-summary'
    element.setAttribute('class', 'summary-section')
    element.hidden = true
    heading.setAttribute('class', 'summary-heading')
    subheading.setAttribute('class', 'title')
    subheading.innerHTML = resultsOptional[k].name
    heading.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'total-amount')
    subheading.id = resultsOptional[k].code + '-amount'
    heading.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'currency')
    subheading.innerHTML = input.currency
    heading.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'int-link')
    link = document.createElement('a')
    link.setAttribute('href', '#' + resultsOptional[k].id)
    link.innerHTML = 'Check details'
    responsiveDetails(link)
    subheading.appendChild(link)
    heading.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'book-link')
    heading.appendChild(subheading)
    element.appendChild(heading)
    body.appendChild(element) // ** body
  }
  element = document.createElement('div')
  element.id = 'total-summary'
  element.setAttribute('class', 'summary-section')
  heading = document.createElement('div')// visions
  heading.setAttribute('class', 'summry_total_inner')// visions
  subheading = document.createElement('span')
  subheading.setAttribute('class', 'total-cost')
  subheading.id = 'total-amount'
  heading.appendChild(subheading)// ***
  subheading = document.createElement('span')
  subheading.setAttribute('class', 'currency')
  subheading.innerHTML = input.currency
  heading.appendChild(subheading)// ***
  subheading = document.createElement('div')
  subheading.setAttribute('class', 'summary-description')
  subheading.innerHTML = 'Estimated travel cost excluding international flight'
  element.appendChild(subheading)
  heading.appendChild(subheading)// visions
  element.appendChild(heading)// visions
  subheading = document.createElement('div')
  subheading.setAttribute('class', 'button-div')
  var button = document.createElement('button')
  button.setAttribute('class', 'summary-button')
  button.id = 'results-button'
  button.innerHTML = 'Send the results to my email address'
  subheading.appendChild(button)
  button = document.createElement('button')
  button.setAttribute('class', 'summary-button')
  button.id = 'quote-button'
  button.innerHTML = 'Get a free tour quotation'
  subheading.appendChild(button)
  element.appendChild(subheading)
  wrapper.appendChild(element)
  // detailed results
  document.getElementById('results-section').innerHTML = ''
  for (i in resultsElements) {
    element = document.createElement('div')
    heading = document.createElement('div')
    span = document.createElement('span')
    element.id = resultsElements[i].id
    element.setAttribute('class', 'result-section')
    heading.setAttribute('class', 'heading')
    span.setAttribute('class', 'title')
    span.innerHTML = resultsElements[i].name
    heading.appendChild(span)
    span = document.createElement('span')
    span.setAttribute('class', 'total-amount')
    span.innerHTML = 0.00
    heading.appendChild(span)
    span = document.createElement('span')
    span.setAttribute('class', 'currency')
    span.innerHTML = input.currency
    heading.appendChild(span)
    element.appendChild(heading)
    document.getElementById('results-section').appendChild(element)
  }
  for (k in resultsOptional) {
    element = document.createElement('div')
    heading = document.createElement('div')
    span = document.createElement('span')
    element.id = resultsOptional[k].id
    element.setAttribute('class', 'result-section')
    element.hidden = true
    heading.setAttribute('class', 'heading')
    span.setAttribute('class', 'title')
    span.innerHTML = resultsOptional[k].name
    heading.appendChild(span)
    span = document.createElement('span')
    span.setAttribute('class', 'total-amount')
    heading.appendChild(span)
    span = document.createElement('span')
    span.setAttribute('class', 'currency')
    heading.appendChild(span)
    element.appendChild(heading)
    document.getElementById('results-section').appendChild(element)
  }
  element = document.createElement('div')
  span = document.createElement('span')
  element.id = 'result-total'
  element.setAttribute('class', 'result-section')
  span.setAttribute('class', 'title')
  span.innerHTML = 'Total Trip Cost'
  element.appendChild(span)
  span = document.createElement('span')
  span.setAttribute('class', 'total-cost')
  element.appendChild(span)
  span = document.createElement('span')
  span.setAttribute('class', 'currency')
  span.innerHTML = input.currency
  element.appendChild(span)
  document.getElementById('results-section').appendChild(element)
  /* Add button at the end */
  var endButton = document.getElementById('total-summary').getElementsByClassName('button-div')[0].cloneNode(true)
  endButton.getElementsByTagName('button')[0].id = 'final-button'
  endButton.removeChild(endButton.querySelector('#quote-button'))
  document.getElementById('results-section').appendChild(endButton)
  document.getElementById('final-button').addEventListener('click', () => {
    document.getElementById('results-element').style.display = 'block'
  })
  // Popup HTMl
  element = document.createElement('div')
  element.id = 'quote-element'
  element.setAttribute('class', 'tcc-popup')
  var box = document.createElement('div')
  box.setAttribute('class', 'popup-dialog')// ***
  var popupBox = document.createElement('div')// visions
  popupBox.setAttribute('class', 'popup-box')// visions
  box.appendChild(popupBox)// visions
  span = document.createElement('span')
  span.setAttribute('class', 'tcc-close')
  span.innerHTML = '&times;'
  popupBox.appendChild(span)// ***
  heading = document.createElement('h3')
  heading.innerHTML = 'Get a tour quote for your itinerary'
  popupBox.appendChild(heading)// ***
  var label = document.createElement('label')
  label.setAttribute('for', 'quote-name')
  label.innerHTML = 'Name'
  popupBox.appendChild(label)// ***
  var inp = document.createElement('input')
  inp.id = 'quote-name'
  inp.setAttribute('type', 'text')
  inp.setAttribute('placeholder', 'Enter Name')// visions
  inp.setAttribute('maxlength', 75)
  inp.required = true
  popupBox.appendChild(inp)// ***
  label = document.createElement('label')
  label.setAttribute('for', 'quote-email')
  label.innerHTML = 'Email'
  popupBox.appendChild(label)// ***
  inp = document.createElement('input')
  inp.id = 'quote-email'
  inp.setAttribute('type', 'email')
  inp.setAttribute('placeholder', 'Enter Email') // visions
  inp.required = true
  popupBox.appendChild(inp) // ***
  button = document.createElement('button')
  button.setAttribute('class', 'tcc-button')
  button.id = 'tour-quote'
  button.innerHTML = 'Get your quote now'
  button.addEventListener('click', tourQuote)
  popupBox.appendChild(button) // ***
  var message = document.createElement('div')
  message.id = 'quote-message'
  message.setAttribute('class', 'tcc-message')
  popupBox.appendChild(message) // ***
  element.appendChild(box)
  document.getElementById('results-section').after(element)
  popup('quote')
  element = document.createElement('div')
  element.id = 'results-element'
  element.setAttribute('class', 'tcc-popup')
  box = document.createElement('div')
  box.setAttribute('class', 'popup-dialog') // ***
  popupBox = document.createElement('div') // visions
  popupBox.setAttribute('class', 'popup-box')// visions
  box.appendChild(popupBox) // visions
  span = document.createElement('span')
  span.setAttribute('class', 'tcc-close')
  span.innerHTML = '&times;'
  popupBox.appendChild(span) // ***
  heading = document.createElement('h3')
  heading.innerHTML = 'Send the results to your inbox'
  popupBox.appendChild(heading) // ***
  label = document.createElement('label')
  label.setAttribute('for', 'results-email')
  label.innerHTML = 'Email address'
  popupBox.appendChild(label) // ***
  inp = document.createElement('input')
  inp.id = 'results-email'
  inp.required = true
  inp.setAttribute('type', 'email')
  popupBox.appendChild(inp) // ***
  button = document.createElement('button')
  button.setAttribute('class', 'tcc-button')
  button.id = 'send-results'
  button.addEventListener('click', sendResults)
  button.innerHTML = 'Send your results now'
  popupBox.appendChild(button) // ***
  message = document.createElement('div')
  message.id = 'results-message'
  message.setAttribute('class', 'tcc-message')
  popupBox.appendChild(message) // ***
  element.appendChild(box)
  document.getElementById('results-section').after(element)
  popup('results')
}
function totalCost () {
  var parent = document.getElementById('results-section')
  var child = parent.querySelectorAll('.total-amount')
  var total = 0.00
  for (var i in child) {
    var value = child[i].innerHTML
    value = Number(value)
    if (value > 0) {
      total += value
    }
  }
  document.getElementById('result-total').querySelector('.total-cost').innerHTML = total.toFixed(2)
  document.getElementById('total-amount').innerHTML = total.toFixed(2)
}
function resultsListeners (type) {
  var section = document.getElementById(type)
  if (type === 'result-food') {
    var countries = section.querySelectorAll('span.amount')
    var totalFood = 0
    document.getElementById(type).addEventListener('change', function (e) {
      var total = Number(e.target.value).toFixed(2)
      var el = e.target.parentElement
      while (el.className !== 'country-results') {
        el = el.parentElement
      }
      el.querySelector('span.amount').innerHTML = total
      document.getElementById(el.id.replace('results', 'amount')).innerHTML = total
      totalFood = 0
      for (var f = 0; f < countries.length; f++) {
        totalFood = totalFood + Number(countries[f].innerHTML)
      }
      totalFood = totalFood.toFixed(2)
      section.querySelector('.total-amount').innerHTML = totalFood
      document.getElementById('food-amount').innerHTML = totalFood
      totalCost()
      // add active product class
      var tr = e.target.parentElement.parentElement
      var active = tr.parentElement.querySelector('.active_product')
      if (active !== null) {
        active.classList.remove('active_product')
      }
      tr.classList.add('active_product')
    })
    for (var f = 0; f < countries.length; f++) {
      totalFood = totalFood + Number(countries[f].innerHTML)
    }
    totalFood = totalFood.toFixed(2)
    section.querySelector('.total-amount').innerHTML = totalFood
    document.getElementById('food-amount').innerHTML = totalFood
  }
  if (type === 'result-transport') {
    var trips = section.querySelectorAll('span.amount')
    var totalTransport = 0
    document.getElementById(type).addEventListener('change', function (e) {
      var total = Number(e.target.value).toFixed(2)
      var el = e.target.parentElement
      while (el.className !== 'itinerary-results') {
        el = el.parentElement
      }
      el.querySelector('span.amount').innerHTML = total
      document.getElementById(el.id.replace('results', 'amount')).innerHTML = total
      totalTransport = 0
      for (var w = 0; w < trips.length; w++) {
        totalTransport = totalTransport + Number(trips[w].innerHTML)
      }
      totalTransport = totalTransport.toFixed(2)
      section.querySelector('.total-amount').innerHTML = totalTransport
      document.getElementById('transport-amount').innerHTML = totalTransport
      totalCost()
      // add active product class
      var tr = e.target.parentElement.parentElement
      var active = tr.parentElement.querySelector('.active_product')
      if (active !== null) {
        active.classList.remove('active_product')
      }
      tr.classList.add('active_product')
    })
    for (var w = 0; w < trips.length; w++) {
      totalTransport = totalTransport + Number(trips[w].innerHTML)
    }
    totalTransport = totalTransport.toFixed(2)
    section.querySelector('.total-amount').innerHTML = totalTransport
    document.getElementById('transport-amount').innerHTML = totalTransport
  }
  if (type === 'result-accommodation') {
    var totalAcco = 0
    var cities = section.querySelectorAll('span.amount')
    document.getElementById(type).addEventListener('change', function (e) {
      var total = Number(e.target.value).toFixed(2)
      var el = e.target.parentElement
      while (el.className !== 'city-results') {
        el = el.parentElement
      }
      el.querySelector('span.amount').innerHTML = total
      document.getElementById(el.id.replace('results', 'amount')).innerHTML = total
      totalAcco = 0
      for (var z = 0; z < cities.length; z++) {
        totalAcco = totalAcco + Number(cities[z].innerHTML)
      }
      totalAcco = totalAcco.toFixed(2)
      section.querySelector('.total-amount').innerHTML = totalAcco
      document.getElementById('accommodation-amount').innerHTML = totalAcco
      totalCost()
      // add active product class
      var tr = e.target.parentElement.parentElement
      var active = tr.parentElement.querySelector('.active_product')
      if (active !== null) {
        active.classList.remove('active_product')
      }
      tr.classList.add('active_product')
    })
    for (var z = 0; z < cities.length; z++) {
      totalAcco = totalAcco + Number(cities[z].innerHTML)
    }
    totalAcco = totalAcco.toFixed(2)
    section.querySelector('.total-amount').innerHTML = totalAcco
    document.getElementById('accommodation-amount').innerHTML = totalAcco
  }
  if (type === 'result-insurance') {
    var quotes = section.querySelectorAll('span.amount')
    var totalQuotes = 0
    document.getElementById(type).addEventListener('change', function (e) {
      var total = Number(e.target.value).toFixed(2)
      var el = e.target.parentElement
      while (el.className !== 'quote-results') {
        el = el.parentElement
      }
      el.querySelector('span.amount').innerHTML = total
      document.getElementById(el.id.replace('results', 'amount')).innerHTML = total
      totalTransport = 0
      for (var w = 0; w < quotes.length; w++) {
        totalQuotes = totalQuotes + Number(quotes[w].innerHTML)
      }
      totalQuotes = totalQuotes.toFixed(2)
      section.querySelector('.total-amount').innerHTML = totalQuotes
      document.getElementById('insurance-amount').innerHTML = totalQuotes
      totalCost()
      // add active product class
      var tr = e.target.parentElement.parentElement
      var active = tr.parentElement.querySelector('.active_product')
      if (active !== null) {
        active.classList.remove('active_product')
      }
      tr.classList.add('active_product')
    })
    for (w = 0; w < quotes.length; w++) {
      totalQuotes = totalQuotes + Number(quotes[w].innerHTML)
    }
    totalQuotes = totalQuotes.toFixed(2)
    section.querySelector('.total-amount').innerHTML = totalQuotes
    document.getElementById('insurance-amount').innerHTML = totalQuotes
  }
  if (type === 'result-vpn') {
    document.getElementById(type).addEventListener('change', function (e) {
      var total = Number(e.target.value).toFixed(2)
      section.querySelector('.total-amount').innerHTML = total
      document.getElementById('vpn-amount').innerHTML = total
      totalCost()
      // add active product class
      var tr = e.target.parentElement.parentElement
      var active = tr.parentElement.querySelector('.active_product')
      if (active !== null) {
        active.classList.remove('active_product')
      }
      tr.classList.add('active_product')
    })
    section.querySelector('.total-amount').innerHTML = section.querySelector('input').value
    document.getElementById('vpn-amount').innerHTML = section.querySelector('input').value
  }
}
function resultsValues (response, type) {
  var section = document.getElementById(type)
  if (section.querySelector('.result-data')) {
    var element = section.querySelector('.result-data')
  } else {
    element = document.createElement('div')
    element.setAttribute('class', 'result-data')
  }
  if (type === 'result-food') {
    var text = {
      cheap: '3 meals at cheap local restaurants and a big bottle of water',
      fastfood: '3 meals at fast-food restaurants and a big bottle of water',
      local: '3 meals at mid-range local restaurants and a big bottle of water',
      expat: '3 meals at western mid-range restaurants and a big bottle of water'
    }
    function foodCost (amount, days = 1) {
      var foodCost = ((amount * 2.5) + response.results.water) * days
      return foodCost.toFixed(2)
    }
    var summary = document.getElementById('food-summary')
    var food = document.createElement('div')
    food.setAttribute('class', 'country-summary')
    var subheading = document.createElement('div')
    subheading.setAttribute('class', 'title')
    subheading.innerHTML = response.country
    food.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'amount')
    subheading.id = 'food-' + response.country.toLowerCase() + '-amount'
    subheading.setAttribute('value', foodCost(response.results.cheap, response.totalDays) * response.foodRate)
    subheading.innerHTML = foodCost(response.results.cheap, response.totalDays) * response.foodRate
    food.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'currency')
    subheading.innerHTML = response.currency
    food.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'int-link')
    var link = document.createElement('a')
    link.setAttribute('href', '#' + 'food-' + response.country.toLowerCase() + '-results')
    link.innerHTML = 'Check details'
    responsiveDetails(link)
    subheading.appendChild(link)
    food.appendChild(subheading)
    document.getElementById('food-summary').appendChild(food)
    // detailed results
    food = document.createElement('div')
    food.setAttribute('class', 'country-results')
    food.id = 'food-' + response.country.toLowerCase() + '-results'
    var heading = document.createElement('div')
    heading.setAttribute('class', 'heading')
    var span = document.createElement('span')
    span.setAttribute('class', 'title')
    span.innerHTML = response.country
    heading.appendChild(span)
    span = document.createElement('span')
    span.setAttribute('class', 'amount')
    span.setAttribute('value', foodCost(response.results.cheap, response.totalDays) * response.foodRate)
    span.innerHTML = foodCost(response.results.cheap, response.totalDays) * response.foodRate
    heading.appendChild(span)
    span = document.createElement('span')
    span.setAttribute('class', 'currency')
    span.setAttribute('value', response.currency)
    span.innerHTML = response.currency
    heading.appendChild(span)
    food.appendChild(heading)
    var div = document.createElement('div')
    var table = document.createElement('table')
    for (var f in response.results) {
      if (f !== 'water') {
        var list = response.results[f]
        var tr = document.createElement('tr')
        tr.setAttribute('class', 'food')
        var td = document.createElement('td')
        // radio td
        td.setAttribute('class', 'radio')
        var radio = document.createElement('input')
        radio.setAttribute('type', 'radio')
        radio.setAttribute('name', response.country + '-food')
        radio.setAttribute('value', foodCost(list, response.totalDays) * response.foodRate)
        radio.id = response.country + '-food' + f
        var label = document.createElement('label')
        label.setAttribute('for', response.country + '-food' + f)
        td.appendChild(radio)
        td.appendChild(label)
        tr.appendChild(td)
        // Food text td
        td = document.createElement('td')
        td.setAttribute('class', 'food-drink')
        td.innerHTML = text[f]
        tr.appendChild(td)
        // Cost td
        td = document.createElement('td')
        td.setAttribute('class', 'cost')
        td.innerHTML = foodCost(list) + ' ' + response.currency + '/ person / day'
        tr.appendChild(td)
        table.appendChild(tr)
      }
    }
    div.appendChild(table)
    food.appendChild(div)
    element.appendChild(food)
  }
  if (type === 'result-transport') {
    // summary results
    var city = document.createElement('div')
    city.setAttribute('class', 'itinerary-summary')
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'title')
    subheading.innerHTML = response.origin + ' \u279C ' + response.destination
    city.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'amount')
    subheading.id = response.origin.toLowerCase() + '-' + response.destination.toLowerCase() + '-amount'
    subheading.setAttribute('value', response.amount.toFixed(2))
    subheading.innerHTML = response.amount.toFixed(2)
    city.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'currency')
    subheading.innerHTML = response.currency
    city.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'int-link')
    link = document.createElement('a')
    link.setAttribute('href', '#' + response.origin.toLowerCase() + '-' + response.destination.toLowerCase() + '-results')
    link.innerHTML = 'Check details'
    responsiveDetails(link)
    subheading.appendChild(link)
    city.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'book-link')
    link = document.createElement('a')
    link.setAttribute('href', response.url)
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'nofollow noopener nofollow')
    link.innerHTML = 'Book Now'
    subheading.appendChild(link)
    city.appendChild(subheading)
    document.getElementById('transport-summary').appendChild(city)
    // detailed results
    city = document.createElement('div')
    city.setAttribute('class', 'itinerary-results')
    city.id = response.origin.toLowerCase() + '-' + response.destination.toLowerCase() + '-results'
    heading = document.createElement('div')
    heading.setAttribute('class', 'heading')
    span = document.createElement('span')
    span.setAttribute('class', 'title')
    span.innerHTML = response.origin + ' \u279C ' + response.destination
    heading.appendChild(span)
    link = document.createElement('a')
    link.setAttribute('class', 'heading-link')
    link.setAttribute('href', response.url)
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'nofollow noopener nofollow')
    link.innerHTML = 'Book your trip now'
    heading.appendChild(link)
    span = document.createElement('span')
    span.setAttribute('class', 'amount')
    span.setAttribute('value', response.amount.toFixed(2))
    span.innerHTML = response.amount.toFixed(2)
    heading.appendChild(span)
    span = document.createElement('span')
    span.setAttribute('class', 'currency')
    span.setAttribute('value', response.currency)
    span.innerHTML = response.currency
    heading.appendChild(span)
    city.appendChild(heading)
    div = document.createElement('div')
    table = document.createElement('table')
    for (var trans in response.results) {
      list = response.results[trans]
      tr = document.createElement('tr')
      tr.setAttribute('class', 'transport')
      td = document.createElement('td')
      // radio td
      td.setAttribute('class', 'radio')
      radio = document.createElement('input')
      radio.setAttribute('type', 'radio')
      radio.setAttribute('name', (response.origin.toLowerCase() + '-' + response.destination.toLowerCase()))
      radio.setAttribute('value', (list.average * list.travelNum).toFixed(2))
      radio.id = 'trans-radio-' + response.origin.toLowerCase() + '-' + response.destination.toLowerCase() + trans
      label = document.createElement('label')
      label.setAttribute('for', 'trans-radio-' + response.origin.toLowerCase() + '-' + response.destination.toLowerCase() + trans)
      td.appendChild(radio)
      td.appendChild(label)
      tr.appendChild(td)
      // Service td
      td = document.createElement('td')
      td.setAttribute('class', 'service')
      var image = document.createElement('img')
      var imageURL = pluginURL + 'img/' + list.serviceLogo
      image.setAttribute('src', imageURL)
      image.setAttribute('alt', list.service + '-' + list.transport)
      image.setAttribute('height', '30')
      image.setAttribute('width', '30')
      td.appendChild(image)
      td.innerHTML += '<span>' + list.service + '</span>'
      tr.appendChild(td)
      // Transport td
      td = document.createElement('td')
      td.setAttribute('class', 'transport-type')
      image = document.createElement('img')
      imageURL = pluginURL + 'img/' + list.transportLogo
      image.setAttribute('src', imageURL)
      image.setAttribute('alt', list.transport)
      image.setAttribute('height', '50px')
      image.setAttribute('width', '50px')
      td.appendChild(image)
      tr.appendChild(td)
      // duration td
      td = document.createElement('td')
      td.setAttribute('class', 'duration')
      var dh = parseInt(list.duration / 60)
      var dmin = parseInt(list.duration - (dh * 60))
      td.innerHTML = `Average duration: ${dh}h:${dmin}min`
      tr.appendChild(td)
      // seats td
      td = document.createElement('td')
      td.setAttribute('class', 'prices')
      span = document.createElement('span')
      span.setAttribute('class', 'average-price')
      span.innerHTML = 'Average price: ' + (list.average * list.travelNum).toFixed(2) + ' ' + list.currency
      td.appendChild(span)
      span = document.createElement('span')
      span.setAttribute('class', 'min-price')
      span.innerHTML = '(minimum price: ' + (list.min * list.travelNum).toFixed(2) + ' ' + list.currency + ')'
      td.appendChild(span)
      tr.appendChild(td)
      // book button
      td = document.createElement('td')
      td.setAttribute('class', 'book-link')
      link = document.createElement('a')
      link.setAttribute('href', list.url)
      link.setAttribute('target', '_blank')
      link.setAttribute('rel', 'nofollow noopener nofollow')
      link.innerHTML = 'Book Now'
      td.appendChild(link)
      tr.appendChild(td)
      table.appendChild(tr)
    }
    div.appendChild(table)
    link = document.createElement('a')
    link.setAttribute('class', 'final-link')
    link.setAttribute('href', response.url)
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'nofollow noopener nofollow')
    link.innerHTML = 'See all transportation available'
    div.appendChild(link)
    city.appendChild(div)
    element.appendChild(city)
  }
  if (type === 'result-accommodation') {
    // summary results
    city = document.createElement('div')
    city.setAttribute('class', 'city-summary')
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'title')
    subheading.innerHTML = response.city
    city.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'amount')
    subheading.id = response.city.toLowerCase() + '-amount'
    subheading.innerHTML = (response.average * response.days * response.rooms).toFixed(2)
    city.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'currency')
    subheading.innerHTML = response.currency
    city.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'int-link')
    link = document.createElement('a')
    link.setAttribute('href', '#' + response.city.toLowerCase() + '-results')
    link.innerHTML = 'Check details'
    responsiveDetails(link)
    subheading.appendChild(link)
    city.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'book-link')
    link = document.createElement('a')
    link.setAttribute('href', response.url)
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'nofollow noopener nofollow')
    link.innerHTML = 'Book Now'
    subheading.appendChild(link)
    city.appendChild(subheading)
    document.getElementById('accommodation-summary').appendChild(city)
    // detailed results
    city = document.createElement('div')
    city.setAttribute('class', 'city-results')
    city.id = response.city.toLowerCase() + '-results'
    heading = document.createElement('div')
    heading.setAttribute('class', 'heading')
    span = document.createElement('span')
    span.setAttribute('class', 'title')
    span.innerHTML = response.city
    heading.appendChild(span)
    link = document.createElement('a')
    link.setAttribute('class', 'heading-link')
    link.setAttribute('href', response.url)
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'nofollow noopener nofollow')
    link.innerHTML = `Book your hotel in ${response.city} now`
    heading.appendChild(link)
    span = document.createElement('span')
    span.setAttribute('class', 'amount')
    span.setAttribute('data-average', (response.average * response.rooms))
    span.setAttribute('data-days', response.days)
    span.innerHTML = (response.average * response.days * response.rooms).toFixed(2)
    heading.appendChild(span)
    span = document.createElement('span')
    span.setAttribute('class', 'currency')
    span.setAttribute('value', response.currency)
    span.innerHTML = response.currency
    heading.appendChild(span)
    city.appendChild(heading)
    div = document.createElement('div')
    table = document.createElement('table')
    for (var hotel = 0; (hotel < numHotels && hotel < response.results.length); hotel++) {
      list = response.results[hotel]
      tr = document.createElement('tr')
      tr.setAttribute('class', 'hotel')
      td = document.createElement('td')
      // radio td
      td.setAttribute('class', 'radio')
      radio = document.createElement('input')
      radio.setAttribute('type', 'radio')
      radio.setAttribute('name', response.city)
      radio.setAttribute('value', (list.dailyRate * response.days * response.rooms).toFixed(2))
      radio.id = 'hotel-radio-' + response.city.toLowerCase() + hotel
      label = document.createElement('label')
      label.setAttribute('for', 'hotel-radio-' + response.city.toLowerCase() + hotel)
      td.appendChild(radio)
      td.appendChild(label)
      tr.appendChild(td)
      // image td
      td = document.createElement('td')
      td.setAttribute('class', 'photo')
      var image = document.createElement('img')
      var imageURL = list.imageURL.replace('http:', 'https:')
      image.setAttribute('src', imageURL)
      image.setAttribute('alt', list.hotelName)
      image.setAttribute('height', '150px')
      image.setAttribute('width', '150px')
      td.appendChild(image)
      tr.appendChild(td)
      // name td
      td = document.createElement('td')
      td.setAttribute('class', 'name')
      td.innerHTML = list.hotelName
      tr.appendChild(td)
      // stars td
      td = document.createElement('td')
      td.setAttribute('class', 'stars')
      td.setAttribute('style', 'color: orange')
      var stars = list.starRating
      for (var s = 0; s < stars; s++) {
        td.innerHTML += '\u2605'
      }
      tr.appendChild(td)
      // hotel score
      td = document.createElement('td')
      td.setAttribute('class', 'score')
      td.innerHTML = '<p>Score: ' + list.reviewScore + '/10</p>'
      td.innerHTML += '<p>Number of reviews: ' + list.reviewCount + '</p>'
      tr.appendChild(td)
      // price
      td = document.createElement('td')
      td.setAttribute('class', 'price')
      td.innerHTML = (list.dailyRate * response.rooms) + ' ' + list.currency + '/night'
      tr.appendChild(td)
      // book button
      td = document.createElement('td')
      td.setAttribute('class', 'book-link')
      link = document.createElement('a')
      link.setAttribute('href', list.landingURL)
      link.setAttribute('target', '_blank')
      link.setAttribute('rel', 'nofollow noopener nofollow')
      link.innerHTML = 'Book this hotel'
      td.appendChild(link)
      tr.appendChild(td)
      table.appendChild(tr)
    }
    div.appendChild(table)
    link = document.createElement('a')
    link.setAttribute('class', 'final-link')
    link.setAttribute('href', response.url)
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'nofollow noopener nofollow')
    link.innerHTML = 'See all available hotels in ' + response.city
    div.appendChild(link)
    city.appendChild(div)
    element.appendChild(city)
  }
  if (type === 'result-insurance') {
    var summary = document.getElementById('insurance-summary')
    section.hidden = false
    summary.hidden = false
    var quote = document.createElement('div')
    quote.setAttribute('class', 'quote-summary')
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'title')
    subheading.innerHTML = 'Quote for ' + response.quote
    quote.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'amount')
    subheading.id = 'quote-' + response.ages[0] + '-amount'
    subheading.setAttribute('value', response.plans[0].totalPrice.toFixed(2))
    subheading.innerHTML = response.plans[0].totalPrice.toFixed(2)
    quote.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'currency')
    subheading.innerHTML = response.currency
    quote.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'int-link')
    link = document.createElement('a')
    link.setAttribute('href', '#' + 'quote-' + response.ages[0] + '-results')
    link.innerHTML = 'Check details'
    responsiveDetails(link)
    subheading.appendChild(link)
    quote.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'book-link')
    link = document.createElement('a')
    link.setAttribute('href', response.url)
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'nofollow noopener nofollow')
    link.innerHTML = 'Get it Now'
    subheading.appendChild(link)
    quote.appendChild(subheading)
    document.getElementById('insurance-summary').appendChild(quote)
    // detailed results
    quote = document.createElement('div')
    quote.setAttribute('class', 'quote-results')
    quote.id = 'quote-' + response.ages[0] + '-results'
    heading = document.createElement('div')
    heading.setAttribute('class', 'heading')
    span = document.createElement('span')
    span.setAttribute('class', 'title')
    span.innerHTML = 'Quote for ' + response.quote
    heading.appendChild(span)
    link = document.createElement('a')
    link.setAttribute('href', response.url)
    link.setAttribute('class', 'heading-link')
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'nofollow noopener nofollow')
    link.innerHTML = 'Get your travel insurance now'
    heading.appendChild(link)
    span = document.createElement('span')
    span.setAttribute('class', 'amount')
    span.setAttribute('value', response.plans[0].totalPrice.toFixed(2))
    span.innerHTML = response.plans[0].totalPrice.toFixed(2)
    heading.appendChild(span)
    span = document.createElement('span')
    span.setAttribute('class', 'currency')
    span.setAttribute('value', response.currency)
    span.innerHTML = response.currency
    heading.appendChild(span)
    quote.appendChild(heading)
    div = document.createElement('div')
    table = document.createElement('table')
    for (var plan in response.plans) {
      list = response.plans[plan]
      tr = document.createElement('tr')
      tr.setAttribute('class', 'insurance')
      td = document.createElement('td')
      // radio td
      td.setAttribute('class', 'radio')
      radio = document.createElement('input')
      radio.setAttribute('type', 'radio')
      radio.setAttribute('name', 'insurance-plan')
      radio.setAttribute('value', (list.totalPrice.toFixed(2)))
      radio.id = 'plan-radio-' + response.ages[0] + plan
      label = document.createElement('label')
      label.setAttribute('for', 'plan-radio-' + response.ages[0] + plan)
      td.appendChild(radio)
      td.appendChild(label)
      tr.appendChild(td)
      // plan name td
      td = document.createElement('td')
      td.setAttribute('class', 'name')
      td.innerHTML = list.name
      tr.appendChild(td)
      // name td
      td = document.createElement('td')
      td.setAttribute('class', 'price')
      td.innerHTML = list.totalPrice.toFixed(2) + ' ' + list.currency
      tr.appendChild(td)
      // book button
      td = document.createElement('td')
      td.setAttribute('class', 'book-link')
      link = document.createElement('a')
      link.setAttribute('href', response.url)
      link.setAttribute('target', '_blank')
      link.setAttribute('rel', 'nofollow noopener nofollow')
      link.innerHTML = 'See more details'
      td.appendChild(link)
      tr.appendChild(td)
      table.appendChild(tr)
    }
    link = document.createElement('a')
    link.setAttribute('href', response.url)
    link.setAttribute('class', 'final-link')
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'nofollow noopener nofollow')
    link.innerHTML = 'Get a free quote for your insurance!'
    div.appendChild(table)
    div.appendChild(link)
    quote.appendChild(div)
    element.appendChild(quote)
  }
  if (type === 'result-vpn') {
    summary = document.getElementById('vpn-summary')
    section.hidden = false
    summary.hidden = false
    table = document.createElement('table')
    for (var vpn in response) {
      tr = document.createElement('tr')
      tr.setAttribute('class', 'vpn')
      td = document.createElement('td')
      // radio td
      td.setAttribute('class', 'radio')
      radio = document.createElement('input')
      radio.setAttribute('type', 'radio')
      radio.setAttribute('name', 'vpn')
      radio.setAttribute('value', response[vpn].price)
      radio.id = 'vpn-radio' + vpn
      label = document.createElement('label')
      label.setAttribute('for', 'vpn-radio' + vpn)
      td.appendChild(radio)
      td.appendChild(label)
      tr.appendChild(td)
      td = document.createElement('td')
      td.setAttribute('class', 'logo')
      image = document.createElement('img')
      image.setAttribute('src', pluginURL + 'img/' + response[vpn].img)
      image.setAttribute('alt', response[vpn].name)
      image.setAttribute('height', '50px')
      image.setAttribute('width', '50px')
      td.appendChild(image)
      tr.appendChild(td)
      // plan name td
      td = document.createElement('td')
      td.setAttribute('class', 'name')
      td.innerHTML = response[vpn].name
      tr.appendChild(td)
      // name td
      td = document.createElement('td')
      td.setAttribute('class', 'price')
      td.innerHTML = response[vpn].price + ' ' + response[vpn].currency
      tr.appendChild(td)
      // book button
      td = document.createElement('td')
      td.setAttribute('class', 'link')
      link = document.createElement('a')
      link.setAttribute('href', response[vpn].link)
      link.setAttribute('target', '_blank')
      link.setAttribute('rel', 'nofollow noopener nofollow')
      link.innerHTML = `Get ${response[vpn].name} Now`
      td.appendChild(link)
      tr.appendChild(td)
      table.appendChild(tr)
    }
    element.appendChild(table)
    section.querySelector('.total-amount').innerHTML = response[0].price
    section.querySelector('span.currency').innerHTML = response[0].currency
    document.getElementById('vpn-amount').innerHTML = response[0].price
    link = document.createElement('a')
    link.setAttribute('href', response[0].link)
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'nofollow noopener nofollow')
    link.innerHTML = 'Get it Now'
    summary.querySelector('.book-link').appendChild(link)
  }
  section.appendChild(element)
  totalCost()
  resultsListeners(type)
  collapseElements('heading')
  // document.getElementById('result-total').querySelector('.currency').innerHTML = response.currency
}
function errorHandler (error, type) {
  var section = document.getElementById(type)
  if (section.querySelector('.result-data')) {
    var element = section.querySelector('.result-data')
  } else {
    element = document.createElement('div')
    element.setAttribute('class', 'result-data')
  }
  if (error.error !== undefined) {
    var errorText = '<strong>' + error.error + '</strong>'
  } else {
    errorText = '<br /><strong>Oops, something went wrong! Please try again!</strong><br /> If the problem persists, please contact the website owner.</br>' + error.text + '<br />'
  }
  if (type === 'result-food') {
    element.innerHTML = errorText
  }
  if (type === 'result-transport') {
    // summary results
    var city = document.createElement('div')
    city.setAttribute('class', 'itinerary-summary')
    var subheading = document.createElement('div')
    subheading.setAttribute('class', 'title')
    subheading.innerHTML = error.origin + ' \u279C ' + error.destination
    city.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'amount')
    subheading.id = error.origin.toLowerCase() + '-' + error.destination.toLowerCase() + '-amount'
    subheading.setAttribute('value', 0)
    subheading.innerHTML = 0.00
    city.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'currency')
    subheading.innerHTML = error.currency
    city.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'int-link')
    var link = document.createElement('a')
    link.setAttribute('href', '#' + error.origin.toLowerCase() + '-' + error.destination.toLowerCase() + '-results')
    if (error.amount === false || error.amount === null) {
      link.innerHTML = 'No transportation available'
    } else {
      link.innerHTML = 'Error: Check Details'
    }
    responsiveDetails(link)
    subheading.appendChild(link)
    city.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'book-link')
    link = document.createElement('a')
    link.setAttribute('href', error.url)
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'nofollow noopener nofollow')
    link.innerHTML = 'Check Again Now'
    subheading.appendChild(link)
    city.appendChild(subheading)
    document.getElementById('transport-summary').appendChild(city)
    // detailed results
    city = document.createElement('div')
    city.setAttribute('class', 'itinerary-results')
    city.id = error.origin.toLowerCase() + '-' + error.destination.toLowerCase() + '-results'
    var heading = document.createElement('div')
    heading.setAttribute('class', 'heading')
    var span = document.createElement('span')
    span.setAttribute('class', 'title')
    span.innerHTML = error.origin + ' \u279C  ' + error.destination
    heading.appendChild(span)
    span = document.createElement('span')
    span.setAttribute('class', 'amount')
    span.setAttribute('value', 0)
    span.innerHTML = 0.00
    heading.appendChild(span)
    span = document.createElement('span')
    span.setAttribute('class', 'currency')
    span.setAttribute('value', error.currency)
    span.innerHTML = error.currency
    heading.appendChild(span)
    var div = document.createElement('div')
    if (error.amount === false || error.amount === null) {
      div.innerHTML += `Sorry, we couldn't find any transportation between ${error.origin} and ${error.destination}. This might be because:<br />`
      var ul = document.createElement('ul')
      ul.innerHTML += "<li>There are no tickets available at this moment (tickets are sold out or it's too early to book them)</li>"
      ul.innerHTML += '<li>We are still working on implementing this route</li>'
      ul.innerHTML += '<li>There is no direct transportation between these two cities</li>'
      div.appendChild(ul)
    } else {
      div.innerHTML += errorText
    }
    link = document.createElement('a')
    link.setAttribute('class', 'final-link')
    link.setAttribute('href', error.url)
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'nofollow noopener nofollow')
    link.innerHTML = 'Check all transportation available'
    div.appendChild(link)
    city.appendChild(heading)
    city.appendChild(div)
    element.appendChild(city)
  }
  if (type === 'result-accommodation') {
    city = document.createElement('div')
    city.setAttribute('class', 'city-summary')
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'title')
    subheading.innerHTML = error.city
    city.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'amount')
    subheading.id = error.city.toLowerCase() + '-amount'
    subheading.innerHTML = 0.00
    city.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'currency')
    subheading.innerHTML = error.currency
    city.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'int-link')
    link = document.createElement('a')
    link.setAttribute('href', '#' + error.city.toLowerCase() + '-results')
    link.innerHTML = 'Error: Check Details'
    responsiveDetails(link)
    subheading.appendChild(link)
    city.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'book-link')
    link = document.createElement('a')
    link.setAttribute('href', error.url)
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'nofollow noopener nofollow')
    link.innerHTML = 'Search Again Now'
    subheading.appendChild(link)
    city.appendChild(subheading)
    document.getElementById('accommodation-summary').appendChild(city)
    // detailed results
    city = document.createElement('div')
    city.setAttribute('class', 'city-results')
    heading = document.createElement('div')
    heading.setAttribute('class', 'heading')
    span = document.createElement('span')
    span.setAttribute('class', 'title')
    span.innerHTML = error.city
    heading.appendChild(span)
    span = document.createElement('span')
    span.setAttribute('class', 'amount')
    span.setAttribute('data-average', 0)
    span.setAttribute('data-days', error.days)
    span.innerHTML = 0.00
    heading.appendChild(span)
    span = document.createElement('span')
    span.setAttribute('class', 'currency')
    span.setAttribute('value', error.currency)
    span.innerHTML = error.currency
    heading.appendChild(span)
    div = document.createElement('div')
    div.innerHTML += errorText
    link = document.createElement('a')
    link.setAttribute('class', 'final-link')
    link.setAttribute('href', error.url)
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'nofollow noopener nofollow')
    link.innerHTML = 'See all the hotels available in ' + error.city
    div.appendChild(link)
    city.appendChild(heading)
    city.appendChild(div)
    element.appendChild(city)
  }
  if (type === 'result-insurance') {
    var summary = document.getElementById('insurance-summary')
    section.hidden = false
    summary.hidden = false
    var quote = document.createElement('div')
    quote.setAttribute('class', 'quote-summary')
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'title')
    subheading.innerHTML = 'Quote for ' + error.quote
    quote.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'amount')
    subheading.id = 'quote-' + error.ages[0] + '-amount'
    subheading.setAttribute('value', 0)
    subheading.innerHTML = 0.00
    quote.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'currency')
    subheading.innerHTML = error.currency
    quote.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'int-link')
    link = document.createElement('a')
    link.setAttribute('href', '#' + 'quote-' + error.ages[0] + '-results')
    link.innerHTML = 'Check details'
    responsiveDetails(link)
    subheading.appendChild(link)
    quote.appendChild(subheading)
    subheading = document.createElement('div')
    subheading.setAttribute('class', 'book-link')
    link = document.createElement('a')
    link.setAttribute('href', error.url)
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'nofollow noopener nofollow')
    link.innerHTML = 'Error: Get a Free Quote Now'
    subheading.appendChild(link)
    quote.appendChild(subheading)
    document.getElementById('insurance-summary').appendChild(quote)
    // detailed results
    quote = document.createElement('div')
    quote.setAttribute('class', 'quote-results')
    quote.id = 'quote-' + error.ages[0] + '-results'
    heading = document.createElement('div')
    heading.setAttribute('class', 'heading')
    span = document.createElement('span')
    span.setAttribute('class', 'title')
    span.innerHTML = 'Quote for ' + error.quote
    heading.appendChild(span)
    span = document.createElement('span')
    span.setAttribute('class', 'amount')
    span.setAttribute('value', 0)
    span.innerHTML = 0.00
    heading.appendChild(span)
    span = document.createElement('span')
    span.setAttribute('class', 'currency')
    span.setAttribute('value', error.currency)
    span.innerHTML = error.currency
    heading.appendChild(span)
    quote.appendChild(heading)
    div = document.createElement('div')
    div.innerHTML += errorText
    link = document.createElement('a')
    link.setAttribute('href', error.url)
    link.setAttribute('class', 'final-link')
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'nofollow noopener nofollow')
    link.innerHTML = 'Get a free quote for your insurance!'
    div.appendChild(link)
    quote.appendChild(div)
    element.appendChild(quote)
  }
  if (type === 'result-vpn') {
    section.hidden = false
    document.getElementById('vpn-summary').hidden = false
    element.innerHTML = errorText
  }
  section.appendChild(element)
  totalCost()
  collapseElements('heading')
}
// API functions
function getFormData () {
  var totalDays = 0
  for (var i = 0; document.getElementById('dayscity_' + i); i++) {
    totalDays = totalDays + parseInt(document.getElementById('dayscity_' + i).value)
  }
  var startDate = document.getElementById('start-date').value
  startDate = new Date(startDate)
  var data = {
    duration: totalDays,
    startdate: startDate.toISOString().split('T')[0],
    finishdate: addDays(startDate, totalDays).toISOString().split('T')[0],
    currency: 'USD',
    language: 'en-us',
    countryCodes: [],
    countryNumber: 44,
    hotel: {
      puntuation: parseFloat(document.getElementById('hotel-punt').value),
      stars: parseInt(document.getElementById('hotelstars').value),
      rooms: parseInt(document.getElementById('room-num').value)
    },
    itinerary: [
      {
        city: document.getElementById('cityinput0').value,
        days: parseInt(document.getElementById('dayscity_0').value),
        arrival: startDate.toISOString().split('T')[0],
        departure: addDays(startDate, parseInt(document.getElementById('dayscity_0').value)).toISOString().split('T')[0]
      }
    ],
    travelers: {
      adults: parseInt(document.getElementById('adult-number').value),
      kids: parseInt(document.getElementById('kid-num').value),
      ages: [],
      kidsAges: []
    },
    insurance: {
      required: document.getElementById('insurance').checked
    },
    vpn: document.getElementById('tcc-vpn').checked
  }
  var selectedCountries = document.getElementById('selected-countries').querySelectorAll('li')
  for (i = 0; i < selectedCountries.length; i++) {
    data.countryCodes.push(selectedCountries[i].dataset.code)
  }
  for (i = 1; document.getElementById('city_' + i); i++) {
    var cityData = {}
    cityData.city = document.getElementById('cityinput' + i).value
    cityData.days = parseInt(document.getElementById('dayscity_' + i).value)
    cityData.arrival = data.itinerary[i - 1].departure
    var daysCity = 0
    for (var cit in data.itinerary) {
      daysCity = daysCity + cityData.days + data.itinerary[cit].days
    }
    cityData.departure = addDays(startDate, daysCity).toISOString().split('T')[0]
    data.itinerary.push(cityData)
    if (cityData.city === 'Hong Kong') {
      if (!data.countryCodes.includes('HKG')) {
        data.countryCodes.push('HKG')
      }
    }
    if (cityData.city === 'Macau') {
      if (!data.countryCodes.includes('MAC')) {
        data.countryCodes.push('MAC')
      }
    }
  }
  var numb = parseInt(document.getElementById('kid-num').value)
  if (numb > 0) {
    for (i = 0; i < numb; i++) {
      var age = parseInt(document.getElementById('kid' + i).value)
      data.travelers.kidsAges.push(age)
    }
  }
  if (data.insurance.required === true) {
    for (i = 0; document.getElementById('traveler' + i); i++) {
      var a = parseInt(document.getElementById('traveler' + i).value)
      data.travelers.ages.push(a)
    }
    if (document.getElementById('residency') !== null) {
      data.insurance.residence = document.getElementById('residency').value
    }
    if (document.getElementById('province') !== null) {
      data.insurance.province = document.getElementById('province').value
    }
  }
  for (i = 0; i < data.itinerary.length; i++) {
    var value = data.itinerary[i].city
    var option = Array.prototype.find.call(document.getElementById('cityinput' + i).list.options, function (option) {
      return option.value === value
    })
    data.itinerary[i].country = option.dataset.country
  }
  return data
}
function addDays (date, days) {
  var result = new Date(date)
  result.setDate(date.getDate() + days)
  return result
}
function travelCostCalculator () {
  if (tccStyleLoaded === false) {
    var cssLoader = document.createElement('link')
    var cssResults = document.createElement('link')
    cssLoader.setAttribute('rel', 'stylesheet')
    cssResults.setAttribute('rel', 'stylesheet')
    cssLoader.setAttribute('type', 'text/css')
    cssResults.setAttribute('type', 'text/css')
    cssLoader.setAttribute('href', pluginURL + 'css/style_loader.css')
    cssResults.setAttribute('href', pluginURL + 'css/style_results.css')
    document.getElementsByTagName('head')[0].appendChild(cssLoader)
    document.getElementsByTagName('head')[0].appendChild(cssResults)
    tccStyleLoaded = true
  }
  resultsHTML()
  document.getElementById('summary-section').scrollIntoView()
  var parameters = {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(getFormData()),
    method: 'POST'
  }
  var container = document.createElement('div')
  // added visions start
  container.id = 'tcc_loader'
  var loader = document.createElement('div')
  loader.setAttribute('class', 'loader_text')
  container.appendChild(loader)
  var loaderImages = document.createElement('div')
  loaderImages.setAttribute('class', 'loader_images')
  container.appendChild(loaderImages)
  var loaderImg = document.createElement('img')
  var iconsLoader = [
    'w-hotel.png',
    'w-train.png',
    'w-food.png',
    'w-plane.png',
    'w-insurance.png',
    'w-bus.png',
    'w-vpn.png',
    'w-htrain.png'
  ]
  loaderImg.setAttribute('src', pluginURL + 'img/' + iconsLoader[iconsLoader.length - 1])
  loaderImages.appendChild(loaderImg)
  var loaderText = ['c', 'a', 'l', 'c', 'u', 'l', 'a', 't', 'i', 'n', 'g', '.', '.', '.']
  loaderText.forEach(item => {
    var loaderLetter = document.createElement('span')
    loaderLetter.innerHTML = item
    loader.appendChild(loaderLetter)
  })
  var counter = 0
  var changeImage = setInterval(function () {
    if (counter > (iconsLoader.length - 1)) {
      counter = 0
    }
    document.querySelector('.loader_images').innerHTML = ''
    var img = document.createElement('img')
    img.setAttribute('src', pluginURL + 'img/' + iconsLoader[counter])
    document.querySelector('.loader_images').appendChild(img)
    counter++
  }, 3000)
  // added visions -finish
  container.appendChild(loader)
  document.body.appendChild(container)
  window.fetch(apiURL + 'db/countries/') // Remove Quote Button
    .then(response => {
      return response.json()
    }).then(data => {
      var countries = getFormData().countryCodes
      var tour = false
      for (var i = 0; i < countries.length; i++) {
        var index = data.findIndex(item => item.code3 === countries[i])
        if (data[index].tour === '1') {
          tour = true
          window.tourAgencyEmail = data[index].touremail
        }
      }
      if (tour === false) {
        var button = document.getElementById('quote-button')
        button.parentNode.removeChild(button)
      }
    })
    .catch(err => {
      var eReport = {
        message: err,
        type: 'database fetch'
      }
      errorReport(eReport)
      var button = document.getElementById('quote-button')
      button.parentNode.removeChild(button)
    })
  window.fetch(apiURL, parameters)
    .then(function (data) {
      return data.json()
    })
    .then(function (response) {
      container.parentNode.removeChild(container)
      clearInterval(changeImage)
      if (response.error) {
        errorReport(response.error)
      }
      for (var i in response.hotels) {
        if (response.hotels[i].error) {
          errorHandler(response.hotels[i], 'result-accommodation')
        } else {
          resultsValues(response.hotels[i], 'result-accommodation')
        }
      }
      if (response.transport && response.transport.trips !== false) {
        for (i in response.transport) {
          if (response.transport[i].error || response.transport[i].amount === false || response.transport[i].amount === null) {
            errorHandler(response.transport[i], 'result-transport')
          } else {
            resultsValues(response.transport[i], 'result-transport')
          }
        }
      } else {
        document.getElementById('transport-summary').hidden = true
        document.getElementById('result-transport').hidden = true
      }
      if (response.insurance) {
        for (i in response.insurance) {
          if (response.insurance[i].error) {
            errorHandler(response.insurance[i], 'result-insurance')
          } else {
            resultsValues(response.insurance[i], 'result-insurance')
          }
        }
      }
      for (i in response.food) {
        if (response.food[i].error) {
          errorHandler(response.food[i], 'result-food')
        } else {
          resultsValues(response.food[i], 'result-food')
        }
      }
      if (response.vpn) {
        if (response.vpn.error) {
          errorHandler(response.vpn, 'result-vpn')
        } else {
          resultsValues(response.vpn, 'result-vpn')
        }
      }
    })
    .catch(function (error) {
      var eReport = {
        message: error.toString(),
        type: 'Javascript Bug'
      }
      console.log(eReport)
      errorReport(eReport)
      if (container && container != null) {
        container.parentNode.removeChild(container)
      }
      document.getElementById('summary-section').innerHTML = '<h3>There was a problem. Please try again.</h3><p>' + error + '</p>'
    })
}
function collapseElements (className) {
  var coll = document.getElementsByClassName(className)
  for (var i = 0; i < coll.length; i++) {
    if (coll[i].nextElementSibling && !coll[i].classList.contains('listener')) {
      coll[i].classList.add('listener')
      coll[i].classList.add('active')
      coll[i].nextElementSibling.style.display = 'block'
      coll[i].addEventListener('click', function () {
        this.classList.toggle('active')
        var content = this.nextElementSibling
        if (content.style.display === 'block') {
          content.style.display = 'none'
        } else {
          content.style.display = 'block'
        }
      })
    }
  }
}
function popup (type) {
  var modal = document.getElementById(type + '-element')
  var btn = document.getElementById(type + '-button')
  var span = document.getElementsByClassName('tcc-close')[0]
  btn.onclick = function () {
    modal.style.display = 'block'
    modal.querySelector('button').disabled = false
  }
  span.onclick = function () {
    modal.style.display = 'none'
  }
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none'
    }
  }
}
function tourQuote () {
  document.getElementById('tour-quote').disabled = true
  var isValid = true
  document.getElementById('quote-element').querySelectorAll('input').forEach(input => {
    input.reportValidity()
    if (input.validity.valid === false) {
      isValid = false
    }
  }, false)
  if (isValid === true) {
    var input = getFormData()
    input.email = document.getElementById('quote-email').value
    input.name = document.getElementById('quote-name').value
    input.agency = window.tourAgencyEmail
    var parameters = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(input),
      method: 'POST'
    }
    window.fetch(pluginURL + 'includes/tour-request.php', parameters)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        document.getElementById('quote-message').innerHTML = data.message
        setTimeout(function () {
          document.getElementById('quote-element').style.display = 'block'
        }, 3000)
      })
      .catch(function (error) {
        document.getElementById('quote-message').innerHTML = error
        setTimeout(function () {
          document.getElementById('quote-element').style.display = 'none'
        }, 3000)
      })
  }
}
function sendResults () {
  document.getElementById('send-results').disabled = true
  var isValid = true
  document.getElementById('results-element').querySelectorAll('input').forEach(input => {
    input.reportValidity()
    if (input.validity.valid === false) {
      isValid = false
    }
  }, false)
  if (isValid === true) {
    var input = {}
    input.email = document.getElementById('results-email').value
    input.summary = document.getElementById('summary-section').innerHTML
    input.summary = '<div id="summary-section">' + input.summary + '</div>'
    input.results = document.getElementById('results-section').innerHTML
    input.results = '<div id="results-section">' + input.results + '</div>'
    var parameters = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input),
      method: 'POST'
    }
    window.fetch(pluginURL + 'includes/send-results.php', parameters)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        document.getElementById('results-message').innerHTML = data.message
        setTimeout(function () {
          document.getElementById('results-element').style.display = 'block' // *** block
        }, 3000)
      })
      .catch(function (error) {
        document.getElementById('results-message').innerHTML = error
        setTimeout(function () {
          document.getElementById('results-element').style.display = 'none'
        }, 3000)
      })
  }
}
function errorReport (error) {
  var input = {
    error: error,
    request: getFormData()
  }
  var parameters = {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input),
    method: 'POST'
  }
  window.fetch(pluginURL + 'includes/error-report.php', parameters)
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}
