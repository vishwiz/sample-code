import { put, takeLatest, call } from 'redux-saga/effects'
import APIRequest from '../config/apiCall';
const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* registerUserAsync({ payload }) {

    try {
        yield delay(4000)
        const data = yield call(APIRequest.post, payload);
        yield put({ type: 'REGISTER_ASYNC', data });
    } catch (error) {
        console.log("error : ", error)
    }

}

export function* decrementAsync() {
    yield delay(1000)
    yield put({ type: 'DECREMENT_ASYNC' })
}
export function* watchIncrementAsync() {
    yield takeLatest('REGISTER_USER', registerUserAsync);
    yield takeLatest('DECREMENT', decrementAsync);
}