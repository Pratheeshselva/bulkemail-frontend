
const ApiRoutes = {
    LOGIN: {
        path: '/user/login',
        authenticate: false

    },
    SIGNUP: {
        path: '/user/createuser',
        authenticate: false
    },
    GET_SENDERS_ADDRESS: {
        path: '/address/getallsendersaddress',
        authenticate: true
    },
    SAVE_SENDERS_ADDRESS: {
        path: '/address/saveAddress',
        authenticate: true
    },
    DELETE_SENDERS_ADDRESS: {
        path: '/address/deleteSendersAddress',
        authenticate: true
    },
    GET_ALL_TEMPLATES: {
        path: '/template/getalltemplate',
        authenticate: true
    },
    SEND_EMAIL: {
        path: '/mail/sendemail',
        authenticate: true
    },
    SAVE_EDITED_TEMPLATE: {
        path: '/template/edittemplate',
        authenticate: true
    },
    DELETE_TEMPLATES: {
        path: '/template/deletetemplate',
        authenticate: true
    }
    ,
    CREATE_TEMPLATE: {
        path: '/template/savetemplate',
        authenticate: true
    },
    GET_ALL_USERS: {
        path: '/user/getalluser',
        authenticate: true
    }

}

export default ApiRoutes