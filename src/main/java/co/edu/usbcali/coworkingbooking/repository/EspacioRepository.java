package co.edu.usbcali.coworkingbooking.repository;

import co.edu.usbcali.coworkingbooking.model.Espacio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface EspacioRepository extends JpaRepository<Espacio, Integer> {

}
