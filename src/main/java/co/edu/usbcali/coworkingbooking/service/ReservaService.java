package co.edu.usbcali.coworkingbooking.service;

import co.edu.usbcali.coworkingbooking.dto.request.CreateReservaRequest;
import co.edu.usbcali.coworkingbooking.dto.response.CreateReservaResponse;

import java.util.List;

public interface ReservaService {

        CreateReservaResponse createReserva(CreateReservaRequest createReservaRequest) throws Exception;
        List<CreateReservaResponse> getAllReservas();
        CreateReservaResponse getReservabyId(Integer id);
        void eliminarReserva(Integer id);
        CreateReservaResponse actualizarParcial(Integer id, CreateReservaRequest requestDto) throws Exception;
}
