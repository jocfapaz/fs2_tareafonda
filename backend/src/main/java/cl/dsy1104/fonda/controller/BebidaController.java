package cl.dsy1104.fonda.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import cl.dsy1104.fonda.dto.BebidaRequest;
import cl.dsy1104.fonda.dto.BebidaResponse;
import cl.dsy1104.fonda.service.BebidaService;
import jakarta.validation.Valid;


@RestController
@RequestMapping ("/api/bebidas")
@CrossOrigin(origins = "${fonda.cors.origen}") 
public class BebidaController {

    @Autowired 
    private BebidaService bebidaService;

    @GetMapping 
    public ResponseEntity<List<BebidaResponse>> listarBebidas(@RequestParam(required = false) String nombre){
        return ResponseEntity.ok(bebidaService.listarBebidas(nombre));
    }

    @GetMapping ("/{id}")
    public ResponseEntity<BebidaResponse> obtenerBebidaPorId(@PathVariable Long id){
        return ResponseEntity.ok(bebidaService.buscarBebidaPorId(id));
    }

    @PostMapping 
    public ResponseEntity<BebidaResponse> crearBebida(@Valid @RequestBody BebidaRequest bebidaRequest){
        BebidaResponse bebidaResponse = bebidaService.crearBebida(bebidaRequest);
        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(bebidaResponse.getId())
            .toUri();
        return ResponseEntity.created(location).body(bebidaResponse);
    }
    
    @PutMapping ("/{id}")
    public ResponseEntity<BebidaResponse> actualizarBebida(@PathVariable Long id, @Valid @RequestBody BebidaRequest bebidaRequest){
        return ResponseEntity.ok(bebidaService.actualizarBebida(id, bebidaRequest));
    }

    @DeleteMapping ("/{id}")
    public ResponseEntity<Void> eliminarBebida(@PathVariable Long id){
        bebidaService.eliminarBebida(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/restriccion") 
    public ResponseEntity<BebidaResponse> toggleRestriccion(@PathVariable Long id) {
        return ResponseEntity.ok(bebidaService.toggleRestriccion(id));
    }
}
