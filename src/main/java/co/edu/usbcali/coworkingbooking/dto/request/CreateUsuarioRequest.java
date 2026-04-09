package co.edu.usbcali.coworkingbooking.dto.request;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateUsuarioRequest {

    private String nombre;
    private String email;
    private String password_hash;
    private String rol;

}
