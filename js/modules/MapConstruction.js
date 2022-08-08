import EndPoints from "./EndPoints.js";

export default class MapConstruction{
    constructor() {
        this.coordinates = { lat: 0, lng: 0, zoom: 0 }
        this.infoMap = undefined;
        this.map = undefined;
    }
  
    async configMap(nameMap){
        const result = await EndPoints.getInfo('initial'); 
        const maps =  result.tile_layers
        for (const map of maps) {
            if(map.name.includes(nameMap)) this.infoMap = map;
        }

        const view = result.initial_view;
        this.coordinates = {
            lat: view.center.lat,
            lng: view.center.lng,
            zoom: view.zoom,
        } 

        await this.mapRender();
        await this.insertPoints();
    }

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

    async insertPoints() {
        const points = await EndPoints.getInfo('points');
        for (const point of points){
            const cord = point.geometry.coordinates;
            const prop = point.properties
            const featureIcon = L.icon({
                iconUrl: prop.icon,
                iconSize: [32, 32],
                iconAnchor: [16, 37],
                popupAnchor: [0, -28]
            });
            
            L.marker([cord[1], cord[0]], {icon: featureIcon}).addTo(this.map)
            .bindPopup(`<p>${point.geometry.type}</p><br>${prop.popupContent}`)
        }
    }

    async start(nameMap) {
        await this.configMap(nameMap);
        await this.mapRender();
        await this.insertPoints();
    }
}
