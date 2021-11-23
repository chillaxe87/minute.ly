const videoPlayer = document.getElementById('vjs_video_3_html5_api');
const playerEvents = [
    'abort', 'beforepluginsetup', 'canplay', 'canplaythrough', 'componentresize', 'controlsdisabled',
    'controlsenabled', 'dispose', 'durationchange', 'emptied', 'ended', 'enterFullWindow', 'enterpictureinpicture',
    'error', 'exitFullWindow', 'firstplay', 'languagechange', 'leavepictureinpicture', 'loadeddata', 'loadedmetadata', 'loadstart',
    'pause', 'play', 'playbackrateschange', 'playerresize', 'playing', 'pluginsetup', 'posterchange',
    'progress', 'ratechange', 'ready', 'resize', 'seeked', 'seeking', 'sourceset', 'stalled', 'suspend', 'tap',
    'textdata', 'texttrackchange', 'timeupdate', 'useractive', 'userinactive', 'usingnativecontrols', 'volumechange', 'waiting',
];
playerEvents.forEach(
    (event) => {
        videoPlayer.addEventListener(event, data => console.log(data))
    }
);
