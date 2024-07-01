import { DataSource, DataSourceOptions } from "typeorm";
import { Department } from "./entities/department.entity";
import { Employee } from "./entities/employee.entity";
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'erpdb',
  password: '123456',
  database: 'erp_db1',
  entities: [Department, Employee],
  migrations: ["dist/migrations/*.js"],
}
const dataSource = new DataSource(dataSourceOptions)
export default dataSource

// npm run typeorm -- migration:generate -d ./dist/data-source.js ./src/migrations/CreateEmployeeAndDepartmentTables
// npm run typeorm -- migration:run -d ./data-source.ts
//npm run migration:generate
//npm run migration:run

