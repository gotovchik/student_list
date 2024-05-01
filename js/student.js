function getAgeString(age) {
  const words = ["год", "года", "лет"];
  const cases = [2, 0, 1, 1, 1, 2];
  const index =
    age % 100 > 4 && age % 100 < 20 ? 2 : cases[age % 10 < 5 ? age % 10 : 5];
  return words[index];
}

const today = new Date();

class Student {
  name;
  surname;
  patronymic;
  birthdate;
  startStudyYear;
  faculty;

  constructor(name, surname, patronymic, birthdate, startStudyYear, faculty) {
    this.name = name;
    this.surname = surname;
    this.patronymic = patronymic;
    this.birthdate = birthdate;
    this.startStudyYear = startStudyYear;
    this.faculty = faculty;
  }

  getFullName() {
    return `${this.surname} ${this.name} ${this.patronymic}`;
  }

  getFaculty() {
    return this.faculty;
  }

  getBirthdateAndAge() {
    const year = this.birthdate.getFullYear();
    let month = this.birthdate.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = this.birthdate.getDate();
    day = day < 10 ? "0" + day : day;
    const age = today.getFullYear() - year;

    return `${day}.${month}.${year} (${age} ${getAgeString(age)})`;
  }

  getCourseOfStudy() {
    const endStudyYear = this.startStudyYear + 4;
    // доделать получение курса. Если сентябрь года окончания обучения уже прошел - закончил
    return;
  }
}

const student = new Student(
  "Игорь",
  "Готовчик",
  "Витальевич",
  new Date(1995, 6, 18),
  2022,
  "Информационные технологии"
);

console.log(student.getFullName());
console.log(student.getBirthdateAndAge());
console.log(student.getFaculty());
