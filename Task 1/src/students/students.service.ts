import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentsService {

private students = [
    { id: 1, name: 'John Doe', age: 20, major: 'Computer Science' },
    { id: 2, name: 'Jane Smith', age: 22, major: 'Mathematics' },
    { id: 3, name: 'Michael Johnson', age: 21, major: 'Physics' },
];

getAllStudents() {
    return this.students;
}



addStudent(student: {
  id: number;
  name: string;
  age: number;
  major: string;
}) {
  this.students.push(student);
  return student;
}



getStudentById(id: number) {
  return this.students.find(student => student.id === id);
}



updateStudent(
  id: number,
  updatedData: {
    name?: string;
    age?: number;
    major?: string;
  },
) {
  const student = this.students.find(s => s.id === id);

  if (!student) {
    return { message: 'Student not found' };
  }

  Object.assign(student, updatedData);

  return student;
}





deleteStudent(id: number) {
  const index = this.students.findIndex(
    student => student.id === id
  );

  if (index === -1) {
    return { message: 'Student not found' };
  }

  const deletedStudent = this.students.splice(index, 1);

  return {
    message: 'Student deleted successfully',
    student: deletedStudent[0]
  };
}




}
