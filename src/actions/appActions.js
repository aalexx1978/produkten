import {RECEIVE_DATA, DELETE, ADD} from './allActions';
import axios from 'axios';
const url="https://www.zamro.nl/actions/ViewProduct-ProductCompare?SKU=115E19,11545A,115E1A,115576";
export function receiveData(data) {
  return { type: RECEIVE_DATA, data: data};
}
export function remove(data, remove, who) {
    let newRemove=[];
    let newData=[];
    remove.push(data[who]);
    data.splice(who, 1);
    let newData2=newData.concat(data);
    let newRemove2=newRemove.concat(remove);
    return { type: DELETE, data: newData2, remove:newRemove2} ;
}
export function add(data,  remove,who) {
    let newRemove=[];
    let newData=[];
    data.push(remove[who]);
    remove.splice(who, 1);
    let newData2=newData.concat(data);
    let newRemove2=newRemove.concat(remove);
    return { type: ADD, data: newData2, remove:newRemove2} ;
}
export function fetchData() {
  return (dispatch) => { 
  axios
    .get(url)
    .then(result => dispatch(receiveData(result.data.products)))
  }
}