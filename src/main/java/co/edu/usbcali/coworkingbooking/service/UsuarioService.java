package co.edu.usbcali.coworkingbooking.service;

import co.edu.usbcali.coworkingbooking.dto.request.CreateUsuarioRequest;
import co.edu.usbcali.coworkingbooking.dto.response.CreateReservaResponse;
import co.edu.usbcali.coworkingbooking.dto.response.GetUsuarioResponse;

import java.util.List;

public interface UsuarioService {

    GetUsuarioResponse createUsuario(CreateUsuarioRequest createUsuarioRequest) throws Exception;
    List<GetUsuarioResponse> getAllUsuarios();
    GetUsuarioResponse getUsuarioById(Integer id);
    void eliminarUsuario(Integer id);
}
