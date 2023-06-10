// Variable declaration

let calculator = document.getElementById("calculator")
let submit = document.getElementById("submit")
let year = document.getElementById("year")
let month = document.getElementById("month")
let day = document.getElementById("day")
let inputYear = document.getElementById("input-year")
let inputMonth = document.getElementById("input-month")
let inputDay = document.getElementById("input-day")
let labels = document.getElementsByClassName("label")
let invalidDate = "Date invalid."
let dateError = document.getElementById("day-error")
let monthError = document.getElementById("month-error")
let yearError = document.getElementById("year-error")
// Validation Functions

// throw error class on all children of input-wrapper when an invalid input is detected
// use date validation for things like April 31, or someone over 100 years old

// Age Calculation Function

const calcAge = () => {
  const leap = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  }

  const validateInput = () => {
    if (
      inputDay.value > 31 ||
      inputMonth.value >= 12 ||
      inputYear.value <= 1900 ||
      (inputMonth.value === "2" &&
        ((leap(inputYear.value) && inputDay.value > 29) ||
          (!leap(inputYear.value) && inputDay.value > 28))) ||
      (inputMonth.value === "02" &&
        ((leap(inputYear.value) && inputDay.value > 29) ||
          (!leap(inputYear.value) && inputDay.value > 28))) ||
      inputMonth.value === "04" ||
      ((inputMonth.value === "4" ||
        inputMonth.value === "06" ||
        inputMonth.value === "6" ||
        inputMonth.value === "09" ||
        inputMonth.value === "9" ||
        inputMonth.value === "11") &&
        inputDay.value > 30)
    ) {
      addError()
      return false
    } else {
      removeError()
      return true
    }
  }

  const calculateAge = () => {
    const currentDate = new Date()
    let birthDate = new Date(
      inputYear.value,
      inputMonth.value - 1,
      inputDay.value
    )

    const diffInMs = currentDate - birthDate
    const msInDay = 24 * 60 * 60 * 1000
    const totalDays = Math.floor(diffInMs / msInDay)
    let years = Math.floor(totalDays / 365.2422)
    let months = Math.floor((totalDays % 365.2422) / 30.436875)
    let days = Math.round(totalDays % 30.436875)

    year.textContent = years
    month.textContent = months
    day.textContent = days

    birthDate = null
  }

  if (validateInput()) {
    calculateAge()
  }
}

// Styling Functions

const addError = () => {
  inputYear.classList.add("error")
  inputMonth.classList.add("error")
  inputDay.classList.add("error")
  dateError.textContent = invalidDate
  monthError.textContent = invalidDate
  yearError.textContent = invalidDate

  for (let i = 0; i < labels.length; i++) {
    const label = labels[i]
    label.classList.add("error")
  }
}

const removeError = () => {
  inputYear.classList.remove("error")
  inputMonth.classList.remove("error")
  inputDay.classList.remove("error")
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i]
    label.classList.remove("error")
  }

  dateError.textContent = ""
  monthError.textContent = ""
  yearError.textContent = ""
}

const requried = () => {}

submit.onclick = calcAge
