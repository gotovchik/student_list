"use strict";

export default class Student {
  #name;
  #surname;
  #patronymic;
  #birthdate;
  #startStudy;
  #faculty;
  #today;
  #currYear;

  constructor(name, surname, patronymic, birthdate, startStudy, faculty) {
    this.#name = name;
    this.#surname = surname;
    this.#patronymic = patronymic;
    this.#birthdate = birthdate;
    this.#startStudy = startStudy;
    this.#faculty = faculty;

    this.#today = new Date();
    this.#currYear = this.#today.getFullYear();
  }

  get fio() {
    return this.#surname + " " + this.#name + " " + this.#patronymic;
  }

  get age() {
    return this.#currYear - this.#birthdate.getFullYear();
  }

  get startStudy() {
    return this.#startStudy;
  }

  set startStudy(startStudy) {
    this.#startStudy = startStudy;
  }

  get faculty() {
    return this.#faculty;
  }

  set faculty(faculty) {
    this.#faculty = faculty;
  }

  getAge() {
    const age = this.#currYear - this.#birthdate.getFullYear();
    const words = ["год", "года", "лет"];
    const cases = [2, 0, 1, 1, 1, 2];
    const index =
      age % 100 > 4 && age % 100 < 20 ? 2 : cases[age % 10 < 5 ? age % 10 : 5];
    return age + " " + words[index];
  }

  getBirthdate() {
    const year = this.#birthdate.getFullYear();
    let month = this.#birthdate.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = this.#birthdate.getDate();
    day = day < 10 ? "0" + day : day;
    return day + "." + month + "." + year;
  }

  getBirthdateAndAgeString() {
    return this.getBirthdate() + " (" + this.getAge() + ")";
  }

  getCourseOfStudy() {
    const endStudyYear = this.#startStudy + 3;
    const course =
      (endStudyYear === this.#currYear && this.#today.getMonth >= 8) ||
      endStudyYear < this.#currYear
        ? "Закончил"
        : `${this.#currYear - this.#startStudy + 1} курс`;
    return `${this.#startStudy} - ${endStudyYear} (${course})`;
  }
}