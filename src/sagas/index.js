import { all } from 'redux-saga/effects';
import { loginAndRegisterSaga } from "./loginAndRegisterSaga";
import { productListSaga } from "./productListSaga";
import {deliverySaga} from './deliverySaga';


export default function* rootSaga() {
    yield all([
        ...loginAndRegisterSaga, ...productListSaga, ...deliverySaga
    ])
}