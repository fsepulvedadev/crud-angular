import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css'],
})
export class AddEditProductComponent {
  form: FormGroup;
  loading: boolean = false;
  id: number = 0;
  private sub: any;
  currentRoute: string = '';

  constructor(
    private fb: FormBuilder,
    private _productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: [null, Validators.required],
      stock: [null, Validators.required],
    });

    this.currentRoute = this.router.url;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });
    if (this.currentRoute != '/add') {
      this._productService.getProduct(this.id).subscribe((data) => {
        this.form.setValue({
          name: data.name,
          price: data.price,
          description: data.description,
          stock: data.stock,
        });
      });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addProduct() {
    this.loading = true;
    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock,
    };

    this._productService.addProduct(product).subscribe((data) => {
      console.log(data);
      this.loading = false;
      this.toastr.success(
        `El producto ${product.name} fue agregado con exito`,
        'Producto agregado'
      );
      this.form.reset();
    });
  }

  updateProduct() {
    this.loading = true;
    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock,
    };

    this._productService.updateProduct(this.id, product).subscribe((data) => {
      console.log(data);
      this.loading = false;
      this.toastr.info(
        `El producto ${product.name} fue actualizado con exito`,
        'Producto actualizado'
      );
      this.form.reset();
    });
  }
}
