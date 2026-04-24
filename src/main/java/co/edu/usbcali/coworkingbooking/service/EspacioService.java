package co.edu.usbcali.coworkingbooking.service;

import co.edu.usbcali.coworkingbooking.dto.request.CreateEspacioRequest;
import co.edu.usbcali.coworkingbooking.dto.response.GetEspacioResponse;

import java.util.List;

public interface EspacioService {

    GetEspacioResponse createEspacio(CreateEspacioRequest createEspacioRequest) throws Exception;
    List<GetEspacioResponse> getAllEspacios();
    GetEspacioResponse getEspacioById(Integer id);
    void eliminarEspacio(Integer id);
}
