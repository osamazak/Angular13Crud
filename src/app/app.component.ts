import {Component, Inject, OnInit,AfterViewInit,ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogComponent} from "./components/dialog/dialog.component";
import {ApiService} from "./services/api.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'productCategory', 'productDate', 'productFreshness', 'productPrice', 'productComment', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title = 'Angular13Crud';
  public productsList:[] = [];
  public errorMessage:string = '';

  constructor(private dialog:MatDialog,private api:ApiService) {
  }
  ngOnInit() {
    this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {

    }).afterClosed().subscribe((val) => {
      if (val === 'save'){
        this.getAllProducts();
      }
    });
  }

  getAllProducts(){
    this.api.getProduct().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },(error)=>{
      this.errorMessage = error;
    })
  }


  editProduct(row: any){
    this.dialog.open(DialogComponent,{
      data:row
    }).afterClosed().subscribe((val) => {
      if (val === 'update'){
        this.getAllProducts();
      }
    });
  }


  deleteProduct(id:number){
    this.api.deleteProduct(id).subscribe(()=>{
      alert("Product Deleted Successfully!");
      this.getAllProducts();
    },(error)=>{
      alert("Error while Deleting Product")
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


