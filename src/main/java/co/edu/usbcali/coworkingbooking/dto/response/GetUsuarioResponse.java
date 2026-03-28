package co.edu.usbcali.coworkingbooking.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetUsuarioResponse {

    private Integer id;
    private String nombre;
    private String email;
    private String password_hash;
    private String rol;

}
