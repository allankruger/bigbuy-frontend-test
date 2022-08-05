import { useState, useEffect, useMemo } from "react";

import { Header, Container, SearchBar, InputContainer } from "./styles";
import Button from "../Button";
import TableActionButton from "../TableActionButton";
import Modal from "../Modal";
import { SearchIcon, PersonPlusIcon } from "../../assets";
import Pagination from "@mui/material/Pagination";

import dataJson from "../../api/response/data.json";

export default function EmployeesList() {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [searchEmployee, setSearchEmployee] = useState("");
  const [data, setData] = useState(dataJson);
  const [currentEmployeeID, setCurrentEmployeeID] = useState(0);
  const [filteredData, setFilteredData] = useState<
    { id: number; name: string; email: string; age: number; salary: number }[]
  >([]);

  const searchedEmployee = handleSearchEmployee(searchEmployee);
  const newData = !searchedEmployee ? data : searchedEmployee;
  const dataToRender = filteredData.length === 0 ? newData : filteredData;
  const [pageSize, setPageSize] = useState(6);
  const [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState(
    dataToRender.slice(0, pageSize)
  );

  useMemo(() => {
    setPaginationData(dataToRender.slice(0, pageSize));
  }, [pageSize]);

  function handlePageChange(event: any, value: number) {
    setPage(value);
    setPaginationData(
      dataToRender.slice(0 + pageSize * (value - 1), pageSize * value)
    );
  }

  const changeListSize = (event: any) => {
    setPageSize(parseInt(event.target.value, 10));
  };

  function handleOpenModal(modalType: string, employeeId?: any) {
    if (modalType === "edit") {
      setModalType("edit");
      setModalTitle("Editar empleado");
      setCurrentEmployeeID(employeeId);
    } else if (modalType === "new") {
      setModalType("new");
      setModalTitle("Nuevo empleado");
    } else {
      setModalType("filter");
      setModalTitle("Filtrar");
    }
    setisModalOpen(true);
  }

  function handleCloseModal() {
    setisModalOpen(false);
  }

  function handleAddEmployee(employee: any) {
    const newData = [employee, ...data];
    setData(newData);
  }

  function handleEditEmployee(editedEmployee: any) {
    const editedEmployees = data.map((employee) => {
      if (editedEmployee.id === employee.id) {
        return {
          ...employee,
          age: editedEmployee.age,
          name: editedEmployee.name,
          salary: editedEmployee.salary,
        };
      }
      return employee;
    });

    setData(editedEmployees);
  }

  function handleDeleteEmployee(id: number) {
    const newEmployeeArray = data.filter((employee) => employee.id !== id);
    setData(newEmployeeArray);
  }

  function handleSearchEmployee(searchString: string) {
    const filteredEmployees = data.filter((employee) => {
      return employee.name.toLowerCase().includes(searchString.toLowerCase());
    });

    return filteredEmployees;
  }

  function handleFilterSearch(filters: any) {
    let filtered;
    if (filters.email !== "") {
      filtered = data.filter((employee) => {
        return employee.email
          .toLowerCase()
          .includes(filters.email.toLowerCase());
      });
    } else {
      filtered = data.filter((employee) => {
        return (
          employee.age >= filters.age[0] &&
          employee.age <= filters.age[1] &&
          employee.salary >= filters.salary[0] &&
          employee.salary <= filters.salary[1]
        );
      });
    }
    setFilteredData(filtered);
  }

  return (
    <Container>
      <Header>
        <SearchBar>
          <InputContainer>
            <i className="icon">
              <img src={SearchIcon} alt="Search icon" />
            </i>
            <input
              type="text"
              placeholder="Buscar empleado"
              onChange={(e) => {
                return setSearchEmployee(e.target.value);
              }}
            />
          </InputContainer>
          <Button
            color="blue"
            content="Filtrar"
            onClick={() => handleOpenModal("filter")}
          />
        </SearchBar>

        <Button
          color="yellow"
          content="Nuevo empleado"
          icon={PersonPlusIcon}
          alt={"Icon nuevo empleado"}
          onClick={() => handleOpenModal("new")}
        />
      </Header>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Salario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginationData.map((employee: any) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.age}</td>
              <td>{employee.salary}</td>
              <td className="Table__buttons">
                <TableActionButton
                  type="edit"
                  onClick={() => handleOpenModal("edit", employee.id)}
                  alt="icon editar empleado"
                />
                <TableActionButton
                  type="delete"
                  onClick={() => handleDeleteEmployee(employee.id)}
                  alt="icon deletar empleado"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="paginationContainer">
        <select onChange={changeListSize}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>

        <Pagination
          className="pagination"
          count={Math.ceil(dataToRender.length / pageSize)}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
        />
      </div>

      <Modal
        modalTitle={modalTitle}
        modalType={modalType}
        isModalOpen={isModalOpen}
        handleAddEmployee={handleAddEmployee}
        handleEditEmployee={handleEditEmployee}
        handleFilterSearch={handleFilterSearch}
        onCloseModal={handleCloseModal}
        employeeId={currentEmployeeID}
      />
    </Container>
  );
}
