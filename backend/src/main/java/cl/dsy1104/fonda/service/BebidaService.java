package cl.dsy1104.fonda.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import cl.dsy1104.fonda.model.Bebida;
import cl.dsy1104.fonda.repository.BebidaRepository;

public class BebidaService {

    @Autowired 
    private BebidaRepository bebidaRepository;

    //Listar todas las bebidas con un filtro por nombre
    public List<Bebida> listarBebidas(String nombre){
        if(nombre != null && !nombre.isBlank()){
            return bebidaRepository.findByNombreContainingIgnoreCase(nombre);
        }
        return bebidaRepository.findAll();
    }

    //Buscar bebida por ID
    public Bebida buscarBebidaPorId(Long id){
        return bebidaRepository.findById(id).orElseThrow(() -> new RunTimeException("Bebida no encontrada con el ID: " + id));
    }

    //Crear una nueva bebida
    public Bebida crearBebida(Bebida bebida){
        bebida.setPrecio(calcularPrecio(bebida));
        return bebidaRepository.save(bebida);
    }

    //Actualizar una bebida existente
    public Bebida actualizarBebida(Long id, Bebida datosActualizados){
        Bebida bebidaExistente = buscarBebidaPorId(id);
        bebidaExistente.setNombre(datosActualizados.getNombre());
        bebidaExistente.setTipo(datosActualizados.getTipo());
        bebidaExistente.setVolumenML(datosActualizados.getVolumenML());
        bebidaExistente.setStock(datosActualizados.getStock());
        bebidaExistente.setGradosAlcohol(datosActualizados.getGradosAlcohol());
        bebidaExistente.setCertificada(datosActualizados.getCertificada());
        bebidaExistente.setAzucarPorLitro(datosActualizados.getAzucarPorLitro());
        bebidaExistente.setVentaRestringida(datosActualizados.isVentaRestringida());
        bebidaExistente.setPrecio(calcularPrecio(bebidaExistente));
        return bebidaRepository.save(bebidaExistente);
    }
    
}
