import { deleteCookie } from "cookies-next"

const logout = () => {
    deleteCookie('login_token',{domain: location.hostname,path: '/'})
    location.reload();
}

export default logout;