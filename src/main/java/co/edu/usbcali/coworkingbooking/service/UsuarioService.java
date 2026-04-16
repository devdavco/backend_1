package co.edu.usbcali.coworkingbooking.service;

import co.edu.usbcali.coworkingbooking.dto.request.CreateUsuarioRequest;
import co.edu.usbcali.coworkingbooking.dto.response.GetUsuarioResponse;

public interface UsuarioService {

    GetUsuarioResponse createUsuario(CreateUsuarioRequest createUsuarioRequest) throws Exception;

}
