import { Router } from '@angular/router';
import { WpInitTransactionOutputModel } from './../../../shared/models/wpInitTransactionOutput.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

@Component({
    selector: 'app-webpay-form',
    templateUrl: './webpay-form.component.html'
})
export class WebpayFormComponent implements OnInit {

    constructor(){}

    ngOnInit(): void { }
}