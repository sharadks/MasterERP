import { Component } from '@angular/core';

@Component({
    selector: 'app-cancel-orders',
    templateUrl: './cancelOrder.html'
  })
export class CancelOrderComponent {
  constructor() {
    console.log("--------cancelOrder--------");
    }
}
