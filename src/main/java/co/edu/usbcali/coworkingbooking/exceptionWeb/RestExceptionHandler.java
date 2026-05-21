package co.edu.usbcali.coworkingbooking.exceptionWeb;

import co.edu.usbcali.coworkingbooking.exception.UsuarioAlreadyExistsException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RestExceptionHandler {
    @ExceptionHandler(UsuarioAlreadyExistsException.class)
    public ResponseEntity<Error> handleException(UsuarioAlreadyExistsException ex) {
        Error error = new Error("email-alredy-exist", ex.getMessage());
        return ResponseEntity.badRequest().body(error);
    }
}
