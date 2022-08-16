import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, tap, Subject, of } from 'rxjs';
import { InterfaceRate } from '../currency.interface';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyComponent implements OnInit, OnDestroy {
  currencyForms!: FormGroup;

  public rates: BehaviorSubject<InterfaceRate> = new BehaviorSubject({
    conversion_rate: 0,
  });
  public errorOccured: Subject<boolean> = new Subject();
  public data: any;
  timeout: any = null;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyForms = new FormGroup<any>({
      currency1: new FormControl('USD', Validators.maxLength(3)),
      currency1amount: new FormControl(0),
      currency2: new FormControl('', Validators.maxLength(3)),
      currency2amount: new FormControl(0),
    });
  }

  public onKeySearchInp1() {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      $this.get();
    }, 3000);
  }

  public onKeySearchInp2() {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      $this.get();
    }, 3000);
  }

  public get(): void {
    this.currencyService
      .getRate(
        this.currencyForms.value.currency1,
        this.currencyForms.value.currency2
      )
      .pipe(
        tap((response) => this.rates.next((this.data = response))),
        catchError(() => {
          this.errorOccured.next(true);
          alert('Hello, currency does not exist! Try again!💥');
          return of({
            conversion_rate: 0,
          });
        })
      )
      .subscribe((res) =>
        this.currencyForms.setValue({
          currency1: this.currencyForms.value.currency1,
          currency1amount: this.currencyForms.value.currency1amount,
          currency2: this.currencyForms.value.currency2,
          currency2amount:
            this.currencyForms.value.currency1amount * res.conversion_rate,
        })
      );
  }

  public onChangeVal1() {
    this.currencyForms
      .get('currency1amount')
      ?.valueChanges.pipe(
        catchError(() => {
          this.errorOccured.next(true);
          console.log('Hello, something went wrong!🐲');
          return of([]);
        })
      )
      .subscribe((res) =>
        this.currencyForms
          .get('currency2amount')
          ?.setValue(res * this.data.conversion_rate, { emitEvent: false })
      );
  }

  public onChangeVal2() {
    this.currencyForms
      .get('currency2amount')
      ?.valueChanges.pipe(
        catchError(() => {
          this.errorOccured.next(true);
          console.log('Hello, something went wrong!🐲');
          return of([]);
        })
      )
      .subscribe((res) =>
        this.currencyForms
          .get('currency1amount')
          ?.setValue(res * (1 / this.data.conversion_rate), {
            emitEvent: false,
          })
      );
  }

  ngOnDestroy(): void {
    this.rates.unsubscribe();
  }
}
