'use strict';

const {pipe, tap} = require('pipejs')

function createWebsocket({url, token, ...rest}) {
  // url and token removed from pass through params
  return {ws: 'ws', ...rest}  // ws added to pass through params
}

function makePeerConnection({...rest}) {
  return {peerConnection: 'peerConnection', ...rest}
}

function brumeData(parms) {
  let {thisUser, baseDir, eventQueue, networkEvents} = parms // used but not removed
  return {brumeData:'brumeData', ...parms}
}

function sender({peerConnection, eventQueue, brumeData}) {
  console.log('sender:', peerConnection, eventQueue, brumeData)
}

function receiver({peerConnection, eventQueue, brumeData, networkEvents}) {
  console.log('receiver:', peerConnection, eventQueue, brumeData, networkEvents)
}

// Cannot put tap(receiver) in pipe
// i.e. pipe(..., tap(receiver), ...) won't work

const tee = tap(receiver)
pipe(createWebsocket,makePeerConnection,brumeData, tee, sender)({
    url: 'url',
    token: 'token',
    thisUser: 'thisUser',
    baseDir: 'baseDir',
    eventQueue: 'eventQueue',
    networkEvents: 'networkEvents'
});
