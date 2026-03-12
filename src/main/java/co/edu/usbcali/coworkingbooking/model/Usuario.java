package co.edu.usbcali.coworkingbooking.model;

import jakarta.persistence.*;
import jdk.jfr.DataAmount;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "usuarios")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre" , nullable = false, length = 100)
    private String nombre;

    @Column(name = "email",  nullable = false, unique = true, length = 150 )
    private String email;

    @Column(name = "password_hash" , nullable = false, length = 255)
    private Integer password_hash;

    @Column(name = "rol" , nullable = false  )
    private Integer rol;

}

