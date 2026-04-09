package co.edu.usbcali.coworkingbooking.dto.request;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
//@Builder
@AllArgsConstructor
public class CreateEspacioRequest {


    private String nombre;
    private String tipo;
    private Integer capacidad;
    private Integer minutos_limpieza;
}
