const usefulkeyCode = [13,71,108];
world.say_ = world.say;
world.say = function (...args) {
    sendSystemMessage(...args);
    world.say_(...args);
}
world.onPlayerJoin(({ entity }) => {
    const { directMessage } = entity.player;
    entity.player.directMessage = (message) => {
        directMessage(message);
        sendDirectMessage(entity,message);
    }
    senduserinfomation(entity);
    entity.player.onKeyDown(({ keyCode }) => {
        if (!usefulkeyCode.includes(keyCode)) return;
        remoteChannel.sendClientEvent(entity,{id: 'onKeyDown', keyCode, time: Date.now()});
    })
    if (!Admin.includes(entity.player.userId)) world.say(`${entity.player.name} 进入地图`);
});

world.onPlayerLeave(() => {
    senduserinfomation();
});

world.onChat(({ entity, message }) => {
    entity.player.dialog({
        type: GameDialogType.TEXT,
        title: '提示',
        content: '推荐使用武器试验场自带UI,以防部分玩家无法发言导致交流困难',
    })
    sendmessage(entity,message);
    chatfunction(entity,message);
})

async function senduserinfomation(entity) {
    const allPlayerInformation = await getplayerinfomation();
    remoteChannel.broadcastClientEvent({id: 'chatplayerupdate', members: allPlayerInformation});
    if (entity){
        remoteChannel.sendClientEvent(entity,{
            id: 'myselfinfomation',
            infomation: {
                userId: entity.player.userId,
                userKey:entity.player.userKey,
                name: entity.player.name,
                profile_picture: entity.player.avatar,
                isAdmin: Admin.includes(entity.player.userId),
            },
        });
    }
}

async function getplayerinfomation() {
    const allPlayerInformation = [];
    for (const a of world.querySelectorAll('player')) {
        const social = await a.player.querySocialStatistic();
        allPlayerInformation.push({
            userId: a.player.userId,
            userKey: a.player.userKey,
            name: a.player.name,
            profile_picture: a.player.avatar,
            isAdmin: Admin.includes(a.player.userId),
            social,
        })
    }
    return allPlayerInformation;
}

function getfomattedtime() {
    var myDate = new Date();
    var year = myDate.getFullYear(); 
    var month = myDate.getMonth() + 1; 
    var day = myDate.getDate(); 
    var hours = myDate.getHours(); 
    var minutes = myDate.getMinutes(); 
    var seconds = myDate.getSeconds(); 
    /* 格式化输出*/
    var formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) +
    ' ' + (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) +
    ':' + (seconds < 10 ? '0' + seconds : seconds);// 输出格式为 YYYY-MM-DD HH:mm:ss
    return formattedDate;
}

function sendmessage(entity, message) {
    message = message.slice(0,500);
    remoteChannel.broadcastClientEvent({
        id: 'chatMessage',
        message,
        userId: entity.player.userId,
        name: entity.player.name,
        profile_picture: entity.player.avatar,
        isAdmin: Admin.includes(entity.player.userId),
        time: getfomattedtime(),
    })
}
function sendSystemMessage(...args) {
    for (const a of args) {
        remoteChannel.broadcastClientEvent({id: 'SystemMessage', message: a});
    }
}function sendDirectMessage(entity,...args) {
    for (const a of args) {
        remoteChannel.sendClientEvent(entity,{id: 'SystemMessage', message: a});
    }
}
remoteChannel.onServerEvent(({ entity, args }) => {
    if (args.type === 'showPlayerInfomation') {
        entity.player.openUserProfileDialog(args.player);
    } else if (args.type === 'getServerTime') {
        remoteChannel.sendClientEvent(entity, {id: 'getServerTime', time: Date.now()});
    } else if (args.type === 'chatMessage') {
        let message = args.message;
        if (message.length > 60) {
            message.splice(0,60);
        }
        entity.say(message);
        sendmessage(entity, message);
        chatfunction(entity, message);
    }
})
