package az.developia.fooderos.sent6group.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import az.developia.fooderos.sent6group.model.Food;
import az.developia.fooderos.sent6group.model.Restaurant;

public interface FoodRepository extends JpaRepository<Food, Long>{
	
	public List<Food> findAllByRestaurant(Restaurant restaurant);
	

}
