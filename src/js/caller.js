export function callAPI(url, func) {
    fetch(url)
        .then(res => res.json())
        .then(data => func(data))
}

export function popFormat(pop) {
    return pop.toLocaleString()
}