import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { HttpService } from '../../shared-service/http.service';

export interface IBike {
  id?: number;
  image: string;
  price: number;
  quantity: number;
  description: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  bikes: Array<IBike> = [];
  myName = '';
  students = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private http: HttpService
  ) { }

  async ngOnInit() {
    await this.refresh();
    // this.createStudent('student', { name: 'John Doe', email: 'johndoe@example.com'});
    // this.updateStudent('student/id/3', { name: 'Bob Jones'});
  }

  async refresh() {
    this.students = await this.getStudents('student');
  }

  // getStudents('student');
  async getStudents(path: string) {
    const resp = await this.http.get(path);
    console.log('resp from getStudents()', resp);
    return resp;
  }

  async createStudent() {
    const student = {
      name: null,
      email: null,
      phonenum: null
    };
    const resp = await this.http.post('student', student);
    console.log('from createStudent resp: ', resp);
    if (resp) {
      // this.refresh();
      this.students.unshift(resp);
      this.toastService.showToast('success', 3000, 'Student create success!');
    } else {
      this.toastService.showToast('danger', 3000, 'Student create failed!');

    }
    return resp;
  }

  async updateStudent(student: any) {
    console.log('from updateStudent student: ', student)
    const resp = await this.http.put(`student/id/${student.id}`, student);
    if (resp) {
      this.toastService.showToast('success', 3000, 'Student updated successfully!');
    }
    return resp;
  }

  async removeStudent(student: any, index: number) {
    console.log('from removeStudent...', index);
    const resp = await this.http.delete(`student/id/${student.id}`);
    console.log('resp from removeStudent...', resp);
    if (resp) {
      this.refresh();
    } else {
      this.toastService.showToast('danger', 3000, 'Delete car failed!');
    }
  }
}
