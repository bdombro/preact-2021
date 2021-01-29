import _default from "mdi-paths-split/CardAccountDetailsOutline"

export default ''
document.body.innerHTML+=`
<div id="outdated"></div>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/outdated-browser-rework/2.10.0/style.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/outdated-browser-rework/2.10.0/outdated-browser-rework.min.js"></script>
<script>
outdatedBrowserRework({
browserSupport: {
Chrome: 80, // > Feb 2020
Edge: 79, // > Feb 2020
Safari: 13, // > 2019
"Mobile Safari": 10,
Firefox: 73, // > 2019
Opera: 66, // > 2019
Vivaldi: 3, // > April 2020
Yandex: 20, // > 2019
IE: false
},requireChromeOnAndroid: true,isUnknownBrowserOK: false});
</script>
`

