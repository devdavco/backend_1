package co.edu.usbcali.coworkingbooking.controller;

import co.edu.usbcali.coworkingbooking.dto.request.CreateEspacioRequest;
import co.edu.usbcali.coworkingbooking.dto.response.GetEspacioResponse;
import co.edu.usbcali.coworkingbooking.mapper.EspacioMapper;
import co.edu.usbcali.coworkingbooking.model.Espacio;
import co.edu.usbcali.coworkingbooking.repository.EspacioRepository;
import co.edu.usbcali.coworkingbooking.service.EspacioService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/espacios")
public class EspacioController {
    //inyecciones de dependencias en el controller
    private final EspacioRepository espacioRepository;
    private final EspacioService espacioService;

    @GetMapping("/ping")
    public String ping() {

        return "pong";
    }

    @GetMapping("/all")
    public List<GetEspacioResponse> getAllEspacios() {

        List<GetEspacioResponse> espaciosResponse;

        //declara nueva lista de EspaciosResponse
        List<Espacio> espacios = espacioRepository.findAll();

        // Ir al Repository y obtener todos los espacios

        espaciosResponse = EspacioMapper.entityToListGetEspacioResponse(espacios);

        return espaciosResponse;

    }

    @GetMapping("/{id}")
    public ResponseEntity<GetEspacioResponse> getEspacioById(@PathVariable Integer id) {

        Espacio espacio = espacioRepository.getReferenceById(id);

        GetEspacioResponse espacioResponse = EspacioMapper.entityToGetEspacioResponse(espacio);

        return new ResponseEntity<>(
                espacioResponse,
                HttpStatus.OK
        );
    }

    @PostMapping("/create")
    public ResponseEntity<GetEspacioResponse> createEspacio(@RequestBody CreateEspacioRequest createEspacioRequest) throws Exception {
        GetEspacioResponse espacioCreated = espacioService.createEspacio(createEspacioRequest);
        return new ResponseEntity<>(
                espacioCreated,
                HttpStatus.CREATED

        );
    }


}

