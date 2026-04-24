package co.edu.usbcali.coworkingbooking.controller;

import co.edu.usbcali.coworkingbooking.dto.request.CreateUsuarioRequest;
import co.edu.usbcali.coworkingbooking.dto.response.GetUsuarioResponse;
import co.edu.usbcali.coworkingbooking.mapper.UsuarioMapper;
import co.edu.usbcali.coworkingbooking.model.Usuario;
import co.edu.usbcali.coworkingbooking.repository.UsuarioRepository;
import co.edu.usbcali.coworkingbooking.service.UsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService  usuarioService;

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }

    @GetMapping("/all")
    public List<GetUsuarioResponse> getAllUsuarios(){
        return usuarioService.getAllUsuarios();
    }

    @GetMapping("/{id}")
    public GetUsuarioResponse getUsuarioById(@PathVariable Integer id){
        return usuarioService.getUsuarioById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<GetUsuarioResponse> createUsuario(@RequestBody CreateUsuarioRequest createUsuarioRequest) throws Exception{
        GetUsuarioResponse usuarioCreated = usuarioService.createUsuario(createUsuarioRequest);
        return new ResponseEntity<>(
                usuarioCreated,
                HttpStatus.CREATED
        );
    }

}
