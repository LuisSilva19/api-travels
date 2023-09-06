import axios, { AxiosRequestConfig } from 'axios';

export function integration(token: string, ) {
    const config: AxiosRequestConfig = {
    headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json', 
        }
    };
    return config;
}

async function integracaoPost(body: string, config: AxiosRequestConfig) {
    try {
      const response = await axios.post('/recurso', body, config);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar o recurso:', error);
      throw error;
    }
}

async function atualizarRecurso(url: string, body: string, config: AxiosRequestConfig) {
    try {
      const response = await axios.put(url, body, config);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar o recurso:', error);
      throw error;
    }
  }

async function integracaoGet(url: string, config: AxiosRequestConfig) {
    try {
        const response =  await axios.get(url, config)
        return response.data;
    } catch (error) {
        console.error('Erro ao criar o recurso:', error);
        throw error;
    }
}

async function excluirRecurso(url: string, config: AxiosRequestConfig) {
    try {
      const response = await axios.delete(url, config);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir o recurso:', error);
      throw error;
    }
  }


function testIntegracao() {
    const config = integration( "token");
}