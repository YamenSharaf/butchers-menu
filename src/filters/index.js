import Vue from 'vue'

// Shorten number format (2000 to 2K)
Vue.filter('NtoK', (number) => {
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G'
  }
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return number
})

// Round fraction to only two digits after the dot
Vue.filter('roundTo2', (number) => {
  return number.toFixed(2)
})

// Truncate String Long
Vue.filter('truncateLong', (str) => {
  return str.length > 30
    ? `${str.substring(0, 30)}...`
    : str
})

// Truncate String Short
Vue.filter('truncateShort', (str) => {
  return str.length > 20
    ? `${str.substring(0, 20)}...`
    : str
})
