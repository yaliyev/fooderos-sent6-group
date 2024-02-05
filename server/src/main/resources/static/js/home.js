
let foods = [];

let foodCardsElement = document.getElementById('food-cards');


// changePageFunctions

let searchBoxInputElement = document.getElementById('search-box-input');


let basketString  = localStorage.getItem('fooderos-sent6-basket');


let basketFoods = [];

if(basketString != null){
     basketFoods = JSON.parse(basketString);
}

searchBoxInputElement.addEventListener('input',(e)=>{

     let inputValue = e.target.value;

     let searchResultFoods = [];


     if(inputValue.trim() == ""){
          insertFoodsData(true);
     }

     for(let i = 0; i < foods.length;i++){
          
let food = foods[i];

if(food.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 || food.restaurant.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ){
     searchResultFoods.push(food);
}

     }

     foods = searchResultFoods;

     insertFoodsData(false);
  
});


async function getFoods(){
     foods = await fetch('http://localhost:3000/api/foods').then(response=>response.json());

     
}

async function insertFoodsData(reload = false){
   if(reload == true){
     await getFoods();
   }
foodCardsElement.innerHTML = "";
   for(let i = 0;i < foods.length;i++){

     let food = foods[i];

     let card = `
     
     <div class="col-9 col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-9 mt-3">
                         <div class="card">
                              <img src="${food.coverImg}"
                                   class="card-img-top" style="display:block;height:250px;object-fit:cover;object-position: 50% 50%" alt="...">
                              <div class="card-body">
                                   <h5 class="card-title">${food.name}</h5>
                                   <p class="card-text">${food.restaurant.name}</p>
                                   <p class="card-text">Price: ${food.price} AZN</p>
                                   <div class="d-flex justify-content-center ">
                                        <button onclick="addToBasket(${food.id})" class="btn btn-warning text-white">Basket</button>
                                   </div>

                              </div>
                         </div>
                    </div>

     `;

     foodCardsElement.innerHTML += card; 



   }
}

function addToBasket(id){

     let exist = false;

     basketFoods.find((basketItem)=>{
          if(basketItem.id == id){
               exist = true;
               return basketItem;
          }
     })
     
     if(exist){
          Swal.fire({
               icon: "error",
               title: "Basket",
               text: "Alreaady added to basket",
               timer: 1200
             });
     }else{

          basketFoods.push({id: id});

          localStorage.setItem('fooderos-sent6-basket',JSON.stringify(basketFoods));

          Swal.fire({
               icon: "success",
               title: "Basket",
               text: "Added to basket",
               timer: 1200
             });
     }

}

insertFoodsData(true);