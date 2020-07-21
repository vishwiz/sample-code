import { all } from 'redux-saga/effects';
import { loginAndRegisterSaga } from "./loginAndRegisterSaga";


export default function* rootSaga() {
    yield all([
        ...loginAndRegisterSaga
    ])
}