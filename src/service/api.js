import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { ENV } from '../../env';

const header = {
    "Content-Type": "application/json",
}

async function getAuthHeader() {
    return {
        "Content-Type": "application/json",
        "Authorization": "beAuty " + await AsyncStorage.getItem('token')
    }
}

const host = ENV.host;

const getPayload = async (name, data) => {
    switch (name) {
        case 'public':
            return {
                headers: header,
                method: 'get',
                url: host + '/photos_public.gne?format=json',
                data: null
            }
        case 'publicTag':
            return {
                headers: header,
                method: 'get',
                url: host + '/photos_public.gne?format=json&tags=' + data,
                data: null
            }
        default:
            throw 'Error api not found'
    }
}

async function request({
    method, url, headers, data
}) {
    const payload = {
        headers,
        method,
        url,
        data
    }

    const res = await axios(payload);
    return res.data;
}

function parseData(data) {
    try {
        const getData = data.toString().substring(15, data.toString().length - 1)
        const key = data.toString().substring(0, 14);
        if(key === 'jsonFlickrFeed'){
            return JSON.parse(getData)
        } else {
            throw({
                message: 'deference key'
            })
        }        
    } catch (error) {        
        alert(error.message)
    }
}

export const flickrApi = async (name, data) => {
    const payload = await getPayload(name, data)
    const jsonFlickrApi = await request(payload)
    const response = parseData(jsonFlickrApi)
    return response
}