package cl.dsy1104.fonda.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cl.dsy1104.fonda.model.Bebida;

@Repository 
public interface BebidaRepository extends JpaRepository<Bebida, Long> {

    //Necesita este método para buscar por nombre ya que JpaRepository<Bebida, Long> no lo contiene, solo contiene save findById findAll deleteById y otros metodos para trabajar con la base de datos
    List<Bebida> findByNombreContainingIgnoreCase(String nombre);


}
