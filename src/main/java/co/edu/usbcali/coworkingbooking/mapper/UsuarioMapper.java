package co.edu.usbcali.coworkingbooking.mapper;

import co.edu.usbcali.coworkingbooking.dto.request.CreateUsuarioRequest;
import co.edu.usbcali.coworkingbooking.dto.response.GetUsuarioResponse;
import co.edu.usbcali.coworkingbooking.model.Espacio;
import co.edu.usbcali.coworkingbooking.model.Usuario;

import java.util.List;

public class UsuarioMapper {

    public static GetUsuarioResponse entityToGetUsuarioResponse(Usuario usuario) {

        GetUsuarioResponse getUsuarioResponse = GetUsuarioResponse.builder()
                .id(usuario.getId())
                .nombre(usuario.getNombre())
                .email(usuario.getEmail())
                .password_hash(usuario.getPassword_hash())
                .rol(usuario.getRol())
                .build();
        return getUsuarioResponse;


    }

    public static List<GetUsuarioResponse> entityToListGetUsuarioResponse(List<Usuario> usuarios) {

        return usuarios.stream().map(UsuarioMapper::entityToGetUsuarioResponse).toList();
    }

    public static Usuario createUsuarioRequestToEntity(CreateUsuarioRequest createUsuarioRequest) {

        return Usuario.builder()
                .nombre(createUsuarioRequest.getNombre())
                .email(createUsuarioRequest.getEmail())
                .password_hash(createUsuarioRequest.getPassword_hash())
                .rol(createUsuarioRequest.getRol())
                .build();
    }
}
