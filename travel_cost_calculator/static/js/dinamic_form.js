// event listeners
document.getElementById('hotel-punt').addEventListener('input', sliderValue)
document.getElementById('kid-num').addEventListener('input', kidsage)
document.getElementById('insurance').addEventListener('change', insuranceAge)
document.getElementById('adult-number').addEventListener('input', insuranceAge)
document.getElementById('add-city').addEventListener('click', addcity)
document.getElementById('remove-city').addEventListener('click', removeCity)
document.getElementById('tcc-calculate').addEventListener('click', submitTripCost)
document.getElementById('contact_email').hidden = true
// i18n functions
// const { __, sprintf } = wp.i18n
// global variables
var hotelRating = document.getElementById('hotel-punt').value
document.getElementById('hotel-puntval').innerHTML = hotelRating
const databaseURL = 'https://api.travelcostcalculator.com/db/'
var tccScriptLoaded = true // should be false
const urlpath = document.currentScript.dataset;
const pluginURL = urlpath.url
// terms and conditions
document.getElementById('tcc-terms').addEventListener('change', termsAccepted)
function termsAccepted () {
  if (document.getElementById('tcc-terms').checked) {
    document.getElementById('tcc-calculate').disabled = false
    document.getElementById('tcc-terms').setCustomValidity('')
    document.getElementById('tcc-terms').reportValidity()
  } else {
    document.getElementById('tcc-calculate').disabled = true
    document.getElementById('tcc-terms').setCustomValidity('You must accept the Terms of Service to use the Travel Cost Calculator')
    document.getElementById('tcc-terms').reportValidity()
    setTimeout(function () {
      document.getElementById('tcc-calculate').disabled = false
    }, 3000)
    return false
  }
}

// load script function
function loadScript (url, callback) {
  var head = document.head
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = url
  script.onreadystatechange = callback
  script.onload = callback
  head.appendChild(script)
}
// slider value
function sliderValue () {
  var hotelRating = document.getElementById('hotel-punt')
  document.getElementById('hotel-puntval').innerHTML = hotelRating.value
  var newVal = ((hotelRating.value - hotelRating.min) * 100) / (hotelRating.max - hotelRating.min) // visions
  document.querySelector('.bubble').style.left = newVal + '%' // visions
  document.querySelector('.bar_range_color').style.width = newVal + '%' // visions
}
// insurance function
function insuranceAge () {
  var dom = document.getElementById('insuranceOp')
  if (document.getElementById('insurance').checked === true) {
    dom.innerHTML = ''
    var num = parseInt(document.getElementById('adult-number').value)
    var i = 0
    for (i = 0; i < num; i++) {
      var div = document.createElement('div')
      div.setAttribute('class', 'tcc-field')
      div.classList.add('age')
      dom.appendChild(div)
      var l = document.createElement('label')
      l.setAttribute('for', 'traveler' + i)
      l.innerHTML = `Adult ${i + 1} age`
      var inp = document.createElement('input')
      inp.type = 'number'
      inp.id = 'traveler' + i
      inp.min = 18
      inp.max = 100
      inp.required = true
      div.appendChild(l)
      div.appendChild(inp)
    }
    if (res !== undefined) {
      document.getElementById('insuranceOp').appendChild(res)
    } else {
      var di = document.createElement('div')
      di.setAttribute('class', 'tcc-field')
      di.classList.add('residency')
      var label = document.createElement('label')
      label.setAttribute('for', 'residency')
      label.innerHTML = 'Country of Residence'
      var res = document.createElement('input')
      res.id = 'residency'
      res.type = 'text'
      res.required = true
      res.setAttribute('list', 'countrylist')
      var list = document.createElement('datalist')
      list.id = 'countrylist'
      di.appendChild(label)
      di.appendChild(res)
      document.getElementById('insuranceOp').appendChild(di)
      fetch(pluginURL + 'db/insurance-residency.json')
        .then(response => {
          return response.json()
        }).then(data => {
          var o
          var pattern = ''
          for (var i in data) {
            o = document.createElement('option')
            o.value = data[i].code
            o.text = data[i].name
            pattern += data[i].code + '|'
            list.appendChild(o)
          }
          res.setAttribute('pattern', pattern)
          document.getElementById('residency').after(list)
          document.getElementById('residency').addEventListener('input', function () {
            var country = this.value
            if (data[country] !== undefined && data[country].isProvinceUsed === true) {
              var provinces = data[country].provinces
              var divp = document.createElement('div')
              divp.setAttribute('class', 'tcc-field')
              divp.classList.add('residency')
              divp.setAttribute('id', 'tcc-province')
              var plabel = document.createElement('label')
              plabel.setAttribute('for', 'province')
              plabel.innerHTML = `Province in ${data[country].name}`
              var pro = document.createElement('input')
              pro.id = 'province'
              pro.type = 'text'
              pro.required = true
              pro.setAttribute('list', 'provincelist')
              var plist = document.createElement('datalist')
              plist.id = 'provincelist'
              divp.appendChild(plabel)
              divp.appendChild(pro)
              divp.appendChild(plist)
              document.getElementById('insuranceOp').appendChild(divp)
              var op
              var pat = ''
              for (var k in provinces) {
                op = document.createElement('option')
                op.value = provinces[k].code
                op.text = provinces[k].name
                pat += provinces[k].code + '|'
                plist.appendChild(op)
              }
              pro.setAttribute('pattern', pat)
              document.getElementById('provincelist').after(plist)
            } else {
              if (document.contains(document.getElementById('tcc-province'))) {
                document.getElementById('tcc-province').remove()
              }
            }
          })
        })
        .catch(err => { console.error(err) })
    }
  } else {
    dom.innerHTML = ''
  }
}
// kids age function
function kidsage () {
  var kidnum = parseInt(document.getElementById('kid-num').value)
  document.getElementById('kids-age').innerHTML = ''
  if (kidnum > 0) {
    for (var i = 0; i < kidnum; i++) {
      var div = document.createElement('div')
      div.setAttribute('class', 'tcc-field')
      div.classList.add('number')
      var label = document.createElement('label')
      label.setAttribute('for', 'kid' + i)
      label.innerHTML = `Minor ${i + 1} age`
      var input = document.createElement('input')
      input.setAttribute('min', 0)
      input.setAttribute('max', 18)
      input.id = 'kid' + i
      input.setAttribute('type', 'number')
      input.required = true
      div.appendChild(label)
      div.appendChild(input)
      document.getElementById('kids-age').appendChild(div)
    }
  }
}
// add city function
function addcity () {
  var cityCount = 0
  for (var i = 0; document.getElementById('city_' + i); i++) {
    cityCount++
  }
  if (!document.getElementById('city_' + cityCount)) {
    var parent = document.getElementById('itinerary')
    var div = document.getElementById('city_0').cloneNode(true)
    div.querySelector('#cityinput0').value = null
    div.querySelector('#dayscity_0').value = null
    div.id = 'city_' + cityCount
    div.querySelector('[for=cityinput0]').setAttribute('for', 'cityinput' + cityCount)
    div.querySelector('#cityinput0').id = 'cityinput' + cityCount
    div.querySelector('[for=dayscity_0]').setAttribute('for', 'dayscity_' + cityCount)
    div.querySelector('#dayscity_0').id = 'dayscity_' + cityCount
    var datalist = div.querySelector('datalist')
    datalist.parentNode.removeChild(datalist)
    parent.appendChild(div)
  }
  validateInput()
}
// remove city function
function removeCity () {
  var cityCount = 0
  for (var i = 0; document.getElementById('city_' + i); i++) {
    cityCount++
  }
  cityCount = cityCount - 1
  if (cityCount > 0) {
    var elementId = 'city_' + cityCount
    var element = document.getElementById(elementId)
    element.parentNode.removeChild(element)
  }
}
// Travel cost calculation function
function submitTripCost () {
  termsAccepted()
  document.getElementById('tcc-details').innerHTML = ''
  document.getElementById('tcc-details').style.display = 'none'
  var isValid = true
  var form = document.getElementById('tcc-formid')
  form.querySelectorAll('input, select, textarea').forEach(input => {
    input.reportValidity()
    if (input.validity.valid === false) {
      isValid = false
    }
  },
  false
  )
  if (isValid === true) {
    document.getElementById('summary-section').hidden = false
    document.getElementById('results-section').hidden = false
    document.getElementById('tcc-calculate').disabled = true
    setTimeout(function () {
      document.getElementById('tcc-calculate').disabled = false
    }, 30000)
    if (tccScriptLoaded === false) {
      var calculate = function () {
        travelCostCalculator()
      }
      var email = document.getElementById('contact_email').value
      if (!email) {
        var url = pluginURL + 'js/travel_cost_calculator.js'
        loadScript(url, calculate)
        tccScriptLoaded = true
      }
    } else {
      if (!email) {
        travelCostCalculator()
      }
    }
  }
}
// get parameters function
function validateInput () {
  var form = document.getElementById('tcc-formid')
  var inputs = form.querySelectorAll('input, select, textarea')
  inputs.forEach(input => {
    input.addEventListener(
      'blur',
      event => {
        if (document.getElementById('selected-countries').querySelectorAll('li').length !== 0) {
          document.getElementById('tcc-country-input').setCustomValidity('')
          input.reportValidity()
        } else {
          if (input.id !== 'tcc-country-input') {
            document.getElementById('tcc-country-input').setCustomValidity('Select at least one country')
            document.getElementById('tcc-country-input').reportValidity()
          }
        }
      },
      false
    )
  })
}
function getCities () {
  var selected = document.getElementById('selected-countries').querySelectorAll('li')
  if (selected.length === 0) {
    return
  }
  var countries = []
  for (i = 0; i < selected.length; i++) {
    countries.push(selected[i].dataset.code)
    if (selected[i] === 'CHN') {
      countries.push('HKG')
      countries.push('MAC')
    }
  }
  window.fetch(databaseURL + 'cities/?req=' + countries.toString())
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      var cityList = document.getElementById('citylist')
      cityList.innerHTML = ''
      var pattern = ''
      for (var i = 0; i < data.length; i++) {
        cityList.innerHTML += '<option value="' + data[i].city + '" data-country="' + data[i].country + '">'
        pattern += data[i].city + '|'
      }
      document.getElementById('cityinput0').setAttribute('pattern', pattern)
    })
}
validateInput()
// MULTI SELECT JS
document.getElementById('tcc-country-input').addEventListener('keyup', filterCountry)
document.getElementById('tcc-country-input').addEventListener('focus', () => {
  document.getElementById('country-dropdown').style.display = 'inline-block'
})
document.addEventListener('mouseup', function (e) {
  if (!document.getElementById('myDropdown').contains(e.target)) {
    document.getElementById('country-dropdown').style.display = 'none'
  }
})
document.getElementById('myDropdown').addEventListener('blur', () => {
  document.getElementById('country-dropdown').style.display = 'none'
})
var drop = document.getElementById('country-dropdown').getElementsByTagName('li')
for (var i = 0; i < drop.length; i++) {
  drop[i].addEventListener('click', function () { addCountry(this) })
}
function filterCountry () {
  var search = document.getElementById('tcc-country-input').value.toLowerCase()
  var txtValue
  for (var i = 0; i < drop.length; i++) {
    txtValue = drop[i].textContent || drop[i].innerText
    if (txtValue.toLowerCase() === search) {
      addCountry(drop[i])
    } else if (txtValue.toLowerCase().indexOf(search) > -1) {
      drop[i].style.display = 'block'
    } else {
      drop[i].style.display = 'none'
    }
  }
}
function addCountry (el) {
  var li = el.cloneNode(true)
  var a = document.createElement('a')
  a.innerHTML = '\u00D7'
  a.addEventListener('click', removeCountry)
  li.appendChild(a)
  li.removeAttribute('style')
  document.getElementById('selected-countries').appendChild(li)
  el.parentNode.removeChild(el)
  document.getElementById('country-dropdown').style.display = 'none'
  document.getElementById('tcc-country-input').value = ''
  getCities()
}
function removeCountry () {
  var li = this.parentNode.cloneNode(true)
  var a = li.querySelector('a')
  var drop = document.getElementById('country-dropdown')
  li.removeChild(a)
  li.addEventListener('click', function () { addCountry(this) })
  drop.appendChild(li)
  this.parentNode.parentNode.removeChild(this.parentNode)
  Array.from(drop.getElementsByTagName('li'))
    .sort((a, b) => a.textContent.localeCompare(b.textContent))
    .forEach(li => drop.appendChild(li))
  getCities()
}
