package az.developia.fooderos.sent6group.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import az.developia.fooderos.sent6group.model.Food;
import az.developia.fooderos.sent6group.model.OrderItem;
import az.developia.fooderos.sent6group.model.Restaurant;
import az.developia.fooderos.sent6group.repository.FoodRepository;
import az.developia.fooderos.sent6group.repository.OrderItemRepository;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/api/orders/items")
public class OrderItemRestController {
	
	@Autowired
	public OrderItemRepository orderItemRepository;
	
	@Autowired 
	public FoodRepository foodRepository;
	
	@PostMapping("/addOrderItem")
	public ResponseEntity<OrderItem> addOrderItem(@RequestBody OrderItem orderItem){
		
		orderItem.setId((long)(0));
		
		OrderItem resultOrderItem = orderItemRepository.save(orderItem);
		
		return new ResponseEntity<OrderItem>(resultOrderItem,HttpStatus.CREATED);
		
	}
	
	@GetMapping("/{restaurantId}")
	public ResponseEntity<List<OrderItem>> getAllFoodsByRestaurantId(@PathVariable Long restaurantId){
		
		List<OrderItem> allOrderItems = new ArrayList<>();
		
		Restaurant restaurant = new Restaurant();
		
		restaurant.setId(restaurantId);
		
		List<Food> resultFood = foodRepository.findAllByRestaurant(restaurant);
		
		for(int i =0;i < resultFood.size();i++) {
			
			Food food = resultFood.get(0);
			
			
			
			List<OrderItem> resultOrderItems = orderItemRepository.findAllByFood(food);
			
			allOrderItems.addAll(resultOrderItems);
			
			
			
			
		}
		
		
		return new ResponseEntity<List<OrderItem>>( allOrderItems,HttpStatus.OK);
		
		
	}

}
