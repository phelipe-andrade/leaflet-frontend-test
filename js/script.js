import MapConstruction from './modules/MapConstruction.js';
import InfoUser from './modules/InfoUser.js';

const miniMaps = document.querySelectorAll('.mapsOptions li');
const user = document.querySelector('.user');

async function start () {
    try {
        const map = new MapConstruction();
        await map.configMap()
        miniMaps.forEach((m)=>{
            m.addEventListener('click', async (event)=> await map.configMap(event.target.innerText));
        })

        const infoCurrentUser = new InfoUser();
        const result = await infoCurrentUser.getInfoUser();
        if (result) infoCurrentUser.insertInfo();
        user.addEventListener('click', async ()=> {infoCurrentUser.showInfo()});
    } catch (error) {
        console.log('atualize a página');
    }
    
}

start();





