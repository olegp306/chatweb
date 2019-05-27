export const getSession = store => store.session.toJS()

export const getCurrentUserId = store => store.session.get("id")


export const getCurrentChat = store => store.chatApp.toJS().currentChat;



export const getUsers = store => store.users.toJS()

export const getMessages = store => store.messages.toJS()


export const getChats = store => store.chats.toJS()


export const getChatApp = store => store.chatApp.toJS()


///export const messages = store => store.messages.toJS()





// export const getEmployeeId = store => store.session.get('userId')

// export const getIsTicketAdding = store => store.ticket.get('isAdding')

// export const getIsTicketAdded = store => store.ticket.get('added')

// export const getIsTicketAddingFailed = store => store.ticket.get('error')

// export const getIsApplicant = store => store.session.get('roles').includes('companyGuest')

// export const getCompanies = store => store.companies.toJS()

// export const getEmployees = store => store.employees.toJS()