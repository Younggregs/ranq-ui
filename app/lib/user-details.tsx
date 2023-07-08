
const user = () => {
    let token = ""
    let name = ""
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token') || ""
        name = localStorage.getItem('name') || ""
        console.log('window is defined 2')
    }
    return { token, name }
}

export default user