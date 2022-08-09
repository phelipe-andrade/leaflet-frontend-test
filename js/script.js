import MapConstruction from './modules/MapConstruction.js';
import InfoUser from './modules/InfoUser.js';
import Graphic from './modules/Graphic.js';
import filterData from './modules/filterData.js';

const miniMaps = document.querySelectorAll('.mapsOptions li');
const user = document.querySelector('.user');

( async () => {
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
            const btn = event.target.classList;
            if ( btn.value === 'btn-data') {
                const currentPoint = new Graphic();
                currentPoint.start(event.target.id);
                filterData(currentPoint);
            }        
        })
    } catch (error) {
        // Caso ocorra algum problena na coleta dos dados,
        // surgirar um alert para regarregar a página
        alert('atualize a página, falha no carregamento!!!');
    }
    
}
)();





