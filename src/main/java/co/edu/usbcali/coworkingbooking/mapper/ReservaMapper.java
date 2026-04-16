package co.edu.usbcali.coworkingbooking.mapper;

import co.edu.usbcali.coworkingbooking.dto.response.CreateReservaResponse;
import co.edu.usbcali.coworkingbooking.model.Reserva;

import java.sql.Timestamp;
import java.util.Objects;
import java.util.List;

public class ReservaMapper {

    //Crear reserva
    public static CreateReservaResponse entityToCreateReservaResponse(Reserva reserva) {
        return CreateReservaResponse.builder()
                .id(reserva.getId())
                .usuarioId(Objects.nonNull(reserva.getUsuario()) ? reserva.getUsuario().getId() : null)
                .espacioId(Objects.nonNull(reserva.getEspacio()) ? reserva.getEspacio().getId() : null)
                .horaInicio(Objects.nonNull(reserva.getHoraInicio()) ? reserva.getHoraInicio() : null)
                .horaFinUsuario(Objects.nonNull(reserva.getHoraFinUsuario()) ? reserva.getHoraFinUsuario() : null)
                .horaFinTotal(Objects.nonNull(reserva.getHoraFinTotal()) ? reserva.getHoraFinTotal() : null)
                .estado(Objects.nonNull(reserva.getEstado()) ? reserva.getEstado() : null)
                .version(Objects.nonNull(reserva.getVersion()) ? reserva.getVersion() : null)
                .build();
    }

    public static CreateReservaResponse entityToGetReservaResponse(Reserva reserva) {

        CreateReservaResponse getReservaResponse = CreateReservaResponse.builder()
                .id(reserva.getId())
                .usuarioId(reserva.getUsuario().getId())
                .espacioId(reserva.getEspacio().getId())
                .horaInicio(reserva.getHoraInicio())
                .horaFinUsuario(reserva.getHoraFinUsuario())
                .horaFinTotal(reserva.getHoraFinTotal())
                .estado(reserva.getEstado())
                .version(reserva.getVersion())
                .build();

        return getReservaResponse;
    }
    //listar reservas
    public static List<CreateReservaResponse> entityToListCreateReservaResponse(List<Reserva> reserva) {

        return reserva.stream().map(ReservaMapper::entityToGetReservaResponse).toList();

    }
}
