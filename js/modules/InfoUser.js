import EndPoints from "./EndPoints.js";

const divUser = document.querySelector('.user');

export default class InfoUser {
    constructor() {
        this.currentUser = null;
    }

    async getInfoUser(){
        this.currentUser = await EndPoints.getInfo('user');
        return this.currentUser;
    }

    insertInfo() {
        const img = document.createElement('img');
        img.src = this.currentUser.avatar
        divUser.appendChild(img);
    }

    async showInfo() {
        divUser.classList.toggle('active');
        const ulInfo = divUser.querySelector('.info');
        const li = ulInfo.querySelectorAll('li');
        if (li.length >= 1) return;
        const infoUser = {
            id: this.currentUser.id,
            nome:this.currentUser.nome,
            email: this.currentUser.email,
            nascimento: this.currentUser.data_nascimento,
            telefone: this.currentUser.telefone,
            sexo: this.currentUser.sexo,
        }

        const keys = Object.keys(infoUser);
        for (const key of keys){
            const li = document.createElement('li');
            li.innerHTML = `<span>${key}:</span>${infoUser[key]}`;
            ulInfo.appendChild(li);
        }
    }
}