package az.developia.fooderos.sent6group.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import az.developia.fooderos.sent6group.model.Order;
import az.developia.fooderos.sent6group.repository.OrderRepository;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/api/orders")
public class OrderRestController {
	
	@Autowired
	private OrderRepository orderRepository;
	
	
	@PostMapping("/addOrder")
	public ResponseEntity<Order> addOrder(@RequestBody Order order){
		
		order.setId((long) (0));
		
		order.setOrderDate(LocalDateTime.now());
		
		Order resultOrder = orderRepository.save(order);
		
		return new ResponseEntity<Order>(resultOrder,HttpStatus.CREATED);
	}
	
	

}
