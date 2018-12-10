
import axios from 'axios';
export function apicall(text) {
    console.log('aw', text);
    return function(dispatch) {
        axios.get(text).then(res => {
        dispatch ({
            type: "API_Call",
            payload1: res.data.results,
            payload2:res.data.total_pages
            });
        });
    }
}

export function searchChange(event){
    return {
        type: "Search_Change",
        payload: event.target.value
    }
}


export function initialState(text){
    console.log(text,"su");
    
    return {
        type: "Initial_State",
        payload: text
    }
}