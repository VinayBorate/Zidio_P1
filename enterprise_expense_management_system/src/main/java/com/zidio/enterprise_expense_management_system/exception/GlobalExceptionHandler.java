package com.zidio.enterprise_expense_management_system.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;
import com.zidio.enterprise_expense_management_system.util.ResponseStructure;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataNotFoundException.class)
    public ResponseEntity<ResponseStructure<String>> handleDataNotFoundException(DataNotFoundException ex) {
        ResponseStructure<String> response = new ResponseStructure<>();
        response.setMessage(ex.getMessage());
        response.setStatus(HttpStatus.NOT_FOUND.value());
        response.setData("No data found for the given request.");

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmailNotFoundException.class)
    public ResponseEntity<ResponseStructure<String>> handleEmailNotFoundException(EmailNotFoundException ex) {
        ResponseStructure<String> response = new ResponseStructure<>();
        response.setMessage(ex.getMessage());
        response.setStatus(HttpStatus.NOT_FOUND.value());
        response.setData("Email ID does not exist.");

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IncorrectPasswordException.class)
    public ResponseEntity<ResponseStructure<String>> handleIncorrectPasswordException(IncorrectPasswordException ex) {
        ResponseStructure<String> response = new ResponseStructure<>();
        response.setMessage(ex.getMessage());
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setData("Incorrect password entered.");

        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }
}
