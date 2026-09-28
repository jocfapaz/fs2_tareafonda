package cl.dsy1104.fonda.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "venta")
public class Venta {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne 
    @JoinColumn(name = "bebida_id")
    private Bebida bebida;

    private int unidades;

    private int total;

    @Enumerated(EnumType.STRING)
    private EstadoVenta estado;

    private String motivo;

    private LocalDateTime fecha;

    //Se ejecuta cuando se agrega un nuevo registro (persist) asignando la fecha actual
    @PrePersist 
    public void prePersist() {
        this.fecha = LocalDateTime.now();
    }

    //Getters y Setters
    public Long getId(){
        return id;}

    public void setId(Long id){
        this.id = id;}

    public Bebida getBebida(){
        return bebida;}

    public void setBebida(Bebida bebida){
        this.bebida = bebida;}

    public int getUnidades(){
        return unidades;}

    public void setUnidades(int unidades){
        this.unidades = unidades;}

    public int getTotal(){
        return total;}

    public void setTotal(int total){
        this.total = total;}

    public EstadoVenta getEstado(){
        return estado;}

    public void setEstado(EstadoVenta estado){
        this.estado = estado;}

    public String getMotivo(){
        return motivo;}

    public void setMotivo(String motivo){
        this.motivo = motivo;}

    public LocalDateTime getFecha(){
        return fecha;}

    public void setFecha(LocalDateTime fecha){
        this.fecha = fecha;}
}

