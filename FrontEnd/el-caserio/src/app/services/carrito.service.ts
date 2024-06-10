import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Carrito } from '../models/carrito';
import { ClienteService } from './cliente.service';
import { DireccionClienteService } from './direccion-cliente.service';
import { DireccionCliente } from '../models/direccionCliente';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private urlBase = "http://localhost:8080/el-caserio/carrito";

  listaProductos: Array<Producto> = [];

  constructor(
    private clientHttp: HttpClient,
    private clienteServise: ClienteService,
    private direccionClienteServise: DireccionClienteService,
  ) { }

  armadoDelCarrito(productoRecibido: Producto){
    let repetido: boolean = false;

    if (this.listaProductos.length == 0) {
      this.agregarProductoALaLista(productoRecibido);
   
    } else {
      for (const product of this.listaProductos) {
        if (product.id == productoRecibido.id) {
            repetido = true;          
        }
      }

      if (repetido) {        
        this.editarCantidadProducto(productoRecibido);
                
      } else {
        this.agregarProductoALaLista(productoRecibido);

      }
    }
  }

  agregarProductoALaLista(producto: Producto){
    this.listaProductos.push(producto);
  }

  editarCantidadProducto(productoRecibido: Producto){
    let index: number = 0

    this.listaProductos.forEach(producto => {
      if(producto.id === productoRecibido.id){
        index = this.listaProductos.indexOf(producto);
      }
    })
    
    if (index !== -1) {
        this.listaProductos[index].cantidadRequeridaDelProducto += productoRecibido.cantidadRequeridaDelProducto;
    }    
  }

  sumarProducto(id: number){
    let index: number = 0

    this.listaProductos.forEach(producto => {
      if(producto.id === id){
        index = this.listaProductos.indexOf(producto);
      }
    })
    
    if (index !== -1) {
        this.listaProductos[index].cantidadRequeridaDelProducto++;
    } 
  }

  restarProducto(id: number, producto: Producto){
    let index: number = 0

    this.listaProductos.forEach(producto => {
      if(producto.id === id){
        index = this.listaProductos.indexOf(producto);
      }
    })
    
    if (index !== -1) {
        this.listaProductos[index].cantidadRequeridaDelProducto--;
        if (this.listaProductos[index].cantidadRequeridaDelProducto === 0) {
          this.eliminarProductoDeLaLista(producto);
        }
    } 
  }

  eliminarProductoDeLaLista(producto: Producto){
    const index = this.listaProductos.indexOf(producto);
    if (index !== -1) {
        this.listaProductos.splice(index, 1);
    }
  }

  totalCarrito():number {
    let total: number = 0;
    
    this.listaProductos.forEach(producto => {
      total += producto.precio * producto.cantidadRequeridaDelProducto;
    });

    return parseFloat(total.toFixed(2));
  }

  dosDecimales(cantidad: number, precio:number):number{
    let total: number = cantidad * precio;
    return parseFloat(total.toFixed(2));
  }

  totalElementosCarrito(): number{
    let totalElementos: number = 0;

    this.listaProductos.forEach(elemento => {
      totalElementos += elemento.cantidadRequeridaDelProducto;
    })

    return totalElementos;
  }

  async armarCarrito(direccion: DireccionCliente, cliente: Cliente) {
    let carrito: Carrito = new Carrito();
  
    carrito.productos = this.listaProductos;
    carrito.totalDelCarrito = this.totalCarrito();
    
    try {
      if(direccion != null){}
      
      let direccionGuardada = await this.direccionClienteServise.crearDireccionCliente(direccion);
      console.log("Direccion guardada:");
      console.log(direccionGuardada);
      
      carrito.cliente = cliente;
      carrito.cliente.direccionCliente = direccionGuardada;
      
      let clienteGuardado = await this.clienteServise.crearCliente(carrito.cliente);
      console.log("Cliente guardado:");
      console.log(clienteGuardado);
      
      carrito.cliente = clienteGuardado;
  
      let carritoGuardado = await this.crearCarrito(carrito);
      console.log("Carrito guardado:");      
      console.log(carritoGuardado);
      this.listaProductos.splice(0, this.listaProductos.length) // limpia la lista

    } catch (error) {
      console.error("Error guardando el carrito:", error);
    }
  }

  crearCarrito(carrito: Carrito): Promise<any>  {
    return this.clientHttp.post<Carrito>(this.urlBase, carrito).toPromise();
  }

  obtenerCarritoPorId(id: number){
    return this.clientHttp.get<Carrito>(`${this.urlBase}/${id}`);
  }

  modificarCarrito(carrito : Carrito, id: number){
    return this.clientHttp.put<Carrito>(`${this.urlBase}/${id}`, carrito);
  }

  eliminarCarritoPorId(id: number){
    return this.clientHttp.delete<String>(`${this.urlBase}/${id}`)
  }


}
