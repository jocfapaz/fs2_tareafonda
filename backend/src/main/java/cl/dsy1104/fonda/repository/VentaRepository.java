package cl.dsy1104.fonda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cl.dsy1104.fonda.model.Venta;

@Repository 
public interface VentaRepository extends JpaRepository<Venta, Long> {

    //Queda vacio ya que JpaRepository<Venta, Long> contiene save findById findAll deleteById y otros metodos para trabajar con la base de datos
    
}
