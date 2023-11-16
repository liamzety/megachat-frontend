import httpService from "./httpService"

const ENDPOINT="auth"
export const authService = {
    login,
    signUp,
    logout
}
async function login(userDetails) {
    return await httpService.post(`${ENDPOINT}/login`, userDetails)
    
}
async function signUp(userDetails) {
    return await httpService.post(`${ENDPOINT}/signup`,userDetails)
}
async function logout() {
    return await httpService.post(`${ENDPOINT}/logout`)
}
