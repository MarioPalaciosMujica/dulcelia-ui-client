import { Component, OnInit } from '@angular/core';
import { TeamSlider, TestimonialSlider } from './../../../shared/data/slider';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public TeamSliderConfig: any = TeamSlider;
  public TestimonialSliderConfig: any = TestimonialSlider;

  // Testimonial Carousel
  public testimonial = [
    {
      image: 'assets/dulcelia-demo/personal/beatriz_01_250x250.jpg',
      name: 'Beatriz Canales',
      designation: 'Empresaria',
      description: 'Soy una mujer emprendedora, alegre, me gusta bailar, la naturaleza y las amistades. Soy una mujer soltera con 4 hijos, independiente, luchadora, valiente, con una vida enseñanzas y con muchas historias de esfuerzos.',
    } 
    // ,{
    //   image: 'assets/images/testimonial/2.jpg',
    //   name: 'Adegoke Yusuff',
    //   designation: 'Content Writer',
    //   description: 'you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.',
    // }, 
    // {
    //   image: 'assets/images/testimonial/1.jpg',
    //   name: 'John Shipmen',
    //   designation: 'Lead Developer',
    //   description: 'you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.',
    // }
  ]

  // Team 
  public team = [
    {
      image: 'assets/dulcelia-demo/personal/beatriz_03_377x494.jpg',
      name: 'Beatriz Canales',
      designation: 'Empresaria'
    }, 
    {
      image: 'assets/dulcelia-demo/personal/andres_01_377x494.jpg',
      name: 'Andres Cordova',
      designation: 'Elaboración de alfajores y chocolateria'
    } 
    // ,{
    //   image: 'assets/images/team/3.jpg',
    //   name: 'Felipe Cordova',
    //   designation: 'Ejecutivo Comercial'
    // }
    // ,{
    //   image: 'assets/images/team/4.jpg',
    //   name: 'Hileri Keol',
    //   designation: 'CEO & Founder at Company'
    // }, 
    // {
    //   image: 'assets/images/team/3.jpg',
    //   name: 'John Shipmen',
    //   designation: 'Lead Developer'
    // }
  ]

}
