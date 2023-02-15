import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  listProducts: Product[] = [];
  loading: boolean = false;

  constructor(
    private _productService: ProductService,
    private toastr: ToastrService
  ) {
    this.getListProducts();
  }

  getListProducts() {
    this.loading = true;

    this._productService.getListProducts().subscribe((data) => {
      this.listProducts = data;
      this.loading = false;
    });
  }
  deleteProduct(id: number | undefined) {
    this.loading = true;
    this._productService.deleteProduct(id).subscribe((data) => {
      console.log(data);
      this.getListProducts();
      this.toastr.warning(
        'El producto fue eliminado con exito',
        'Producto eliminado'
      );
    });
  }

  ngOnInit(): void {}
}
