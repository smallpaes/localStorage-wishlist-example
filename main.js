(function () {
  const form = document.querySelector('form')
  const displayArea = document.querySelector('ul')
  const wishList = JSON.parse(localStorage.getItem('wishList')) || []

  function displayWishList() {
    wishList.forEach(wish => displayWish(wish))
  }

  function displayWish(input) {
    displayArea.innerHTML += `
      <li>${input}<span>X</span></li>
    `
  }

  function updateLocalStorage() {
    //store the list back to localStorage
    localStorage.setItem('wishList', JSON.stringify(wishList))
  }

  //display all the wish on the list from localStorage
  displayWishList()

  //add event listener to form
  form.addEventListener('submit', event => {
    //prevent auto send the form
    event.preventDefault()
    //get input value
    const input = document.querySelector('input[type="text"]')
    //add new wish to the list
    displayWish(input.value)
    //add new wish to the list
    wishList.push(input.value)
    //add the wish to localStorage
    updateLocalStorage(input.value)
    //clear up the input
    input.value = ''
  })

  displayArea.addEventListener('click', event => {
    if (event.target.tagName !== 'SPAN') { return }
    const li = event.target.parentElement
    li.remove()
    wishList.splice(wishList.indexOf(li.textContent.slice(0, -1)), 1)
    updateLocalStorage()
  })

})()
