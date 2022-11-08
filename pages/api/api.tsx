import axios, { AxiosResponse } from 'axios';
import { parseCookies } from 'nookies';

const API_URL = 'http://localhost:3000/';

export function getAPIClient(ctx?: any) {
  const { 'nextauth.token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: API_URL,
  });

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}

export const api = getAPIClient();

export function SERV_POST(data: any) {
  api
    .post(API_URL + 'service/create', data)
    .then(function (response: AxiosResponse) {
      alert('Serviço cadastrado com sucesso!');
    })
    .catch((err) => alert(err));
  return;
}

export function SERV_GET(set: any) {
  api
    .get(API_URL + 'service')
    .then((response: AxiosResponse) => {
      set(response.data);
    })
    .catch((err) => alert(err));
}

export function SERV_GET_ID(params: string, set: any) {
  api.get(API_URL + `service/${params}`).then((response) => {
    set(response.data);
  });
}

export function PROD_EDIT(params: string, data: any) {
  api
    .put(API_URL + `service/update/${params}`, data)
    .then(function (response) {
      alert('Serviço atualizado com sucesso!');
    })
    .catch((err) => alert(err));
}

export function PROD_DELETE(params: string) {
  api.delete(API_URL + `service/delete/${params}`).then(() => {
    window.location.reload();
  });
}
