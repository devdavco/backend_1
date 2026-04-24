package co.edu.usbcali.coworkingbooking.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EliminarUsuarioResponse {

    @JsonProperty("exito")
    private boolean success;
    private String message;
    private Integer idEliminado;
}
