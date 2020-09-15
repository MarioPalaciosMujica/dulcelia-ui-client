import { CategoryMockService } from './../../../core/mocks/category-mock.service';
import { Category } from './../../models/category.model';
import { CategoryService } from './../../../core/services/category.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer-one',
  templateUrl: './footer-one.component.html',
  styleUrls: ['./footer-one.component.scss']
})
export class FooterOneComponent implements OnInit {

  @Input() class: string = 'footer-light' // Default class 
  // @Input() themeLogo: string = 'assets/images/icon/logo.png' // Default Logo
  @Input() themeLogo: string = 'assets/images/icon/logo_dulcelia_md.png';
  @Input() newsletter: boolean = true; // Default True

  public today: number = Date.now();

  public categories: Category[];

  constructor(
    private categoryService: CategoryService,
    private categoryMockService: CategoryMockService
  ) 
  { 
    this.categories = [];
    this.getAllCategories();
  }

  ngOnInit(): void {
  }

  private getAllCategories(){
    this.categoryService.findAll().subscribe(data => {
      this.categories = data as Category[];
    });

    //MOCK
    // this.categoryMockService.findAll().subscribe(data => {
    //   this.categories = data as Category[];
    // });
  }

}
