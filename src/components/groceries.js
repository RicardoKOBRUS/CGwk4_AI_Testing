// Function to load the movie list from localStorage and return it as an array
function loadList() {
    const storedList = localStorage.getItem('list');
    if (!storedList) {
      return [];
    }
    return storedList.split(',');
  }
  
  // Function to save the movie list array to localStorage as a comma-delimited string
  function saveList(mymovieList) {
    const listString = mymovieList.join(',');
    localStorage.setItem('list', listString);
  }
  
  // Function to clear the movie list from localStorage
  function clearList() {
    localStorage.removeItem('list');
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addButton');
    const inputField = document.getElementById('movieInput');
    const clearButton = document.getElementById('clearButton');
    const mymovieListElement = document.getElementById('mymovieList');
  
    // Check if elements exist
    if (!addButton || !inputField || !clearButton || !mymovieListElement) {
      console.error('One or more required elements are missing from the HTML.');
      return;
    }
  
    let mymovieList = loadList();
  
    function showItem(item) {
      const li = document.createElement('li');
      li.textContent = item;
      mymovieListElement.appendChild(li);
    }
  
    function enableClearButton() {
      if (mymovieList.length > 0) {
        clearButton.disabled = false;
      } else {
        clearButton.disabled = true;
      }
    }
  
    addButton.addEventListener('click', () => {
      const item = inputField.value.trim();
      if (item !== '') {
        mymovieList.push(item);
        showItem(item);
        saveList(mymovieList);
        inputField.value = '';
        enableClearButton();
      }
    });
  
    clearButton.addEventListener('click', () => {
      mymovieList = [];
      mymovieListElement.innerHTML = '';
      clearList();
      enableClearButton();
    });
  
    mymovieList.forEach(item => showItem(item));
    enableClearButton();
  });