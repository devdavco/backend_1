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

    private final UsuarioRepository usuarioRepository;
    private final UsuarioService  usuarioService;

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }

    @GetMapping("/all")
    public List<GetUsuarioResponse> getAllUsuarios(){

        List<GetUsuarioResponse> usuariosResponse;
        List<Usuario> usuarios = usuarioRepository.findAll();
//hola
        usuariosResponse = UsuarioMapper.entityToListGetUsuarioResponse(usuarios);
        return usuariosResponse;
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetUsuarioResponse> getUsuarioById(@PathVariable Integer id){

        Usuario usuario = usuarioRepository.getReferenceById(id);
        GetUsuarioResponse usuarioResponse = UsuarioMapper.entityToGetUsuarioResponse(usuario);

        return new ResponseEntity<>(
                usuarioResponse, HttpStatus.OK
        );
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
