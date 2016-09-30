var logsTextArea, logsHeight, health, content

window.onload = function () {
    logsTextArea = document.getElementById('logs')
    logsHeight = window.getComputedStyle(logsTextArea).height.replace('px', '')
    health = document.getElementById('health')
    content = document.getElementsByClassName('content')[0]

    updateData()
    setInterval(updateData, 1000)
}

function updateData() {
    getRequest('/logs', function (logs) {
        if (logsTextArea.value != logs) {
            var willScroll = (logsTextArea.scrollHeight - logsTextArea.scrollTop <= logsHeight)
            logsTextArea.value = logs
            if (willScroll)
                logsTextArea.scrollTop = logsTextArea.scrollHeight
        }
    })

    getRequest('/statistics', function (stats) {
        health.innerHTML = renderHealth(JSON.parse(stats))
    })
}

function getRequest(url, callback) {
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.open('GET', url, true)
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200) {
                callback(xmlhttp.responseText)
            }
        }
    }
    xmlhttp.send(null)
}

function restartWorkers() {
    getRequest('/restartWorkers', function () {
        
    })
}

function renderHealth(stats) {
    return (
        '<div>Uptime: ' + stats.uptime + '</div>' +
        '<br>' +
        '<div>Total requests: ' + stats.totalRequests + '</div>' +
        '<br>' +
        '<div>Requests by workers: ' + renderRequestsByWorkers(stats.requestsForWorkers) + '</div>' +
        '<br>' +
        '<div>Workers status: ' + renderWorkersStatus(stats.workersStatus) + '</div>'
    )
}

function renderRequestsByWorkers(reqs) {
    var html = ''

    Object.keys(reqs).forEach(function (pid) {
        html += '<div>PID #' + pid + ' - ' + reqs[pid]
    })

    return html
}

function renderWorkersStatus(stats) {
    var html = ''

    Object.keys(stats).forEach(function (pid) {
        html += '<div>PID ' + pid + ' - ' + stats[pid].status
    })

    return html
}