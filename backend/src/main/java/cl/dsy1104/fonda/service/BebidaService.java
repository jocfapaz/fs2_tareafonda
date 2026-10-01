
package cl.dsy1104.fonda.service;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cl.dsy1104.exception.RecursoNoEncontradoException;
import cl.dsy1104.fonda.dto.BebidaRequest;
import cl.dsy1104.fonda.dto.BebidaResponse;
import cl.dsy1104.fonda.model.Bebida;
import cl.dsy1104.fonda.model.TipoBebida;
import cl.dsy1104.fonda.repository.BebidaRepository;

@Service 
public class BebidaService {

    @Autowired
    private BebidaRepository bebidaRepository;

    // Listar todas las bebidas, con filtro opcional por nombre
    public List<BebidaResponse> listarBebidas(String nombre) {
        List<Bebida> bebidas;
        if (nombre != null && !nombre.isBlank()) {
            bebidas = bebidaRepository.findByNombreContainingIgnoreCase(nombre);
        } else {
            bebidas = bebidaRepository.findAll();
        }
        return bebidas.stream()
                .map(this::convertirAResponse)
                .collect(Collectors.toList());
    }

    // Buscar bebida por ID
    public BebidaResponse buscarBebidaPorId(Long id) {
        Bebida bebida = bebidaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Bebida no encontrada con el ID: " + id));
        return convertirAResponse(bebida);
    }

    // Crear una nueva bebida
    public BebidaResponse crearBebida(BebidaRequest request) {
        validarCamposPorTipo(request);
        Bebida bebida = convertirAEntity(request);
        Bebida guardada = bebidaRepository.save(bebida);
        return convertirAResponse(guardada);
    }

    // Actualizar una bebida existente
    public BebidaResponse actualizarBebida(Long id, BebidaRequest request) {
        validarCamposPorTipo(request);
        Bebida existente = bebidaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Bebida no encontrada con el ID: " + id));

        existente.setNombre(request.getNombre());
        existente.setTipo(request.getTipo());
        existente.setVolumenML(request.getVolumenML());
        existente.setStock(request.getStock());
        existente.setGradosAlcohol(request.getGradosAlcohol());
        existente.setCertificada(request.getCertificada());
        existente.setAzucarPorLitro(request.getAzucarPorLitro());
        existente.setVentaRestringida(request.isVentaRestringida());

        Bebida guardada = bebidaRepository.save(existente);
        return convertirAResponse(guardada);
    }

    // Eliminar una bebida
    public void eliminarBebida(Long id) {
        Bebida bebida = bebidaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Bebida no encontrada con el ID: " + id));
        bebidaRepository.delete(bebida);
    }

    // Cambiar estado de venta restringida
    public BebidaResponse toggleRestriccion(Long id) {
        Bebida bebida = bebidaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Bebida no encontrada con el ID: " + id));
        bebida.setVentaRestringida(!bebida.isVentaRestringida());
        Bebida guardada = bebidaRepository.save(bebida);
        return convertirAResponse(guardada);
    }

    // Validación condicional según tipo de bebida
    private void validarCamposPorTipo(BebidaRequest request) {
        if (request.getTipo() == TipoBebida.ALCOHOLICA) {
            if (request.getGradosAlcohol() == null) {
                throw new RuntimeException("gradosAlcohol es obligatorio para bebidas alcohólicas");
            }
            if (request.getGradosAlcohol() < 0.5 || request.getGradosAlcohol() > 45) {
                throw new RuntimeException("gradosAlcohol debe estar entre 0.5 y 45");
            }
            request.setAzucarPorLitro(null);
        } else if (request.getTipo() == TipoBebida.SIN_ALCOHOL) {
            if (request.getAzucarPorLitro() == null) {
                throw new RuntimeException("azucarPorLitro es obligatorio para bebidas sin alcohol");
            }
            if (request.getAzucarPorLitro() < 0) {
                throw new RuntimeException("azucarPorLitro debe ser mayor o igual a cero");
            }
            request.setGradosAlcohol(null);
            request.setCertificada(null);
        }
    }

    // Calcular precio según tipo y atributos
    public int calcularPrecio(Bebida bebida) {
        if (bebida.getTipo() == TipoBebida.ALCOHOLICA) {
            int base = 3500;
            if (bebida.getCertificada() == null || !bebida.getCertificada()) {
                return (int) (base * 1.2); // +20%
            }
            return base;
        } else {
            int base = 2000;
            if (bebida.getAzucarPorLitro() != null && bebida.getAzucarPorLitro() > 80) {
                return (int) (base * 1.1); // +10%
            }
            return base;
        }
    }

    // Convertir DTO de entrada a Entity
    private Bebida convertirAEntity(BebidaRequest request) {
        Bebida bebida = new Bebida();
        bebida.setNombre(request.getNombre());
        bebida.setTipo(request.getTipo());
        bebida.setVolumenML(request.getVolumenML());
        bebida.setStock(request.getStock());
        bebida.setGradosAlcohol(request.getGradosAlcohol());
        bebida.setCertificada(request.getCertificada());
        bebida.setAzucarPorLitro(request.getAzucarPorLitro());
        bebida.setVentaRestringida(request.isVentaRestringida());
        return bebida;
    }

    // Convertir Entity a DTO de salida
    private BebidaResponse convertirAResponse(Bebida bebida) {
        BebidaResponse response = new BebidaResponse();
        response.setId(bebida.getId());
        response.setNombre(bebida.getNombre());
        response.setTipo(bebida.getTipo());
        response.setVolumenML(bebida.getVolumenML());
        response.setStock(bebida.getStock());
        response.setGradosAlcohol(bebida.getGradosAlcohol());
        response.setCertificada(bebida.getCertificada());
        response.setAzucarPorLitro(bebida.getAzucarPorLitro());
        response.setVentaRestringida(bebida.isVentaRestringida());
        response.setPrecio(calcularPrecio(bebida));
        return response;
    }
}