package co.edu.usbcali.coworkingbooking.controller;

import co.edu.usbcali.coworkingbooking.model.Espacio;
import co.edu.usbcali.coworkingbooking.repository.EspacioRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/usuarios")
public class EspacioController {

   private final EspacioRepository espacioRepository;


   @GetMapping("/ping")
   public String ping() {

       return "pong";
   }


   @GetMapping("/all")
   public List<Espacio> getAllEspacios(){
       return espacioRepository.findAll();

   }

   @GetMapping("/{id}")
   public ResponseEntity<Espacio> getEspacioById(@PathVariable Integer id){
       return new ResponseEntity<>(
               espacioRepository.getReferenceById(id),
               HttpStatus.OK
       );
   }

}

