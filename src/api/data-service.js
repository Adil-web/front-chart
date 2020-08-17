
export default function authHeader() {
    let userToken = sessionStorage.getItem('user-token');

    if (userToken) {
        return { Authorization: 'Bearer ' + userToken };
    } else {
        return {};
    }
}

