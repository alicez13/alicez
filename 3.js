server
{
    listen
    8888;
    server_name
    10.186.38.89;

    var location / _AMapService / {
        set $args "$args&jscode=f8ce25fc16d3dd91f91985842d2c7f72";
        proxy_pass , https://restapi.amap.com/;
         }
}