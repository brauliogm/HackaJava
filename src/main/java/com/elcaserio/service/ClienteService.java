package com.elcaserio.service;

import com.elcaserio.model.Cliente;
import com.elcaserio.repository.IClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService implements IClienteService {

    @Autowired
    private IClienteRepository iClienteRepo;

    //MÉTODO PARA CREAR UN CLIENTE
    @Override
    public void crearCliente(Cliente cliente) {
        iClienteRepo.save(cliente);
    }

    //MÉTODO PARA VER TODOS LOS CLIENTES
    @Override
    public List<Cliente> verClientes() {
        List<Cliente> listaClientes = iClienteRepo.findAll();
        return listaClientes;
    }

    //MÉTODO PARA BUSCAR UN SOLO CLIENTE
    @Override
    public Cliente buscarCliente(Long id) {
        return iClienteRepo.findById(id).orElse(null);
    }

    //MÉTODO PARA ELIMINAR UN SOLO CLIENTE
    @Override
    public void eliminarCliente(Long id) {
        iClienteRepo.deleteById(id);
    }

    //MÉTODO PARA ELIMINAR TODOS LOS CLIENTES
    @Override
    public void eliminarTodo() {
        iClienteRepo.deleteAll();
    }

    //MÉTODO PARA MODIFICAR UN CLIENTE
    @Override
    public void modificarCliente(Long id, String nombreNuevo, String telefonoNuevo, String emailNuevo, String direccionNueva) {
        Cliente cliente = iClienteRepo.findById(id).orElse(null);
        cliente.setNombre(nombreNuevo);
        cliente.setTelefono(telefonoNuevo);
        cliente.setEmail(emailNuevo);
        cliente.setDireccion(direccionNueva);
        iClienteRepo.save(cliente);
    }
}