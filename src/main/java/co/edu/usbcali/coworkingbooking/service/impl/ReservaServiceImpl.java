package co.edu.usbcali.coworkingbooking.service.impl;

import co.edu.usbcali.coworkingbooking.dto.request.CreateReservaRequest;
import co.edu.usbcali.coworkingbooking.dto.response.CreateReservaResponse;
import co.edu.usbcali.coworkingbooking.mapper.ReservaMapper;
import co.edu.usbcali.coworkingbooking.model.Espacio;
import co.edu.usbcali.coworkingbooking.model.Reserva;
import co.edu.usbcali.coworkingbooking.model.Usuario;
import co.edu.usbcali.coworkingbooking.repository.EspacioRepository;
import co.edu.usbcali.coworkingbooking.repository.ReservaRepository;
import co.edu.usbcali.coworkingbooking.repository.UsuarioRepository;
import co.edu.usbcali.coworkingbooking.service.ReservaService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
@Service
@AllArgsConstructor

public class ReservaServiceImpl implements ReservaService {

    private final ReservaRepository reservaRepository;
    private final EspacioRepository espacioRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    public CreateReservaResponse createReserva(CreateReservaRequest createReservaRequest) throws Exception {

        try {
            //Validar que es objeto no sea nulo
            if (Objects.isNull(createReservaRequest)) {
                throw new Exception("El objeto CreateReservaRequest no puede ser nulo.");
            }

            //validar que el campo usuarioId venga con valor

            if (Objects.isNull(createReservaRequest.getUsuarioId()) || createReservaRequest.getUsuarioId() <= 0) {
                throw new Exception("El campo usuarioId no puede ser nulo");
            }

            //validar que el campo espacioId no sea nulo

            if (Objects.isNull(createReservaRequest.getEspacioId()) || createReservaRequest.getEspacioId() <= 0) {
                throw new Exception("El campo espacioId no puede ser nulo");
            }

            //Validar que usuario exista en base de datos

            Optional<Usuario> usuario = usuarioRepository.findById(createReservaRequest.getUsuarioId());

            if (!usuario.isPresent()) {
                throw new Exception("El usuario no existe en la base de datos.");
            }

            Optional<Espacio> espacio = espacioRepository.findById(createReservaRequest.getEspacioId());

            if (!espacio.isPresent()) {
                throw new Exception("El espacio no existe en la base de datos.");

            }

            //Convertir Entity Screening

            Reserva reserva = Reserva.builder()
                    .usuario(usuario.get())
                    .espacio(espacio.get())
                    .horaInicio(createReservaRequest.getHoraInicio())
                    .horaFinUsuario(createReservaRequest.getHoraFinUsuario())
                    .horaFinTotal(createReservaRequest.getHoraFinTotal())
                    .version(createReservaRequest.getVersion())
                    .estado(createReservaRequest.getEstado())
                    .build();

            //Persistir en la base de datos
            reserva = reservaRepository.save(reserva);

            return ReservaMapper.entityToCreateReservaResponse(reserva);
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<CreateReservaResponse> getAllReservas() {
        List<Reserva> reservas = reservaRepository.findAll();
        List<CreateReservaResponse> getReservaResponseList = ReservaMapper.entityToListCreateReservaResponse(reservas);
        return getReservaResponseList;
    }

    @Override
    public CreateReservaResponse getReservabyId(Integer id) {
        Reserva reserva = reservaRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Reserva no encontrada con ID: " + id));
        return ReservaMapper.entityToCreateReservaResponse(reserva);
    }

    @Override
    public CreateReservaResponse eliminarReserva(Integer id) { // Cambia el retorno a void
        Reserva reserva = reservaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada con ID: " + id));
        reservaRepository.delete(reserva);
        return null;
    }
}
