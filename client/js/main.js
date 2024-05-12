"use strict";

import Student from "./student.js";

// массив студентов
const students = [
  new Student(
    "Игорь",
    "Готовчик",
    "Витальевич",
    new Date(1995, 4, 18),
    2021,
    "Информационные технологии"
  ),
  new Student(
    "Василий",
    "Петров",
    "Иванович",
    new Date(1993, 9, 21),
    2018,
    "Электротехника"
  ),
  new Student(
    "Ольга",
    "Коваль",
    "Михайловна",
    new Date(1998, 2, 5),
    2019,
    "Ландшафтный дизайн"
  ),
];

const studentList = document.getElementById("student-list");
const tableHeaders = document.querySelectorAll(".table th");
const filters = document.querySelectorAll(".form-filter input");
const addStudentForm = document.getElementById("addStudentForm");
const btnSubmit = addStudentForm.querySelector("button");
const currDate = new Date();

// выставляем максимальное значение для инпута
document
  .getElementById("addBirthdate")
  .setAttribute("max", currDate.toISOString().split("T")[0]);

const inputStartStudy = document.getElementById("addStartStudy");
inputStartStudy.setAttribute("max", currDate.getFullYear());
inputStartStudy.setAttribute("value", currDate.getFullYear());

// переменные для сортировки и фильтрации
let sortProp = "fio";
let sortDir = true;
let filterProp = "fio";
let filterValue = "";

// рендер данных студента в строку таблицы
function createTableRowElement(student) {
  const tableRowElement = document.createElement("tr");
  const studentFIOElement = document.createElement("td");
  const studentFacultyElement = document.createElement("td");
  const studentBirthdateElement = document.createElement("td");
  const studentCourseElement = document.createElement("td");

  studentFIOElement.textContent = student.fio;
  studentFacultyElement.textContent = student.faculty;
  studentBirthdateElement.textContent = student.getBirthdateAndAgeString();
  studentCourseElement.textContent = student.getCourseOfStudy();

  tableRowElement.append(studentFIOElement);
  tableRowElement.append(studentFacultyElement);
  tableRowElement.append(studentBirthdateElement);
  tableRowElement.append(studentCourseElement);

  return tableRowElement;
}

// рендер всей таблицы
function renderStudentTable() {
  const students = filterStudents(
    sortStudents(sortProp, sortDir),
    filterProp,
    filterValue
  );

  studentList.innerHTML = "";

  for (const student of students) {
    studentList.append(createTableRowElement(student));
  }
}

// сортировка студентов по свойству
function sortStudents(prop, dir) {
  const studentsCopy = [...students];
  return studentsCopy.sort(function (studentA, studentB) {
    if (
      !dir == false
        ? studentA[prop] < studentB[prop]
        : studentA[prop] > studentB[prop]
    )
      return -1;
  });
}

// фильтрация массива по свойству
function filterStudents(arr, prop, value) {
  const arrCopy = [...arr];
  const result = [];
  for (const item of arrCopy) {
    if (String(item[prop]).toLowerCase().includes(value.toLowerCase()))
      result.push(item);
  }
  return result;
}

// слушатель на сортировку
tableHeaders.forEach((el) => {
  el.addEventListener("click", function () {
    sortProp = this.dataset.prop;
    sortDir = !sortDir;
    renderStudentTable();
  });
});

// слушатель на фильтрацию
filters.forEach((el) => {
  el.addEventListener("input", function () {
    filterProp = this.dataset.filter;
    filterValue = this.value;
    renderStudentTable();
  });
});

// слушатель на валидность введенных данных в инпуты
Array.from(addStudentForm.elements).forEach((input) => {
  if (input.required) {
    input.addEventListener("change", () => {
      if (input.checkValidity()) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        input.reportValidity();
      }
    });
  }
});

// слушатель на включение кнопки по валидности
addStudentForm.addEventListener("change", function () {
  btnSubmit.disabled = this.checkValidity() ? false : true;
});

// слушатель на отправку формы, добавление данных в массив
addStudentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("addName").value.trim();
  const surname = document.getElementById("addSurname").value.trim();
  const patronimyc = document.getElementById("addPatronimyc").value.trim();
  const birthdate = new Date(document.getElementById("addBirthdate").value);
  const startStudy = Number(document.getElementById("addStartStudy").value);
  const faculty = document.getElementById("addFaculty").value.trim();

  students.push(
    new Student(name, surname, patronimyc, birthdate, startStudy, faculty)
  );

  this.reset();
  btnSubmit.disabled = true;
  Array.from(this.elements).forEach((input) => {
    input.classList.remove("is-valid");
  });

  renderStudentTable();
});

renderStudentTable();
