package az.developia.fooderos.sent6group.advice;

import javax.persistence.EntityNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import az.developia.fooderos.sent6group.exception.FoodNotFoundException;
import az.developia.fooderos.sent6group.model.Message;

@RestControllerAdvice
public class ApplicationErrorHandler {

	@ExceptionHandler(FoodNotFoundException.class)
	public ResponseEntity<Message> handleFoodNotFoundException(FoodNotFoundException exception){
		return new ResponseEntity<Message>(new Message(exception.getMessage()),HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<Message> handleEntityNotFoundException(EntityNotFoundException exception){
		return new ResponseEntity<Message>(new Message(exception.getMessage()),HttpStatus.NOT_FOUND);
	}
	
	
}
