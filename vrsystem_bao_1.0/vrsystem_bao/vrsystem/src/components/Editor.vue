<template>
    <div id="editor">
      <div class="sidelogo">
        <span><i class="el-icon-setting"></i></span>
        <span class="sidelogotxt">&nbsp;&nbsp;全景编辑</span>
      </div>
      <div class="save-view">
        <el-badge  v-show="toSaveFlag" is-dot>
          <el-button type="primary" icon="el-icon-search" @click="save()"
                     is-dot style="margin-left: 10px;">保存</el-button>
        </el-badge>
        <el-button type="primary" v-show="!toSaveFlag" @click="save()"
                   icon="el-icon-search" is-dot style="margin-left: 9px;">保存</el-button>
        <el-button type="primary" @click="preview()">预览<i class="el-icon-view"></i></el-button>
      </div>

      <el-menu default-active="2"   class="el-menu-vertical-demo">
        <el-submenu index="1">
            <template slot="title">
              <i class="iconfont icon-skin"></i>
              <span>&nbsp;&nbsp;漫游皮肤</span>
            </template>
            <el-menu-item-group>
              <template slot="title">皮肤样式</template>
              <el-menu-item index="1-1">
                <el-switch
                v-model="SkinON"
                active-text="开启"
                inactive-text="不开启" @change="krpanoControl(SkinON)">
              </el-switch>
              </el-menu-item>
              <el-menu-item index="1-2">
              <el-select v-model="SkinValue" placeholder="请选择" @change="switchSkin(SkinValue)">
                <el-option
                  v-for="item in SkinOptions"
                  :key="item.SkinValue"
                  :label="item.label"
                  :value="item.SkinValue">
                </el-option>
              </el-select>
              </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>热点</span>
          </template>
          <el-menu-item-group>
            <template slot="title">添加热点</template>
            <el-menu-item index="2-1">
              <el-button type="primary" @click="showHotspotDetail()" size="medium">添加热点</el-button>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">热点管理</template>
            <el-menu-item index="2-2">
              <el-button type="primary" size="medium" @click="showHotspotManage()">热点管理</el-button>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span slot="title">基本设置</span>
          </template>
          <el-menu-item-group>
            <template slot="title"><i class="iconfont icon-shexiangji_shijiao"></i>视角</template>
            <el-menu-item index="3-1">
              <el-button type="primary" class="iconfont icon-shexiangji_shijiao"
                         @click="showViewManage()" size="small">视角设置</el-button>
            </el-menu-item>
            <el-menu-item index="3-2">
              <el-select v-model="PanoramaValue" placeholder="请选择" @change="switchPanoramaType(PanoramaValue)">
                <el-option
                  v-for="item in PanoramaOptions"
                  :key="item.PanoramaValue"
                  :label="item.label"
                  :value="item.PanoramaValue">
                </el-option>
              </el-select>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
          <template slot="title"><i class="iconfont icon-shijiaochangjingdaohang"></i>场景</template>
          <el-menu-item index="3-3">
            <el-button type="primary" @click="showSceneManagement()" size="medium"
                       class="iconfont icon-shijiaochangjingdaohang">场景管理</el-button>
          </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">全局设置</span>
          </template>
          <el-menu-item-group>
            <template slot="title">特效设置</template>
            <el-menu-item index="4-1">
              <el-switch
                v-model="snowballValue"
                inactive-text="开启雨雪特效"
                @change="snowballSwitch(snowballValue)">
              </el-switch>
            </el-menu-item>
            <el-menu-item index="4-2" v-show="snowballValue">
              <el-select v-model="SnowValue"  placeholder="请选择" @change="snowOptionSwitch(SnowValue)">
                <el-option
                  v-for="item in SnowOptions"
                  :key="item.SnowValue"
                  :label="item.label"
                  :value="item.SnowValue">
                </el-option>
              </el-select>
            </el-menu-item>
            <el-menu-item index="4-3">
              <el-switch
                v-model="littlePlanetValue"
                inactive-text="开启小行星开场"
                @change="switchLittlePlanet(littlePlanetValue)">
              </el-switch>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">基本设置</template>
            <el-menu-item index="4-4">
              <el-button type="primary" @click="showUploadBackGroundMusic()">上传背景音乐</el-button>
            </el-menu-item>
            <!--Todo:上传全景视频-->
            <el-menu-item index="4-5">
              <el-button type="primary" @click="showUploadPanorama()">上传全景图片</el-button>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span slot="title">嵌入</span>
          </template>
          <el-menu-item-group>
            <template slot="title">嵌入HTML网页/文本标记/照片/视频</template>
            <el-menu-item index="5-1">
              <el-button type="primary" @click="showLayer()">嵌入内容</el-button>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>


      <!--Todo:上传背景音乐列表-->
      <div class="hotspot-detail" v-if="uploadBackGroundMusicFlag">
        <div class="hotspot-detail-header">
          <span>上传背景音乐</span>
          <i class="el-icon-close delete" @click="hideUploadBackGroundMusic()"></i>
          <div class="line"></div>
        </div>

        <!--<div class="hotspot-detail-content" v-show="module === 0">-->
          <!--<label class="label">图标样式</label>-->
          <!--<div class="hotspot-detail-style-list">-->
            <!--<div v-for="style in hotspotStyleList">-->
              <!--<div class="hotspot-detail-style" @click="selectHotspotStyle(style.name)"-->
                   <!--:class="{'hotspot-detail-style-selected': style.name==currentHotspot.style}">-->
                <!--<img :src="style.imgUrl" style="height: 64px;">-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->

        <div class="hotspot-detail-content" style="height:668px; overflow-y: auto;">
          <div class="hotspot-list">
            <el-upload
              class="upload-demo"
              action="/api/background"
              :on-success="backGroundMusicSucess"
              :before-remove="beforeBackGroundMusicRemove"
              :before-upload="sendBackGroundMusic"
              multiple
              :limit="3"
              :on-exceed="backGroundMusicExceed"
              :file-list="backGroundMusicFileList">
              <el-button size="small" type="primary">上传背景音乐</el-button>
            </el-upload>
            <div class="el-upload__tip" style="white-space:normal">
              <p>可上传MP3格式文件，且不超过2MB</p>
            </div>
          </div>
        </div>

      </div>

      <!--Todo:上传全景图片列表-->
      <div class="hotspot-detail" v-if="uploadPanoramaFlag">
        <div class="hotspot-detail-header">
          <span>上传全景图片</span>
          <i class="el-icon-close delete" @click="hideUploadPanorama()"></i>
          <div class="line"></div>
        </div>

        <div class="hotspot-detail-content" style="height:668px; overflow-y: auto;">
          <div class="hotspot-list">
            <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">上传全景图片</el-button>
            </el-upload>
            <div class="el-upload__tip" style="white-space:normal">
              <p>可上传jpg/png格式文件，且不超过4MB,长宽比为2:1</p>
            </div>
          </div>
        </div>

      </div>

      <!--Todo:添加各种热点类型,编辑热点-->
      <div class="hotspot-detail" v-if="showHotspotDetailFlag" style="z-index: 1000;">
        <div class="hotspot-detail-header">
          <span>{{currentHotspot.name ? '编辑' : '新增'}}热点</span>
          <i class="el-icon-close delete" @click="hideHotspotDetail()"></i>
          <div class="line"></div>
        </div>

        <el-scrollbar class="scrollbar">
          <div class="hotspot-detail-content" v-if="dynamicON === 1">
            <label class="label">静态热点图标样式</label>
            <div class="hotspot-detail-style-list">
              <div v-for="style in staticHotspotStyleList">
                <div class="hotspot-detail-style" @click="selectHotspotStyle(style.name)"
                     :class="{'hotspot-detail-style-selected': style.name==currentHotspot.style}">
                  <img :src="style.imgUrl" style="height: 64px;">
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>

        <div class="hotspot-detail-content" v-if="dynamicON === 2">
          <label class="label">动态热点图标样式</label>
          <el-select v-model="dynamicValue" placeholder="请选择" class="control">
            <el-option
              v-for="item in dynamicHotspotStyleList"
              :key="item.dynamicValue"
              :label="item.label"
              :value="item.dynamicValue">
            </el-option>
          </el-select>
        </div>

        <div class="hotspot-detail-content">
        <label class="label">热点类型</label>
        <!--Todo:级联选择器-->
        <el-cascader  class="control"
            :options="hotSpotOptions"
            v-model="selectedOptions"
            @change="showHotSpotType">
          </el-cascader>
      </div>

      <div class="hotspot-detail-content" v-show="module === 0">
        <label class="label">切换效果</label>
        <el-select v-model="jumpSwitchValue" placeholder="请选择" class="control">
          <el-option
            v-for="item in jumpSwitchOptions"
            :key="item.jumpSwitchValue"
            :label="item.label"
            :value="item.jumpSwitchValue">
          </el-option>
        </el-select>
      </div>

        <div class="hotspot-detail-content" v-show="audioON === 1">
          <label class="label">视频展示类型</label>
          <el-select v-model="audioSwitchValue" placeholder="请选择" class="control">
            <el-option
              v-for="item in audioSwitchOptions"
              :key="item.audioSwitchValue"
              :label="item.label"
              :value="item.audioSwitchValue"
              @change="selectAudioSwitchValue(e)">
            </el-option>
          </el-select>
        </div>

        <div class="hotspot-detail-content" v-show="audioON === 2">
          <label class="label">图片展示类型</label>
          <el-select v-model="pictureSwitchValue" placeholder="请选择" class="control">
            <el-option
              v-for="item in pictureSwitchOptions"
              :key="item.pictureSwitchValue"
              :label="item.label"
              :value="item.pictureSwitchValue"
              @change="selectpictureSwitchValue(e)">
            </el-option>
          </el-select>
        </div>

        <div class="hotspot-detail-content" v-show="module === 1">
          <label class="label">图片/视频上传</label>
          <div v-if="audioSwitchValue === '选项0' || audioSwitchValue === '选项2'">
            <el-upload
              class="upload-demo control"
              action="/api/networkvideo"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <div class="el-upload__tip" style="white-space:normal">
              <p>可上传MP4格式文件</p>
            </div>
          </div>
          <div v-if="audioSwitchValue === '选项1'">
            <el-button type="text" @click="dialogVisible = true">点击上传网络视频</el-button>
            <div class="el-upload__tip" style="white-space:normal">
              <p>支持腾讯视频,优酷,爱奇艺,Bilibili,搜狐,芒果TV,pp视频</p>
            </div>
          </div>
        </div>

        <div class="hotspot-detail-content" v-show="textAreaON">
          <label class="label">输入显示文本</label>
          <el-input class="control"
            type="textarea"
            autosize
            placeholder="默认显示跳转场景名"
            v-model="hotSpotextarea">
          </el-input>
        </div>

      <div class="hotspot-detail-content" v-show="module === 0">
        <label class="label">目标场景</label>

        <el-scrollbar class="scrollbar">
        <div class="hotspot-detail-scene-list">
          <div  v-for="scene in sceneListExceptCurrent">
            <div class="hotspot-detail-scene" @click="selectHotspotLinkedScene(scene.name)"
                 :class="{'hotspot-detail-scene-selected': scene.name==currentHotspot.linkedscene}">
              <img :src="scene.thumburl" style="height: 64px;">
              <span>{{(scene.name).split(/_/)[1]}}</span>
            </div>
          </div>
        </div>
        </el-scrollbar>

      </div>

      <div class="hotspot-detail-content">
        <div class="hotspot-detail-button">
          <el-button type="success" @click="saveCurrentHotspot()">确定</el-button>
        </div>
        <div class="hotspot-detail-button" v-if="currentHotspot.name">
          <el-button type="danger" @click="deleteCurrentHotspot()">删除</el-button>
        </div>
      </div>

    </div>

      <!--Todo:添加图层-->
      <div class="hotspot-detail" v-if="layerFlag">
        <div class="hotspot-detail-header">
          <span>嵌入网页</span>
          <i class="el-icon-close delete" @click="hideLayer()"></i>
          <div class="line"></div>
        </div>

        <div class="hotspot-detail-content" style="height:668px; overflow-y: auto;">
          <div class="hotspot-list">

          </div>
        </div>

      </div>

      <!--场景管理-->
      <div class="hotspot-detail" v-if="showSceneManagementFlag">
        <div class="hotspot-detail-header">
          <span>场景管理</span>
          <i class="el-icon-close delete" @click="hideSceneManagement()"></i>
          <div class="line"></div>
        </div>


        <div class="hotspot-detail-content" style="height:668px; overflow-y: auto;">
          <label class="label">场景列表</label>
          <ul class="scene-item" v-for="scene in sceneList"
               :class="{'scene-item-selected' : scene.index == currentSceneIndex}">
            <li>
              <img :src="scene.thumburl" style="height: 128px;" @click="changeScene(scene)" >
              <div>
                <span>{{(scene.name).split(/_/)[1]}}</span>
              </div>
            </li>
            <el-button-group class="group">
            <el-button type="primary" size="small" class="button" icon="el-icon-edit"
                       @click="showModifySceneName(scene)">

            </el-button>
            <el-button type="primary" size="small" class="button" icon="el-icon-share"
                       @click="setWelcome(scene.index)">

            </el-button>
            <el-button type="primary" size="small" class="button" icon="el-icon-delete">

            </el-button>
            <el-button type="primary" size="small" class="button" icon="el-icon-more">

            </el-button>
            </el-button-group>
          </ul>
        </div>


      </div>
      <!--场景名称修改-->
      <el-dialog
        title="提示"
        :visible.sync="showModifySceneNameFlag"
        width="30%"
        :before-close="closeModifySceneName">
        <span>场景名称</span>
        <el-input v-model="toModifyScene.name" placeholder="请输入内容"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showModifySceneNameFlag = false">取 消</el-button>
          <el-button type="primary" :disabled="!sceneNameValid" @click="modifySceneName()">确 定</el-button>
        </span>
      </el-dialog>
      <!--热点管理-->
      <div class="hotspot-detail" v-if="showHotspotManagementFlag">
        <div class="hotspot-detail-header">
          <span>热点管理</span>
          <i class="el-icon-close delete" @click="hideHotspotManage()"></i>
          <div class="line"></div>
        </div>


        <div class="hotspot-detail-content" style="height:668px; overflow-y: auto;">
          <div class="hotspot-list">
            <div v-for="hotspotItem in hotspotList" @click="showHotspotDetail(hotspotItem)">
              <div  class="hotspot-item" v-if="(hotspotItem.name).split(/_/)[0] !== 'skin'"
                    :class="{'hotspot-item-selected':  selectedHotspot.name == hotspotItem.name}">
                <img :src="hotspotItem.url">
                <div>场景切换</div>
              </div>
            </div>
          </div>
        </div>


      </div>
      <!--视角设置-->
      <div class="hotspot-detail" v-if="showViewManagementFlag">
        <div class="hotspot-detail-header">
          <span>视角设置</span>
          <i class="el-icon-close delete" @click="hideViewManage()"></i>
          <div class="line"></div>
        </div>


        <div class="hotspot-detail-content" style="height:668px; overflow-y: auto;">
          <label class="label" style="display:block; margin-bottom: 20px;">自动旋转
            <el-switch
              v-model="rotateON"
              active-text=""
              inactive-text=""
              style="padding-left: 74px"
              @change="updatedAutoSpin()">
            </el-switch>
          </label>

          <label class="label" style="display:block; position: relative;">等待时间(秒)
            <el-input v-model="autoSpinWaitingTime" class="wait" @change="updatedAutoSpin()"
                      placeholder="请输入内容" :disabled="rotateON"></el-input>
          </label>

          <div class="view-slider">
            <div class="view-top-slider" @mousedown="startMoveInitFov()"
                  @mousemove="moveInitFov()" @mouseup="stopMoveInitFov()">
              <span :style="{ left: initFov + 'px'}"><i class="el-icon-location"></i></span>
            </div>
            <el-slider
              style="width: 180px;"
              v-model="sliderValue"
              range
              :max="180">
            </el-slider>
          </div>

          <el-row>
            <el-col :span="8"><div class="grid-content">
              <span>最近</span>
              <el-input v-model="minFov" class="input" placeholder="请输入内容" :disabled="true"></el-input>
            </div></el-col>
            <el-col :span="8"><div class="grid-content">
              <span>初始</span>
              <el-input v-model="initFov" class="input" placeholder="请输入内容" :disabled="true"></el-input>
            </div></el-col>
            <el-col :span="8"><div class="grid-content">
              <span>最远</span>
              <el-input v-model="maxFov" class="input" placeholder="请输入内容" :disabled="true"></el-input>
            </div></el-col>
          </el-row>

        </div>

      </div>
      <!--场景内视角选择框-->
      <div class="camera" v-if="showViewManagementFlag">
        <div class="camera-top"></div>
        <div class="camera-bottom"></div>
        <div class="camera-left"></div>
        <div class="camera-right"></div>
        <div class="camera-left-top"></div>
        <div class="camera-top-left"></div>
        <div class="camera-top-right"></div>
        <div class="camera-right-top"></div>
        <div class="camera-left-bottom"></div>
        <div class="camera-bottom-left"></div>
        <div class="camera-bottom-right"></div>
        <div class="camera-right-bottom"></div>
        <el-button type="primary" round @click="setDefaultView()" class="camera-button">设为初始视角</el-button>
        <!--<a class="button is-info camera-button" ></a>-->
      </div>
      <!--网络视频上传-->
      <el-dialog
        title="提示"
        :visible.sync="networkVideoDialogVisible"
        width="30%"
        :before-close="networkVideoDialogClose">
        <span>网络视频网址:</span>
        <el-input
          placeholder="视频网站分享处通用代码"
          v-model="networkVideoUrl"
          clearable>
        </el-input>
        <!--视频平台-->

        <span slot="footer" class="dialog-footer">
          <el-button @click="networkVideoDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="networkVideoDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

    </div>
</template>

<script>

    // import Tree from './Tree'
    export default {
      name: "editor",
      // components: {Tree},
      data() {
        return {
          // 网络视频上传选择框
          networkVideoDialogVisible: false,
          // 各网站Url地址
          networkVideoUrl:"",
          // 级联选择器添加热点类型
          hotSpotOptions: [{
            value:'jumpHotSpot',
            label:'跳转热点',
            children:[{
              value:'static',
              label:'静态热点',
              children:[{
                value:'none',
                label:'无/默认',
              },{
                value:'text',
                label:'显示文字',
              }],
            },{
              value:'dynamic',
              label:'动态热点',
              children:[{
                value:'none',
                label:'无/默认',
              },{
                value:'text',
                label:'显示文字',
              }],
            }]
          },{
            value:'audioHotSpot',
            label:'图像/图片热点',
            children:[{
              value:'video',
              label:'图像热点',
            },{
              value:'picture',
              label:'图片热点',
            }]
          },{
            value:'ployHotSpot',
            label:'多边形热点',
            children:[{
              value:'none',
              label:'无/默认',
            },{
              value:'text',
              label:'显示文字',
            }]
          }],
          selectedOptions: [],//选中的热点样式--类数组对象
          // 控制选择的热点类型:0跳转热点；1图像/视频热点；2热区;
          module:-1,
          // 动态/静态热点的选择,1-静态,2-动态
          dynamicON:0,
          // 视频/图像热点的选择,1-视频,2-图像
          audioON:0,
          //添加热点文本域的开关
          textAreaON:false,
          //输入的热点显示文本
          hotSpotextarea: '',
          //Todo:上传背景音乐
          backGroundMusicFileList: [],
          backGroundMusicFileUrl:[],
          // 上传视频/图像
          fileList: [],
          fileUrl:[],
          //小行星开场的开启与关闭
          littlePlanetValue: false,
          //雨雪特效的开启与关闭
          snowballValue: false,
          //雨雪特效的选择框参数
          SnowOptions: [ {
            SnowValue: '选项0',
            label: '雪特效'
          },{
            SnowValue: '选项1',
            label: '雪球特效'
          }, {
            SnowValue: '选项2',
            label: '雪花特效'
          }, {
            SnowValue: '选项3',
            label: '银星特效'
          }, {
            SnowValue: '选项4',
            label: '金星特效'
          }, {
            SnowValue: '选项5',
            label: '雨特效'
          }, {
            SnowValue: '选项6',
            label: '大雨特效'
          }],
          SnowValue: '选项0',//输入上面数组的value值,设为默认选项
          //跳转热点的切换效果
          jumpSwitchOptions: [{
            jumpSwitchValue: 'BLEND(1.0, easeInCubic)',
            label: '淡入淡出'
          },{
            jumpSwitchValue: 'ZOOMBLEND(2.0, 2.0, easeInOutSine)',
            label: '缩放过渡'
          },{
            jumpSwitchValue: 'COLORBLEND(2.0, 0x000000, easeOutSine)',
            label: '黑场过渡'
          },{
            jumpSwitchValue: 'LIGHTBLEND(1.0, 0xFFFFFF, 2.0, linear)',
            label: '白场过渡'
          },{
            jumpSwitchValue: 'SLIDEBLEND(1.0, 0.0, 0.2, linear)',
            label: '从右至左'
          },{
            jumpSwitchValue: 'SLIDEBLEND(1.0, 90.0, 0.01, linear)',
            label: '从上至下'
          },{
            jumpSwitchValue: 'SLIDEBLEND(1.0, 135.0, 0.4, linear)',
            label: '对角线'
          },{
            jumpSwitchValue: 'OPENBLEND(1.0, 0.0, 0.2, 0.0, linear)',
            label: '圆形展开'
          },{
            jumpSwitchValue: 'OPENBLEND(0.7, 1.0, 0.1, 0.0, linear)',
            label: '垂直展开'
          },{
            jumpSwitchValue: 'OPENBLEND(1.0, -1.0, 0.3, 0.0, linear)',
            label: '水平展开'
          },{
            jumpSwitchValue: 'OPENBLEND(1.0, -0.5, 0.3, 0.8, linear)',
            label: '椭圆缩放'
          }],
          jumpSwitchValue: 'BLEND(1.0, easeInCubic)',
          // 视频热点的切换效果
          audioSwitchOptions: [{
            audioSwitchValue: '选项0',
            label: '平面视频'
          },{
            audioSwitchValue: '选项1',
            label: '网站在线视频'
          },{
            audioSwitchValue: '选项2',
            label: '热点视频'
          }],
          audioSwitchValue: '选项0',
          // 图片热点的切换效果
          pictureSwitchOptions: [{
            pictureSwitchValue: '选项0',
            label: '无'
          },{
            pictureSwitchValue: '选项1',
            label: '飞出效果'
          }],
          pictureSwitchValue: '选项0',
          //视角的选择框参数
          PanoramaOptions: [ {
            PanoramaValue: '选项0',
            label: '正常视角'
          },{
            PanoramaValue: '选项1',
            label: '鱼眼投影视角'
          }, {
            PanoramaValue: '选项2',
            label: '球极平面视角'
          }, {
            PanoramaValue: '选项3',
            label: '建筑视角'
          }, {
            PanoramaValue: '选项4',
            label: '帕尼尼视角'
          }, {
            PanoramaValue: '选项5',
            label: '小行星视角'
          }],
          PanoramaValue: '选项0',//输入上面数组的value值,设为默认选项
          //皮肤的选择框参数
          SkinOptions: [{
            SkinValue: '选项1',
            label: '默认皮肤'
          }, {
            SkinValue: '选项2',
            label: '轻量皮肤'
          }, {
            SkinValue: '选项3',
            label: '超轻量皮肤'
          }, {
            SkinValue: '选项4',
            label: '镜框皮肤'
          }, {
            SkinValue: '选项5',
            label: '复古皮肤'
          }, {
            SkinValue: '选项6',
            label: '复古圆角皮肤'
          }, {
            SkinValue: '选项7',
            label: '黑色皮肤'
          }],
          SkinValue: '选项1',//输入上面数组的value值,设为默认选项
          //slider滑块框最小边界值和最大边界值
          slider:[0,180],
          //控制皮肤的开启与关闭
          SkinON: true,
          //展示修改场景名称标识
          showModifySceneNameFlag: false,
          //待修改场景对象
          toModifyScene: {},
          //控制场景自动旋转
          rotateON: false,
          //自动旋转等待时间
          autoSpinWaitingTime: 0,
          //最小fov
          minFov: 0,
          //最大fov
          maxFov: 180,
          //初始fov
          initFov: 90,
          //初始fov移动条移动开关
          initFovMoveFlag: false,
          //krpano对象
          krpano: document.querySelector('#krpanoSWFObject'),
          //待保存标识
          toSaveFlag: false,
          //场景列表
          sceneList: [],
          //当前场景序号
          currentSceneIndex: 0,
          //欢迎页场景序号
          welcomeSceneIndex: 0,
          //展示热点详情标识
          showHotspotDetailFlag: false,
          //展示场景管理标识
          showSceneManagementFlag: false,
          //展示热点管理标识
          showHotspotManagementFlag: false,
          //展示视角设置
          showViewManagementFlag: false,
          //上传背景音乐列表展示
          uploadBackGroundMusicFlag: false,
          //上传全景图片列表展示
          uploadPanoramaFlag: false,
          // 添加图层列表展示
          layerFlag: false,
          //热点列表
          hotspotList: [],
          //热点移动状态
          isHotspotMoving: false,
          //选中移动热点
          selectedHotspot: {},
          selectedHotspotath: '',
          selectedHotspotatv: '',
          //当前热点
          currentHotspot: {
            style: null,
            linkedscene: null,
            url:null
          },
          // 静态热点图标样式列表
          staticHotspotStyleList: [
            {
              name: 'skin_hotspotstyle',
              imgUrl: '../static/skin/vtourskin_hotspot.png'
            }
          ],
          // 动态热点图标样式列表
          dynamicHotspotStyleList: [
            {
              label: '白色波纹',
              dynamicValue: '../../static/animatedhotspot_white.png'
            },{
              label: '黑色波纹',
              dynamicValue: '../../static/animatedhotspot_black.png'
            },{
              label: '目标',
              dynamicValue: '../../static/target.png'
            },{
              label: '波浪',
              dynamicValue: '../../static/waves.png'
            },
          ],
          dynamicValue: '',
          // 每个热点类型设置一个热点ID,根据ID判断添加的热点类型
          hotSpotTypeID:0,
          // 接口请求状态
          requesting: false,
        };
      },
      mounted:function (){
        //入口js文件已将此函数定义到window，krpano加载完成后调用
        try {
          //初始化场景
          this.sceneList = this.krpano.get('scene').getArray();
          this.currentSceneIndex = this.krpano.get('scene').getItem(this.krpano.get('xml.scene')).index;
          this.welcomeSceneIndex = this.krpano.get('scene').getItem(this.krpano.get('startscene')).index;
          //热点移动事件初始化
          let thisVue = this;
          let pano = document.querySelector('#pano');
          pano.onmouseup = function () {
            thisVue.isHotspotMoving = false
          };
          pano.onmouseout = function () {
            thisVue.isHotspotMoving = false
          };
          pano.onmousemove = function () {
            thisVue.moveHotspot();
          };
          //模块数据初始化
          this.initView();
          this.initHotSpot();
        } catch (e) {
          //Todo:如何处理加载问题
        }
      },
      computed: {
        //场景名称校验
        sceneNameValid: function() {
          return this.toModifyScene.name && this.toModifyScene.name.length > 0
            && this.toModifyScene.name.length < 30;
        },
        //视角拖动条范围值
        sliderValue: {
          get: function () {
            return [
              this.minFov,
              this.maxFov,
            ]
          },
          set: function (val) {
            let min = Math.min(val[0], val[1]);
            let max = Math.max(val[0], val[1]);
            if (this.sceneList[this.currentSceneIndex]) {
              if (this.krpano.get('view.fovmin') !== min) {
                this.krpano.set('view.fovmin', min);
                this.sceneList[this.currentSceneIndex].fovmin = min;
                this.toSaveFlag = true;
              }
              if (this.krpano.get('view.fovmax') !== max) {
                this.krpano.set('view.fovmax', max);
                this.sceneList[this.currentSceneIndex].fovmax = max;
                this.toSaveFlag = true;
              }
            }
            this.minFov = min;
            this.maxFov = max;
          }
        },
        //除当前场景外场景列表
        sceneListExceptCurrent: function() {
          let scenes = [];
          this.sceneList.forEach((scene) => {
            if (scene.index !== this.currentSceneIndex) {
              scenes.push(scene);
            }
          });
          return scenes;
        },
      },
      methods: {
        //入口js文件已将此函数定义到window，krpano加载完成后调用
        onready() {
          //初始化场景
          this.sceneList = this.krpano.get('scene').getArray();
          this.currentSceneIndex = this.krpano.get('scene').getItem(this.krpano.get('xml.scene')).index;
          this.welcomeSceneIndex = this.krpano.get('scene').getItem(this.krpano.get('startscene')).index;
          //热点移动事件初始化
          let thisVue = this;
          let pano = document.querySelector('#pano');
          pano.onmouseup = function () {
            thisVue.isHotspotMoving = false
          };
          pano.onmouseout = function () {
            thisVue.isHotspotMoving = false
          };
          pano.onmousemove = function () {
            thisVue.moveHotspot()
          };
          //模块数据初始化
          this.initView();
          this.initHotSpot();
        },
        //根据krpano参数初始化视角和热点模块数据
        initView() {
          //初始化视角参数
          this.autoSpinWaitingTime = this.krpano.get('autorotate.waittime');
          this.autoSpinFlag = this.krpano.get('autorotate.enabled');
          this.minFov = this.krpano.get('view.fovmin');
          this.maxFov = this.krpano.get('view.fovmax');
          this.initFov = this.krpano.get('view.fov');
        },
        initHotSpot() {
          this.sceneList[this.currentSceneIndex].hotspots = [];
          this.hotspotList = [];
          this.krpano.get('hotspot').getArray().forEach((hotspot) => {
            if (hotspot.name !== 'webvr_prev_scene' && hotspot.name !== 'webvr_next_scene'
              && hotspot.name !== 'vr_cursor') {
              this.hotspotList.push(hotspot);
              this.sceneList[this.currentSceneIndex].hotspots.push(hotspot);
              this.initHotspotEvent(hotspot);
            }
          });
        },
        //热点事件初始化
        initHotspotEvent(hotspot) {
          let thisVue = this;
          hotspot.ondown = function () {
            thisVue.selectedHotspot = hotspot;
            thisVue.selectHotspot();
            thisVue.isHotspotMoving = true;
          };
          hotspot.onover = function () {
            thisVue.selectedHotspot = hotspot;
          };
          hotspot.onout = function () {
            thisVue.selectedHotspot = {}
          };
          if(hotspot.hasOwnProperty('text')) {
            let name = hotspot.name;
            hotspot.onup = function () {
              thisVue.hotspotMoveText(name);
            };
          }
          if(hotspot.type === 'text') {
            let name = hotspot.name;
            hotspot.onup = function () {
              thisVue.textHotspotMove(name);
            };
          }
        },
        // 热点坐标与鼠标坐标偏移计算
        selectHotspot() {
          this.krpano.call('screentosphere(mouse.x, mouse.y, mouseath, mouseatv);');
          this.selectedHotspot.athDis = this.selectedHotspot.ath - this.krpano.get('mouseath');
          this.selectedHotspot.atvDis = this.selectedHotspot.atv - this.krpano.get('mouseatv');
        },
        // 实现带显示文本的热点跟随该图像热点移动
        hotspotMoveText(name) {
          let textName = 'vrtooltip_' + name;
          // console.log(this.krpano.get('hotspot[' + textName + ']'));
          // console.log(this.krpano.get('hotspot[' + name + ']'));
          let ath = this.krpano.get('hotspot[' + name + '].ath');
          let atv = this.krpano.get('hotspot[' + name + '].atv');
          this.krpano.set('hotspot[' + textName + '].ath',ath);
          this.krpano.set('hotspot[' + textName + '].atv',atv);
        },
        // 实现该图像热点跟随带显示文本的热点移动
        textHotspotMove(name) {
          let hotspotName = name.split(/_/)[1];
          let ath = this.krpano.get('hotspot[' + name + '].ath');
          let atv = this.krpano.get('hotspot[' + name + '].atv');
          this.krpano.set('hotspot[' + hotspotName + '].ath',ath);
          this.krpano.set('hotspot[' + hotspotName + '].atv',atv);
        },
        //预览
        preview() {
          window.open('../../static/tour.html');
        },
        //选择热点图标样式
        selectHotspotStyle(style) {
          this.currentHotspot.style = style;
        },
        //选择切换场景热点目标场景
        selectHotspotLinkedScene(name) {
          this.currentHotspot.linkedscene = name;
        },
        //保存当前热点变动
        saveCurrentHotspot() {
          console.log(this.hotspotList);
          if (!this.currentHotspot.name) {
            // 计算中间位置的球面坐标
            this.krpano.set('halfHeight', this.krpano.get('stageheight') / 2);
            this.krpano.set('halfWidth', this.krpano.get('stagewidth') / 2);
            this.krpano.call('screentosphere(halfWidth,halfHeight,init_h,init_v);');
            let init_h = this.krpano.get('init_h');
            let init_v = this.krpano.get('init_v');
            //Todo:添加热点类型
            let name = 'spot' + new Date().getTime();
            this.krpano.call('addhotspot(' + name + ');');
            this.krpano.set('hotspot[' + name + '].ath', init_h);
            this.krpano.set('hotspot[' + name + '].atv', init_v);
            //添加热点切换过渡效果
            this.krpano.set('hotspot[' + name + '].onclick', 'loadscene(' + this.currentHotspot.linkedscene + ', null, KEEPVIEW|KEEPMOVING|NOPREVIEW,' + this.jumpSwitchValue);
            this.krpano.set('hotspot[' + name + '].dive', this.currentHotspot.dive);
            this.krpano.set('hotspot[' + name + '].linkedscene', this.currentHotspot.linkedscene);
            if(this.hotSpotTypeID === 1) {
              //添加带文字的静态热点
              this.krpano.get('hotspot[' + name + ']').loadstyle(this.currentHotspot.style);
              this.krpano.set('hotspot[' + name + '].onloaded', 'add_all_the_time_tooltip_for_VR()');
              this.krpano.set('hotspot[' + name + '].text', this.hotSpotextarea);
            }
            if(this.hotSpotTypeID === 2) {
              //添加静态热点
              this.krpano.get('hotspot[' + name + ']').loadstyle(this.currentHotspot.style);
            }
            if(this.hotSpotTypeID === 3) {
              //添加带文字的动态热点
              this.krpano.set('hotspot[' + name + '].url', this.dynamicValue);
              this.krpano.set('hotspot[' + name + '].onloaded', 'do_crop_animation(64,64, 60);add_all_the_time_tooltip_for_VR()');
              this.krpano.set('hotspot[' + name + '].text', this.hotSpotextarea);
            }
            if(this.hotSpotTypeID === 4) {
              //添加动态热点
              this.krpano.set('hotspot[' + name + '].url', this.dynamicValue);
              this.krpano.set('hotspot[' + name + '].onloaded', 'do_crop_animation(64,64, 60);');
            }
          }
          //Todo:需要改进过分影响加载速度
          this.initHotSpot();
          this.showHotspotDetailFlag = false;
          this.toSaveFlag = true;
          this.hotSpotTypeID = 0;
          console.log(this.hotspotList);
        },
        //删除热点
        deleteCurrentHotspot() {
          this.krpano.call('removehotspot(' + this.currentHotspot.name + ')');
          this.initHotSpot();
          this.showHotspotDetailFlag = false;
          this.toSaveFlag = true;
        },
        //热点移动
        moveHotspot() {
          if (this.isHotspotMoving) {
            this.krpano.call('screentosphere(mouse.x, mouse.y, mouseath, mouseatv);');
            this.krpano.set('hotspot[' + this.selectedHotspot.name + '].ath'
              , this.krpano.get("mouseath") + this.selectedHotspot.athDis);
            this.krpano.set('hotspot[' + this.selectedHotspot.name + '].atv'
              , this.krpano.get("mouseatv") + this.selectedHotspot.atvDis);
          }
        },
        //切换当前场景
        changeScene(scene) {
          if (this.currentSceneIndex === scene.index) return;
          this.currentSceneIndex = scene.index;
          this.krpano.call('loadscene(' + scene.name + ')');
          let currentScene = this.sceneList[this.currentSceneIndex];
          //加载临时存储数据应用于krpano
          //自动旋转
          if (currentScene.autorotate) {
            this.krpano.set('autorotate.enabled', currentScene.autorotate.enabled);
            this.krpano.set('autorotate.waittime', currentScene.autorotate.waitTime);
          }
          if (this.autoSpinFlag) this.krpano.get('autorotate').interrupt();
          //热点
          if (currentScene.hotspots && currentScene.hotspotsModifyFlag) {
            //清除原有热点
            this.krpano.get('hotspot').getArray().forEach((hotspot) => {
              if (hotspot.name !== 'webvr_prev_scene' &&
                hotspot.name !== 'webvr_next_scene' && hotspot.name !== 'vr_cursor') {
                this.krpano.call('removehotspot(' + hotspot.name + ')')
              }
            });
            //添加存储数据热点
            currentScene.hotspots.forEach((hotspot) => {
              this.krpano.call('addhotspot(' + hotspot.name + ');');
              this.krpano.set('hotspot[' + hotspot.name + '].ath', hotspot.ath);
              this.krpano.set('hotspot[' + hotspot.name + '].atv', hotspot.atv);
              this.krpano.set('hotspot[' + hotspot.name + '].linkedscene', hotspot.linkedscene);
              this.krpano.set('hotspot[' + hotspot.name + '].dive', hotspot.dive);
              this.krpano.get('hotspot[' + hotspot.name + ']').loadstyle(hotspot.style);
            });
          }
          //初始化模块数据
          this.initView();
          this.initHotSpot();
        },
        //设置为home页
        setWelcome(index) {
          this.welcomeSceneIndex = index;
          this.toSaveFlag = true;
        },
        //显示修改场景弹窗
        showModifySceneName(scene) {
          this.toModifyScene = {
            name: scene.name,
            index: scene.index
          };
          this.showModifySceneNameFlag = true;
        },
        //修改场景名称
        modifySceneName() {
          if (!this.sceneNameValid) return;
          //判断是否重复
          let repeatFlag = false;
          for (let scene of this.sceneList) {
            if (scene.name === this.toModifyScene.name) {
              repeatFlag = true;
              break;
            }
          }
          if (repeatFlag) {
            alert('场景名称重复');
            return;
          }
          //修改场景名称（相关联的热点，当前场景scene名称也需修改）
          let oldName = this.sceneList[this.toModifyScene.index].name.toString();
          let newName = this.toModifyScene.name.toString();
          //修改krpano场景对象名称
          this.krpano.get('scene').renameItem(oldName, newName);
          this.sceneList[this.toModifyScene.index].name = newName;
          //修改krpano热点指向场景名称
          this.sceneList.forEach((scene) => {
            if (scene.hotspots && scene.index !== this.toModifyScene.index) {
              scene.hotspots.forEach((hotspot) => {
                if (hotspot.linkedscene === oldName) {
                  hotspot.linkedscene = newName;
                  scene.hotspotsModifyFlag = true;
                  if (scene.index === this.currentSceneIndex)
                    this.krpano.set('hotspot[' + hotspot.name + '].linkedscene', newName);
                }
              })
            }
          });
          this.showModifySceneNameFlag = false;
          this.toSaveFlag = true;
        },
        //关闭修改场景弹窗
        closeModifySceneName() {
          this.showModifySceneNameFlag = false
        },
        //设为初始视角
        setDefaultView() {
          let fov = Math.round(this.krpano.get('view.fov'));
          this.initFov = fov;
          this.sceneList[this.currentSceneIndex].fov = fov;
          this.sceneList[this.currentSceneIndex].initH = this.krpano.get('view.hlookat');
          this.sceneList[this.currentSceneIndex].initV = this.krpano.get('view.vlookat');
          this.toSaveFlag = true;
        },
        //自动旋转变更
        updatedAutoSpin() {
          this.krpano.set('autorotate.enabled', this.rotateON);
          this.krpano.set('autorotate.waittime', this.autoSpinWaitingTime);
          if (this.rotateON) this.krpano.get('autorotate').interrupt();
          this.sceneList[this.currentSceneIndex].autorotate = {
            enabled: this.rotateON,
            waitTime: Number(this.autoSpinWaitingTime)
          };
          this.toSaveFlag = true;
        },
        //视角条拖动
        moveInitFov() {
          if (this.initFovMoveFlag) {
            let slider = document.querySelector('.view-top-slider');
            let left = window.event.clientX - slider.offsetLeft;
            if (left < Math.round(this.minFov)) {
              console.log(left);
              console.log(Math.round(this.minFov));
              this.stopMoveInitFov();
              left = Math.round(this.minFov);
            } else if (left > Math.round(this.maxFov)) {
              console.log(left);
              console.log(Math.round(this.maxFov));
              this.stopMoveInitFov();
              left = Math.round(this.maxFov);
            }
            this.initFov = left;
            this.krpano.set('view.fov', this.initFov);
            this.sceneList[this.currentSceneIndex].fov = this.initFov;
            this.toSaveFlag = true;
          }
        },
        startMoveInitFov() {
          this.initFovMoveFlag = true;
          this.moveInitFov();
        },
        stopMoveInitFov() {
          this.initFovMoveFlag = false;
        },
        //保存
        //Todo:需要更改保存热点信息
        save() {
          if (!this.toSaveFlag) return;
          if (this.requesting) {
            alert('保存中，请稍后再试');
            return;
          }
          this.requesting = true;
          let data = [];
          this.sceneList.forEach((scene) => {
            let sceneData = {
              index: scene.index,
              name: scene.name,
              welcomeFlag: scene.index == this.welcomeSceneIndex,
              autorotate: scene.autorotate ? scene.autorotate : null,
              fov: scene.fov ? scene.fov : null,
              fovmax: scene.fovmax ? scene.fovmax : null,
              fovmin: !isNaN(Number.parseInt(scene.fovmin)) ? scene.fovmin : null,
              initH: scene.initH ? scene.initH : null,
              initV: scene.initV ? scene.initV : null
            };
            if (scene.hotspots) {
              let hotSpots = [];
              scene.hotspots.forEach((hotspot) => {
                if(hotspot.name.split(/_/)[0] !== 'skin') {
                  hotSpots.push({
                    ath: hotspot.ath,
                    atv: hotspot.atv,
                    name: hotspot.name,
                    linkedscene: hotspot.linkedscene,
                    style: hotspot.style,
                    dive: hotspot.dive ? hotspot.dive : true,
                  })
                }
              });
              sceneData.hotSpots = hotSpots;
            }
            data.push(sceneData)
          });
          console.log(data);
          let url ='/api/save';
          this.$axios.post(url,{
            body: JSON.stringify(data)
          },{
            header:{
              'Content-Type': 'application/json; charset=utf-8'
            },
          }).then((res) => {
              this.requesting = false;
              if (res.status === 200) {
                this.toSaveFlag = false;
                alert('保存成功');
              } else {
                alert('系统异常');
              }
            }, () => {
              this.requesting = false;
              alert('系统异常');
            }).catch((error) => {
              alert('系统异常');
            });
        },
        //显示级联选择框选中的热点样式
        showHotSpotType(value) {
          console.log(value);
          if(value[0] === 'jumpHotSpot'){
            this.module = 0;
            this.audioON = 0;
            if(value[1] === 'static'){
              this.dynamicON = 1;
              if(value[2] === 'text'){
                this.textAreaON = true;
                this.hotSpotTypeID = 1;
              } else {
                this.textAreaON = false;
                this.hotSpotTypeID = 2;
              }
            } else if(value[1] === 'dynamic') {
              this.dynamicON = 2;
              if(value[2] === 'text'){
                this.textAreaON = true;
                this.hotSpotTypeID = 3;
              } else {
                this.textAreaON = false;
                this.hotSpotTypeID = 4;
              }
            }
          }
          if(value[0] === 'audioHotSpot'){
            this.module = 1;
            this.textAreaON = false;
            this.dynamicON = 0;
            if(value[1] === 'video'){
              this.audioON = 1;
            }
            if(value[1] === 'picture'){
              this.audioON = 2;
            }
          }
          if(value[0] === 'ployHotSpot'){
            this.module = 2;
            this.textAreaON = false;
            this.dynamicON = 0;
            this.audioON = 0;
          }
          console.log(this.hotSpotTypeID);
        },
        // 选中的视频热点类型
        selectAudioSwitchValue() {
          if(this.audioSwitchValue === '选项0') {
            this.hotSpotTypeID = 5;
          }
          if(this.audioSwitchValue === '选项1') {
            this.hotSpotTypeID = 6;
          }
          if(this.audioSwitchValue === '选项2') {
            this.hotSpotTypeID = 7;
          }
        },
        //Todo:背景音乐上传相关方法
        // backGroundMusicRemove(file, fileList) {
        //   console.log(file, fileList);
        // },
        // backGroundMusicPreview(file) {
        //   console.log(file);
        // },
        backGroundMusicExceed(files, fileList) {
          this.$message.warning(`当前限制选择 3 个文件，
          本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeBackGroundMusicRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        },
        // 对上传的背景音乐文件进行校验
        sendBackGroundMusic(file){
          const isBgLimit = file.type === 'audio/ogg' || file.type === 'audio/wav' || file.type === "audio/mpeg";
          const isBgLimit4M = file.size / 1024 / 1024 < 4;
          if (!isBgLimit) {
            this.$message.error("上传背景音乐只能是 MP3,ogg,wav 格式!");
          }
          if (!isBgLimit4M) {
            this.$message.error("上传背景音乐大小不能超过 4MB!");
          }
          return isBgLimit && isBgLimit4M;
        },
        // 背景音乐文件上传成功的回调函数
        backGroundMusicSucess(response,file,fileList) {
          this.$confirm(` ${ file.name }上传成功 `);
          console.log(response);
          this.backGroundMusicFileUrl.push(response);
          this.krpano.call('playsound(bgsnd, %SWFPATH%/'+ response + ', 0);');//执行保存的背景音乐
        },
        // 上传视频/图像的相关方法
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        },
        // 网络视频上传对话框关闭
        networkVideoDialogClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        //隐藏或者显示下方自带控制条
        krpanoControl: function (e) {
          this.krpano.set('layer[skin_control_bar].visible', e);
          this.krpano.set('layer[skin_splitter_bottom].visible', e);
          this.krpano.set('layer[skin_scroll_window].visible', e);
        },
        //开启雨雪特效
        snowballSwitch: function (e) {
          if (e) {
            this.krpano.call("set(plugin[snow].mode,          snow);\n" +
              "\t\tset(plugin[snow].blendmode,     normal);\n" +
              "\t\tset(plugin[snow].flakes,        4000);\n" +
              "\t\tset(plugin[snow].color,         0xFFFFFF);\n" +
              "\t\tset(plugin[snow].speed,         1.0);\n" +
              "\t\tset(plugin[snow].shake,         4.0);\n" +
              "\t\tset(plugin[snow].speedvariance, 2.0);\n" +
              "\t\tset(plugin[snow].spreading,     4.0);\n" +
              "\t\tset(plugin[snow].wind,          0.0);");
          } else {
            this.krpano.call("set(plugin[snow].mode,'')");
          }
        },
        //雨雪特效选择框
        snowOptionSwitch: function (SnowValue) {
          if (SnowValue === '选项0') {
            this.krpano.call("set(plugin[snow].mode,          snow);\n" +
              "\t\tset(plugin[snow].blendmode,     normal);\n" +
              "\t\tset(plugin[snow].flakes,        4000);\n" +
              "\t\tset(plugin[snow].color,         0xFFFFFF);\n" +
              "\t\tset(plugin[snow].speed,         1.0);\n" +
              "\t\tset(plugin[snow].shake,         4.0);\n" +
              "\t\tset(plugin[snow].speedvariance, 2.0);\n" +
              "\t\tset(plugin[snow].spreading,     4.0);\n" +
              "\t\tset(plugin[snow].wind,          0.0);");
          }
          if (SnowValue === '选项1') {
            this.krpano.call("set(plugin[snow].mode,          image);\n" +
              "\t\tset(plugin[snow].imageurl,      '%CURRENTXML%/snow_image/snowball.png');\n" +
              "\t\tset(plugin[snow].blendmode,     normal);\n" +
              "\t\tset(plugin[snow].flakes,        2000);\n" +
              "\t\tset(plugin[snow].imagescale,    0.5);\n" +
              "\t\tset(plugin[snow].speed,         1.0);\n" +
              "\t\tset(plugin[snow].shake,         4.0);\n" +
              "\t\tset(plugin[snow].speedvariance, 2.0);\n" +
              "\t\tset(plugin[snow].spreading,     2.0);\n" +
              "\t\tset(plugin[snow].wind,          0.0);");
          }
          if (SnowValue === '选项2') {
            this.krpano.call("set(plugin[snow].mode,          image);\n" +
              "\t\tset(plugin[snow].imageurl,      '%CURRENTXML%/snow_image/snowflake.png');\n" +
              "\t\tset(plugin[snow].blendmode,     add);\n" +
              "\t\tset(plugin[snow].flakes,        2000);\n" +
              "\t\tset(plugin[snow].imagescale,    0.4);\n" +
              "\t\tset(plugin[snow].speed,         0.5);\n" +
              "\t\tset(plugin[snow].shake,         8.0);\n" +
              "\t\tset(plugin[snow].speedvariance, 2.0);\n" +
              "\t\tset(plugin[snow].spreading,     2.0);\n" +
              "\t\tset(plugin[snow].wind,          0.0);");
          }
          if (SnowValue === '选项3') {
            this.krpano.call("set(plugin[snow].mode,          image);\n" +
              "\t\tset(plugin[snow].imageurl,      '%CURRENTXML%/snow_image/silverstar.png');\n" +
              "\t\tset(plugin[snow].blendmode,     add);\n" +
              "\t\tset(plugin[snow].flakes,        2000);\n" +
              "\t\tset(plugin[snow].imagescale,    0.3);\n" +
              "\t\tset(plugin[snow].speed,         1.0);\n" +
              "\t\tset(plugin[snow].shake,         4.0);\n" +
              "\t\tset(plugin[snow].speedvariance, 2.0);\n" +
              "\t\tset(plugin[snow].spreading,     2.0);\n" +
              "\t\tset(plugin[snow].wind,          0.0);");
          }
          if (SnowValue === '选项4') {
            this.krpano.call("set(plugin[snow].mode,          image);\n" +
              "\t\tset(plugin[snow].imageurl,      '%CURRENTXML%/snow_image/star.png');\n" +
              "\t\tset(plugin[snow].blendmode,     normal);\n" +
              "\t\tset(plugin[snow].flakes,        1000);\n" +
              "\t\tset(plugin[snow].imagescale,    1.0);\n" +
              "\t\tset(plugin[snow].speed,         1.0);\n" +
              "\t\tset(plugin[snow].shake,         4.0);\n" +
              "\t\tset(plugin[snow].speedvariance, 2.0);\n" +
              "\t\tset(plugin[snow].spreading,     1.9);\n" +
              "\t\tset(plugin[snow].wind,          0.0);");
          }
          if (SnowValue === '选项5') {
            this.krpano.call("set(plugin[snow].mode,          rain);\n" +
              "\t\tset(plugin[snow].blendmode,     normal);\n" +
              "\t\tset(plugin[snow].flakes,        2000);\n" +
              "\t\tset(plugin[snow].color,         0x7FAFFF);\n" +
              "\t\tset(plugin[snow].speed,         3.5);\n" +
              "\t\tset(plugin[snow].shake,         1.0);\n" +
              "\t\tset(plugin[snow].speedvariance, 1.0);\n" +
              "\t\tset(plugin[snow].spreading,     3.0);\n" +
              "\t\tset(plugin[snow].rainwidth,     1.0);\n" +
              "\t\tset(plugin[snow].rainalpha,     0.5);\n" +
              "\t\tset(plugin[snow].wind,          2.0);");
          }
          if (SnowValue === '选项6') {
            this.krpano.call("set(plugin[snow].mode,          rain);\n" +
              "\t\tset(plugin[snow].blendmode,     normal);\n" +
              "\t\tset(plugin[snow].flakes,        4000);\n" +
              "\t\tset(plugin[snow].color,         0x9FAFFF);\n" +
              "\t\tset(plugin[snow].speed,         4.1);\n" +
              "\t\tset(plugin[snow].shake,         0.0);\n" +
              "\t\tset(plugin[snow].speedvariance, 1.5);\n" +
              "\t\tset(plugin[snow].spreading,     4.0);\n" +
              "\t\tset(plugin[snow].rainwidth,     1.5);\n" +
              "\t\tset(plugin[snow].rainalpha,     0.3);\n" +
              "\t\tset(plugin[snow].wind,          3.0);");
          }
        },
        //动态切换皮肤
        switchSkin(skin) {
          if (skin === '选项1') {
            this.krpano.call("set(design, 'default');\n" +
              "\t\tcopy(skin_thumbs_last_state, layer[skin_thumbs].state);\n" +
              "\t\tloadpanoscene('%CURRENTXML%/skinselect.xml', get(xml.scene), null, IGNOREKEEP|KEEPVIEW|KEEPMOVING, BLEND(0.5));");
          }
          if (skin === '选项2') {
            this.krpano.call("set(design, 'flat_light');\n" +
              "\t\tcopy(skin_thumbs_last_state, layer[skin_thumbs].state);\n" +
              "\t\tloadpanoscene('%CURRENTXML%/skinselect.xml', get(xml.scene), null, IGNOREKEEP|KEEPVIEW|KEEPMOVING, BLEND(0.5));");
          }
          if (skin === '选项3') {
            this.krpano.call("set(design, 'ultra_light');\n" +
              "\t\tcopy(skin_thumbs_last_state, layer[skin_thumbs].state);\n" +
              "\t\tloadpanoscene('%CURRENTXML%/skinselect.xml', get(xml.scene), null, IGNOREKEEP|KEEPVIEW|KEEPMOVING, BLEND(0.5));");
          }
          if (skin === '选项4') {
            this.krpano.call("set(design, 'glass');\n" +
              "\t\tcopy(skin_thumbs_last_state, layer[skin_thumbs].state);\n" +
              "\t\tloadpanoscene('%CURRENTXML%/skinselect.xml', get(xml.scene), null, IGNOREKEEP|KEEPVIEW|KEEPMOVING, BLEND(0.5));");
          }
          if (skin === '选项5') {
            this.krpano.call("set(design, '117');\n" +
              "\t\tcopy(skin_thumbs_last_state, layer[skin_thumbs].state);\n" +
              "\t\tloadpanoscene('%CURRENTXML%/skinselect.xml', get(xml.scene), null, IGNOREKEEP|KEEPVIEW|KEEPMOVING, BLEND(0.5));");
          }
          if (skin === '选项6') {
            this.krpano.call("set(design, '117_round');\n" +
              "\t\tcopy(skin_thumbs_last_state, layer[skin_thumbs].state);\n" +
              "\t\tloadpanoscene('%CURRENTXML%/skinselect.xml', get(xml.scene), null, IGNOREKEEP|KEEPVIEW|KEEPMOVING, BLEND(0.5));");
          }
          if (skin === '选项7') {
            this.krpano.call("set(design, 'black');\n" +
              "\t\tcopy(skin_thumbs_last_state, layer[skin_thumbs].state);\n" +
              "\t\tloadpanoscene('%CURRENTXML%/skinselect.xml', get(xml.scene), null, IGNOREKEEP|KEEPVIEW|KEEPMOVING, BLEND(0.5));");
          }
        },
        //切换观看视角
        switchPanoramaType(value) {
          if (value === '选项0') {
            this.krpano.call("skin_view_look_straight();\n" +
              "\t\tset(view.stereographic, true);\n" +
              "\t\tset(view.fovmax, get(xml.view.fovmax));\n" +
              "\t\ttween(view.distortionfovlink,   0.5, distance(1.0,0.5));\n" +
              "\t\ttween(view.architectural, 0.0, distance(1.0,0.5));\n" +
              "\t\ttween(view.pannini,       0.0, distance(1.0,0.5));\n" +
              "\t\ttween(view.distortion,    0.0, distance(1.0,0.5));");
          }
          if (value === '选项1') {
            this.krpano.call("skin_view_look_straight();\n" +
              "          set(view.stereographic, true);\n" +
              "          set(view.fovmax, get(xml.view.fovmax));\n" +
              "          tween(view.distortionfovlink,   0.5, distance(1.0,0.5));\n" +
              "          tween(view.architectural, 0.0,  distance(1.0,0.5));\n" +
              "          tween(view.pannini,       0.0,  distance(1.0,0.5));\n" +
              "          tween(view.distortion,    0.35, distance(1.0,0.5));");
          }
          if (value === '选项2') {
            this.krpano.call("skin_view_look_straight();\n" +
              "\t\tset(view.stereographic, true);\n" +
              "\t\tset(view.fovmax, get(xml.view.fovmax));\n" +
              "\t\ttween(view.distortionfovlink,   0.5, distance(1.0,0.5));\n" +
              "\t\ttween(view.architectural, 1.0, distance(1.0,0.5));\n" +
              "\t\ttween(view.pannini,       0.0, distance(1.0,0.5));\n" +
              "\t\ttween(view.distortion,    0.0, distance(1.0,0.5));");
          }
          if (value === '选项3') {
            this.krpano.call("skin_view_look_straight();\n" +
              "\t\tset(view.stereographic, true);\n" +
              "\t\tset(view.fovmax, get(xml.view.fovmax));\n" +
              "\t\ttween(view.distortionfovlink,   0.5, distance(1.0,0.5));\n" +
              "\t\ttween(view.architectural, 0.0, distance(1.0,0.5));\n" +
              "\t\ttween(view.pannini,       0.0, distance(1.0,0.5));\n" +
              "\t\ttween(view.distortion,    1.0, distance(1.0,0.8));");
          }
          if (value === '选项4') {
            this.krpano.call("skin_view_look_straight();\n" +
              "\t\tset(view.stereographic, true);\n" +
              "\t\tset(view.fovmax, get(xml.view.fovmax));\n" +
              "\t\ttween(view.distortionfovlink,   0.5, distance(1.0,0.5));\n" +
              "\t\ttween(view.architectural, 0.0, distance(1.0,0.5));\n" +
              "\t\ttween(view.pannini,       1.0, distance(1.0,0.8));\n" +
              "\t\tif(view.distortion LT 0.1,\n" +
              "\t\t\ttween(view.distortion, 1.0, distance(1.0,0.8));\n" +
              "\t\t  );");
          }
          if (value === '选项5') {
            this.krpano.call("set(view.stereographic, true);\n" +
              "\t\tset(view.fovmax, get(xml.view.fovmax));\n" +
              "\t\ttween(view.distortionfovlink,   0.5, distance(1.0,0.5));\n" +
              "\t\ttween(view.architectural, 0.0, distance(1.0,0.5));\n" +
              "\t\ttween(view.pannini,       0.0, distance(1.0,0.5));\n" +
              "\t\ttween(view.distortion,    1.0, distance(1.0,0.8));\n" +
              "\t\ttween(view.fov,           150, distance(150,0.8));\n" +
              "\t\ttween(view.vlookat,        90, distance(100,0.8));\n" +
              "\t\tadd(new_hlookat, view.hlookat, 123.0);\n" +
              "\t\ttween(view.hlookat, get(new_hlookat), distance(100,0.8));");
          }
        },
        //小行星开场开启与关闭
        switchLittlePlanet(e) {
          if (e) {
            this.krpano.get('skin_settings').littleplanetintro = true;
          } else {
            this.krpano.get('skin_settings').littleplanetintro = false;
          }
        },
        // Todo:显示热点详情
        showHotspotDetail(hotspotItem) {
          this.currentHotspot = hotspotItem ? hotspotItem : {
            style: this.staticHotspotStyleList[0].name,
            linkedscene: this.sceneListExceptCurrent[0].name,
            dive: true
          };
          this.showHotspotDetailFlag = true;
        },
        // 隐藏热点详情
        hideHotspotDetail() {
          this.showHotspotDetailFlag = false;
        },
        // 显示场景管理
        showSceneManagement() {
          this.showSceneManagementFlag = true;
        },
        // 隐藏场景管理
        hideSceneManagement() {
          this.showSceneManagementFlag = false;
        },
        // 显示热点管理
        showHotspotManage() {
          this.showHotspotManagementFlag = true;
        },
        // 隐藏热点管理
        hideHotspotManage() {
          this.showHotspotManagementFlag = false;
        },
        //显示视角设置
        showViewManage() {
          this.showViewManagementFlag = true;
        },
        // 隐藏视角设置
        hideViewManage() {
          this.showViewManagementFlag = false;
        },
        // 显示上传背景音乐列表
        showUploadBackGroundMusic() {
          this.uploadBackGroundMusicFlag = true;
        },
        // 隐藏上传背景音乐列表
        hideUploadBackGroundMusic() {
          this.uploadBackGroundMusicFlag = false;
        },
        // 显示上传全景图片列表
        showUploadPanorama() {
          this.uploadPanoramaFlag = true;
        },
        // 隐藏上传全景图片列表
        hideUploadPanorama() {
          this.uploadPanoramaFlag = false;
        },
        // 显示添加图层页面
        showLayer() {
          this.layerFlag = true;
        },
        // 隐藏添加图层页面
        hideLayer() {
          this.layerFlag = false;
        },

      }
    }
</script>

<style lang="scss" scoped>
  @import '../assets/css/iconfont.css';
  @import '../assets/css/Editor.scss';
  .sidelogo{
    position: absolute;
    top: 0;
    height:50px;
    line-height:50px;
  }
  .sidelogotxt{
    font-size:1.2rem;
    font-weight:bold;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
<style>
  /*覆盖Element-UI的样式*/
  .wait .el-input__inner{
    height: 22px;
    width: 40px;
    padding: 0 5px;
    position: absolute;
    right: 3px;
    top: -40px;
  }
</style>
