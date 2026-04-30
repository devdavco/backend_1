package co.edu.usbcali.coworkingbooking.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
@Builder
public class UpdateReservaResponse {
    private Integer id;

    private Integer usuarioId;
    private Integer espacioId;

    private Timestamp horaInicio;
    private Timestamp horaFinUsuario;
    private Timestamp horaFinTotal;
    private String estado;
    private Integer version;
}
