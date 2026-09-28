package cl.dsy1104.fonda.repository;

import org.springframework.stereotype.Repository;

@Repository 
public interface BebidaRepository extends JpaRepository<Bebida, Long> {

    List<Bebida> findByNombreContainingIgnoreCase(String nombre);

}
