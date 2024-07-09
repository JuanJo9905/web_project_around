class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  // Método para obtener la información del usuario
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    };
  }

  // Método para establecer la información del usuario
  setUserInfo({ name, job }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}

export default UserInfo;