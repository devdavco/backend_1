package co.edu.usbcali.coworkingbooking.repository;

import co.edu.usbcali.coworkingbooking.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
}
