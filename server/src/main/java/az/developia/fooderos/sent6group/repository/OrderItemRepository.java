package az.developia.fooderos.sent6group.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import az.developia.fooderos.sent6group.model.Food;
import az.developia.fooderos.sent6group.model.OrderItem;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long>{

	public List<OrderItem> findAllByFood(Food food);
}
