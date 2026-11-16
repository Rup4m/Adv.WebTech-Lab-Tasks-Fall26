# Lab Task 02: Course Management REST API (NestJS)

## 1. Objective

The objective of this lab task is to extend the existing NestJS REST API project by implementing a Course Management API with Data Transfer Objects (DTOs), input validation, global ValidationPipe, and file upload functionality.

## 2. Technologies Used

- Node.js
- NestJS
- TypeScript
- Postman
- Visual Studio Code
- Multer
- class-validator
- class-transformer
- @nestjs/mapped-types

## 3. Step-by-Step Implementation Procedure

### Step 1: Open the Existing NestJS Project

Opened the existing Lab Task 01 project in Visual Studio Code.

Opened the integrated terminal and installed the required dependencies.

```bash
npm install
```

### Step 2: Install Required Packages

Installed the packages required for DTO validation and file uploads.

```bash
npm install class-validator class-transformer @nestjs/platform-express multer
```

Installed TypeScript type definitions:

```bash
npm install -D @types/multer @types/express
```

Installed the mapped types package:

```bash
npm install @nestjs/mapped-types
```

### Step 3: Generate Course Module, Controller, and Service

Used NestJS CLI commands to generate the Course Management components.

```bash
npx nest g module course
npx nest g controller course
npx nest g service course
```

Generated files:

- `course.module.ts`
- `course.controller.ts`
- `course.service.ts`

The Course Module was registered in `app.module.ts`.

### Step 4: Create DTO Files

Created a `dto` folder inside `src/course`.

Created two DTO files:

- `create-course.dto.ts`
- `update-course.dto.ts`

**CreateCourseDto validation rules:**

| Field | Type | Validation |
|---|---|---|
| name | string | Required, cannot be empty |
| code | string | Required, cannot be empty |
| instructor | string | Required, cannot be empty |
| credits | number | Required, between 1 and 6 |
| description | string | Optional |

Used `@IsString()`, `@IsNotEmpty()`, `@IsNumber()`, `@Min()`, `@Max()`, and `@IsOptional()` from class-validator.

Used `@Type(() => Number)` for numeric conversion.

For updating course information, `UpdateCourseDto` extends `PartialType(CreateCourseDto)` to make DTO fields optional while retaining their validation rules.

### Step 5: Enable Global ValidationPipe

Configured global request validation in `src/main.ts`.

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

**Purpose:**

- `whitelist: true` removes properties not defined in the DTO.
- `forbidNonWhitelisted: true` rejects requests containing unknown properties.
- `transform: true` enables request data transformation.

### Step 6: Implement Course Service

Implemented the following methods inside `course.service.ts`:

1. `getAllCourses()`
2. `getCourseById(id)`
3. `createCourse(dto)`
4. `updateCourse(id, dto)`
5. `patchCourse(id, dto)`
6. `deleteCourse(id)`
7. `uploadCourseMaterial(id, file)`

Each method returns a structured JSON response containing appropriate messages and data.

This lab implementation returns demonstration responses and does not use a database for persistent course storage.

### Step 7: Implement Course Controller

Implemented REST API endpoints in `course.controller.ts` using NestJS decorators.

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/course` | Retrieve all courses |
| GET | `/course/:id` | Retrieve course by ID |
| POST | `/course` | Create a course |
| PUT | `/course/:id` | Update a course |
| PATCH | `/course/:id` | Partially update a course |
| DELETE | `/course/:id` | Delete a course |
| POST | `/course/:id/upload` | Upload course material |

Used `@Body()`, `@Param()`, `@Get()`, `@Post()`, `@Put()`, `@Patch()`, and `@Delete()` decorators.

### Step 8: Implement File Upload

Implemented file upload using `FileInterceptor`, Multer, and `diskStorage`.

**Upload configuration:**

- Allowed file extensions: `.jpg`, `.jpeg`, `.png`, `.pdf`
- Maximum file size: 2 MB
- Request format: `multipart/form-data`
- Form-data key: `file`
- Upload directory: `uploads/`

The system automatically generates a filename and stores the uploaded file in the upload directory.

Invalid file types and oversized files are rejected.

### Step 9: Run the NestJS Application

Started the application using:

```bash
npm run start:dev
```

The application runs at:

```text
http://localhost:3000
```

Successful startup message:

```text
Nest application successfully started
```

### Step 10: Test APIs Using Postman

Tested the REST API endpoints using Postman.

**Test 1: Create Course**

Method: `POST`

URL:

```text
http://localhost:3000/course
```

Request Body:

```json
{
  "name": "NestJS Fundamentals",
  "code": "CS101",
  "instructor": "John Doe",
  "credits": 3,
  "description": "Introduction to NestJS"
}
```

Expected status: `201 Created`

**Test 2: Get All Courses**

Method: `GET`

URL: `http://localhost:3000/course`

Expected status: `200 OK`

**Test 3: Get Course by ID**

Method: `GET`

URL: `http://localhost:3000/course/5`

Expected status: `200 OK`

**Test 4: Update Course**

Method: `PUT`

URL: `http://localhost:3000/course/5`

Request Body:

```json
{
  "name": "Advanced NestJS",
  "code": "CS201",
  "instructor": "John Doe",
  "credits": 4
}
```

Expected status: `200 OK`

**Test 5: Partially Update Course**

Method: `PATCH`

URL: `http://localhost:3000/course/5`

Request Body:

```json
{
  "name": "NestJS Advanced Course",
  "credits": 5
}
```

Expected status: `200 OK`

**Test 6: Delete Course**

Method: `DELETE`

URL: `http://localhost:3000/course/5`

Expected status: `200 OK`

**Test 7: Upload Course Material**

Method: `POST`

URL:

```text
http://localhost:3000/course/5/upload
```

In Postman:

1. Selected Body → form-data.
2. Entered `file` as the key.
3. Selected File as the data type.
4. Selected a PDF file.
5. Sent the request.

Expected status: `201 Created`

Example response:

```json
{
  "message": "Material uploaded successfully",
  "courseId": "5",
  "filename": "generated-filename.pdf",
  "path": "uploads/generated-filename.pdf"
}
```

### Step 11: Test Invalid Requests

Tested input validation using invalid request bodies.

| Test Case | Expected Result |
|---|---|
| Empty course name | 400 Bad Request |
| Credits greater than 6 | 400 Bad Request |
| Missing required fields | 400 Bad Request |
| Unknown extra property | 400 Bad Request |
| Upload invalid `.txt` file | Request rejected |
| Upload file larger than 2 MB | Request rejected |

Validation prevents invalid requests from being processed.

### Step 12: Project Structure

```text
my-project/
├── src/
│   ├── course/
│   │   ├── dto/
│   │   │   ├── create-course.dto.ts
│   │   │   └── update-course.dto.ts
│   │   ├── course.controller.ts
│   │   ├── course.service.ts
│   │   └── course.module.ts
│   ├── students/
│   ├── app.module.ts
│   └── main.ts
├── uploads/
├── package.json
├── nest-cli.json
└── tsconfig.json
```

The `uploads` directory is generated at runtime.

## 4. Conclusion

In this lab task, a Course Management REST API was implemented using NestJS. DTO-based validation, global ValidationPipe, structured JSON responses, CRUD endpoints, and file upload functionality were added.

The application demonstrates how NestJS modules, controllers, services, DTOs, and interceptors work together to build a structured REST API.