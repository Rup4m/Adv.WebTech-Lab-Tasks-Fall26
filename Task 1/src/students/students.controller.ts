
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { StudentsService } from './students.service.js';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  getAllStudents() {
    return this.studentsService.getAllStudents();
  }


@Post()
addStudent(
  @Body() student: {
    id: number;
    name: string;
    age: number;
    major: string;
  },
) {
  return this.studentsService.addStudent(student);
}


@Get(':id')
getStudentById(@Param('id', ParseIntPipe) id: number) {
  return this.studentsService.getStudentById(id);
}



@Patch(':id')
updateStudent(
  @Param('id', ParseIntPipe) id: number,
  @Body() updatedData: {
    name?: string;
    age?: number;
    major?: string;
  },
) {
  return this.studentsService.updateStudent(id, updatedData);
}





@Delete(':id')
deleteStudent(@Param('id', ParseIntPipe) id: number) {
  return this.studentsService.deleteStudent(id);
}



}
