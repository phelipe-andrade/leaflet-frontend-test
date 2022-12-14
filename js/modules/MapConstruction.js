import EndPoints from "./EndPoints.js";

export default class MapConstruction{
    constructor() {
        this.coordinates = { lat: 0, lng: 0, zoom: 0 }
        this.infoMap = undefined;
        this.map = undefined;
        this.points = undefined;
    }
  
    async configMap(map){
        let nameMap = undefined;
        if (map) nameMap = map.querySelector('span').innerText;
        const result = await EndPoints.getInfo('initial'); 
        const maps =  result.tile_layers;
        const view = result.initial_view;
        let updatePoints = true;
        
        this.coordinates = {
            lat: view.center.lat,
            lng: view.center.lng,
            zoom: view.zoom,
        } 

        // Muda o mapa de acordo com o selecionado
        // Por padrão já o primeiro é utilizado
        if (!nameMap) this.infoMap = maps[0]; 
        else {
            for (const map of maps) {
                if(map.name.includes(nameMap)) this.infoMap = map;
            }
            updatePoints = false
        }
        
        await this.mapRender();
        await this.insertPoints(updatePoints);
    }

    //
    async mapRender() {
        if (this.map === undefined) this.map = L.map('map').setView([this.coordinates.lat, this.coordinates.lng], this.coordinates.zoom);
        else {
            this.map.remove();
            this.map = L.map('map').setView([this.coordinates.lat, this.coordinates.lng], this.coordinates.zoom);
        }

        L.tileLayer(this.infoMap.url, {
            maxZoom: this.infoMap.maxZoom, 
            attribution: this.infoMap.attribution
        }).addTo(this.map);
    }

    async insertPoints(updatePoints) {
        if (updatePoints) this.points = await EndPoints.getInfo('points');

        for (const point of this.points){
            const cord = point.geometry.coordinates;
            const prop = point.properties
            const featureIcon = L.icon({
                iconUrl: prop.icon,
                iconSize: [32, 32],
                iconAnchor: [16, 37],
                popupAnchor: [0, -28]
            });
            
            // Alteração na posição das cordenadas, pois o modo como vinha da API,
            // a localização estava indo para o meio do oceano.
            L.marker([cord[1], cord[0]], {icon: featureIcon}).addTo(this.map)
            .bindPopup(`<p>${point.properties.name}</p><br>${prop.popupContent}<button class="btn-data" id="${prop.id}">Medições hitóricas</button>`)
        }
    }
}
