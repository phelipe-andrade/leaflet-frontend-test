import EndPoints from "./endPoints.js";

const divUser = document.querySelector('.user');

export default class InfoUser {
    constructor() {
        this.currentUser = null;
    }

    async getInfoUser(){
        this.currentUser = await EndPoints.getInfo('user');
        //if (!this.currentUser) return divUser.innerHTML = '<p>Sem usuário</p>'
        const img = document.createElement('img');
        img.src = this.currentUser.avatar
        divUser.appendChild(img);
    }

    showInfo() {

    }
}