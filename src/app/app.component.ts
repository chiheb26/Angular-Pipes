import { Component, OnInit } from '@angular/core';
import { Student } from './student';
import { StudentService } from './student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[StudentService]
})
export class AppComponent implements OnInit{
  title = 'AngularPipes';
  students!:Student[];
  totalMarks!:number;
  _filterText:string="";
  filteredStudents?:Student[];
  totalStudents?:Promise<any>;
  getTotalStudents(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(this.filteredStudents?.length);
      },2000);
    });
  }
  get filterText(){
    return this._filterText;
  }
  set filterText(value:string){
    this._filterText=value;
    this.filteredStudents=this.filterStudentByGender(value);

  }
  constructor(private studentService:StudentService){}
  ngOnInit(){
    this.students=this.studentService.students;
    this.totalMarks=this.studentService.totalMarks;
    this.filteredStudents=this.students;
    this.totalStudents=this.getTotalStudents();
  }
  addDummyStudent(){
    //let studentCopy = Object.assign([],this.students);
    //studentCopy.push({name:'TEST',course:'TEST',marks:520,DOB:new Date(),gender:'Female'});
    //this.students=studentCopy;
    this.students.push({name:'TEST',course:'TEST',marks:520,DOB:new Date(),gender:'Female'});
    this.filteredStudents=this.filterStudentByGender(this.filterText);
    this.totalStudents=this.getTotalStudents();
  }
  changeGender(){
    //let studentCopy:Student[] = Object.assign([],this.students);
    //studentCopy[0].gender="female";
    //this.students=studentCopy;
    this.students[0].gender="female";
    this.filteredStudents=this.filterStudentByGender(this.filterText);
  }
  onMouseMove(){}

  filterStudentByGender(filterTerm:string){
      if(this.students.length===0 || filterTerm===''){
        return this.students;
      }else{
          return this.students.filter((student:Student)=>{
            return student.gender?.toLowerCase()===filterTerm.toLowerCase();   
          });
      }
  }
}
