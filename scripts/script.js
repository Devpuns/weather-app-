// function goBtnOnClicked() {
//     const searchInput = document.querySelector('.form-control'); // Assuming this is your input field
//     const cityName = document.querySelector('#cityName');
//     const city = searchInput.value;
//     cityName.innerText = city;
//     searchInput.value = "";
//     console.log(cityName.innerText);
// }
function goBtnOnClicked() {
    const httpReq = new XMLHttpRequest();
    httpReq.open("GET","db/db.txt");
    // console.log("Request Created : "+httpReq.readyState);
    httpReq.send();
    // console.log("request sent : "+httpReq.readyState);
    httpReq.onreadystatechange = () => {
        if(httpReq.readyState == 4){
            console.log(httpReq.responseText);
        }
        //  console.log('Ready State value :'+httpReq.readyState);
    }
    console.log(httpReq.responseText);
    // console.log("response recieved : "+httpReq.readyState);
}
