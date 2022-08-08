import MapConstruction from './modules/MapConstruction.js';
import InfoUser from './modules/InfoUser.js';

const miniMaps = document.querySelectorAll('.mapsOptions li');
const user = document.querySelector('.user');

function start () {
    const map = new MapConstruction();
    miniMaps.forEach((m)=>{
        m.addEventListener('click', async (event)=> await map.start(event.target.innerText));
    })
    miniMaps[0].click();

    const infoCurrentUser = new InfoUser();
    infoCurrentUser.getInfoUser();
    user.addEventListener('click', async ()=> {infoCurrentUser.showInfo()});
}

start();





