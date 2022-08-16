import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { LocalserverComponent } from './localserverComponent/localserver.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LocalserverComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: LocalserverComponent,
      },
    ]),
  ],
})
export class EmployeesModule {}
