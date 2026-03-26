package co.edu.usbcali.coworkingbooking.mapper;

import co.edu.usbcali.coworkingbooking.dto.response.GetEspacioResponse;
import co.edu.usbcali.coworkingbooking.model.Espacio;

import java.util.ArrayList;
import java.util.List;

public class EspacioMapper {

    public static GetEspacioResponse entityToGetEspacioResponse(Espacio espacio) {

        //instanciar nuevo objeto GetEspacioResponse

        GetEspacioResponse getEspacioResponse = GetEspacioResponse.builder()
                .id(espacio.getId())
                .nombre(espacio.getNombre())
                .tipo(espacio.getTipo())
                .build();
        return getEspacioResponse;
    }

    public static List<GetEspacioResponse> entityToListGetEspacioResponse(List<Espacio> espacios) {
    /*
        //instanciar lista de DTO GetEspacioResponse vacia inicialmente
        List <GetEspacioResponse> getEspacioResponseList = new ArrayList<>();

        //Iterar sobre la lista de
        for(int i =0 ;i<espacios.size();i++){
            Espacio espacio = espacios.get(i);
            GetEspacioResponse getEspacioResponse = entityToGetEspacioResponse(espacio);

            getEspacioResponseList.add(getEspacioResponse);


        }
*/
        return espacios.stream().map(EspacioMapper::entityToGetEspacioResponse).toList();
    }
}
