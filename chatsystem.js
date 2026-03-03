import { onTick } from './clock.js';

let sendLocked = false;
let loseFocusTime = 0;
let isFocus = false;
let keyCode = 0;
let thisTime = 0;
let locked = false;
let bodyLock = false;
let alreadyshow = true;
let abletosay = true;
let unAbleToSayStartTime = 0;

const myself = {};
const allplayer = [];
const allMessage = [];
const chatawaitlist = [];
const mychat = [];

const chatsystem = ui.findChildByName('chat');
const top = chatsystem.findChildByName('top');
const exit = top.findChildByName('exit');
const start = chatsystem.findChildByName('start');
const playerinfomation = chatsystem.findChildByName('playerinfomation');
const body = chatsystem.findChildByName('body');
const chatback = body.findChildByName('chatback');
const systemMessageback = chatback.findChildByName('systemMessageback')
const playerchattext = chatback.findChildByName('playerchat');
const myselfchattext = chatback.findChildByName('myselfchat');
const chatbody = body.findChildByName('chatbody').findChildByName('inputback');
const send = chatbody.findChildByName('send');
const chatinput = chatbody.findChildByName('chatinput');
const numberLimit = chatinput.findChildByName('limit');
const leftpart = body.findChildByName('left');
const playernumber = leftpart.findChildByName('playerlistback').findChildByName('playernumber');
const playerlist = leftpart.findChildByName('playerlist');
playerlist.playerexample = playerlist.findChildByName('player');


if (navigator.getDeviceInfo().deviceType === 'Mobile'){
    start.size.offset.x = 25;
    start.size.offset.y = 25;
    start.position.offset.x = -5;
    start.position.offset.y = -50;
}



send.events.on('pointerdown', async () => {
    if (sendLocked) return;
    sendLocked = true;
    if (chatinput.textContent.length) {
        chatinput.blur();
        sendmessage();
    }
    for (let i = 0; i < 5; i++) {
        send.size.offset.x += 5;
        send.size.offset.y += 5;
        await sleep(30);
    }
    for (let i = 0; i < 5; i++) {
        send.size.offset.x -= 5;
        send.size.offset.y -= 5;
        await sleep(30);
    }
    send.size.offset.x = 30;
    send.size.offset.y = 30;
    sendLocked = false;
})
exit.events.on('pointerdown', async () => {
    showbody();
})
start.events.on('pointerdown', async () => {
    showbody();
})




remoteChannel.events.on('client', async (e) => {
    if (e.id === 'SystemMessage') {
        await sleep(20);
        e.type = 'systemMessage';
        chatawaitlist.push(e);
    }
})
remoteChannel.events.on('client', (e) => {
    if (e.id === 'onKeyDown') {
        thisTime = e.time;
        keyCode = e.keyCode;
        if (keyCode === 71 && !chatinput.isFocus) {
            showbody();
        }
    }
})
remoteChannel.events.on('client', (e) => {
    if (e.id === 'getServerTime') {
        loseFocusTime = e.time;
    }
})
remoteChannel.events.on('client', (e) => {
    if (e.id === 'chatMessage') {
        e.type = 'playerMessage';
        chatawaitlist.push(e);
    }
})
remoteChannel.events.on('client', (e) => {
    if (e.id === 'myselfinfomation') {
        const infomation = e.infomation;
        myself.userId = infomation.userId;
        myself.userKey = infomation.userKey;
        myself.name = infomation.name;
        myself.profile_picture = infomation.profile_picture;
        myself.isAdmin = infomation.isAdmin;
    }
})
remoteChannel.events.on('client', (e) => {
    if (e.id === 'chatplayerupdate') {
        playernumber.textContent = `（${e.members.length}人）`
        allplayer.forEach((a) => a.parent = null);
        for (const a of e.members) {
            const player =  playerlist.playerexample.clone();
            player.parent = playerlist;
            player.name = a.name;
            player.userId = a.userId;
            player.userKey = a.userKey;
            player.profile_picture = a.profile_picture;
            player.isAdmin = a.isAdmin;
            player.social = a.social;
            const playername = player.findChildByName('playername');
            playername.textContent = player.name;
            if (player.isAdmin) {
                playername.textColor.r = 255;
                playername.textColor.g = 50;
                playername.textColor.b = 50;
            }
            const player_profile_picture = player.findChildByName('profile_picture');
            player_profile_picture.image = player.profile_picture;
            player.visible = true;
            player.position.offset.y = e.members.indexOf(a) * player.size.offset.y;
            allplayer.push(player);
            player.events.on('pointerdown', () => {
                playerinfomation.events.removeAll();
                if (playerinfomation.visible && playerinfomation.findChildByName('playerinfomation_userId').textContent === `ID: ${player.userId}`){
                    playerinfomation.visible = false;
                } else {
                    showPlayerInfomation(player);
                }
            })
        }
    }
})




async function showbody() {
    if (alreadyshow) {
        if (bodyLock) return;
        bodyLock = true;
        playerinfomation.visible = false;
        for (let i = 0; i < 10; i++) {
            chatsystem.position.offset.x += chatsystem.size.offset.x / 10 + chatsystem.size.scale.x / 10 * navigator.getDeviceInfo().screen.width;
            await sleep(30);
        }
        start.visible = true;
        bodyLock = false;
        alreadyshow = false;
        return;
    }
    if (bodyLock) return;
    bodyLock = true;
    start.visible = false;
    for (let i = 0; i < 10; i++) {
        chatsystem.position.offset.x -= chatsystem.size.offset.x / 10 + chatsystem.size.scale.x / 10 * navigator.getDeviceInfo().screen.width;
        await sleep(30);
    }
    bodyLock = false;
    alreadyshow = true;
    input.unlockPointer();
    chatinput.focus();
}
function showPlayerInfomation(player) {
    const name = playerinfomation.findChildByName('playerinfomation_name');
    const userId = playerinfomation.findChildByName('playerinfomation_userId');
    const userKey = playerinfomation.findChildByName('playerinfomation_userKey');
    const profile_picture = playerinfomation.findChildByName('playerinfomation_profile_picture');
    const friends = playerinfomation.findChildByName('playerinfomation_friends');
    const follower = playerinfomation.findChildByName('playerinfomation_follower');
    const following = playerinfomation.findChildByName('playerinfomation_following');
    name.textContent = player.name;
    if (player.isAdmin) {
        name.textColor.r = 255;
        name.textColor.g = 50;
        name.textColor.b = 50;
    } else {
        name.textColor.r = 255;
        name.textColor.g = 255;
        name.textColor.b = 255;
    }
    userId.textContent = `ID: ${player.userId}`;
    userKey.textContent = `userKey: ${player.userKey}`;
    profile_picture.image = player.profile_picture;
    friends.textContent = `好友: ${player.social.friendsNum}`;
    follower.textContent = `粉丝: ${player.social.followerNum}`;
    following.textContent = `关注: ${player.social.followingNum}`;
    playerinfomation.visible = true;
    playerinfomation.events.on('pointerdown', () => {
        playerinfomation.visible = false;
        remoteChannel.sendServerEvent({type: 'showPlayerInfomation', player: player.userId});
        console.warn(player.name,player.userKey);
    })
}
function sendmessage() {
    const message = chatinput.textContent;
    if (!abletosay) return;
    mychat.push(Date.now());
    if (!message.length || chatinput.textContent.length > 60) return;
    remoteChannel.sendServerEvent({
        type: 'chatMessage',
        message,
    });
    chatinput.textContent = '';

}
function updateinput() {
    const message = chatinput.textContent;
    if (mychat[0] && Date.now() - mychat[0] > 5000) {
        mychat.splice(0,1);
    }
    if (mychat.length > 5) {
        abletosay = false;
        mychat.splice(0,1);
        unAbleToSayStartTime = Date.now() + 10000;
    } 
    if (abletosay){
        numberLimit.textContent = chatinput.textContent.length <= 60 ? `剩余 ${60 - message.length} 字`: `超出字符上限，请删减`;
    } else {
        numberLimit.textContent = `发言过于频繁，禁言剩余${Math.floor((unAbleToSayStartTime - Date.now()) / 1000)}秒`;
        if (Date.now() - unAbleToSayStartTime > 0) {
            abletosay = true;
        }
    }
    
    if (60 - message.length < 0) {
        chatinput.blur();
        chatinput.textContent = chatinput.textContent.slice(0,60);
        chatinput.focus();
    }
    if (60 - message.length < 0 || !abletosay) {
        numberLimit.textColor.r = 255;
        numberLimit.textColor.g = 50;
        numberLimit.textColor.b = 50;
    } else {
        numberLimit.textColor.r = 255;
        numberLimit.textColor.g = 255;
        numberLimit.textColor.b = 255;
    }
    if (isFocus && !chatinput.isFocus) {
        // loseFocusTime = Date.now();
        remoteChannel.sendServerEvent({type: 'getServerTime'});
    }
    if (chatinput.isFocus) playerinfomation.visible = false;
    isFocus = chatinput.isFocus;
    if ((keyCode === 108 || keyCode === 13) && Math.abs(loseFocusTime - thisTime) < 500 && !isFocus) {
        loseFocusTime = 0;
        sendmessage();
        chatinput.focus();
    }
}
onTick(updateinput);

async function updatechatlist() {
    if (!chatawaitlist.length) return;
    if (locked) return;
    locked = true;
    const e = chatawaitlist[0];
    const lastscrollPosition = chatback.scrollPosition.y;
    if (e.type === 'systemMessage') {
        const newSystemMessage = systemMessageback.clone();
        const systemmessage = newSystemMessage.findChildByName('systemmessage');
        systemmessage.textContent = e.message;
        newSystemMessage.visible = true;
        let sumlenght = 0;
        for (const a of allMessage) {
            sumlenght += a.hight;
        }
        newSystemMessage.position.offset.y = sumlenght + 2.5;
        newSystemMessage.scrollPosition.y = Infinity;
        await sleep(15);
        newSystemMessage.size.offset.y = newSystemMessage.scrollPosition.y + newSystemMessage.size.offset.y;
        newSystemMessage.hight = newSystemMessage.size.offset.y + 5;        allMessage.push(newSystemMessage);

    } else if (e.type === 'playerMessage'){
        const { message, userId, name, profile_picture, isAdmin, time } = e;
        const newMessage = userId == myself.userId ? myselfchattext.clone() : playerchattext.clone();
        newMessage.parent = chatback;
        const ui_textBox = newMessage.findChildByName('textBox');
        const ui_text = ui_textBox.findChildByName('text');
        const ui_time = newMessage.findChildByName('time');
        const ui_name = newMessage.findChildByName('name');
        const ui_profile_picture = newMessage.findChildByName('profile_picture');
        newMessage.userId = userId;
        ui_name.textContent = name;
        ui_profile_picture.image = profile_picture;
        ui_time.textContent = time;
        ui_text.textContent = message;
        if (isAdmin) {
            ui_text.textColor.r = 255;
            ui_text.textColor.b = 50;
            ui_text.textColor.g = 50;
            ui_name.textColor.r = 255;
            ui_name.textColor.b = 150;
            ui_name.textColor.g = 150;
        }
        let sumlenght = 0;
        for (const a of allMessage) {
            sumlenght += a.hight;
        }
        newMessage.position.offset.y = sumlenght;
        newMessage.visible = true;

        ui_textBox.scrollPosition.y = Infinity;
        await sleep(15);
        ui_textBox.size.offset.y = ui_textBox.scrollPosition.y + ui_textBox.size.offset.y;
        newMessage.hight = ui_textBox.size.offset.y + 30;
        newMessage.events.on('pointerup', () => {
            for (const a of allplayer) {
                if (a.userId === userId) {
                    playerinfomation.events.removeAll();
                    if (playerinfomation.visible && playerinfomation.findChildByName('playerinfomation_userId').textContent === `ID: ${a.userId}`){
                        playerinfomation.visible = false;
                    } else {
                        showPlayerInfomation(a);
                    }
                    return;
                }
            }
        })
        allMessage.push(newMessage);

    }
    chatback.scrollPosition.y = Infinity;
    await sleep(15);
    const maxposition = chatback.scrollPosition.y;
    if (Math.abs(maxposition - lastscrollPosition) > e.hight + 100) {
        chatback.scrollPosition.y = lastscrollPosition;
    }
    chatawaitlist.splice(0,1);
    locked = false;
    if (allMessage.length > 50) {
        console.log(allMessage[0])
        allMessage[0].parent = null;
        const hight = allMessage[0].hight;
        for (const a of allMessage) {
            a.position.offset.y -= hight;
        }
        allMessage.splice(0,1);
    }
}
onTick(updatechatlist)



    






















