const popup = document.querySelector(".popup"),
wifiIcon = document.querySelector(".icon i"),
popupTitle = document.querySelector(".popup .title"),
popupDesc = document.querySelector(".desc"),
reconnectBtn = document.querySelector(".reconnect"),
btn = document.querySelector(".reconnect");

let online = true ,intervalId, timer =10;
const checkConnection = async()=>{
    try{
        //  Try to fetch random data from API.
        // if status code is in between 200 to 300 , then connetion is ok/
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        // console.log(response);
        online = response.status>=200 && response.status<300 ;
    }
    catch(error){
        online= false;
    }
    timer =10;
    clearInterval(intervalId);
    handlepopup(online);    
}
const handlepopup= (status)=>{
    if(status){
        // remove notificatoin
        wifiIcon.className ="uil uil-wifi";
        popupTitle.innerText="Restored Connection";
        popupDesc.innerHTML = "Your device is now successfully connected to the internet.";
        popup.classList.add("online");
        document.querySelector(".centered-div").innerText="Connection is Stable.";

    return setTimeout(()=>
        popup.classList.remove("show")
    ,2000);

}
    // If the status is false (offline), update the icon, title, and description accordingly
    wifiIcon.className = "uil uil-wifi-slash";
    popupTitle.innerText = "Lost Connection";
    popupDesc.innerHTML = "Your network is unavailable. We will attempt to reconnect you in <b>10</b> seconds.";
    popup.className = "popup show";
    document.querySelector(".centered-div").innerText="Connection broken . Go and fix it , then try again.";

    intervalId = setInterval(()=>{
        timer--;
        if(timer == 0){
            checkConnection();
        }
        popup.querySelector(".desc b").innerText = timer ;
    },1000);

    
}

setInterval(()=>
    online && checkConnection()
,3000);
btn.addEventListener("click",()=>{
    checkConnection();
})


// Another method is to use the navigator.onLine property . But that is not reliable always.so do it by calling api.