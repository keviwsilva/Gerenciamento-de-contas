import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";

import {  MatTooltipModule } from "@angular/material/tooltip";
import {MatButtonModule} from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MesDataComponent } from './mes-data/mes-data.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    AppComponent,
    MesDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
  