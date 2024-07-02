import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseFilters,
} from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { CreateEmployeeDTO } from "./dto/create.employee.dto";
import { UpdateEmployeeDTO } from "./dto/update.employee.dto";
import { AllExceptionsFilter } from "src/exceptionFilter/http-exception.filter";

@Controller("employee")
@UseFilters(AllExceptionsFilter)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getAll() {
    try {
      const results = await this.employeeService.getAll();
      return {
        success: true,
        status: HttpStatus.OK,
        results,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get("/getAllActive")
  async getAllActive() {
    try {
      const results = await this.employeeService.getAllActive();
      return {
        success: true,
        status: HttpStatus.OK,
        results,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get("/getAllInActive")
  async getAllInActive() {
    try {
      const results = await this.employeeService.getAllInactive();
      return {
        success: true,
        status: HttpStatus.OK,
        results,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async creaet(@Body() employeeDto: CreateEmployeeDTO) {
    try {
      const results = await this.employeeService.create(employeeDto);
      return {
        success: true,
        status: HttpStatus.OK,
        results: results,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          "Failed to create employee",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDTO
  ) {
    try {
      const updatedEmployee = await this.employeeService.update(
        id,
        updateEmployeeDto
      );
      return {
        success: true,
        statusCode: HttpStatus.OK,
        message: "Employee updated successfully",
        data: updatedEmployee,
      };
    } catch (error) {
      throw error;
    }
  }
}
