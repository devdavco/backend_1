package co.edu.usbcali.coworkingbooking.service.impl;

import co.edu.usbcali.coworkingbooking.dto.request.CreateEspacioRequest;
import co.edu.usbcali.coworkingbooking.dto.response.GetEspacioResponse;
import co.edu.usbcali.coworkingbooking.dto.response.GetUsuarioResponse;
import co.edu.usbcali.coworkingbooking.mapper.EspacioMapper;
import co.edu.usbcali.coworkingbooking.model.Espacio;
import co.edu.usbcali.coworkingbooking.repository.EspacioRepository;
import co.edu.usbcali.coworkingbooking.service.EspacioService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor

public class EspacioServiceImpl implements EspacioService {

    private final EspacioRepository espacioRepository;

    @Override
    public GetEspacioResponse createEspacio(CreateEspacioRequest createEspacioRequest) throws Exception{

        try {
                if (createEspacioRequest == null){
                    throw new Exception("El objeto no puede ser nulo.");
                }
                if(createEspacioRequest.getNombre() == null || createEspacioRequest.getNombre().isBlank()){
                    throw new Exception("El nombre no puede ser nulo.");
                }
                if(createEspacioRequest.getTipo() == null || createEspacioRequest.getTipo().isBlank()){
                    throw new Exception("El tipo no puede ser nulo.");
                }
                if(createEspacioRequest.getCapacidad() == null || createEspacioRequest.getCapacidad() == 0 ){
                    throw new Exception("El capacidad no puede ser cero/nulo.");
                }
                if(createEspacioRequest.getMinutos_limpieza() == null || createEspacioRequest.getMinutos_limpieza() == 0 ){
                    throw new Exception("Minutos limpieza no puede ser cero/nulo.");
                }
                // Convertir desde el request
                Espacio espacio = EspacioMapper.createEspacioRequestToEntity(createEspacioRequest);

                espacio =  espacioRepository.save(espacio);

            GetEspacioResponse getEspacioResponse = EspacioMapper.entityToGetEspacioResponse(espacio);

            return getEspacioResponse;

        } catch ( Exception e ){
            throw e;
        }
    }
}
