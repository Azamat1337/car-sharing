import {call, put} from 'redux-saga/effects'
import {fetchNewsSuccess, fetchNewsFailure} from "../slice.js";
import newsServices from "../../../../services/news/newsServices.js";

export function* fetchNewsWorker(action) {
    try {
        const response = yield call(newsServices.getTopHeadlines, {})

        if (response.status === 'ok') {
            yield put(fetchNewsSuccess(response.articles));
            return
        }

        throw new Error('Возникла ошибка при получении данных с сервера')
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'Возникла ошибка при получении данных с сервера'
        yield put(fetchNewsFailure(errorMessage))
    }
}