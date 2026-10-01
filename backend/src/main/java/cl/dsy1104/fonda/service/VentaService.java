package cl.dsy1104.fonda.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import cl.dsy1104.fonda.exception.RecursoNoEncontradoException;
import cl.dsy1104.fonda.exception.VentaException;
import cl.dsy1104.fonda.dto.VentaRequest;
import cl.dsy1104.fonda.dto.VentaResponse;
import cl.dsy1104.fonda.model.Bebida;
import cl.dsy1104.fonda.model.EstadoVenta;
import cl.dsy1104.fonda.model.TipoBebida;
import cl.dsy1104.fonda.model.Venta;
import cl.dsy1104.fonda.repository.BebidaRepository;
import cl.dsy1104.fonda.repository.VentaRepository;


@Service 
public class VentaService {
    @Autowired
    private BebidaRepository bebidaRepository;

    @Autowired
    private VentaRepository ventaRepository;

    @Autowired
    private BebidaService bebidaService;

    @Value("${fonda.limite-unidades-por-cliente}")
    private int limiteUnidades;

    // Listar todo el historial de ventas
    public List<VentaResponse> listarVentas() {
        List<Venta> ventas = ventaRepository.findAll();
        return ventas.stream()
                .map(this::convertirAResponse)
                .collect(Collectors.toList());
    }

    // Registrar una nueva venta
    public VentaResponse registrarVenta(VentaRequest request) {
        Bebida bebida = bebidaRepository.findById(request.getBebidaId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Bebida no encontrada con el ID: " + request.getBebidaId()));

        Venta venta = new Venta();
        venta.setBebida(bebida);
        venta.setUnidades(request.getUnidades());

        // Regla 1: Venta restringida
        if (bebida.isVentaRestringida()) {
            guardarVentaRechazada(venta, "VENTA_RESTRINGIDA");
            throw new VentaException("VENTA_RESTRINGIDA", "Venta restringida para esta bebida.");
        }

        // Regla 2: Límite de alcohol
        if (bebida.getTipo() == TipoBebida.ALCOHOLICA && request.getUnidades() > limiteUnidades) {
            guardarVentaRechazada(venta, "LIMITE_EXCEDIDO");
            throw new VentaException("LIMITE_EXCEDIDO", request.getUnidades() + " unidades superan el límite de " + limiteUnidades);
        }

        // Regla 3: Stock insuficiente
        if (bebida.getStock() < request.getUnidades()) {
            guardarVentaRechazada(venta, "STOCK_INSUFICIENTE");
            throw new VentaException("STOCK_INSUFICIENTE", "Stock insuficiente.");
        }

        // Si pasa todo: autorizar
        int precio = bebidaService.calcularPrecio(bebida);
        int total = precio * request.getUnidades();

        bebida.setStock(bebida.getStock() - request.getUnidades());
        bebidaRepository.save(bebida);

        venta.setEstado(EstadoVenta.AUTORIZADA);
        venta.setTotal(total);
        venta.setMotivo(null);

        Venta guardada = ventaRepository.save(venta);
        return convertirAResponse(guardada);
    }

    // Guardar venta rechazada antes de lanzar excepción
    private void guardarVentaRechazada(Venta venta, String motivo) {
        venta.setEstado(EstadoVenta.RECHAZADA);
        venta.setMotivo(motivo);
        venta.setTotal(0);
        ventaRepository.save(venta);
    }

    // Convertir Entity a DTO de salida
    private VentaResponse convertirAResponse(Venta venta) {
        VentaResponse response = new VentaResponse();
        response.setId(venta.getId());
        response.setBebidaId(venta.getBebida().getId());
        response.setNombreBebida(venta.getBebida().getNombre());
        response.setUnidades(venta.getUnidades());
        response.setTotal(venta.getTotal());
        response.setEstado(venta.getEstado());
        response.setMotivo(venta.getMotivo());
        response.setFecha(venta.getFecha());
        return response;
    }
}
    

