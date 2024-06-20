function getMonthlyLoggedInAndActiveUsers(userSessions, startDate, endDate) {

    const start = new Date(startDate);
    const end = new Date(endDate);
    

    const loggedInUsers = new Set();
    const activeUsers = new Set();
    

    userSessions.forEach(session => {
        const { userId, logged_in, logged_out, lastSeenAt } = session;
        
    
        const loggedInDate = new Date(logged_in);
        const loggedOutDate = logged_out ? new Date(logged_out) : null;
        const lastSeenDate = new Date(lastSeenAt);
        
 
        if (
            (loggedInDate >= start && loggedInDate <= end) || 
            (loggedInDate < start && (!loggedOutDate || loggedOutDate > start)) 
        ) {
            loggedInUsers.add(userId);
        }
        

        if (
            (loggedInDate >= start && loggedInDate <= end) ||
            (loggedOutDate && loggedOutDate >= start && loggedOutDate <= end) ||
            (lastSeenDate >= start && lastSeenDate <= end)
        ) {
            activeUsers.add(userId);
        }
    });
    
    return {
        monthlyLoggedInUsers: loggedInUsers.size,
        monthlyActiveUsers: activeUsers.size
    };
}


const userSessions = [
    {
        userId: 1,
        deviceId: "A1",
        logged_in: "",
        logged_out: "",
        lastSeenAt: ""
    },
    {
        userId: 2,
        deviceId: "B1",
        logged_in: "",
        logged_out: null,
        lastSeenAt: ""
    },

];


const startDate = '';
const endDate = '';

const result = getMonthlyLoggedInAndActiveUsers(userSessions, startDate, endDate);
console.log('Monthly Logged In Users:', result.monthlyLoggedInUsers);
console.log('Monthly Active Users:', result.monthlyActiveUsers);