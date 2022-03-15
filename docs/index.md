<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
    <link rel="stylesheet" href="https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css"/>
    <link rel="stylesheet" type="text/css" href="https://a.amap.com/jsapi_demos/static/demo-center/css/prety-json.css">
    <title>家乡定位</title>
    <style>
        html,
        body,
        #container {
            width: 100%;
            height: 100%;
        }

        .amap-icon img {
            width: 100px;
            height: 80px;
        }
    </style>
</head>
<body>
<div id="container"></div>
<div class="info">
    <h4>当前所在行政区信息</h4>
    <p><span id="map-city"></span></p>
</div>

<!--<script type="text/javascript">-->
<!--    window._AMapSecurityConfig = {-->
<!--        serviceHost:'http://10.186.38.89:8888/_AMapService',-->
<!--        // 例如 ：serviceHost:'http://1.1.1.1:80/_AMapService',-->
<!--    }-->
<!--</script>-->
<script>
    window._AMapSecurityConfig = {
        securityJsCode: 'f8ce25fc16d3dd91f91985842d2c7f72',
    }
</script>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=2.0&key=7c7c9a772a0a92ee4e639c87cec0dce9"></script>
<script type="text/javascript" src="https://a.amap.com/jsapi_demos/static/demo-center/js/jquery-1.11.1.min.js" ></script>
<script type="text/javascript" src="https://a.amap.com/jsapi_demos/static/demo-center/js/underscore-min.js" ></script>
<script type="text/javascript" src="https://a.amap.com/jsapi_demos/static/demo-center/js/backbone-min.js" ></script>
<script type="text/javascript" src='https://a.amap.com/jsapi_demos/static/demo-center/js/prety-json.js'></script>
<!-- 加载地图JSAPI脚本 -->
<!--<script src="https://webapi.amap.com/maps?v=1.4.15&key=7c7c9a772a0a92ee4e639c87cec0dce9"></script>-->
<script>
    var map = new AMap.Map('container', {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 11, //初始化地图层级
        mapStyle: 'amap://styles/fresh',
        center: [108.948765, 34.222064] //初始化地图中心点
    });
    //获取当前城市信息
    function logMapinfo(){
        map.getCity( function(info){
            var node = new PrettyJSON.view.Node({
                el: document.querySelector("#map-city"),
                data: info
            });
        });
    }

    logMapinfo();

    //绑定地图移动事件
    map.on('moveend', logMapinfo);

    // 以 icon URL 的形式创建一个途经点
    var viaMarker = new AMap.Marker({
        position: new AMap.LngLat(108.96397, 34.21843),
        // 将一张图片的地址设置为 icon
        icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.zgnhzx.com%2FUploadFiles%2Ftour%2F2021%2F5%2F202105111017449940.jpg&refer=http%3A%2F%2Fwww.zgnhzx.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649337868&t=0220bb8d9ebd212de8b773250a574eda',
        // 设置了 icon 以后，设置 icon 的偏移量，以 icon 的 [center bottom] 为原点
        offset: new AMap.Pixel(-13, -30)
    });

    // 创建一个 Icon
    var startIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(150, 120),
        // 图标的取图地址
        image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.zgnhzx.com%2FUploadFiles%2Ftour%2F2021%2F5%2F202105111017449940.jpg&refer=http%3A%2F%2Fwww.zgnhzx.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649337868&t=0220bb8d9ebd212de8b773250a574eda',
        // 图标所用图片大小
        imageSize: new AMap.Size(100, 80),//135,40
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(-9, -3)
    });

    // 将 icon 传入 marker
    var startMarker = new AMap.Marker({
        position: new AMap.LngLat(108.96397, 34.21843),
        icon: startIcon,
        offset: new AMap.Pixel(-13, -30),
        label: {
            offset: new AMap.Pixel(-25, -20),
            content: "点击该图片了解‘我的家乡’"
        }
    });
    // 将 markers 添加到地图
    map.add([viaMarker, startMarker]);

    var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});

    function markerClick(e) {
        infoWindow.setContent(e.target.content);
        infoWindow.open(map, e.target.getPosition());
    }

    startMarker.content = " <p style=\"text-indent:2em;\">  西安，陕西省辖地级市，简称“镐”，古称长安、镐京。西安地处关中平原中部、北濒渭河、南依秦岭，</br>自古有着“八水润长安”之美誉，是联合国教科文组织于1981年确定的“世界历史名城”，是中华文明和中华民</br>族重要发祥地之一，丝绸之路的起点，历史上先后有十多个王朝在此建都，丰镐都城、秦阿房宫、兵马俑，</br>汉未央宫、长乐宫，隋大兴城，唐大明宫、兴庆宫等勾勒出“长安情结”。</p>" +
        "<p style=\"text-indent:2em;\">  西安是中国最佳旅游目的地、中国国际形象最佳城市之一，有两项六处遗产被列入《世界遗产名录》，</br>分别是：秦始皇陵及兵马俑、大雁塔、小雁塔、唐长安城大明宫遗址、" +
        "汉长安城未央宫遗址、兴教寺塔。</p>" +
        "<p style=\"text-indent:2em;\">  该图片中所显示的即西安著名的名胜古迹——大雁塔。</p>"+
        '<a href="https://baike.baidu.com/item/%E8%A5%BF%E5%AE%89/121614?fromtitle=%E9%99%95%E8%A5%BF%E8%A5%BF%E5%AE%89&fromid=17503331&fr=aladdin">点击了解更多</a>'
        //<a href="https://baike.baidu.com/item/%E8%A5%BF%E5%AE%89/121614?fromtitle=%E9%99%95%E8%A5%BF%E8%A5%BF%E5%AE%89&fromid=17503331&fr=aladdin">点击了解更多</a>
    startMarker.on('click', markerClick);
    //startMarker.emit('click', {target: startMarker});

    map.setFitView();

</script>
</body>
</html>
