import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from "chart.js/auto";
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  currentRoute: any;

  constructor(private router: Router) { }
  ngOnInit(): void {
      this.currentRoute = this.router.url;
    

  }

}
