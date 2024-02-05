package az.developia.fooderos.sent6group.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GeneratorType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "fooderos_foods")
public class Food {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto Increment
  private Long id;
  private String name;
  private String ingredients;
  private Double price;
  private String coverImg;
  
  @ManyToOne
  @JoinColumn(name="restaurant_id")
  private Restaurant restaurant;
  
  
}
