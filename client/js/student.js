"use strict";

export default class Student {
  id;
  name;
  surname;
  lastname;
  birthday;
  studyStart;
  faculty;
  #today;
  #currYear;

  constructor(id, name, surname, lastname, birthday, studyStart, faculty) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.lastname = lastname;
    this.birthday = birthday;
    this.studyStart = studyStart;
    this.faculty = faculty;

    this.#today = new Date();
    this.#currYear = this.#today.getFullYear();
  }

  get fio() {
    return this.surname + " " + this.name + " " + this.lastname;
  }

  get age() {
    return this.#currYear - this.birthday.getFullYear();
  }

  getAge() {
    const age = this.#currYear - this.birthday.getFullYear();
    const words = ["год", "года", "лет"];
    const cases = [2, 0, 1, 1, 1, 2];
    const index =
      age % 100 > 4 && age % 100 < 20 ? 2 : cases[age % 10 < 5 ? age % 10 : 5];
    return age + " " + words[index];
  }

  getBirthday() {
    const year = this.birthday.getFullYear();
    let month = this.birthday.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = this.birthday.getDate();
    day = day < 10 ? "0" + day : day;
    return day + "." + month + "." + year;
  }

  getBirthdayAndAgeString() {
    return this.getBirthday() + " (" + this.getAge() + ")";
  }

  getCourseOfStudy() {
    const endStudyYear = this.studyStart + 3;
    const course =
      (endStudyYear === this.#currYear && this.#today.getMonth >= 8) ||
      endStudyYear < this.#currYear
        ? "Закончил"
        : `${this.#currYear - this.studyStart + 1} курс`;
    return `${this.studyStart} - ${endStudyYear} (${course})`;
  }
}
