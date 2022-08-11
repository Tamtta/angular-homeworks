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
  editBtnClicked: boolean = false;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  constructor(private localserver: LocalserverService) {}

  ngOnInit(): void {
    this.formLocalServer = new FormGroup<any>({
      name: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    });
    this.getEmployees();
  }

  public addEmployee() {
    this.localserver
      .addEmployeeService({
        name: this.formLocalServer.value.name,
        salary: this.formLocalServer.value.salary,
        age: this.formLocalServer.value.age,
      })
      .subscribe((res) => {
        this.employees.push(res);
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

  public onTableDataChange(event: any) {
    this.page = event;
    this.getEmployees();
  }

  public onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getEmployees();
  }

  public getEmployee(id: any) {
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
    this.editBtnClicked = true;
  }

  public updateEmployee() {
    let update = {
      name: this.formLocalServer.value.name,
      salary: this.formLocalServer.value.salary,
      age: this.formLocalServer.value.age,
    };
    const index = this.employees.findIndex((p) => p.id == this.oneEmployeeID);
    const employee = this.employees[index];
    this.localserver
      .updateEmployeeService(this.oneEmployeeID, update)
      .subscribe(
        (res) => (
          (employee.name = res.name),
          (employee.salary = res.salary),
          (employee.age = res.age),
          this.formLocalServer.reset()
        )
      );
    this.editBtnClicked = false;
  }

  public cancel() {
    this.formLocalServer.reset();
  }

  public deleteEmployee(id: any) {
    this.localserver
      .deleteEmployeeService(id)
      .subscribe(
        () => (this.employees = this.employees.filter((p) => p.id != id))
      );
  }
}
