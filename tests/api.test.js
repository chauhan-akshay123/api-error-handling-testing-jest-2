const request = require("supertest");
const { app } = require("../index.js");
const {
  getEmployees,
  getEmployeeById,
  getDepartments,
  getDepartmentById
}  = require("../employee.js");

const http = require("http");

jest.mock("../employee.js", () => {
  const actualModule = jest.requireActual("../employee.js");
  return {
    ...actualModule,
    getEmployees: jest.fn(),
    getEmployeeById: jest.fn(),
    getDepartments: jest.fn(),
    getDepartmentById: jest.fn()
  };
});

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Error Handling Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it("GET API /api/employees should return 404 if no employees are found", async () => {
     getEmployees.mockResolvedValue([]);

     const response = await request(server).get("/api/employees");
     expect(response.statusCode).toEqual(404);
     expect(response.body.error).toBe("No employees found");
  });  

  it("GET API /api/employees/:id should return 404 for a non-existing employee", async () => {
    getEmployeeById.mockResolvedValue(null);

    const response = await request(server).get("/api/employees/99");
    expect(response.statusCode).toEqual(404);
    expect(response.body.error).toBe("No emplopyee found");
  });

  it("GET API /api/departments should return 404 if no departments are found", async () => {
    getDepartments.mockResolvedValue([]);

    const response = await request(server).get("/api/departments");
    expect(response.statusCode).toEqual(404);
    expect(response.body.error).toBe("No departments found");
  });
  
  it("GET API /api/departments/:id should return 404 for a non-existing department", async () => {
   getDepartmentById.mockResolvedValue(null);

   const response = await request(server).get("/api/departments/:id");
   expect(response.statusCode).toEqual(404);
   expect(response.body.error).toBe("No department found");
  });
});