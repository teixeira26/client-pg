import axios from 'axios';
import {
    GET_OWNERS,
    GET_NAME_OWNER,
    FILTER_BY_OWNER,
    GET_PROVIDERS,
    ID_PROVIDER,
    SORT_PROVIDER_PRICE,
    FILTER_PROVIDER_PRICE,
    GET_EVENTS,
    GET_PETS,
    GET_SOLDS,
    GET_REVIEWS,
    ID_OWNER
} from '../actions-type/ownProvActionTypes';

export function getOwners() {
    return async function (dispatch) {
        var json = await axios.get(`https://backend-pg-production.up.railway.app/owners`);
        return dispatch({
            type: GET_OWNERS,
            payload: json.data
        })
    }
};


export function getProviders() {
    return async function (dispatch) {
        var json = await axios.get(`https://backend-pg-production.up.railway.app/providers`)
        return dispatch({
            type: GET_PROVIDERS,
            payload: json.data
        })
    }
};

export function getProviderById(email) {
    return function(dispatch){
        axios.get(`https://backend-pg-production.up.railway.app/providers/${email}`)
        .then(response => {
            dispatch({
                type: ID_PROVIDER,
                payload: response.data
            })
        })
    }
};

export function getNameOwner(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`https://backend-pg-production.up.railway.app/owners?name=${name}`);
            return dispatch({
                type: GET_NAME_OWNER,
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export function getSolds() {
    return async function (dispatch) {
        var json = await axios.get(`https://backend-pg-production.up.railway.app/solds`);
        return dispatch({
            type: GET_SOLDS,
            payload: json.data
        })
    }
};


export function filterByOwner(payload) {
    return {
        type: FILTER_BY_OWNER,
        payload
    }
};

export function putProvider(modification) {
    return async function () {
        try {
            await axios.put(`https://backend-pg-production.up.railway.app/providers/`, modification)
        } catch (error) {
            console.log(error)
        }
    }
};

export function postPet(email, modification) {
    return async function () {
        try {
            console.log(email)
            await axios.post(`https://backend-pg-production.up.railway.app/pets`, modification)
        } catch (error) {
            console.log(error)
        }
    }
};

export function putOwnerInfo(email, modification) {
    return async function () {
        try {
            console.log(email)
            await axios.put(`https://backend-pg-production.up.railway.app/owners/${email}`, modification)
        } catch (error) {
            console.log(error)
        }
    }
};

export function getPets() {
    return async function (dispatch) {
        var json = await axios.get(`https://backend-pg-production.up.railway.app/pets`);
        return dispatch({
            type: GET_PETS,
            payload: json.data
        })
    }
};


export function postProvider(newProvider) {
    return async function () {
        try {
            await axios.post(`https://backend-pg-production.up.railway.app/providers`, newProvider)
        } catch (error) {
            console.log(error)
        }
    }
}


export function sortByProviderPrice(payload){
    return {
        type: SORT_PROVIDER_PRICE,
        payload,
    }
};

export function filterByProviderService(payload){
    return {
        type: FILTER_PROVIDER_PRICE,
        payload,
    }
};

export function getEvents() {
    return async function (dispatch) {
        var json = await axios.get(`https://backend-pg-production.up.railway.app/events`);
        return dispatch({
            type: GET_EVENTS,
            payload: json.data
        })
    }
};

export function postEvent(newEvent) {
    return async function () {
        try {
            await axios.post(`https://backend-pg-production.up.railway.app/events`, newEvent)
        } catch (error) {
            console.log(error)
        }
    }
};

export function getReviews() {
    return async function (dispatch) {
        var json = await axios.get(`https://backend-pg-production.up.railway.app/reviews`);
        return dispatch({
            type: GET_REVIEWS,
            payload: json.data
        })
    }
};

export function putEvent(id, modification) {
    return async function () {
        try {
            await axios.put(`https://backend-pg-production.up.railway.app/events/${id}`, modification)
        } catch (error) {
            console.log(error)
        }
    }
};


export function selectedEvent(payload){
    return {
        type: 'SELECTED_EVENT',
        payload,
    }
}


export function groupEvents(){
    return{
        type: 'GROUP_EVENTS'
    }
}

export function getOwnerById(email) {
    return function(dispatch){
        axios.get(`https://backend-pg-production.up.railway.app/owners/${email}`)
        .then(response => {
            dispatch({
                type: ID_OWNER,
                payload: response.data
            })
        })
    }
};
