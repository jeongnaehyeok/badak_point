const fs = require('fs');
const path = require('path');

module.exports.randomUserAgent = () => {
    const userAgentJSON = fs.readFileSync(path.resolve(__dirname, '../user_agents.json'), 'utf-8').toString();
    const {user_agents} = JSON.parse(userAgentJSON);

    return user_agents[Math.floor(Math.random() * user_agents.length)]
}