import { put, takeLatest, call } from 'redux-saga/effects'
import get from '../config/apiCall';

const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* incrementAsync() {
    // yield delay(4000)
    const products = yield call(get, '/products')

    console.log("product : ", products);

    yield put({ type: 'INCREMENT_ASYNC' })
}

export function* decrementAsync() {
    yield delay(1000)
    yield put({ type: 'DECREMENT_ASYNC' })
}
export function* watchIncrementAsync() {
    yield takeLatest('INCREMENT', incrementAsync);
    yield takeLatest('DECREMENT', decrementAsync);
}