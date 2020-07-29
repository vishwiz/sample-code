import { all } from 'redux-saga/effects';
import { loginAndRegisterSaga } from "./loginAndRegisterSaga";
import { productListSaga } from "./productListSaga";


export default function* rootSaga() {
    yield all([
        ...loginAndRegisterSaga, ...productListSaga
    ])
}