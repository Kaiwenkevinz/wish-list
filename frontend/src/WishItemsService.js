import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

// WishItemsService is a class which provides methods to interact with Django REST API
export default class WishItemsService {
    
    constructor(){}

    getWishItems() {
        const url = `${API_URL}/api/items`;
        const promise = axios.get(url)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                throw error;
            });

        return promise;
    }

    getWishItemByKey(pk) {
        const url = `${API_URL}/api/items/${pk}`;
        const promise = axios.get(url)
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                throw error;
            });
        return promise;
    }

    getWishItemsByPageLink(link) {
        const url = `${API_URL}${link}`;
        const promise = axios.get(url)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                throw error;
            });

        return promise;
    }

    createWishItem(item) {
        const url = `${API_URL}/api/items/`;
        const promise = axios.post(url, item)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                throw error;
            });

        return promise;
    }

    deleteWishItem(id) {
        const url = `${API_URL}/api/items/${id}`;
        const promise = axios.delete(url)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                throw error;
            });

        return promise;
    }

    updateWishItem(item) {
        const url = `${API_URL}/api/items/${item.id}`;
        const promise = axios.put(url, item)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                throw error;
            });

        return promise;
    }
}