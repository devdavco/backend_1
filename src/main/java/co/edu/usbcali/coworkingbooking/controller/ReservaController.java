package co.edu.usbcali.coworkingbooking.controller;


import co.edu.usbcali.coworkingbooking.dto.request.CreateReservaRequest;
import co.edu.usbcali.coworkingbooking.dto.request.UpdateReservaRequest;
import co.edu.usbcali.coworkingbooking.dto.response.CreateReservaResponse;
import co.edu.usbcali.coworkingbooking.dto.response.UpdateReservaResponse;
import co.edu.usbcali.coworkingbooking.service.ReservaService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/reserva")
public class ReservaController {

    private final ReservaService reservaService;


    @GetMapping("/ping")
    public String ping() {

        return "pong";
    }
    @PostMapping("/create")
    public ResponseEntity<CreateReservaResponse> createReserva(@RequestBody CreateReservaRequest createReservaRequest) throws Exception {
        CreateReservaResponse reservaCreated = reservaService.createReserva(createReservaRequest);
        return new ResponseEntity<>(
                reservaCreated,
                HttpStatus.CREATED

        );
    }

    @GetMapping("/all")
    public List<CreateReservaResponse> getAllReservas() {
        return reservaService.getAllReservas();
    }

    @GetMapping("/{id}")
    public CreateReservaResponse getReservabyId(@PathVariable Integer id) {
        return reservaService.getReservabyId(id);
    }


    // ReservaController.java
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarReserva(@PathVariable Integer id) {
            reservaService.eliminarReserva(id);
            return ResponseEntity.ok("Reserva eliminada exitosamente");

    }
/*
    //Update reserva
    @PutMapping("update/{id}")
    public ResponseEntity<CreateReservaResponse> updateReserva(@PathVariable Integer id,@RequestBody CreateReservaRequest requestDto) throws Exception {
        CreateReservaResponse responseDto = reservaService.actualizarParcial(id,requestDto);
        return new ResponseEntity<>(
                responseDto,
                HttpStatus.OK
        );
    }


 */

    //Update reserva
    @PutMapping("update/{id}")
    public ResponseEntity<UpdateReservaResponse> updateReserva(@PathVariable Integer id, @RequestBody UpdateReservaRequest requestDto) throws Exception {
        UpdateReservaResponse responseDto = reservaService.updateReserva(id,requestDto);
        return new ResponseEntity<>(
                responseDto,
                HttpStatus.OK
        );
    }
}
