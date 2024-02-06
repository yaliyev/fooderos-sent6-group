package az.developia.fooderos.sent6group.model;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="fooderos_orderitems")
public class OrderItem {
	
	private Long id;
	
	@OneToOne
	@JoinColumn(name="food_id")
	private Food food;
	
	private Integer quantity;
	
	@ManyToOne
	@JoinColumn(name="order_id")
	private Order order;
	
	

}
