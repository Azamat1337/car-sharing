import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

class NewsServices {
    getTopHeadlines = ({q = '', country = 'us', category = '', pageSize = 10, page = 1}) => {
        const params = {
            apiKey: API_KEY,
            country,
            category,
            q,
            pageSize,
            page
        };
        return axios
            .get(`${BASE_URL}/top-headlines`, {params})
            .then(res => res.data);
    }

    searchEverything = ({q, from, to, sortBy = 'publishedAt', pageSize = 10, page = 1}) => {
        const params = {
            apiKey: API_KEY,
            q,
            from,
            to,
            sortBy,
            pageSize,
            page
        };
        return axios
            .get(`${BASE_URL}/everything`, {params})
            .then(res => res.data);
    }
}

export default new NewsServices();