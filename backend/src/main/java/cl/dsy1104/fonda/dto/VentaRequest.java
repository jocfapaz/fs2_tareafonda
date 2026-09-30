package cl.dsy1104.fonda.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class VentaRequest {
    @NotNull(message = "ID no puede ser nulo")
    private Long bebidaId;

    @Min(value = 1, message = "debe ser mayor o igual a 1")
    private int unidades;

    // Getters y Setters
    public Long getBebidaId() { return bebidaId; }
    public void setBebidaId(Long bebidaId) { this.bebidaId = bebidaId; }

    public int getUnidades() { return unidades; }
    public void setUnidades(int unidades) { this.unidades = unidades; }
    
}
