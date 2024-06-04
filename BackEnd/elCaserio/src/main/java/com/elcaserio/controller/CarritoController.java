package com.elcaserio.controller;

import com.elcaserio.model.Carrito;
import com.elcaserio.service.ICarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("el-caserio/carrito")
@CrossOrigin(value = "http://localhost:4200")
public class CarritoController {

    @Autowired
    ICarritoService iCarritoService;

    @GetMapping("/{id}")
    public Carrito verCarrito(@PathVariable Long id) {
        return iCarritoService.verCarrito(id);
    }

    @PostMapping()
    public Carrito crearCarrito(@RequestBody Carrito carrito) {
        iCarritoService.crearCarrito(carrito);
        return carrito;
    }

    @PutMapping("/{id}")
    public Carrito modificarListaDelCarrito(@RequestBody Carrito carrito, @PathVariable Long id) {
        return iCarritoService.modificarProductos(carrito, id);
    }

    @DeleteMapping("/{id}")
    public String vaciarCarrito(@PathVariable Long idCarrito) {
        iCarritoService.vaciarCarrito(idCarrito);
        return "Carrito eliminado correctamente.";
    }

}
