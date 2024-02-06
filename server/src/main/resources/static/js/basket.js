let basketString = localStorage.getItem("fooderos-sent6-basket");

let basketFoods = [];

let basketFoodsObjects = [];

let basketFoodsTableElement = document.getElementById("basket-foods-table");


let totalPriceElement = document.getElementById('total-price');

if (basketString != null) {
  basketFoods = JSON.parse(basketString);
}

async function getBasketFoods() {
  for (let i = 0; i < basketFoods.length; i++) {
    let basketFoodItem = basketFoods[i];

    let foodId = basketFoodItem.id;

    let requestStatus = null;

    let resultFood = await fetch(
      `http://localhost:3000/api/foods/${foodId}`
    ).then((response) => {
      requestStatus = response.status;

      return response.json();
    });

    if (requestStatus == 200) {
      basketFoodsObjects.push(resultFood);
    }
  }
}

async function insertBasketData(reload = false) {
  basketFoodsTableElement.innerHTML = "";

  if (reload) {
    await getBasketFoods();
  }

  for (let i = 0; i < basketFoodsObjects.length; i++) {
    let basketFoodsObject = basketFoodsObjects[i];

    let tr = document.createElement("tr");

    let idTd = document.createElement("td");

    let nameTd = document.createElement("td");

    let imageTd = document.createElement("td");

    let image = document.createElement("img");

    let priceTd = document.createElement("td");

    let quantityTd = document.createElement("td");

    let summaryTd = document.createElement("td");

    let quantityInput = document.createElement("input");



    let actionTd = document.createElement("td");

    let deleteButton = document.createElement("button");

    idTd.innerText = basketFoodsObject.id;

    nameTd.innerText = basketFoodsObject.name;

    image.src = basketFoodsObject.coverImg;

    image.style.width = "150px";

    image.style.height = "150px";

    image.style.objectFit = "cover";

    priceTd.innerText = basketFoodsObject.price + " AZN";

    quantityInput.setAttribute("class","form-control");

    quantityInput.style.width = "100px";

    quantityInput.placeholder = "Say:";

    quantityInput.setAttribute('id',`quantity${basketFoodsObject.id}`)

    quantityInput.value = 0;







    deleteButton.innerText = "Delete";

    deleteButton.setAttribute("class", "btn btn-danger");

    let basketFoodsObjectIndex = -1;

    let basketFoodIndex = -1;


    quantityInput.addEventListener("input",function(){

      summaryTd.innerText = Number(quantityInput.value) * basketFoodsObject.price + " AZN";

      countTotalPrice();



    });

    deleteButton.addEventListener("click", function () {

     


      basketFoodsObjects.find((iteratedBasketFoodObject, index) => {
        if (iteratedBasketFoodObject.id == basketFoodsObject.id) {
          basketFoodsObjectIndex = index;
        }
      });


      basketFoodsObjects.splice(basketFoodsObjectIndex,1);


      basketFoods.find((iteratedBasketFood, index) => {
          if (iteratedBasketFood.id == basketFoodsObject.id) {
            basketFoodIndex = index;
          }
        });
  
  
        basketFoodsObjects.splice(basketFoodsObjectIndex,1);
        basketFoods.splice(basketFoodIndex,1);


    localStorage.setItem('fooderos-sent6-basket',JSON.stringify(basketFoods));

    Swal.fire({
     icon: "success",
     title: "Basket",
     text: "Deleted from Basket",
     timer: 1200
   });

    insertBasketData(false);



    });

    
    



    imageTd.appendChild(image);

    quantityTd.appendChild(quantityInput);

    actionTd.appendChild(deleteButton);

    tr.appendChild(idTd);
    tr.appendChild(nameTd);
    tr.appendChild(imageTd);
    tr.appendChild(priceTd);
    tr.appendChild(quantityTd);
    tr.appendChild(summaryTd);
    tr.appendChild(actionTd);

    basketFoodsTableElement.appendChild(tr);
  }
}

function countTotalPrice(){

  totalPriceElement.innerText = 0;

  let sum = 0;

  for(let i = 0; i < basketFoodsObjects.length;i++){
    let basketFoodsObject = basketFoodsObjects[i];


    sum += Number(document.getElementById(`quantity${basketFoodsObject.id}`).value) * basketFoodsObject.price;

  }

  totalPriceElement.innerText = sum;

}

insertBasketData(true);
