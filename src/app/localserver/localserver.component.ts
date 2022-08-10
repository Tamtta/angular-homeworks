import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, tap } from 'rxjs';
import { IEmployee } from '../interfaces/employee.interface';
import { LocalserverService } from '../services/localserver.service';

@Component({
  selector: 'app-localserver',
  templateUrl: './localserver.component.html',
  styleUrls: ['./localserver.component.scss'],
})
export class LocalserverComponent implements OnInit {
  formLocalServer!: FormGroup;
  public employees: IEmployee[] = [];
  public employeesSubject: BehaviorSubject<IEmployee[]> = new BehaviorSubject(
    <IEmployee[]>[]
  );
  public oneEmployeeID!: number;

  constructor(private localserver: LocalserverService) {}

  ngOnInit(): void {
    this.formLocalServer = new FormGroup<any>({
      name: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    });
  }

  addEmployee() {
    this.localserver
      .addEmployeeService({
        name: this.formLocalServer.value.name,
        salary: this.formLocalServer.value.salary,
        age: this.formLocalServer.value.age,
      })
      .subscribe(() => {
        this.formLocalServer.reset();
      });
  }

  public getEmployees() {
    this.localserver
      .getEmployeesService()
      .pipe(
        tap((response) =>
          this.employeesSubject.next((this.employees = response))
        )
      )
      .subscribe();
  }

  getEmployee(id: any) {
    this.localserver
      .getEmployeeService(id)
      .pipe(
        tap((response) =>
          this.employeesSubject.next((this.oneEmployeeID = response.id))
        )
      )
      .subscribe((res) =>
        this.formLocalServer.setValue({
          name: res.name,
          salary: res.salary,
          age: res.age,
        })
      );
  }

  updateEmployee() {
    let update = {
      name: this.formLocalServer.value.name,
      salary: this.formLocalServer.value.salary,
      age: this.formLocalServer.value.age,
    };
    this.localserver
      .updateEmployeeService(this.oneEmployeeID, update)
      .subscribe(
        (res) => (
          (this.employees[this.oneEmployeeID - 1].name = res.name),
          (this.employees[this.oneEmployeeID - 1].salary = res.salary),
          (this.employees[this.oneEmployeeID - 1].age = res.age),
          this.formLocalServer.reset()
        )
      );
  }

  cancel() {
    this.formLocalServer.reset();
  }

  deleteEmployee(id: any) {
    this.localserver
      .deleteEmployeeService(id)
      .subscribe(
        () => (this.employees = this.employees.filter((p) => p.id != id))
      );
  }
}
