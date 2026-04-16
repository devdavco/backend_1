package co.edu.usbcali.coworkingbooking.service;

import co.edu.usbcali.coworkingbooking.dto.request.CreateReservaRequest;
import co.edu.usbcali.coworkingbooking.dto.response.CreateReservaResponse;

public interface ReservaService {

        CreateReservaResponse createReserva(CreateReservaRequest createReservaRequest) throws Exception;

}
