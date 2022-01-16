package com.example.rest.webservices.restfulwebservices.todo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;


@Service
public class TodoHardCodedService {
	
	private static List<Todo> todos = new ArrayList<Todo>(); 
	private static int idCounter = 0; 
	
	
	static {
		todos.add(new Todo(++idCounter, "rishi patel", "Learn Full Stack Development", new Date(), false)); 
		todos.add(new Todo(++idCounter, "Demo Name", "Learn microservices", new Date(), false)); 
		todos.add(new Todo(++idCounter, "Jainam Desai", "Learn C++", new Date(), false)); 
	}
	
	
	public List<Todo> findAll(){
		return todos; 
	}
	
	public Todo save(Todo todo) {
		if(todo.getId() == -1) {
			todo.setId(++idCounter);
			todos.add(todo); 
		}
		else {
			deleteById(todo.getId()); 
			todos.add(todo); 
		}
		
		return todo;
	}
	
	public Todo deleteById(long id) {
		Todo todo = findById(id); 
		
		if(todo==null) return null; 
		
		if(todos.remove(todo)) {
			return todo;
		}
		 
		return null;
		
	}

	public Todo findById(long id) {
		for (Todo todo:todos) {
			if(todo.getId() == id) {
				return todo; 
			}
		}
		return null; 
	}
	
}
