'use strict';

var objectIs = require('object-is');

var unalias = require('./unalias');
var partitionProperties = require('./partition-properties');
var catcalls = require('./catcalls');

module.exports = setEnabledSession;

function setEnabledSession (ua, session, streamEnds, trackKinds) {
  var streamGetters = unalias({
    local: 'getLocalStreams',
    remote: 'getRemoteStreams'
  }, streamEnds);

  var trackGetters = unalias({
    audio: 'getAudioTracks',
    video: 'getVideoTracks'
  }, trackKinds);

  partitionProperties(ua.sessions, objectIs.bind(null, session),
    setTracksEnabled.bind(null, streamGetters, trackGetters)
  );
}

function setTracksEnabled (streamGetters, trackGetters, enabled, session) {
  var peerConnection = session.mediaHandler.peerConnection;
  var streams = catcalls(streamGetters, peerConnection);
  var tracks = catcalls(trackGetters, streams);
  tracks.forEach(function (track) {
    track.enabled = enabled;
  });
}
