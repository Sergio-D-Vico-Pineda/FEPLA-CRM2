
const url = "http://" + window.location.hostname + ":" + window.location.port
const apiurl = url + "/api"

const data = {
    id_active_user: parseInt(localStorage.getItem("id_active_user"))
}

export { url, apiurl, data }