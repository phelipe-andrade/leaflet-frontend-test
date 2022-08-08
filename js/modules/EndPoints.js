const baseURL = 'https://terraq.com.br';

class EndPoints{

  static async getInfo(current){
    const endPoints = {
      initial: '/api/teste-leaflet/visao-inicial',
      points: '/api/teste-leaflet/pontos',
      user: '/api/teste-leaflet/user',
    }
    const response = await fetch(`${baseURL}${endPoints[current]}`);
    const json = await response.json();
    return json;
  }
}

export default EndPoints;