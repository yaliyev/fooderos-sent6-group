package az.developia.fooderos.sent6group.controller;

import java.util.Optional;

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

import az.developia.fooderos.sent6group.exception.CustomerNotFoundException;
import az.developia.fooderos.sent6group.model.Customer;
import az.developia.fooderos.sent6group.repository.CustomerRepository;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/api/customers")
public class CustomerRestController {
	
	@Autowired
	private CustomerRepository customerRepository;

	@PostMapping("/addCustomer")
	public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer){
		
		customer.setId((long) (0));
		
		 Customer resultCustomer = customerRepository.save(customer);
		
		return new ResponseEntity<Customer>(resultCustomer,HttpStatus.CREATED);
	}
	
	@GetMapping("/{telephoneNumber}")
	public ResponseEntity<Customer> findCustomerByTelephoneNumber(@PathVariable String telephoneNumber){
		
		Optional<Customer> resultCustomer = customerRepository.findByTelephoneNumber(telephoneNumber);
		
		if(resultCustomer.isEmpty()) {
			throw new CustomerNotFoundException("customer is not found");
		}
		
		
		return new ResponseEntity<Customer>(resultCustomer.get(),HttpStatus.OK);
		
		
	}
	
}
