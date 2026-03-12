package co.edu.usbcali.coworkingbooking.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "espacios")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Espacio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre" , nullable = false, length = 50)
    private String nombre;

    @Column(name = "tipo" , nullable = false, length = 30)
    private String tipo;

    @Column(name = "capacidad" , nullable = false)
    private Integer capacidad;

    @Column(name = "minutos_limpieza" , nullable = false)
    private Integer minutos_limpieza;
}
