package co.edu.usbcali.coworkingbooking.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.sql.Timestamp;


@Getter
@AllArgsConstructor

public class CreateReservaRequest {

    private Integer espacioId;
    private Integer usuarioId;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Timestamp horaInicio;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Timestamp horaFinUsuario;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Timestamp horaFinTotal;

    private String estado;
    private Integer version;

}
