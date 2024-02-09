package az.developia.fooderos.sent6group.repository;

import org.springframework.context.annotation.Scope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import az.developia.fooderos.sent6group.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer>{

}
