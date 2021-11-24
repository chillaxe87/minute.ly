const bodyElement = document.querySelector('body')
const videosList = []

// Change "isRenderVideoElementsOnLoad" to false if you want to switch elements ON HOVER
const radiusBetweenVideosInPixels = 200
const isRenderVideoElementsOnLoad = true

const populateVideoList = () => {
    const allImagesOnWebpage = document.querySelectorAll('img')
    const imagesList = []

    allImagesOnWebpage.forEach(image => {
        if (image.width > 120 && image.height > 80) imagesList.push(image)
    })

    imagesList.forEach(image => {
        if (isDistanceBetweenElementsValid(image)) videosList.push(image)
    })

    if (isRenderVideoElementsOnLoad) {
        videosList.forEach(video => {
            switchImageWithVideo(video)
        })
    } else {
        videosList.forEach((video) => {
            video.addEventListener('mouseover', () => switchImageWithVideo(video))
        })
    }
}

const isDistanceBetweenElementsValid = (imageEl) => {
    if (videosList.length === 0) return true
    const imageElementLocation = imageEl.getBoundingClientRect();
    for (let i = 0; i < videosList.length; i++) {
        const videoLocation = videosList[i].getBoundingClientRect();

        let verticleDistance = 0;
        let horizontalDistance = 0;

        if (imageElementLocation.bottom < videoLocation.top)
            verticleDistance = videoLocation.top - imageElementLocation.bottom
        if (videoLocation.bottom < imageElementLocation.top)
            verticleDistance = imageElementLocation.top - videoLocation.bottom

        if (imageElementLocation.left > videoLocation.right)
            horizontalDistance = imageElementLocation.left - videoLocation.right
        if (videoLocation.left > imageElementLocation.right)
            horizontalDistance = videoLocation.left - imageElementLocation.right

        const currentDistance = Math.sqrt((horizontalDistance * horizontalDistance) + (verticleDistance * verticleDistance))
        if (currentDistance < radiusBetweenVideos) return false
    }
    return true;
}
const switchImageWithVideo = (image) => {
    const imageParentEl = image.parentElement
    image.style.transition = "opacity 1s"
    image.style.position = 'absolute'

    const video = createVideoElement(image.width, image.height)
    const source = document.createElement('source')
    source.src = "https://apv-static.minute.ly/videos/v-50bc6db9-a73b-49b1-966838-aa07-4f3bbace5851-s29.92-37.16m.mp4"

    video.appendChild(source)
    image.style.opacity = 0
    imageParentEl.appendChild(video)

    setTimeout(() => {
        video.style.opacity = 1
    }, 500)

    createCircleAroundVideo(video)
}
const createVideoElement = (width, height) => {
    const video = document.createElement('video')
    video.loop = true
    video.autoplay = true
    video.muted = true
    video.width = width
    video.height = height
    video.style.zIndex = '10'
    video.style.opacity = 0
    video.style.transition = "opacity 1s"

    return video
}
const createCircleAroundVideo = (video) => {
    const longestEdge = video.width > video.height ? video.width : video.height
    const heightToWidthCompensation = (video.width - video.height) > 0 ? video.width - video.height : video.height - video.width
    const videoLocationOnPage = video.getBoundingClientRect()

    const div = document.createElement('div')
    div.style.borderStyle = 'solid'
    div.style.borderWidth = 1
    div.style.borderColor = 'red'
    div.style.borderRadius = '50%'
    div.style.position = 'absolute'
    div.style.pointerEvents = "none"
    div.style.left = `${videoLocationOnPage.left - radiusBetweenVideos}px`
    div.style.top = `${videoLocationOnPage.top - radiusBetweenVideos - heightToWidthCompensation / 2 + window.pageYOffset}px`
    div.style.width = (parseInt(longestEdge) + radiusBetweenVideos * 2) + 'px'
    div.style.height = (parseInt(longestEdge) + radiusBetweenVideos * 2) + 'px'
    bodyElement.appendChild(div)
}

populateVideoList()


