var watermark = {}

function setWatermark(args) {
    //声明一个怪异一点的变量，确保id的唯一性
    var id = '111.222.333.456';
    var xIndex = 15;//绘制文本的 x 坐标位置
    var yIndex = 65;//绘制文本的 y 坐标位置
    var xInterval = 25//有多个参数时的行间间隔
    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id));
    }
    //利用canvas绘制水印信息
    var can = document.createElement('canvas');
    can.width = 250;
    can.height = 150;
    var cans = can.getContext('2d');
    cans.rotate(-20 * Math.PI / 180);
    cans.font = '17px Vedana';
    // ziti yanse
    cans.fillStyle = 'rgba(200, 200, 200, 0.30)';
    cans.textAlign = 'left';
    cans.textBaseline = 'Middle';
    for (let i = 0; i < args.length; i++) {
        cans.fillText(args[i], xIndex, yIndex); //绘制水印文案
        yIndex += xInterval;//设置每行间隔
    }
    //创建div用于显示
    var div = document.createElement('div');
    div.id = id;
    div.style.pointerEvents = 'none';
    div.style.top = '70px';
    div.style.left = '90px';
    div.style.position = 'fixed';
    div.style.zIndex = '100000';
    div.style.width = document.documentElement.clientWidth - 50 + 'px';
    div.style.height = document.documentElement.clientHeight - 50 + 'px';
    //div承载水印显示
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
    document.body.appendChild(div);
    return id;
}

watermark.set = function () {
    let args = Array.prototype.slice.apply(arguments);
    let id = setWatermark(args);
    // 检测如果水印被去掉了，自动给加上
    setInterval(function () {
        if (document.getElementById(id) === null) {
            id = setWatermark(args);
        }
    }, 500)
    //在窗口大小改变之后,自动触发加水印事件
    window.onresize = function () {
        setWatermark(args);
    }
}
window.watermark = watermark;

/*
使用方法
watermark.set('水印信息1','水印信息2')
*/