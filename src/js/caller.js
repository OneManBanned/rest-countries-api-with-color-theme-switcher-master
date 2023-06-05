export default function callAPI(url, func) {
    fetch(url)
        .then(res => res.json())
        .then(data => func(data))
}