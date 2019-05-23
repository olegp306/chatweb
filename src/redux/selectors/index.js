export const getSession = store => store.session.toJS()

export const getChats = store => store.tickets.toJS()

export const getCurrentChatId = store => store.currentChat.get('id');

export const getUsers = store => store.users.toJS()

export const getMessages = store => store.messages.toJS()

///export const messages = store => store.messages.toJS()





// export const getEmployeeId = store => store.session.get('userId')

// export const getIsTicketAdding = store => store.ticket.get('isAdding')

// export const getIsTicketAdded = store => store.ticket.get('added')

// export const getIsTicketAddingFailed = store => store.ticket.get('error')

// export const getIsApplicant = store => store.session.get('roles').includes('companyGuest')

// export const getCompanies = store => store.companies.toJS()

// export const getEmployees = store => store.employees.toJS()