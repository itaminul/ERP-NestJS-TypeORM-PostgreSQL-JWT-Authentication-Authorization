import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Employee } from "src/entities/employee.entity";
import { Repository } from "typeorm";
import { CreateEmployeeDTO } from "./dto/create.employee.dto";
import { UpdateEmployeeDTO } from "./dto/update.employee.dto";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    public readonly employeeRepository: Repository<Employee>
  ) {}
  async getAll() {
    return await this.employeeRepository
      .createQueryBuilder("employee")
      .getMany();
  }

  async getAllActive() {
    return await this.employeeRepository
      .createQueryBuilder("employee")
      .where("employee.activeStatus =: activeStatus", { activeStatus: 1 })
      .getMany();
  }

  async getAllInactive() {
    return await this.employeeRepository
      .createQueryBuilder("employee")
      .where("employee.activeStatus =: activeStatus", { activeStatus: 0 })
      .getMany();
  }
  async create(createEmployeeDto: CreateEmployeeDTO) {
    try {
      const {
        firstName,
        lastName,
        middleName,
        mobileOne,
        mobileTwo,
        emergencyMobile,
        fullName,
        empImage,
        empSignature,
        officeEmail,
        personalEmail,
        phone,
        nationalId,
        salary,
      } = createEmployeeDto;
      const employeeData = this.employeeRepository.create(createEmployeeDto);
      await this.employeeRepository.save(employeeData);
    } catch (error) {
      throw new Error("Failed to save employee");
    }
  }
  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDTO
  ): Promise<Employee> {
    try {
      // Check if employee exists
      const employee = await this.employeeRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!employee) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: "Employee not found",
            error: "Not Found",
          },
          HttpStatus.NOT_FOUND
        );
      }

      // Update employee fields
      Object.assign(employee, updateEmployeeDto);

      // Save updated employee
      return await this.employeeRepository.save(employee);
    } catch (error) {
      throw error;
    }
  }

  async deleteEmployeeById(id: number) {
    try {
      const result = await this.employeeRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException("Employee not found", HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "Failed to delete employee",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
