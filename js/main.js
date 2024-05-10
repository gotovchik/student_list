"use strict";

import Student from "./student.js";

const students = [
  new Student(
    "Игорь",
    "Готовчик",
    "Витальевич",
    new Date(1995, 6, 18),
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

let sortProp = "fio";
let sortDir = true;
let filterProp = "fio";
let filterValue = "";

function createTableRow(student) {
  const tableRow = document.createElement("tr");
  const studentFIO = document.createElement("td");
  const studentFaculty = document.createElement("td");
  const studentBirthdate = document.createElement("td");
  const studentCourse = document.createElement("td");

  studentFIO.textContent = student.fio;
  studentFaculty.textContent = student.faculty;
  studentBirthdate.textContent = student.getBirthdateAndAgeString();
  studentCourse.textContent = student.getCourseOfStudy();

  tableRow.append(studentFIO);
  tableRow.append(studentFaculty);
  tableRow.append(studentBirthdate);
  tableRow.append(studentCourse);

  return tableRow;
}

function renderStudentTable() {
  const students = filterStudents(
    sortStudents(sortProp, sortDir),
    filterProp,
    filterValue
  );

  studentList.innerHTML = "";

  for (const student of students) {
    studentList.append(createTableRow(student));
  }
}

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

function filterStudents(arr, prop, value) {
  const arrCopy = [...arr];
  const result = [];
  for (const item of arrCopy) {
    if (String(item[prop]).includes(value)) result.push(item);
  }
  return result;
}

tableHeaders.forEach((el) => {
  el.addEventListener("click", function () {
    sortProp = this.dataset.prop;
    sortDir = !sortDir;
    renderStudentTable();
  });
});

filters.forEach((el) => {
  el.addEventListener("input", function () {
    filterProp = this.dataset.filter;
    filterValue = this.value;
    renderStudentTable();
  });
});

renderStudentTable();
