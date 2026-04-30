package co.edu.usbcali.coworkingbooking.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
@AllArgsConstructor
public class UpdateReservaRequest {
    private Integer id;


    private String estado;

}
