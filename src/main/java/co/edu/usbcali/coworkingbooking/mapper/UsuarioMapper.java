package co.edu.usbcali.coworkingbooking.mapper;

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
}
