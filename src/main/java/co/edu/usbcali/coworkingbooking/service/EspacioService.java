package co.edu.usbcali.coworkingbooking.service;

import co.edu.usbcali.coworkingbooking.dto.request.CreateEspacioRequest;
import co.edu.usbcali.coworkingbooking.dto.response.GetEspacioResponse;

public interface EspacioService {

    GetEspacioResponse createEspacio(CreateEspacioRequest createEspacioRequest) throws Exception;


}
