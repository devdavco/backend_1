package co.edu.usbcali.coworkingbooking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.sql.Timestamp;


@Entity
@Table(name = "reservas")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "espacio_id", nullable = false , referencedColumnName = "id")
    private Espacio espacio;

    @ManyToOne
    @JoinColumn(name = "usuario_id" ,nullable = false, referencedColumnName = "id")
    private Usuario usuario;

    @Column(name = "hora_inicio" , nullable = false)
    private Timestamp horaInicio;

    @Column(name = "hora_fin_usuario" , nullable = false)
    private Timestamp horaFinUsuario;

    @Column(name = "hora_fin_total" , nullable = false)
    private Timestamp horaFinTotal;

    @Column(name = "estado", length = 20)
    private String estado;

    @Version
    @Column(name = "version" )
    private Integer version;



}
