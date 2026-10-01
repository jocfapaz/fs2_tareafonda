package cl.dsy1104.fonda.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import cl.dsy1104.fonda.dto.VentaRequest;
import cl.dsy1104.fonda.dto.VentaResponse;
import cl.dsy1104.fonda.service.VentaService;
import jakarta.validation.Valid;
@RestController
@RequestMapping("/api/ventas")
@CrossOrigin(origins = "${fonda.cors.origen}")
public class VentaController {
    @Autowired
    private VentaService ventaService;

// GET /api/ventas
@GetMapping
    public ResponseEntity<List<VentaResponse>> listar() {
    return ResponseEntity.ok(ventaService.listarVentas());
}

// POST /api/ventas
@PostMapping
    public ResponseEntity<VentaResponse> registrar(@Valid @RequestBody VentaRequest request) {
    VentaResponse creada = ventaService.registrarVenta(request);
    URI location = ServletUriComponentsBuilder
.fromCurrentRequest()
.path("/{id}")
.buildAndExpand(creada.getId())
.toUri();
return ResponseEntity.created(location).body(creada);
}
}
