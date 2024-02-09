package az.developia.fooderos.sent6group.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import az.developia.fooderos.sent6group.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long>{

	public Optional<Customer> findByTelephoneNumber(String telephoneNumber);
	
	
	
}
