package co.edu.usbcali.coworkingbooking.repository;

import co.edu.usbcali.coworkingbooking.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Integer>
{
}
