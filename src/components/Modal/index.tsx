import { FormEvent, useState } from "react";
import Button from "../Button";
import { v4 as uuid } from "uuid";
import Slider from "@mui/material/Slider";
import { TimesGrey } from "../../assets";

import "./styles.css";

interface ModalProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  modalType: string;
  modalTitle: string;
  handleAddEmployee: any;
  handleEditEmployee: any;
  handleFilterSearch: any;
  employeeId?: number;
}

export default function Modal(props: ModalProps) {
  const {
    modalType,
    modalTitle,
    onCloseModal,
    isModalOpen,
    handleAddEmployee,
    handleEditEmployee,
    handleFilterSearch,
    employeeId,
  } = props;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [salary, setSalary] = useState(0);
  const [ageSliderValue, setAgeSliderValue] = useState<number[]>([16, 99]);
  const [salarySliderValue, setSalarySliderValue] = useState<number[]>([
    500, 8000,
  ]);
  const [emailCheckboxIsChecked, setEmailCheckboxIsChecked] = useState(false);
  const [ageCheckboxIsChecked, setAgeCheckboxIsChecked] = useState(false);
  const [salaryCheckboxIsChecked, setSalaryCheckboxIsChecked] = useState(false);

  const handleCheckboxChange = (event: any, checkboxType: string) => {
    if (checkboxType === "email") {
      setEmailCheckboxIsChecked((current) => !current);
    } else if (checkboxType === "age") {
      setAgeCheckboxIsChecked((current) => !current);
    } else {
      setSalaryCheckboxIsChecked((current) => !current);
    }
  };

  const handleAgeSlider = (event: Event, newValue: number | number[]) => {
    setAgeSliderValue(newValue as number[]);
  };

  const handleSalarySlider = (event: Event, newValue: number | number[]) => {
    setSalarySliderValue(newValue as number[]);
  };

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();

    if (modalType === "new") {
      const newEmployeeObject = {
        id: uuid(),
        name: name,
        email: email,
        age: age,
        salary: salary,
      };

      handleAddEmployee(newEmployeeObject);
    }

    if (modalType === "edit") {
      const editedEmployeeObject = {
        id: employeeId,
        name: name,
        age: age,
        salary: salary,
      };

      handleEditEmployee(editedEmployeeObject);
    }

    if (modalType === "filter") {
      const filteredFields = {
        email: email,
        age: ageSliderValue,
        salary: salarySliderValue,
      };

      handleFilterSearch(filteredFields);
    }

    onCloseModal();
    clearStates();
  }

  function handleCancel() {
    onCloseModal();
    clearStates();
  }

  function clearStates() {
    setEmail("");
    setName("");
    setAge(0);
    setSalary(0);
    setEmailCheckboxIsChecked(false);
    setAgeCheckboxIsChecked(false);
    setSalaryCheckboxIsChecked(false);
    setAgeSliderValue([16, 99]);
    setSalarySliderValue([500, 8000]);
  }

  if (!isModalOpen) {
    return null;
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="modal" onClick={onCloseModal}>
        <div className="modal__content" onClick={(e) => e.stopPropagation()}>
          <div className="modal__header">
            <h4>{modalTitle}</h4>
            <i className="icon" onClick={onCloseModal}>
              <img src={TimesGrey} alt="icon cerrar" />
            </i>
          </div>

          {/* Add and edit employee modal  */}
          {modalType !== "filter" && (
            <div className="modal__body">
              {modalType === "new" && (
                <input
                  className="formInput"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    return setEmail(e.target.value);
                  }}
                  required
                />
              )}
              <input
                className="formInput"
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => {
                  return setName(e.target.value);
                }}
                required
              />
              <div className="modal__bodyBottom">
                <input
                  className="formInput"
                  type="number"
                  placeholder="Edad"
                  onChange={(e) => {
                    return setAge(Number(e.target.value));
                  }}
                  required
                />
                <input
                  className="formInput"
                  type="number"
                  placeholder="Salario"
                  onChange={(e) => {
                    return setSalary(Number(e.target.value));
                  }}
                  required
                />
              </div>
            </div>
          )}

          {/* Filter modal  */}
          {modalType === "filter" && (
            <div className="checkbox__container">
              {/* Email checkbox */}
              <label className="checkbox__label">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    return handleCheckboxChange(e, "email");
                  }}
                />
                <span className="checkbox__checkmark"></span>
                Email
              </label>

              {emailCheckboxIsChecked && (
                <input
                  className="formInput"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    return setEmail(e.target.value);
                  }}
                />
              )}

              {/* Age checkbox */}
              <label className="checkbox__label">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    return handleCheckboxChange(e, "age");
                  }}
                />
                <span className="checkbox__checkmark"></span>
                Edad
              </label>
              {ageCheckboxIsChecked && (
                <Slider
                  max={99}
                  value={ageSliderValue}
                  onChange={handleAgeSlider}
                  valueLabelDisplay="auto"
                />
              )}

              {/* Salary checkbox */}
              <label className="checkbox__label">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    return handleCheckboxChange(e, "salary");
                  }}
                />
                <span className="checkbox__checkmark"></span>
                Salario
              </label>
              {salaryCheckboxIsChecked && (
                <Slider
                  max={10000}
                  value={salarySliderValue}
                  onChange={handleSalarySlider}
                  valueLabelDisplay="auto"
                />
              )}
            </div>
          )}

          <div className="modal__footer">
            <Button
              type="button"
              color="grey"
              content="Cancelar"
              onClick={handleCancel}
            />
            <Button
              color="yellow"
              content={modalType === "filter" ? "Filtrar" : "Guardar"}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
