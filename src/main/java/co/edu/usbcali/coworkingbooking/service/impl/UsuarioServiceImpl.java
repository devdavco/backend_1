package co.edu.usbcali.coworkingbooking.service.impl;

import co.edu.usbcali.coworkingbooking.dto.request.CreateUsuarioRequest;
import co.edu.usbcali.coworkingbooking.dto.response.GetUsuarioResponse;
import co.edu.usbcali.coworkingbooking.mapper.UsuarioMapper;
import co.edu.usbcali.coworkingbooking.model.Usuario;
import co.edu.usbcali.coworkingbooking.repository.UsuarioRepository;
import co.edu.usbcali.coworkingbooking.service.UsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {
    private final UsuarioRepository usuarioRepository;

    @Override

    public GetUsuarioResponse createUsuario(CreateUsuarioRequest createUsuarioRequest) throws Exception {
        try {
            if(createUsuarioRequest ==null){
                throw new Exception("El objeto no puede ser nulo.");

            }

            Usuario usuario = UsuarioMapper.createUsuarioRequestToEntity(createUsuarioRequest);
            usuario = usuarioRepository.save(usuario);

            GetUsuarioResponse getUsuarioResponse = UsuarioMapper.entityToGetUsuarioResponse(usuario);
            return getUsuarioResponse;

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<GetUsuarioResponse> getAllUsuarios() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        List<GetUsuarioResponse> getUsuarioResponseList = UsuarioMapper.entityToListGetUsuarioResponse(usuarios);

        return getUsuarioResponseList;
    }

    @Override
    public GetUsuarioResponse getUsuarioById(Integer id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: "+ id));
        return UsuarioMapper.entityToGetUsuarioResponse(usuario);
    }

}
