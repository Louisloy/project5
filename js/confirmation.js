
//retrieve data ffrom the url
let url = window.location.href;
let newURL = new URL(url);
let orderId= newURL.searchParams.get("orderId");
let total = newURL.searchParams.get("total");



//assign those data to the html using DOM
let orderIdSpan = document.getElementById("orderId")
orderIdSpan.innerHTML = orderId;

let totalSpan = document.getElementById("total")
totalSpan.innerHTML = total;


