const cpu_model_name_dom = document.getElementById("cpu-name");
const cpu_cores_dom = document.getElementById("cores");
const cpu_usage_dom = document.getElementById("cpu-used");
const mem_usage_dom = document.getElementById("mem-used");
const mem_free_dom = document.getElementById("mem-free");
const cpu_overall_container = document.getElementById("CPU-overall-used-container");
const mem_overall_used_container = document.getElementById("MEM-overall-used-container");
const mem_overall_free_container = document.getElementById("MEM-overall-free-container");
const cpu_overall_inner = document.getElementById("overall-cpu-used");
const mem_overall_used_inner = document.getElementById("overall-mem-used");
const mem_overall_free_inner = document.getElementById("overall-mem-free");
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
var upPressed = false;
var downPressed = false;
var KeyboardHelper = { up: 38, down: 40 };
const cpuUsageTimeStamp = [];
const memUsageTimeStamp = [];
const memFreeTimeStamp = [];
const CpuUsage = [];
const MemUsage = [];
const Memfree = [];
let cpuUsageT = 1;
let memUsageT = 1;
let memFreeT = 1;
let cpuUsageSize = 20;
let memUsageSize = 20;
let memFreeSize = 20;
let count = 0

CPUusageChart();
MEMusageChart();
MEMfreeChart();
refreshCPUstats();

function get_cpu_stats() {
    cpu_model_name_dom.innerText = api.cpuModel;
    cpu_cores_dom.innerText = `Cores: ${api.cpuCount}`;
    api.getCPUusage().then(data => {
        cpu_usage_dom.innerText = `CPU Usage: ${data.currentLoad.toFixed(2)}%`;
        update_progress_bar(cpu_overall_container, cpu_overall_inner, data.currentLoad);
        //update cpu usage in line chart
        if (cpuUsageT <= cpuUsageSize && data.currentLoad.toFixed(2) < 80) {
            CpuUsage.push(data.currentLoad);
            count = 0
        }
        else if (cpuUsageT <= cpuUsageSize && data.currentLoad.toFixed(2) >= 80) {
            CpuUsage.push(data.currentLoad);
            if (count >= 10) {
                alert("CPU Usage is overload");
                count = 0;
            }
            else {
                count += 1;
            }
        }
        else if (cpuUsageT >= cpuUsageSize && data.currentLoad.toFixed(2) >= 80) {
            CpuUsage.shift()
            CpuUsage.push(data.currentLoad);
            if (count >= 10) {
                alert("CPU Usage is overload");
                count = 0;
            }
            else {
                count += 1;
            }
        }
        else if (cpuUsageT >= cpuUsageSize && data.currentLoad.toFixed(2) < 80) {
            CpuUsage.shift()
            CpuUsage.push(data.currentLoad);
            count = 0
        }
    });
    api.getMEMusage().then(data => {
        mem_usage_dom.innerText = `Mem Usage: ${((data.used / data.total) * 100).toFixed(2)}%`;
        update_progress_bar(mem_overall_used_container, mem_overall_used_inner, (data.used / data.total) * 100);
        //update mem usage in line chart
        if (memUsageT <= memUsageSize) {
            MemUsage.push(((data.used / data.total) * 100).toFixed(2));
        }
        else {
            MemUsage.shift()
            MemUsage.push(((data.used / data.total) * 100).toFixed(2));
        }
    });
    api.getMEMfree().then(data => {
        mem_free_dom.innerText = `Free Mem: ${((data.free / data.total) * 100).toFixed(2)}%`;
        update_progress_bar(mem_overall_free_container, mem_overall_free_inner, (data.free / data.total) * 100);
        //update free mem space in line chart
        if (memFreeT <= memFreeSize) {
            Memfree.push(((data.free / data.total) * 100).toFixed(2));
        }
        else {
            Memfree.shift()
            Memfree.push(((data.free / data.total) * 100).toFixed(2));
        }
    });
}

function refreshCPUstats() {
    let cpuStats;
    if (cpuStats != null) {
        clearInterval(cpuStats);
        cpuStats = null;
    }
    cpuStats = setInterval(get_cpu_stats, 1000);
}

function update_progress_bar(parent_, inner_, percentage = 1) {
    let innerWidth = parent_.clientWidth * (percentage / 100);
    inner_.style.width = `${innerWidth}px`;
}

function CPUusageChart() {
    let ctx = document.getElementById('cpuUsageChart').getContext('2d');
    let cpuUsageChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: cpuUsageTimeStamp,
            datasets: [
                {
                    label: 'CPU Usage',
                    data: CpuUsage,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
    let cpuUsageTimer;
    if (cpuUsageTimer != null) {
        clearInterval(cpuUsageTimer);
        cpuUsageTimer = null;
    }
    cpuUsageTimer = setInterval(function () { cpuUsageTime(cpuUsageChart); }, 1000);
}

function MEMusageChart() {
    let ctx = document.getElementById('memUsageChart').getContext('2d');
    let memUsageChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: memUsageTimeStamp,
            datasets: [
                {
                    label: 'Mem Usage',
                    data: MemUsage,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
    let memUsageTimer;
    if (memUsageTimer != null) {
        clearInterval(memUsageTimer);
        memUsageTimer = null;
    }
    memUsageTimer = setInterval(function () { memUsageTime(memUsageChart); }, 1000);
}

function MEMfreeChart() {
    let ctx = document.getElementById('memFreeChart').getContext('2d');
    let memFreeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: memFreeTimeStamp,
            datasets: [
                {
                    label: 'Mem Free',
                    data: Memfree,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
    let memFreeTimer;
    if (memFreeTimer != null) {
        clearInterval(memFreeTimer);
        memFreeTimer = null;
    }
    memFreeTimer = setInterval(function () { memFreeTime(memFreeChart); }, 1000);
}

function cpuUsageTime(chart) {
    if (cpuUsageT <= cpuUsageSize) {
        cpuUsageTimeStamp.push(cpuUsageT);
        cpuUsageT += 1;
        chart.update();
    }
    else {
        cpuUsageTimeStamp.shift()
        cpuUsageTimeStamp.push(cpuUsageT);
        cpuUsageT += 1;
        chart.update();
    }
}

function memUsageTime(chart) {
    if (memUsageT <= memUsageSize) {
        memUsageTimeStamp.push(memUsageT);
        memUsageT += 1;
        chart.update();
    }
    else {
        memUsageTimeStamp.shift()
        memUsageTimeStamp.push(memUsageT);
        memUsageT += 1;
        chart.update();
    }
}

function memFreeTime(chart) {
    if (memFreeT <= memFreeSize) {
        memFreeTimeStamp.push(memFreeT);
        memFreeT += 1;
        chart.update();
    }
    else {
        memFreeTimeStamp.shift()
        memFreeTimeStamp.push(memFreeT);
        memFreeT += 1;
        chart.update();
    }
}

function keyDownHandler(event) {
    if (event.keyCode == KeyboardHelper.down) {
        downPressed = true;
        manipulateCPU();
    }
    else if (event.keyCode == KeyboardHelper.up) {
        upPressed = true;
        manipulateCPU();
    }
}

function keyUpHandler(event) {
    if (event.keyCode == KeyboardHelper.down) {
        downPressed = false;
        manipulateCPU();
    }
    else if (event.keyCode == KeyboardHelper.up) {
        upPressed = false;
        manipulateCPU();
    }
}

function manipulateCPU() {
    if (upPressed == true) {
        api.getMEMusage().then(data => {
            console.log(`cpu stacking up ${((data.used / data.total) * 100).toFixed(2)}%`);
        });
    }
}