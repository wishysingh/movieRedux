import axios from 'axios';
export function apicall(text) {
    return function(dispatch) {
        axios.get(text).then(res => {
        dispatch ({
            type: "API_Call",
            payload: res.data
            });
        });
    }
}
