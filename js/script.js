import MapConstruction from './modules/MapConstruction.js';
import InfoUser from './modules/InfoUser.js';
import Graphic from './modules/Graphic.js'


const miniMaps = document.querySelectorAll('.mapsOptions li');
const user = document.querySelector('.user');
const btn = document.querySelector('.btn-data');

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


        document.addEventListener('click', (event) => {
            const popup = event.target.parentNode;
            const namePoint = popup.querySelector('p');
            if (namePoint) {
                const currentPoint = new Graphic();
                currentPoint.start(namePoint.innerText);
            }        
        })
    } catch (error) {
        console.log('atualize a página');
    }
    
}

start();




