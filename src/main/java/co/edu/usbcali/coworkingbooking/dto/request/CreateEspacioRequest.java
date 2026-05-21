package co.edu.usbcali.coworkingbooking.dto.request;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
//@Builder
@AllArgsConstructor
@Valid
public class CreateEspacioRequest {


    private String nombre;
    private String tipo;
    private Integer capacidad;
    private Integer minutos_limpieza;
}
