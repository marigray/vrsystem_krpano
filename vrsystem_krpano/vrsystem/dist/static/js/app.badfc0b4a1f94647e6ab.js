webpackJsonp([1],{"1uuo":function(t,e){},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,s=i("7+uW"),a=i("bOdI"),o=i.n(a),l=i("mvHQ"),c=i.n(l),r=i("gBtx"),h=i.n(r),v=i("BO1k"),u=i.n(v),p={name:"editor",data:function(){return{value3:!1,switchOptions:[{switchValue:"选项1",label:"淡入淡出"}],switchValue:"选项1",hotSpotOptions:[{hotSpotValue:"选项1",label:"跳转热点"}],hotSpotValue:"选项1",PanoramaOptions:[{PanoramaValue:"选项0",label:"正常视角"},{PanoramaValue:"选项1",label:"鱼眼投影视角"},{PanoramaValue:"选项2",label:"球极平面视角"},{PanoramaValue:"选项3",label:"建筑视角"},{PanoramaValue:"选项4",label:"帕尼尼视角"},{PanoramaValue:"选项5",label:"小行星视角"}],PanoramaValue:"选项0",SkinOptions:[{SkinValue:"选项1",label:"默认皮肤"},{SkinValue:"选项2",label:"轻量皮肤"},{SkinValue:"选项3",label:"超轻量皮肤"},{SkinValue:"选项4",label:"镜框皮肤"},{SkinValue:"选项5",label:"复古皮肤"},{SkinValue:"选项6",label:"复古圆角皮肤"},{SkinValue:"选项7",label:"黑色皮肤"}],SkinValue:"选项1",slider:[0,180],SkinON:!0,showModifySceneNameFlag:!1,toModifyScene:{},rotateON:!1,autoSpinWaitingTime:0,minFov:0,maxFov:180,initFov:90,initFovMoveFlag:!1,krpano:document.querySelector("#krpanoSWFObject"),toSaveFlag:!1,sceneList:[],currentSceneIndex:0,welcomeSceneIndex:0,showHotspotDetailFlag:!1,showSceneManagementFlag:!1,showHotspotManagementFlag:!1,showViewManagementFlag:!1,hotspotList:[],isHotspotMoving:!1,selectedHotspot:{},currentHotspot:{style:null,linkedscene:null},hotspotStyleList:[{name:"skin_hotspotstyle",imgUrl:"../static/skin/vtourskin_hotspot.png"}],requesting:!1}},mounted:function(){this.sceneList=this.krpano.get("scene").getArray(),this.currentSceneIndex=this.krpano.get("scene").getItem(this.krpano.get("xml.scene")).index,this.welcomeSceneIndex=this.krpano.get("scene").getItem(this.krpano.get("startscene")).index;var t=this,e=document.querySelector("#pano");e.onmouseup=function(){t.isHotspotMoving=!1},e.onmouseout=function(){t.isHotspotMoving=!1},e.onmousemove=function(){t.moveHotspot()},this.initView(),this.initHotSpot()},computed:{sceneNameValid:function(){return this.toModifyScene.name&&this.toModifyScene.name.length>0&&this.toModifyScene.name.length<30},sliderValue:{get:function(){return[this.minFov,this.maxFov]},set:function(t){var e=Math.min(t[0],t[1]),i=Math.max(t[0],t[1]);this.sceneList[this.currentSceneIndex]&&(this.krpano.get("view.fovmin")!==e&&(this.krpano.set("view.fovmin",e),this.sceneList[this.currentSceneIndex].fovmin=e,this.toSaveFlag=!0),this.krpano.get("view.fovmax")!==i&&(this.krpano.set("view.fovmax",i),this.sceneList[this.currentSceneIndex].fovmax=i,this.toSaveFlag=!0)),this.minFov=e,this.maxFov=i}},sceneListExceptCurrent:function(){var t=this,e=[];return this.sceneList.forEach(function(i){i.index!==t.currentSceneIndex&&e.push(i)}),e}},methods:(n={onready:function(){this.sceneList=this.krpano.get("scene").getArray(),this.currentSceneIndex=this.krpano.get("scene").getItem(this.krpano.get("xml.scene")).index,this.welcomeSceneIndex=this.krpano.get("scene").getItem(this.krpano.get("startscene")).index;var t=this,e=document.querySelector("#pano");e.onmouseup=function(){t.isHotspotMoving=!1},e.onmouseout=function(){t.isHotspotMoving=!1},e.onmousemove=function(){t.moveHotspot()},this.initView(),this.initHotSpot()},initView:function(){this.autoSpinWaitingTime=this.krpano.get("autorotate.waittime"),this.autoSpinFlag=this.krpano.get("autorotate.enabled"),this.minFov=this.krpano.get("view.fovmin"),this.maxFov=this.krpano.get("view.fovmax"),this.initFov=this.krpano.get("view.fov")},initHotSpot:function(){var t=this;this.sceneList[this.currentSceneIndex].hotspots=[],this.hotspotList=[],this.krpano.get("hotspot").getArray().forEach(function(e){"webvr_prev_scene"!==e.name&&"webvr_next_scene"!==e.name&&"vr_cursor"!==e.name&&(t.hotspotList.push(e),t.sceneList[t.currentSceneIndex].hotspots.push(e),t.initHotspotEvent(e))})},initHotspotEvent:function(t){var e=this;t.ondown=function(){e.selectedHotspot=t,e.selectHotspot(),e.isHotspotMoving=!0},t.onover=function(){e.selectedHotspot=t},t.onout=function(){e.selectedHotspot={}},t.onclick=null},selectHotspot:function(){this.krpano.call("screentosphere(mouse.x, mouse.y, mouseath, mouseatv);"),this.selectedHotspot.athDis=this.selectedHotspot.ath-this.krpano.get("mouseath"),this.selectedHotspot.atvDis=this.selectedHotspot.atv-this.krpano.get("mouseatv")},preview:function(){window.open("../../static/tour.html")},krpanoControl:function(t){this.krpano.set("layer[skin_control_bar].visible",t),this.krpano.set("layer[skin_splitter_bottom].visible",t),this.krpano.set("layer[skin_scroll_window].visible",t)},littlePlane:function(t){console.log(this.krpano.get("skin_setting"))},switchSkin:function(t){"选项1"===t&&this.krpano.call("set(design, 'default');\n\t\tcopy(skin_thumbs_last_state, layer[skin_thumbs].state);\n\t\tloadpanoscene('%CURRENTXML%/skinselect.xml', get(xml.scene), null, IGNOREKEEP|KEEPVIEW|KEEPMOVING, BLEND(0.5));"),"选项2"===t&&this.krpano.call("set(design, 'flat_light');\n\t\tcopy(skin_thumbs_last_state, layer[skin_thumbs].state);\n\t\tloadpanoscene('%CURRENTXML%/skinselect.xml', get(xml.scene), null, IGNOREKEEP|KEEPVIEW|KEEPMOVING, BLEND(0.5));"),"选项3"===t&&this.krpano.call("set(design, 'ultra_light');\n\t\tcopy(skin_thumbs_last_state, layer[skin_thumbs].state);\n\t\tloadpanoscene('%CURRENTXML%/skinselect.xml', get(xml.scene), null, IGNOREKEEP|KEEPVIEW|KEEPMOVING, BLEND(0.5));"),"选项4"===t&&this.krpano.call("set(design, 'glass');\n\t\tcopy(skin_thumbs_last_state, layer[skin_thumbs].state);\n\t\tloadpanoscene('%CURRENTXML%/skinselect.xml', get(xml.scene), null, IGNOREKEEP|KEEPVIEW|KEEPMOVING, BLEND(0.5));"),"选项5"===t&&this.krpano.call("set(design, '117');\n\t\tcopy(skin_thumbs_last_state, layer[skin_thumbs].state);\n\t\tloadpanoscene('%CURRENTXML%/skinselect.xml', get(xml.scene), null, IGNOREKEEP|KEEPVIEW|KEEPMOVING, BLEND(0.5));"),"选项6"===t&&this.krpano.call("set(design, '117_round');\n\t\tcopy(skin_thumbs_last_state, layer[skin_thumbs].state);\n\t\tloadpanoscene('%CURRENTXML%/skinselect.xml', get(xml.scene), null, IGNOREKEEP|KEEPVIEW|KEEPMOVING, BLEND(0.5));"),"选项7"===t&&this.krpano.call("set(design, 'black');\n\t\tcopy(skin_thumbs_last_state, layer[skin_thumbs].state);\n\t\tloadpanoscene('%CURRENTXML%/skinselect.xml', get(xml.scene), null, IGNOREKEEP|KEEPVIEW|KEEPMOVING, BLEND(0.5));")},switchPanoramaType:function(t){"选项0"===t&&this.krpano.call("skin_view_look_straight();\n\t\tset(view.stereographic, true);\n\t\tset(view.fovmax, get(xml.view.fovmax));\n\t\ttween(view.distortionfovlink,   0.5, distance(1.0,0.5));\n\t\ttween(view.architectural, 0.0, distance(1.0,0.5));\n\t\ttween(view.pannini,       0.0, distance(1.0,0.5));\n\t\ttween(view.distortion,    0.0, distance(1.0,0.5));"),"选项1"===t&&this.krpano.call("skin_view_look_straight();\n          set(view.stereographic, true);\n          set(view.fovmax, get(xml.view.fovmax));\n          tween(view.distortionfovlink,   0.5, distance(1.0,0.5));\n          tween(view.architectural, 0.0,  distance(1.0,0.5));\n          tween(view.pannini,       0.0,  distance(1.0,0.5));\n          tween(view.distortion,    0.35, distance(1.0,0.5));"),"选项2"===t&&this.krpano.call("skin_view_look_straight();\n\t\tset(view.stereographic, true);\n\t\tset(view.fovmax, get(xml.view.fovmax));\n\t\ttween(view.distortionfovlink,   0.5, distance(1.0,0.5));\n\t\ttween(view.architectural, 1.0, distance(1.0,0.5));\n\t\ttween(view.pannini,       0.0, distance(1.0,0.5));\n\t\ttween(view.distortion,    0.0, distance(1.0,0.5));"),"选项3"===t&&this.krpano.call("skin_view_look_straight();\n\t\tset(view.stereographic, true);\n\t\tset(view.fovmax, get(xml.view.fovmax));\n\t\ttween(view.distortionfovlink,   0.5, distance(1.0,0.5));\n\t\ttween(view.architectural, 0.0, distance(1.0,0.5));\n\t\ttween(view.pannini,       0.0, distance(1.0,0.5));\n\t\ttween(view.distortion,    1.0, distance(1.0,0.8));"),"选项4"===t&&this.krpano.call("skin_view_look_straight();\n\t\tset(view.stereographic, true);\n\t\tset(view.fovmax, get(xml.view.fovmax));\n\t\ttween(view.distortionfovlink,   0.5, distance(1.0,0.5));\n\t\ttween(view.architectural, 0.0, distance(1.0,0.5));\n\t\ttween(view.pannini,       1.0, distance(1.0,0.8));\n\t\tif(view.distortion LT 0.1,\n\t\t\ttween(view.distortion, 1.0, distance(1.0,0.8));\n\t\t  );"),"选项5"===t&&this.krpano.call("set(view.stereographic, true);\n\t\tset(view.fovmax, get(xml.view.fovmax));\n\t\ttween(view.distortionfovlink,   0.5, distance(1.0,0.5));\n\t\ttween(view.architectural, 0.0, distance(1.0,0.5));\n\t\ttween(view.pannini,       0.0, distance(1.0,0.5));\n\t\ttween(view.distortion,    1.0, distance(1.0,0.8));\n\t\ttween(view.fov,           150, distance(150,0.8));\n\t\ttween(view.vlookat,        90, distance(100,0.8));\n\t\tadd(new_hlookat, view.hlookat, 123.0);\n\t\ttween(view.hlookat, get(new_hlookat), distance(100,0.8));")},selectHotspotStyle:function(t){this.currentHotspot.style=t},selectHotspotLinkedScene:function(t){this.currentHotspot.linkedscene=t},saveCurrentHotspot:function(){if(!this.currentHotspot.name){this.krpano.set("halfHeight",this.krpano.get("stageheight")/2),this.krpano.set("halfWidth",this.krpano.get("stagewidth")/2),this.krpano.call("screentosphere(halfWidth,halfHeight,init_h,init_v);");var t=this.krpano.get("init_h"),e=this.krpano.get("init_v"),i="spot"+(new Date).getTime();this.krpano.call("addhotspot("+i+");"),this.krpano.get("hotspot["+i+"]").loadstyle(this.currentHotspot.style),this.krpano.set("hotspot["+i+"].ath",t),this.krpano.set("hotspot["+i+"].atv",e),this.krpano.set("hotspot["+i+"].linkedscene",this.currentHotspot.linkedscene),this.krpano.set("hotspot["+i+"].dive",this.currentHotspot.dive)}this.initHotSpot(),this.showHotspotDetailFlag=!1,this.toSaveFlag=!0},deleteCurrentHotspot:function(){this.krpano.call("removehotspot("+this.currentHotspot.name+")"),this.initHotSpot(),this.showHotspotDetailFlag=!1,this.toSaveFlag=!0},moveHotspot:function(){this.isHotspotMoving&&(this.krpano.call("screentosphere(mouse.x, mouse.y, mouseath, mouseatv);"),this.krpano.set("hotspot["+this.selectedHotspot.name+"].ath",this.krpano.get("mouseath")+this.selectedHotspot.athDis),this.krpano.set("hotspot["+this.selectedHotspot.name+"].atv",this.krpano.get("mouseatv")+this.selectedHotspot.atvDis))},changeScene:function(t){var e=this;if(this.currentSceneIndex!==t.index){this.currentSceneIndex=t.index,this.krpano.call("loadscene("+t.name+")");var i=this.sceneList[this.currentSceneIndex];i.autorotate&&(this.krpano.set("autorotate.enabled",i.autorotate.enabled),this.krpano.set("autorotate.waittime",i.autorotate.waitTime)),this.autoSpinFlag&&this.krpano.get("autorotate").interrupt(),i.hotspots&&i.hotspotsModifyFlag&&(this.krpano.get("hotspot").getArray().forEach(function(t){"webvr_prev_scene"!==t.name&&"webvr_next_scene"!==t.name&&"vr_cursor"!==t.name&&e.krpano.call("removehotspot("+t.name+")")}),i.hotspots.forEach(function(t){e.krpano.call("addhotspot("+t.name+");"),e.krpano.set("hotspot["+t.name+"].ath",t.ath),e.krpano.set("hotspot["+t.name+"].atv",t.atv),e.krpano.set("hotspot["+t.name+"].linkedscene",t.linkedscene),e.krpano.set("hotspot["+t.name+"].dive",t.dive),e.krpano.get("hotspot["+t.name+"]").loadstyle(t.style)})),this.initView(),this.initHotSpot()}},setWelcome:function(t){this.welcomeSceneIndex=t,this.toSaveFlag=!0},showModifySceneName:function(t){this.toModifyScene={name:t.name,index:t.index},this.showModifySceneNameFlag=!0},modifySceneName:function(){var t=this;if(this.sceneNameValid){var e=!1,i=!0,n=!1,s=void 0;try{for(var a,o=u()(this.sceneList);!(i=(a=o.next()).done);i=!0){if(a.value.name===this.toModifyScene.name){e=!0;break}}}catch(t){n=!0,s=t}finally{try{!i&&o.return&&o.return()}finally{if(n)throw s}}if(e)alert("场景名称重复");else{var l=this.sceneList[this.toModifyScene.index].name.toString(),c=this.toModifyScene.name.toString();this.krpano.get("scene").renameItem(l,c),this.sceneList[this.toModifyScene.index].name=c,this.sceneList.forEach(function(e){e.hotspots&&e.index!==t.toModifyScene.index&&e.hotspots.forEach(function(i){i.linkedscene===l&&(i.linkedscene=c,e.hotspotsModifyFlag=!0,e.index===t.currentSceneIndex&&t.krpano.set("hotspot["+i.name+"].linkedscene",c))})}),this.showModifySceneNameFlag=!1,this.toSaveFlag=!0}}},closeModifySceneName:function(){this.showModifySceneNameFlag=!1},setDefaultView:function(){var t=Math.round(this.krpano.get("view.fov"));this.initFov=t,this.sceneList[this.currentSceneIndex].fov=t,this.sceneList[this.currentSceneIndex].initH=this.krpano.get("view.hlookat"),this.sceneList[this.currentSceneIndex].initV=this.krpano.get("view.vlookat"),this.toSaveFlag=!0},updatedAutoSpin:function(){this.krpano.set("autorotate.enabled",this.rotateON),this.krpano.set("autorotate.waittime",this.autoSpinWaitingTime),this.rotateON&&this.krpano.get("autorotate").interrupt(),this.sceneList[this.currentSceneIndex].autorotate={enabled:this.rotateON,waitTime:Number(this.autoSpinWaitingTime)},this.toSaveFlag=!0},moveInitFov:function(){if(this.initFovMoveFlag){var t=document.querySelector(".view-top-slider"),e=window.event.clientX-t.offsetLeft;e<Math.round(this.minFov)?(console.log(e),console.log(Math.round(this.minFov)),this.stopMoveInitFov(),e=Math.round(this.minFov)):e>Math.round(this.maxFov)&&(console.log(e),console.log(Math.round(this.maxFov)),this.stopMoveInitFov(),e=Math.round(this.maxFov)),this.initFov=e,this.krpano.set("view.fov",this.initFov),this.sceneList[this.currentSceneIndex].fov=this.initFov,this.toSaveFlag=!0}},startMoveInitFov:function(){this.initFovMoveFlag=!0,this.moveInitFov()},stopMoveInitFov:function(){this.initFovMoveFlag=!1},showHotspotDetail:function(t){this.currentHotspot=t||{style:this.hotspotStyleList[0].name,linkedscene:this.sceneListExceptCurrent[0].name,dive:!0},this.showHotspotDetailFlag=!0},hideHotspotDetail:function(){this.showHotspotDetailFlag=!1},showSceneManagement:function(){this.showSceneManagementFlag=!0},hideSceneManagement:function(){this.showSceneManagementFlag=!1},showHotspotManage:function(){this.showHotspotManagementFlag=!0},hideHotspotManage:function(){this.showHotspotManagementFlag=!1},showViewManage:function(){this.showViewManagementFlag=!0},hideViewManage:function(){this.showViewManagementFlag=!1}},o()(n,"selectHotspotStyle",function(t){this.currentHotspot.style=t}),o()(n,"save",function(){var t=this;if(this.toSaveFlag)if(this.requesting)alert("保存中，请稍后再试");else{this.requesting=!0;var e=[];this.sceneList.forEach(function(i){var n={index:i.index,name:i.name,welcomeFlag:i.index==t.welcomeSceneIndex,autorotate:i.autorotate?i.autorotate:null,fov:i.fov?i.fov:null,fovmax:i.fovmax?i.fovmax:null,fovmin:isNaN(h()(i.fovmin))?null:i.fovmin,initH:i.initH?i.initH:null,initV:i.initV?i.initV:null};if(i.hotspots){var s=[];i.hotspots.forEach(function(t){"skin"!==t.name.split(/_/)[0]&&s.push({ath:t.ath,atv:t.atv,name:t.name,linkedscene:t.linkedscene,style:t.style,dive:!t.dive||t.dive})}),n.hotSpots=s}e.push(n)}),console.log(e);this.$axios.post("/api/save",{body:c()(e)},{header:{"Content-Type":"application/json; charset=utf-8"}}).then(function(e){t.requesting=!1,200===e.status?(t.toSaveFlag=!1,alert("保存成功")):alert("系统异常")},function(){t.requesting=!1,alert("系统异常")}).catch(function(t){alert("系统异常")})}}),n)},d={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"editor"}},[t._m(0),t._v(" "),i("div",{staticClass:"save-view"},[i("el-badge",{directives:[{name:"show",rawName:"v-show",value:t.toSaveFlag,expression:"toSaveFlag"}],attrs:{"is-dot":""}},[i("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search","is-dot":""},on:{click:function(e){t.save()}}},[t._v("保存")])],1),t._v(" "),i("el-button",{directives:[{name:"show",rawName:"v-show",value:!t.toSaveFlag,expression:"!toSaveFlag"}],staticStyle:{"margin-left":"9px"},attrs:{type:"primary",icon:"el-icon-search","is-dot":""},on:{click:function(e){t.save()}}},[t._v("保存")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.preview()}}},[t._v("预览"),i("i",{staticClass:"el-icon-view"})])],1),t._v(" "),i("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":"2"}},[i("el-submenu",{attrs:{index:"1"}},[i("template",{slot:"title"},[i("i",{staticClass:"iconfont icon-skin"}),t._v(" "),i("span",[t._v("  漫游皮肤")])]),t._v(" "),i("el-menu-item-group",[i("template",{slot:"title"},[t._v("皮肤样式")]),t._v(" "),i("el-menu-item",{attrs:{index:"1-1"}},[i("el-switch",{attrs:{"active-text":"开启","inactive-text":"不开启"},on:{change:function(e){t.krpanoControl(t.SkinON)}},model:{value:t.SkinON,callback:function(e){t.SkinON=e},expression:"SkinON"}})],1),t._v(" "),i("el-menu-item",{attrs:{index:"1-2"}},[i("el-select",{attrs:{placeholder:"请选择"},on:{change:function(e){t.switchSkin(t.SkinValue)}},model:{value:t.SkinValue,callback:function(e){t.SkinValue=e},expression:"SkinValue"}},t._l(t.SkinOptions,function(t){return i("el-option",{key:t.SkinValue,attrs:{label:t.label,value:t.SkinValue}})}),1)],1)],2)],2),t._v(" "),i("el-submenu",{attrs:{index:"2"}},[i("template",{slot:"title"},[i("i",{staticClass:"el-icon-location"}),t._v(" "),i("span",[t._v("热点")])]),t._v(" "),i("el-menu-item-group",[i("template",{slot:"title"},[t._v("添加热点")]),t._v(" "),i("el-menu-item",{attrs:{index:"2-1"}},[i("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(e){t.showHotspotDetail()}}},[t._v("添加热点")])],1)],2),t._v(" "),i("el-menu-item-group",[i("template",{slot:"title"},[t._v("热点管理")]),t._v(" "),i("el-menu-item",{attrs:{index:"2-2"}},[i("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(e){t.showHotspotManage()}}},[t._v("热点管理")])],1)],2)],2),t._v(" "),i("el-submenu",{attrs:{index:"3"}},[i("template",{slot:"title"},[i("i",{staticClass:"el-icon-document"}),t._v(" "),i("span",{attrs:{slot:"title"},slot:"title"},[t._v("基本设置")])]),t._v(" "),i("el-menu-item-group",[i("template",{slot:"title"},[i("i",{staticClass:"iconfont icon-shexiangji_shijiao"}),t._v("视角")]),t._v(" "),i("el-menu-item",{attrs:{index:"3-1"}},[i("el-button",{staticClass:"iconfont icon-shexiangji_shijiao",attrs:{type:"primary",size:"small"},on:{click:function(e){t.showViewManage()}}},[t._v("视角设置")])],1),t._v(" "),i("el-menu-item",{attrs:{index:"3-2"}},[i("el-select",{attrs:{placeholder:"请选择"},on:{change:function(e){t.switchPanoramaType(t.PanoramaValue)}},model:{value:t.PanoramaValue,callback:function(e){t.PanoramaValue=e},expression:"PanoramaValue"}},t._l(t.PanoramaOptions,function(t){return i("el-option",{key:t.PanoramaValue,attrs:{label:t.label,value:t.PanoramaValue}})}),1)],1)],2),t._v(" "),i("el-menu-item-group",[i("template",{slot:"title"},[i("i",{staticClass:"iconfont icon-shijiaochangjingdaohang"}),t._v("场景")]),t._v(" "),i("el-menu-item",{attrs:{index:"3-2"}},[i("el-button",{staticClass:"iconfont icon-shijiaochangjingdaohang",attrs:{type:"primary",size:"medium"},on:{click:function(e){t.showSceneManagement()}}},[t._v("场景管理")])],1)],2)],2),t._v(" "),i("el-submenu",{attrs:{index:"4"}},[i("template",{slot:"title"},[i("i",{staticClass:"el-icon-setting"}),t._v(" "),i("span",{attrs:{slot:"title"},slot:"title"},[t._v("全局设置")])]),t._v(" "),i("el-menu-item-group",[i("template",{slot:"title"},[t._v("特效设置")]),t._v(" "),i("el-menu-item",{attrs:{index:"4-1"}},[i("el-switch",{attrs:{"inactive-text":"开启小行星特效"},on:{change:function(e){t.littlePlane()}},model:{value:t.value3,callback:function(e){t.value3=e},expression:"value3"}})],1)],2)],2)],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.showHotspotDetailFlag,expression:"showHotspotDetailFlag"}],staticClass:"hotspot-detail",staticStyle:{"z-index":"1000"}},[i("div",{staticClass:"hotspot-detail-header"},[i("span",[t._v(t._s(t.currentHotspot.name?"编辑":"新增")+"热点")]),t._v(" "),i("i",{staticClass:"el-icon-close delete",on:{click:function(e){t.hideHotspotDetail()}}}),t._v(" "),i("div",{staticClass:"line"})]),t._v(" "),i("div",{staticClass:"hotspot-detail-content"},[i("label",{staticClass:"label"},[t._v("图标样式")]),t._v(" "),i("div",{staticClass:"hotspot-detail-style-list"},t._l(t.hotspotStyleList,function(e){return i("div",[i("div",{staticClass:"hotspot-detail-style",class:{"hotspot-detail-style-selected":e.name==t.currentHotspot.style},on:{click:function(i){t.selectHotspotStyle(e.name)}}},[i("img",{staticStyle:{height:"64px"},attrs:{src:e.imgUrl}})])])}),0)]),t._v(" "),i("div",{staticClass:"hotspot-detail-content"},[i("label",{staticClass:"label"},[t._v("热点类型")]),t._v(" "),i("el-select",{staticStyle:{"margin-top":"10px",width:"150px"},attrs:{placeholder:"请选择"},model:{value:t.hotSpotValue,callback:function(e){t.hotSpotValue=e},expression:"hotSpotValue"}},t._l(t.hotSpotOptions,function(t){return i("el-option",{key:t.hotSpotValue,attrs:{label:t.label,value:t.hotSpotValue}})}),1)],1),t._v(" "),i("div",{staticClass:"hotspot-detail-content"},[i("label",{staticClass:"label"},[t._v("切换效果")]),t._v(" "),i("el-select",{staticStyle:{"margin-top":"10px",width:"150px"},attrs:{placeholder:"请选择"},model:{value:t.switchValue,callback:function(e){t.switchValue=e},expression:"switchValue"}},t._l(t.switchOptions,function(t){return i("el-option",{key:t.switchValue,attrs:{label:t.label,value:t.switchValue}})}),1)],1),t._v(" "),i("div",{staticClass:"hotspot-detail-content"},[i("label",{staticClass:"label"},[t._v("目标场景")]),t._v(" "),i("el-scrollbar",{staticClass:"scrollbar"},[i("div",{staticClass:"hotspot-detail-scene-list"},t._l(t.sceneListExceptCurrent,function(e){return i("div",[i("div",{staticClass:"hotspot-detail-scene",class:{"hotspot-detail-scene-selected":e.name==t.currentHotspot.linkedscene},on:{click:function(i){t.selectHotspotLinkedScene(e.name)}}},[i("img",{staticStyle:{height:"64px"},attrs:{src:e.thumburl}}),t._v(" "),i("span",[t._v(t._s(e.name.split(/_/)[1]))])])])}),0)])],1),t._v(" "),i("div",{staticClass:"hotspot-detail-content"},[i("div",{staticClass:"hotspot-detail-button"},[i("el-button",{attrs:{type:"success"},on:{click:function(e){t.saveCurrentHotspot()}}},[t._v("确定")])],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.currentHotspot.name,expression:"currentHotspot.name"}],staticClass:"hotspot-detail-button"},[i("el-button",{attrs:{type:"danger"},on:{click:function(e){t.deleteCurrentHotspot()}}},[t._v("删除")])],1)])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.showSceneManagementFlag,expression:"showSceneManagementFlag"}],staticClass:"hotspot-detail"},[i("div",{staticClass:"hotspot-detail-header"},[i("span",[t._v("场景管理")]),t._v(" "),i("i",{staticClass:"el-icon-close delete",on:{click:function(e){t.hideSceneManagement()}}}),t._v(" "),i("div",{staticClass:"line"})]),t._v(" "),i("div",{staticClass:"hotspot-detail-content",staticStyle:{height:"668px","overflow-y":"auto"}},[i("label",{staticClass:"label"},[t._v("场景列表")]),t._v(" "),t._l(t.sceneList,function(e){return i("ul",{staticClass:"scene-item",class:{"scene-item-selected":e.index==t.currentSceneIndex}},[i("li",[i("img",{staticStyle:{height:"128px"},attrs:{src:e.thumburl},on:{click:function(i){t.changeScene(e)}}}),t._v(" "),i("div",[i("span",[t._v(t._s(e.name.split(/_/)[1]))])])]),t._v(" "),i("el-button-group",{staticClass:"group"},[i("el-button",{staticClass:"button",attrs:{type:"primary",size:"small",icon:"el-icon-edit"},on:{click:function(i){t.showModifySceneName(e)}}}),t._v(" "),i("el-button",{staticClass:"button",attrs:{type:"primary",size:"small",icon:"el-icon-share"},on:{click:function(i){t.setWelcome(e.index)}}}),t._v(" "),i("el-button",{staticClass:"button",attrs:{type:"primary",size:"small",icon:"el-icon-delete"}}),t._v(" "),i("el-button",{staticClass:"button",attrs:{type:"primary",size:"small",icon:"el-icon-more"}})],1)],1)})],2)]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.showHotspotManagementFlag,expression:"showHotspotManagementFlag"}],staticClass:"hotspot-detail"},[i("div",{staticClass:"hotspot-detail-header"},[i("span",[t._v("热点管理")]),t._v(" "),i("i",{staticClass:"el-icon-close delete",on:{click:function(e){t.hideHotspotManage()}}}),t._v(" "),i("div",{staticClass:"line"})]),t._v(" "),i("div",{staticClass:"hotspot-detail-content",staticStyle:{height:"668px","overflow-y":"auto"}},[i("div",{staticClass:"hotspot-list"},t._l(t.hotspotList,function(e){return i("div",{on:{click:function(i){t.showHotspotDetail(e)}}},["skin"!==e.name.split(/_/)[0]?i("div",{staticClass:"hotspot-item",class:{"hotspot-item-selected":t.selectedHotspot.name==e.name}},[i("img",{attrs:{src:e.url}}),t._v(" "),i("div",[t._v("场景切换")])]):t._e()])}),0)])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.showViewManagementFlag,expression:"showViewManagementFlag"}],staticClass:"camera"},[i("div",{staticClass:"camera-top"}),t._v(" "),i("div",{staticClass:"camera-bottom"}),t._v(" "),i("div",{staticClass:"camera-left"}),t._v(" "),i("div",{staticClass:"camera-right"}),t._v(" "),i("div",{staticClass:"camera-left-top"}),t._v(" "),i("div",{staticClass:"camera-top-left"}),t._v(" "),i("div",{staticClass:"camera-top-right"}),t._v(" "),i("div",{staticClass:"camera-right-top"}),t._v(" "),i("div",{staticClass:"camera-left-bottom"}),t._v(" "),i("div",{staticClass:"camera-bottom-left"}),t._v(" "),i("div",{staticClass:"camera-bottom-right"}),t._v(" "),i("div",{staticClass:"camera-right-bottom"}),t._v(" "),i("el-button",{staticClass:"camera-button",attrs:{type:"primary",round:""},on:{click:function(e){t.setDefaultView()}}},[t._v("设为初始视角")])],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.showViewManagementFlag,expression:"showViewManagementFlag"}],staticClass:"hotspot-detail"},[i("div",{staticClass:"hotspot-detail-header"},[i("span",[t._v("视角设置")]),t._v(" "),i("i",{staticClass:"el-icon-close delete",on:{click:function(e){t.hideViewManage()}}}),t._v(" "),i("div",{staticClass:"line"})]),t._v(" "),i("div",{staticClass:"hotspot-detail-content",staticStyle:{height:"668px","overflow-y":"auto"}},[i("label",{staticClass:"label",staticStyle:{display:"block","margin-bottom":"20px"}},[t._v("自动旋转\n        "),i("el-switch",{staticStyle:{"padding-left":"74px"},attrs:{"active-text":"","inactive-text":""},on:{change:function(e){t.updatedAutoSpin()}},model:{value:t.rotateON,callback:function(e){t.rotateON=e},expression:"rotateON"}})],1),t._v(" "),i("label",{staticClass:"label",staticStyle:{display:"block",position:"relative"}},[t._v("等待时间(秒)\n        "),i("el-input",{staticClass:"wait",attrs:{placeholder:"请输入内容",disabled:t.rotateON},on:{change:function(e){t.updatedAutoSpin()}},model:{value:t.autoSpinWaitingTime,callback:function(e){t.autoSpinWaitingTime=e},expression:"autoSpinWaitingTime"}})],1),t._v(" "),i("div",{staticClass:"view-slider"},[i("div",{staticClass:"view-top-slider",on:{mousedown:function(e){t.startMoveInitFov()},mousemove:function(e){t.moveInitFov()},mouseup:function(e){t.stopMoveInitFov()}}},[i("span",{style:{left:t.initFov+"px"}},[i("i",{staticClass:"el-icon-location"})])]),t._v(" "),i("el-slider",{staticStyle:{width:"180px"},attrs:{range:"",max:180},model:{value:t.sliderValue,callback:function(e){t.sliderValue=e},expression:"sliderValue"}})],1),t._v(" "),i("el-row",[i("el-col",{attrs:{span:8}},[i("div",{staticClass:"grid-content"},[i("span",[t._v("最近")]),t._v(" "),i("el-input",{staticClass:"input",attrs:{placeholder:"请输入内容",disabled:!0},model:{value:t.minFov,callback:function(e){t.minFov=e},expression:"minFov"}})],1)]),t._v(" "),i("el-col",{attrs:{span:8}},[i("div",{staticClass:"grid-content"},[i("span",[t._v("初始")]),t._v(" "),i("el-input",{staticClass:"input",attrs:{placeholder:"请输入内容",disabled:!0},model:{value:t.initFov,callback:function(e){t.initFov=e},expression:"initFov"}})],1)]),t._v(" "),i("el-col",{attrs:{span:8}},[i("div",{staticClass:"grid-content"},[i("span",[t._v("最远")]),t._v(" "),i("el-input",{staticClass:"input",attrs:{placeholder:"请输入内容",disabled:!0},model:{value:t.maxFov,callback:function(e){t.maxFov=e},expression:"maxFov"}})],1)])],1)],1)]),t._v(" "),i("el-dialog",{attrs:{title:"提示",visible:t.showModifySceneNameFlag,width:"30%","before-close":t.closeModifySceneName},on:{"update:visible":function(e){t.showModifySceneNameFlag=e}}},[i("span",[t._v("场景名称")]),t._v(" "),i("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.toModifyScene.name,callback:function(e){t.$set(t.toModifyScene,"name",e)},expression:"toModifyScene.name"}}),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.showModifySceneNameFlag=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary",disabled:!t.sceneNameValid},on:{click:function(e){t.modifySceneName()}}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"sidelogo"},[e("span",[e("i",{staticClass:"el-icon-setting"})]),this._v(" "),e("span",{staticClass:"sidelogotxt"},[this._v("  全景编辑")])])}]};var m={name:"app",components:{Editor:i("VU/8")(p,d,!1,function(t){i("VDz/"),i("mauk")},"data-v-39217a17",null).exports}},g={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("editor")],1)},staticRenderFns:[]};var f=i("VU/8")(m,g,!1,function(t){i("R4eI")},null,null).exports,_=i("/ocq"),w={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"hello"},[i("h1",[t._v(t._s(t.msg))]),t._v(" "),i("h2",[t._v("Essential Links")]),t._v(" "),t._m(0),t._v(" "),i("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("ul",[i("li",[i("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[t._v("\n        Core Docs\n      ")])]),t._v(" "),i("li",[i("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[t._v("\n        Forum\n      ")])]),t._v(" "),i("li",[i("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank"}},[t._v("\n        Community Chat\n      ")])]),t._v(" "),i("li",[i("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[t._v("\n        Twitter\n      ")])]),t._v(" "),i("br"),t._v(" "),i("li",[i("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[t._v("\n        Docs for This Template\n      ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[e("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[this._v("\n        vue-router\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[this._v("\n        vuex\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[this._v("\n        vue-loader\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[this._v("\n        awesome-vue\n      ")])])])}]};var k=i("VU/8")({name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App"}}},w,!1,function(t){i("1uuo")},"data-v-d8ec41bc",null).exports;s.default.use(_.a);var x=new _.a({routes:[{path:"/",name:"HelloWorld",component:k}]}),S=i("zL8q"),b=i.n(S),y=i("mtWM"),C=i.n(y);i("tvR6");s.default.use(b.a),s.default.prototype.$axios=C.a,C.a.defaults.withCredentials=!0,C.a.defaults.crossDomain=!0,s.default.config.productionTip=!1;new s.default({el:"#app",router:x,components:{App:f},template:"<App/>"})},R4eI:function(t,e){},"VDz/":function(t,e){},mauk:function(t,e){},tvR6:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.badfc0b4a1f94647e6ab.js.map