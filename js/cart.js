
let total = 0;
const showCart = () => {

  //retrieve cart info
  let productsInCart = JSON.parse(localStorage.getItem('productInCart'));
  let content = "";
  productsInCart.forEach(item => {
    content += `<tr>
    <td> <img width="60" src=${item.imageUrl} alt=""></td>
    <td>${item.name}<br>${item.description}: black, Material : metal</td>
    <td>
      <div class="input-append"><input class="span1" style="max-width:34px" placeholder="1"value="${item.quantity}" size="16" type="text"><button class="btn btn-danger" type="button"><i class="icon-remove icon-white"></i></button>				</div>
    </td>
    <td>$${item.price / 100}</td>
    <td>$${(item.price * item.quantity / 100)}</td>
  </tr>`;
    total += (item.price * item.quantity / 100);
  });
  //display
  console.log(productsInCart)
  let productDisplayed = document.getElementById("cart");
  productDisplayed.innerHTML += content;
  let totalDiv = document.getElementById("total");
  totalDiv.innerHTML = total;
}

showCart();



const placeOrder = (t) => {

  //retrieve list of contact
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let email = document.getElementById("email").value;

  //validate
  if (validate(firstName, lastName, address, city, email)) {

    //if true
    contact ={
      firstName: firstName,
      lastName : lastName,
      address : address,
      city : city,
      email : email
    }



    //retrieve list product ids and store in product array
    let productsInCart = JSON.parse(localStorage.getItem('productInCart'));
    let productsId = [];
      productsInCart.forEach((item) => {
      productsId.push(item._id)
    });
    console.log(productsId);

    

    //execute AJAX post to the server 

    let url = "http://localhost:3000/api/teddies/order";
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {

        let response = JSON.parse(this.responseText);
        
        //alert(response.orderId)
        window.location = `confirmation.html?orderId=${response.orderId}&total=${t}`
        


      }else{
        alert("there is an error in the post request");
      }
    }

    let data = JSON.stringify({"contact":contact,"products":productsId})
    xhr.setRequestHeader("content-type","application/json")

    xhr.send(data);


    //redirrect reponse if successful to the confirmation page



  } else {
    alert("Please make sure to provide all fields values !");

  }
}

const validate = (fname, lname, address, city, email) => {

  if (fname == "" || lname == "" || address == "" || city == "" || email == "") {
    return false;

  } else {
    return true;
  }
}

let submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  placeOrder(total);

})


const updateCartNumber = () =>{
//retrieve items from local storage
  let products= JSON.parse(localStorage.getItem("productInCart"));
  if (products !=null){
  let quantity = 0;
//loop using forEach and count the quantity
products.forEach((item)=>{
quantity += item.quantity;
});
  
//display the quantity to the cart icon
let cartIcon = document.getElementById("qty");
cartIcon.innerHTML = quantity;
  
}
}

updateCartNumber()