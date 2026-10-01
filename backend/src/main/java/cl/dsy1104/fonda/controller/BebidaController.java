package cl.dsy1104.fonda.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import cl.dsy1104.fonda.service.BebidaService;


@RestController
@RequestMapping ("/api/bebidas")
@CrossOrigin(origins = "${fonda.cors.origen}") 
public class BebidaController {

    @Autowired 
    private BebidaService bebidaService;
    
}
