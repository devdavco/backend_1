package co.edu.usbcali.coworkingbooking.controller;

import co.edu.usbcali.coworkingbooking.dto.request.CreateEspacioRequest;
import co.edu.usbcali.coworkingbooking.dto.response.CreateReservaResponse;
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
    private final EspacioService espacioService;

    @GetMapping("/ping")
    public String ping() {

        return "pong";
    }


    @GetMapping("/all")
    public List<GetEspacioResponse> getAllEspacios() {
        return espacioService.getAllEspacios();
    }



    @GetMapping("/{id}")
    public GetEspacioResponse getEspacioById(@PathVariable Integer id) {
        return espacioService.getEspacioById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<GetEspacioResponse> createEspacio(@RequestBody CreateEspacioRequest createEspacioRequest) throws Exception {
        GetEspacioResponse espacioCreated = espacioService.createEspacio(createEspacioRequest);
        return new ResponseEntity<>(
                espacioCreated,
                HttpStatus.CREATED

        );
    }
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarEspacio(@PathVariable Integer id) {
        espacioService.eliminarEspacio(id);
        return ResponseEntity.ok("Reserva eliminada exitosamente");
    }


}

