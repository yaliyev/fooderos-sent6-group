let basketString = localStorage.getItem("fooderos-sent6-basket");

let basketFoods = [];

if (basketString != null) {
  basketFoods = JSON.parse(basketString);
  console.log(basketFoods)
}

async function confirmOrder(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;

  const surname = document.getElementById("surname").value;

  const telephoneNumber = document.getElementById("telephonenumber").value;

  const address = document.getElementById("address").value;

  let customerId = null;

  const customer = {
    name: name,
    surname: surname,
    telephoneNumber: telephoneNumber,
    address: address,
  };

  let isCustomerExistStatus = null;

  let isCustomerExistResponse = await fetch(
    `http://localhost:3000/api/customers/${customer.telephoneNumber}`,
    {
      method: "GET",
    }
  ).then((response) => {
    isCustomerExistStatus = response.status;
    return response.json();
  });

  if (isCustomerExistStatus == 200) {
    customerId = isCustomerExistResponse.id;
  } else if (isCustomerExistStatus == 404) {
    let customerResponseStatus = null;
    let customerResponse = await fetch(
      "http://localhost:3000/api/customers/addCustomer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      }
    ).then((response) => {
      customerResponseStatus = response.status;

      return response.json();
    });

    if (customerResponseStatus == 201) {
      customerId = customerResponse.id;

      Swal.fire({
        icon: "success",
        title: "Customer",
        text: "Customer created",
        timer: 1200
      });
    }
  }


  // order yaranmasi


  let orderResponseStatus = null;

  let orderResponse = await fetch('http://localhost:3000/api/orders/addOrder',{
    method:'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({customer:{id:customerId} })
  }).then((response)=>{

    orderResponseStatus = response.status;

    return response.json();
  });

  if(orderResponseStatus == 201){
    
  for(let i = 0; basketFoods.length;i++ ){

    let food = basketFoods[i];

  


    let orderItem = {

      food:{
        id: food.id
      },
      quantity: food.quantity,
      order:{
        id: orderResponse.id
      }
      
    }

    let orderItemResponseStatus = null;

    let orderItemResponse = await fetch('http://localhost:3000/api/orders/items/addOrderItem',{
    method:'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderItem)
  }).then((response)=>{

    orderItemResponseStatus = response.status;

    return response.json();
  });

  if(orderItemResponseStatus == 201){

    basketFoods = [];

    localStorage.setItem("fooderos-sent6-basket",JSON.stringify(basketFoods));

    window.location.replace("/templates/home.html");

  }

  }


  }

}
