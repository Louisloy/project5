let teddy;
const displaySingleProduct = (id) =>{
let url= "http://localhost:3000/api/teddies/" + id;
let xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.onload = function(){
    if(this.status == 200) {
      teddy = JSON.parse(this.response);
      let colors = "";
      teddy.colors.forEach(  (color) =>{

        colors += `<option>${color}</option>`;


      })

        let product="";
        product=`<div id="gallery" class="span3">
        <a href="themes/images/products/large/f1.jpg" title="Fujifilm FinePix S2950 Digital Camera">
            <img src="${teddy.imageUrl}" style="width:100%" alt="Fujifilm FinePix S2950 Digital Camera"/>
        </a>
        
        </div>
        <div class="span6">
            <h3>${teddy.name}  </h3>
            <small>- ${teddy.description}</small>
            <hr class="soft"/>
            <form class="form-horizontal qtyFrm">
              <div class="control-group">
                <label class="control-label"><span>$ ${teddy.price/100}</span></label>
                <div class="controls">
                <input type="number" class="span1" placeholder="Qty."/>
                 
                </div>
              </div>
            </form>
            
            <hr class="soft"/>
            <form class="form-horizontal qtyFrm pull-right">
              <div class="control-group">
                <label class="control-label"><span>Color</span></label>
                <div class="controls">
                  <select class="span2">
                      ${colors}
                    </select>
                </div>
              </div>
            </form>
            <hr class="soft clr"/>
            
            <br class="clr"/>
        <a href="#" name="detail"></a>
        <hr class="soft"/>
        </div>`;
        let list = document.getElementById("product");
            list.innerHTML += product;
        
    }
    
    if(this.status == 404) {
        document.getElementById('productsList').innerHTML = "404: Document Not Found!";
    }
}
xhr.send();

}
//Code to retrieve the id
let url = window.location.href;
let newURL = new URL(url);
let id = newURL.searchParams.get('id');
if(id!=''){
    
    displaySingleProduct(id);
}

let addToCartBtn = document.getElementById('addToCart');
addToCartBtn.addEventListener('click', ()=>{
    addToCart(teddy)
})

const addToCart = (teddy) => {

    //Add the quantity property
    teddy.quantity = 1;
    //Verify that the local storage product array exist
    let productArray = JSON.parse(localStorage.getItem('productInCart'));

    //if exist
    if(productArray == null)
    {
      productArray = [];
      productArray.push(teddy)
    }else{
        //from the array check if this product is already added 
        let index = productArray.findIndex(o => o._id == teddy._id);

       
        //product not added add the product
        if(index != -1){
            //product is added increase quantity
           productArray[index].quantity +=1 ;
        }else{
            //product is not added before then add the product
            productArray.push(teddy)
        }

    }

    //save the array in the local storage
    localStorage.setItem('productInCart',JSON.stringify(productArray))
    
}



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

