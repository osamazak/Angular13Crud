import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, Form} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public freshnessList = ["Brans New", "Second Hand", "Refurbished"];
  public actionButton: string = "Save";

  public productForm !: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productCategory: ['', Validators.required],
      productDate: ['', Validators.required],
      productFreshness: ['', Validators.required],
      productPrice: ['', Validators.required],
      productComment: ['', Validators.required],
    });

    if (this.editData) {
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['productCategory'].setValue(this.editData.productCategory);
      this.productForm.controls['productDate'].setValue(this.editData.productDate);
      this.productForm.controls['productFreshness'].setValue(this.editData.productFreshness);
      this.productForm.controls['productPrice'].setValue(this.editData.productPrice);
      this.productForm.controls['productComment'].setValue(this.editData.productComment);
      this.actionButton = "Update";
    }
  }

  public addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert("Product Added Successfully!");
            this.productForm.reset();
            this.dialogRef.close("save");
          },
          error: (error) => {
            alert("Error while adding Product")
          }
        });
      }
    } else {
      this.updateProduct();
    }

  }

  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert("Product Updated Successfully!");
        this.productForm.reset();
        this.dialogRef.close("update");
      },
      error: (error) => {
        alert("Error while Updating Product")
      }
    });
  }



}
