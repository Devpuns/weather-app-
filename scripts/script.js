function goBtnOnClicked() {
    const searchInput = document.querySelector('.form-control'); // Assuming this is your input field
    const cityName = document.querySelector('#cityName');
    const city = searchInput.value;
    cityName.innerText = city;
    searchInput.value = "";
    console.log(cityName.innerText);
}