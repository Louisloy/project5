


const displayAllProducts = () =>{
  //APIs 22
let url = "http://localhost:3000/api/teddies";
let xhr = new XMLHttpRequest();
xhr.open('GET', url);

    xhr.onload = function(){
        if(this.status == 200) {
            let products = JSON.parse(this.response);
            let productsList = "" ;
            products.forEach(product => {
            productsList += `				<li class="span3">
            <div class="thumbnail">
              <a  href="product_details.html?id=${product._id}"><img src="${product.imageUrl}" alt=""/></a>
              <div class="caption">
                <h5>${product.name}</h5>
                <p> 
                  Lorem Ipsum is simply dummy text. 
                </p>
               
                <h4 style="text-align:center"><a class="btn" href="product_details.html?id=${product._id}"> <i class="icon-zoom-in"></i></a> <a class="btn" href="#">Add to <i class="icon-shopping-cart"></i></a> <a class="btn btn-primary" href="#">$ ${product.price/100}</a></h4>
              </div>
            </div>
          </li> `;
            });
            let list = document.getElementById("productsList");
            list.innerHTML= productsList;
             if(this.status == 404) {
                document.getElementById('productsList').innerHTML = "404: Document Not Found!";
            }
        }
    }
    xhr.send();

}
displayAllProducts();


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