let basketString  = localStorage.getItem('fooderos-sent6-basket');


let basketFoods = [];

let basketFoodsObjects = [];


let basketFoodsTableElement = document.getElementById('basket-foods-table');

if(basketString != null){
     basketFoods = JSON.parse(basketString);
}



async function getBasketFoods(){

     for(let i = 0; i < basketFoods.length;i++){


          let basketFoodItem = basketFoods[i];

          let foodId = basketFoodItem.id;

          let requestStatus = null;

          let resultFood = await fetch(`http://localhost:3000/api/foods/${foodId}`).then(response=>{

               requestStatus = response.status;

               return response.json();
          })

          if(requestStatus == 200){
              basketFoodsObjects.push(resultFood);
          }
  
          
          


     }


}

async function insertBasketData(reload = false){


     basketFoodsObjects = [];
     basketFoodsTableElement.innerHTML = "";
     

     if(reload){

          await getBasketFoods();

     }


     for(let i = 0; i < basketFoodsObjects.length;i++){

      let basketFoodsObject = basketFoodsObjects[i];    


     //      <!-- <tr>
     //      <td>1</td>
     //      <td>Hamburger</td>
     //      <td>
     //           <img src="https://s7d1.scene7.com/is/image/mcdonalds/Header_Hamburger_832x472:1-3-product-tile-desktop?wid=763&hei=472&dpr=off" style="width: 150px;height: 150px;object-fit: cover;" alt="">
     //      </td>
     //      <td>
     //           4.5
     //      </td>
     //      <td>
     //           <button class="btn btn-danger">Delete</button>
     //      </td>
     // </tr> -->


     let tr = document.createElement("tr");

     let idTd = document.createElement("td");

     let nameTd = document.createElement("td");

     let imageTd = document.createElement("td");

     let image = document.createElement("img");

     let priceTd = document.createElement("td");

     let actionTd = document.createElement("td");

     let deleteButton = document.createElement("button");


     idTd.innerText = basketFoodsObject.id;

     nameTd.innerText = basketFoodsObject.name;

     image.src = basketFoodsObject.coverImg;

     image.style.width = "150px";

     image.style.height = "150px";

     image.style.objectFit = "cover";

     priceTd.innerText = basketFoodsObject.price + " AZN";

     deleteButton.innerText = "Delete";

     deleteButton.setAttribute("class","btn btn-danger");



     imageTd.appendChild(image);

     actionTd.appendChild(deleteButton);


     tr.appendChild(idTd);
     tr.appendChild(nameTd);
     tr.appendChild(imageTd);
     tr.appendChild(priceTd);
     tr.appendChild(actionTd);


     basketFoodsTableElement.appendChild(tr);

     




     }
}

insertBasketData(true);




