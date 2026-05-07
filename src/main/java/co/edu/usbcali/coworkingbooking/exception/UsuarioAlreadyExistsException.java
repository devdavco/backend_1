package co.edu.usbcali.coworkingbooking.exception;

public class UsuarioAlreadyExistsException extends RuntimeException {
    public UsuarioAlreadyExistsException(String EmailUsuario) {
        super("El usuario con el correo "+ EmailUsuario + " ya existe");

    }
}
