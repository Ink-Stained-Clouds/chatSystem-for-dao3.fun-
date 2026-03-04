import { onTick } from './clock.js';

let sendLocked = false;
let loseFocusTime = 0;
let isFocus = false;
let keyCode = 0;
let thisTime = 0;
let locked = false;
let bodyLock = false;
let playerinfomationlock = false;
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
const playerinfomationBox = chatsystem.findChildByName('playerinfomationBox');
const playerinfomation = playerinfomationBox.findChildByName('playerinfomation');
const body = chatsystem.findChildByName('body');
const chatback = body.findChildByName('chatback');
const systemMessageBox = chatback.findChildByName('systemMessageBox')
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

chatsystem.pointerEventBehavior = PointerEventBehavior.BLOCK_PASS_THROUGH;

if (navigator.getDeviceInfo().deviceType === 'Mobile'){
    chatsystem.size.offset.x = 200;
    start.size.offset.x = 40;
    start.size.offset.y = 40;
    start.position.offset.x = -5;
    start.position.offset.y = 120;
    start.position.scale.y = 0;
    top.findChildByName('chattext').textFontSize = 10;
    top.findChildByName('chattext').size.offset.y = 10;
    top.size.offset.y = 20;
    body.size.offset.y = -20;
    body.position.offset.y = 20;
    exit.size.offset.x = 20;
    exit.size.offset.y = 20;
    exit.position.offset.x = 5;
    exit.position.offset.y = 0;
    top.findChildByName('framework').backgroundOpacity = 1;
    playerinfomationBox.size.offset.x = 250;
    playerinfomationBox.size.offset.y = 150;
    const name = playerinfomation.findChildByName('playerinfomation_name');
    const userId = playerinfomation.findChildByName('playerinfomation_userId');
    const userKey = playerinfomation.findChildByName('playerinfomation_userKey');
    const profile_picture = playerinfomation.findChildByName('playerinfomation_profile_picture');
    const friends = playerinfomation.findChildByName('playerinfomation_friends');
    const follower = playerinfomation.findChildByName('playerinfomation_follower');
    const following = playerinfomation.findChildByName('playerinfomation_following');
    name.textFontSize = 13;
    name.position.offset.x = 30;
    userId.textFontSize = 10;
    userId.position.offset.x = 30;
    userId.position.offset.y = 50;
    userKey.textFontSize = 10;
    userKey.position.offset.x = 30;
    userKey.position.offset.y = 65;
    friends.textFontSize = 10;
    friends.position.offset.y = 60;
    friends.position.scale.y = 0;
    follower.textFontSize = 10;
    follower.position.offset.y = 75;
    follower.position.scale.y = 0;
    following.textFontSize = 10;
    following.position.offset.y = 90;
    following.position.scale.y = 0;
    profile_picture.size.offset.x = 20;
    profile_picture.size.offset.y = 20;

    leftpart.visible = false;
    const chatbodyParent = body.findChildByName('chatbody');
    chatbodyParent.size.offset.x = 0;
    chatbody.position.scale.y = 1;
    chatbody.position.offset.y = -10;
    chatbody.size.scale.y = 0;
    chatbody.size.offset.y = 60;
    chatinput.size.scale.x = 0;
    chatinput.size.offset.x = 150;
    chatback.size.offset.x = 0;
    chatback.size.offset.y = -50;
    chatback.size.scale.x = 1;
    chatback.position.offset.x = 0;
    chatinput.textFontSize = 10;
    send.size.offset.x = 20;
    send.size.offset.y = 20;
    send.position.offset.x = -10;
    numberLimit.textFontSize = 8;
    systemMessageBox.findChildByName('reallysystemMessage').textFontSize = 10;
    systemMessageBox.findChildByName('systemMessageback').findChildByName('systemmessage').textFontSize = 10;
    playerchattext.findChildByName('reallytext').textFontSize = 10;
    playerchattext.findChildByName('reallytext').position.offset.x = 35;
    playerchattext.findChildByName('reallytext').size.offset.x = -45;
    playerchattext.findChildByName('name').textFontSize = 10;
    playerchattext.findChildByName('name').position.offset.x = 35;
    playerchattext.findChildByName('textBox').findChildByName('text').textFontSize = 10;
    playerchattext.findChildByName('textBox').findChildByName('text').position.offset.x = 35;
    playerchattext.findChildByName('textBox').findChildByName('text').size.offset.x = -45;
    playerchattext.findChildByName('profile_picture').size.offset.x = 20;
    playerchattext.findChildByName('profile_picture').size.offset.y = 20;
    playerchattext.findChildByName('time').textFontSize = 5;

    myselfchattext.findChildByName('reallytext').textFontSize = 10;
    myselfchattext.findChildByName('reallytext').position.offset.x = -35;
    myselfchattext.findChildByName('reallytext').size.offset.x = -45;
    myselfchattext.findChildByName('name').textFontSize = 10;
    myselfchattext.findChildByName('name').position.offset.x = -35;
    myselfchattext.findChildByName('textBox').findChildByName('text').textFontSize = 10;
    myselfchattext.findChildByName('textBox').findChildByName('text').position.offset.x = -35;
    myselfchattext.findChildByName('textBox').findChildByName('text').size.offset.x = -45;
    myselfchattext.findChildByName('profile_picture').size.offset.x = 20;
    myselfchattext.findChildByName('profile_picture').size.offset.y = 20;
    myselfchattext.findChildByName('time').textFontSize = 5;

}



send.events.on('pointerdown', async () => {
    if (sendLocked) return;
    sendLocked = true;
    const startsize = {};
    startsize.x = send.size.offset.x;
    startsize.y = send.size.offset.y;
    const type = navigator.getDeviceInfo().deviceType === 'Mobile';
    const add = type ? 1 : 5;
    if (chatinput.textContent.length) {
        chatinput.blur();
        sendmessage();
    }
    for (let i = 0; i < 5; i++) {
        send.size.offset.x += add;
        send.size.offset.y += add;
        await sleep(30);
    }
    for (let i = 0; i < 5; i++) {
        send.size.offset.x -= add;
        send.size.offset.y -= add;
        await sleep(30);
    }
    send.size.offset.x = startsize.x;
    send.size.offset.y = startsize.y;
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
                if (playerinfomationBox.visible && playerinfomation.findChildByName('playerinfomation_userId').textContent === `ID: ${player.userId}`){
                    showPlayerInfomationBox(false);
                } else {
                    showPlayerInfomation(player);
                }
            })
        }
    }
})



async function showPlayerInfomationBox(showable) {
    if (playerinfomationlock) return;
    if (playerinfomationBox.visible === showable) return;
    playerinfomationlock = true;
    if (showable) {
        playerinfomationBox.visible = true;
        for (let i = 0; i < 10; i++) {
            playerinfomation.position.offset.x -= playerinfomationBox.size.offset.x / 10 + playerinfomationBox.size.scale.x / 10 * navigator.getDeviceInfo().screen.width;
            await sleep(30);
        }
    } else {
        for (let i = 0; i < 10; i++) {
            playerinfomation.position.offset.x += playerinfomationBox.size.offset.x / 10 + playerinfomationBox.size.scale.x / 10 * navigator.getDeviceInfo().screen.width;
            await sleep(30);
        }
        playerinfomationBox.visible = false;
    }
    playerinfomationlock = false;
}
async function showbody() {
    if (alreadyshow) {
        if (bodyLock) return;
        bodyLock = true;
        showPlayerInfomationBox(false);
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
    showPlayerInfomationBox(true);
    playerinfomation.events.on('pointerdown', () => {
        showPlayerInfomationBox(false);
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
    if (chatinput.isFocus) showPlayerInfomationBox(false);
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
        const newSystemMessage = systemMessageBox.clone();
        const systemMessageBack = newSystemMessage.findChildByName('systemMessageback');
        const systemmessage = systemMessageBack.findChildByName('systemmessage');
        const systemMessagetext = newSystemMessage.findChildByName('reallysystemMessage');
        newSystemMessage.visible = true;
        systemmessage.textContent = e.message;
        systemMessagetext.textContent = e.message;
        systemMessagetext.textContent = e.message;
        systemMessageBack.visible = true;
        let sumlenght = 0;
        for (const a of allMessage) {
            sumlenght += a.hight;
        }
        newSystemMessage.position.offset.y = sumlenght + 2.5;
        systemMessageBack.scrollPosition.y = Infinity;
        await sleep(15);
        systemMessageBack.size.offset.y = systemMessageBack.scrollPosition.y + systemMessageBack.size.offset.y;
        systemMessagetext.size.offset.y = systemMessageBack.scrollPosition.y + systemMessageBack.size.offset.y;
        newSystemMessage.size.offset.y = systemMessagetext.size.offset.y;
        newSystemMessage.hight = systemMessagetext.size.offset.y - 5;
        systemMessagetext.visible = true;
        allMessage.push(newSystemMessage);
        systemMessageBack.parent = null;

    } else if (e.type === 'playerMessage'){
        const { message, userId, name, profile_picture, isAdmin, time } = e;
        const newMessage = userId == myself.userId ? myselfchattext.clone() : playerchattext.clone();
        newMessage.parent = chatback;
        const ui_textBox = newMessage.findChildByName('textBox');
        const ui_text = ui_textBox.findChildByName('text');
        const ui_reallytext = newMessage.findChildByName('reallytext');
        const ui_time = newMessage.findChildByName('time');
        const ui_name = newMessage.findChildByName('name');
        const ui_profile_picture = newMessage.findChildByName('profile_picture');
        newMessage.userId = userId;
        ui_name.textContent = name;
        ui_profile_picture.image = profile_picture;
        ui_time.textContent = time;
        ui_text.textContent = message;
        ui_reallytext.textContent = message;
        if (isAdmin) {
            ui_text.textColor.r = 255;
            ui_text.textColor.b = 50;
            ui_text.textColor.g = 50;
            ui_reallytext.textColor.r = 255;
            ui_reallytext.textColor.b = 50;
            ui_reallytext.textColor.g = 50;
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
        ui_reallytext.size.offset.y = ui_textBox.scrollPosition.y + ui_textBox.size.offset.y;
        ui_reallytext.visible = true;
        ui_textBox.parent = null;
        newMessage.hight = ui_reallytext.size.offset.y + 30;
        newMessage.events.on('pointerup', () => {
            for (const a of allplayer) {
                if (a.userId === userId) {
                    playerinfomation.events.removeAll();
                    if (playerinfomationBox.visible && playerinfomation.findChildByName('playerinfomation_userId').textContent === `ID: ${a.userId}`){
                        showPlayerInfomationBox(false);
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



    






















