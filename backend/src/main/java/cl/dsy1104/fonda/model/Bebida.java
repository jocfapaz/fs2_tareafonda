package cl.dsy1104.fonda.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Entity 
@Table(name = "bebida")
public class Bebida {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "No puede estar vacio.") 
    private String nombre;

    @Enumerated(EnumType.STRING)
    private TipoBebida tipo;

    @Column(name = "volumen_ml")
    @Min(value = 100, message = "Debe estar entre 100 y 3000.")
    @Max(value = 3000, message = "Debe estar entre 100 y 3000.")
    private int volumenML;

    @Min(value = 0, message = "Debe ser mayor o igual a 0.")
    private int stock;

    private Double gradosAlcohol;

    private Boolean certificada;

    private Integer azucarPorLitro;

    private boolean ventaRestringida;

    //Gettets y Setters
    public Long getId(){ 
        return id;}

    public void setId(Long id){
        this.id = id;}

    public String getNombre(){
        return nombre;}

    public void setNombre(String nombre){
        this.nombre = nombre;}

    public TipoBebida getTipo(){
        return tipo;}

    public void setTipo(TipoBebida tipo){
        this.tipo = tipo;}

    public int getVolumenML(){
        return volumenML;}

    public void setVolumenML(int volumenML){
        this.volumenML = volumenML;}

    public int getStock(){
        return stock;}

    public void setStock(int stock){
        this.stock = stock;}

    public Double getGradosAlcohol(){
        return gradosAlcohol;}

    public void setGradosAlcohol(Double gradosAlcohol){
        this.gradosAlcohol = gradosAlcohol;}

    public Boolean getCertificada(){
        return certificada;}

    public void setCertificada(Boolean certificada){
        this.certificada = certificada;}

    public Integer getAzucarPorLitro(){
        return azucarPorLitro;}

    public void setAzucarPorLitro(Integer azucarPorLitro){
        this.azucarPorLitro = azucarPorLitro;}

    public boolean isVentaRestringida(){
        return ventaRestringida;}

    public void setVentaRestringida(boolean ventaRestringida){
        this.ventaRestringida = ventaRestringida;}
    
}
