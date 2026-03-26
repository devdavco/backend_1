package co.edu.usbcali.coworkingbooking.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetEspacioResponse {

    private Integer id;
    private String nombre;
    private String tipo;
}
