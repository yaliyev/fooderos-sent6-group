package az.developia.fooderos.sent6group.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="fooderos_orders")
public class Order {

	private Long id;
	private LocalDateTime orderDate;
	
	@ManyToOne
	@JoinColumn(name="customer_id")
	private Customer customer;
	
	
}
