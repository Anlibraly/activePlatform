/**
 * @author Anlibraly
 * @class  活动列表模板
 */
 AV.initialize('nWlsDnfd9sa2y8nCa5ct1BE2-gzGzoHsz','DFHJGPcAg3mfweB4X1LSarJa');
 var myAct = angular.module("myAct",[]);
 myAct.controller("actsList",function($scope){
        $scope.activities = new Array();
        $scope.page = 0;
        $scope.more = true;

        $scope.getMore = function(){

            if($scope.more){
                var param = {"content":$scope.cmt_content,"userid":"网友","loc":loc,"actid":$scope.actid};
                AV.Cloud.run('addComment', param).then(function(res) {
                    var a = [];
                    a.push(res);
                    $scope.comments = a.concat($scope.comments);
                    console.log($scope.comments);
                    $scope.cmt_content = "";
                    showModel('评论成功');
                    $scope.$apply();
                },function(error) {
                    showModel('系统错误');
                    console.log(error);
                });
                
                $.ajax({
                    type: 'POST',
                    url: 'http://192.168.0.103:8080/autismsys/sendHttp.action',
                    data: 'func=functions/queryActivity&param=page='+$scope.page+'_city=-1_prov=-1',
                    dataType: 'json',
                    success: function(res){
                        var counts = JSON.parse(res.desc).result.counts;
                        if(res.code=1&&counts>0){
                            var events = JSON.parse(res.desc).result.acts;
                            var tmp_eve = new Array();
                            for (i in events) {
                                var e = events[i];
                                if (e.fst == 1) {
                                    if (tmp_eve!=null&&tmp_eve.length>0) {
                                        var a = tmp_eve[0];
                                        for (var i=0; i<$scope.activities.length; i++) {
                                            if($scope.activities[i][0].m_day==a.m_day){
                                                $scope.activities[i].push(tmp_eve);
                                            }
                                        }
                                        if (i==$scope.activities.length) {
                                            $scope.activities.push(tmp_eve);
                                        };
                                    };
                                    tmp_eve = new Array();
                                }
                                tmp_eve.push(e);
                            }
                            if (tmp_eve!=null&&tmp_eve.length>0) {
                                 $scope.activities.push(tmp_eve);
                            }
                            $scope.more = true;
                            $scope.$apply();
                        }else{
                            alert('没有更多活动了');
                            $scope.more = false;
                        } 
                    }
                });
            }
        }
        
        $(window).scroll(function(){ 
            totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop()); 
            if($(document).height() <= totalheight){ 
                if($scope.more==true){ 
                    $scope.more=false; 
                    $scope.getMore();
                }else{
                    alert('没有更多活动了');
                } 
            } 
        }); 
        $scope.getMore();
 });
/**
 * 显示提示框
 * @param {Object} id
 */
function showModel(content){
    $(".md-content").html(content) ;
    $("#modalCustom").addClass("md-show");
    t = setTimeout('hideModel("modalCustom")', 3000);
}
/**
 * 隐藏提示框
 * @param {Object} id
 */
function hideModel(){
    $("#modalCustom").removeClass("md-show");
    clearTimeout(t);
}
/**
 * 创建弹窗
 */
function createModel(){
    var modelDiv = document.createElement('DIV');
    modelDiv.setAttribute('class','md-modal md-effect-1');
    modelDiv.setAttribute('id','modalCustom');
     
    var modelDivSpan = document.createElement('SPAN');
    modelDivSpan.setAttribute('class','md-content');
    modelDiv.appendChild(modelDivSpan);
     
    document.body.appendChild(modelDiv);
}