"use strict"

let pArr = [
  {
      "name" : "P0", 
      "max" : [7, 5, 3], 
      "allocation" : [0, 0, 0], 
      "need" : [7, 5, 3]
  },
  {
      "name" : "P1", 
      "max" : [3, 2, 2], 
      "allocation" : [0, 0, 0], 
      "need" : [3, 2, 2]
  },
  {
      "name" : "P2", 
      "max" : [9, 0, 2], 
      "allocation" : [0, 0, 0],
      "need" : [9, 0, 2]
  },
  {
      "name" : "P3", 
      "max" : [2, 2, 2], 
      "allocation" : [0, 0, 0], 
      "need" : [2, 2, 2]
  },
  {
      "name" : "P4", 
      "max" : [4, 3, 3], 
      "allocation" : [0, 0, 0], 
      "need" : [4, 3, 3]
  }
];
function add(arr1, arr2){
  for(let i= 0; i< arr1.length; i++){
      arr1[i] += arr2[i];
  }
  return arr1;
}
// console.log(add([1, 2, 3], [4, 5, 6]));

function sub(arr1, arr2){
  for(let i= 0; i< arr1.length; i++){
      arr1[i] -= arr2[i];
  }
  return arr1;
}

let resource = new Vue({
  el: "#resource",
  data: {
    resourceNumber: 0,
    resourceList: [],
    allocationList: [],
    show: false,
    projectList: [],
    applyData: [],
    remainRes: [],
    road: []
  },
  methods: {
    souNumBtn: function(e){
      let num = document.getElementById("souNum").value;
      let that = this;
      if(num > 4){
        alert("请输入小于5的资源种类数目");
      } else {
        this.resourceNumber = num;
        this.resourceList = [];
        for(let i= 0; i< num; i++){
          that.resourceList.push({
            name: i+1,
            number: 0
          });
        }
        this.show = true;
      } 
    },

    souNumDefBtn: function(e){
      let that = this;
      this.resourceNumber = 3;
      this.resourceList = [];
      for(let i= 0; i< 3; i++){
        that.resourceList.push({
          name: i+1,
          number: 0
        });
      }
      this.show = true;
    },

    resourceListBtn: function(e){
      let list = document.getElementsByClassName('resourceList');
      let that = this;
      this.allocationList = [];
      for(let i= 0; i< list.length; i++){
        if(list[i].value != ""){
          that.resourceList[i].number = parseInt(list[i].value);
          that.remainRes[i] = that.resourceList[i].number;
        } 
        that.allocationList.push(0);
      }
      console.log(this.resourceList);
      console.log(this.remainRes);
    },

    resourceListDefBtn: function(e){
      let list = [10, 5, 7];
      let that = this;
      for(let i= 0; i< this.resourceNumber; i++){
          that.resourceList[i].number = list[i];
      }
      this.allocationList = [0, 0, 0];
      this.remainRes = list;
      console.log(this.remainRes);
    },

    projectListBtn: function(e){
      let that = this;
      let list = document.getElementsByClassName("projectList");
      let project = {};
      let max = [];
      let need = [];
      let initAllAndNeed = [];
      let insert = false;

      project["name"] = list[0].value;
      if(list[0].value == ""){
        alert("请输入project名称");
        return ;
      }
      for(let i= 1; i< list.length; i++){
        console.log(that.resourceList[i-1].number);
        if(list[i].value > that.resourceList[i-1].number){
          alert("系统资源" + that.resourceList[i-1].name +"总量无法满足");
          return ;
        }
        if(list[i].value != ""){
          max.push(parseInt(list[i].value));
          need.push(parseInt(list[i].value));
        } else {
          max.push(0);
          need.push(parseInt(list[i].value));
        }
        initAllAndNeed.push(0);
      }
      insert = true;
      project["max"] = max;
      project["allocation"] = initAllAndNeed;
      project["need"] = need;
      // console.log(max);
      if(insert == true){
        that.projectList.push(project);
      }
      console.log(this.projectList);
    },

    projectListDefBtn: function(e){
      // this.projectList = pArr;
      for(let i= 0; i< pArr.length; i++){
        this.projectList[i] = pArr[i];
      }
      console.log(this.projectList);
    },

    allDefalut: function(e){
      this.souNumDefBtn();
      this.resourceListDefBtn();
      this.projectListDefBtn();
      console.log(this.projectList);
    },

    deleteProjectBtn: function(e){
      let that = this;
      let deleteName = document.getElementsByClassName("deleteProject")[0].value;
      console.log(deleteName);
      if(deleteName == ""){
        alert("请输入要删除project的名字！");
        return ;
      } else {
        for(let i= 0; i< that.projectList.length; i++){
          if(deleteName == that.projectList[i].name){
            that.projectList.splice(i, 1);
            return ;
          }
        }
        alert("不存在作业名为" + deleteName + "的作业！");
      }
    },

    applyDataBtn: function(e){
      let name = document.getElementsByClassName('applyName')[0].value;
      let applyList = document.getElementsByClassName("applyList");
      let arr = [];  //申请资源数组
      let data = [];
      let that = this;
      console.log(name);
      for(let i= 0; i< applyList.length; i++){
        // console.log(applyList[i].value == "");
         if(applyList[i].value == ""){
           alert("请输入要申请资源" + this.resourceList[i].name + "的数目！");
           return ;
         } 
         arr.push(parseInt(applyList[i].value));
      }
      data.name = name;
      data.applyList = arr;
      data.result = "false";
      // console.log(data);
      this.applyData.push(data);
  
      let count = 0; //获得project在projectList上的位置
      for(let i= 0; i< this.projectList.length; i++){
        if(that.projectList[i].name == name){
          count = i;
          break;
        }
      }

      // for(let i= 0; i< arr.length; i++){
      //   this.remainRes[i] -= arr[i];
      //   this.allocationList[i] += arr[i];
      //   this.projectList[count].allocation[i] += arr[i];
      //   this.projectList[count].need[i] -= arr[i];
      // }
      // console.log(findSaveSeq(this.projectList[count], arr));

      //开始寻找安全路径
     
      let tempRemain = [];
      let tempRemainRes = [];
      for(let i= 0; i< this.remainRes.length; i++){
        tempRemain[i] = this.remainRes[i];
        tempRemainRes[i] = this.remainRes[i];
      }
      // tempRemain[0] = 100;

      //实现巨他妈深度复制
      let tempProjectList = [];
      for(let i= 0; i<this.projectList.length; i++){
        tempProjectList[i] = {
          "name" : "",
          "max" : [],
          "allocation" : [],
          "need" : []
        }
        tempProjectList[i].name = this.projectList[i].name;
        // console.log(tempProjectList);
        // console.log(that.projectList[i].max.length); //3
        for(let j= 0; j< that.projectList[i].max.length; j++){
          tempProjectList[i].max[j] = that.projectList[i].max[j];
          tempProjectList[i].allocation[j] = that.projectList[i].allocation[j];
          tempProjectList[i].need[j] = that.projectList[i].need[j];
        }
      }
      console.log(tempProjectList);
      // tempProjectList[0].name = "P5";
       
      let num = count;
      // console.log(num);
      let length = tempProjectList[num].allocation.length;
      for(let i= 0; i< length; i++){ //对这个obj的备份进行修改操作
        tempProjectList[num].allocation[i] += arr[i];
        tempProjectList[num].need[i] -= arr[i];
        tempRemain[i] -= arr[i];
        if(tempRemain[i] < 0){
            console.log(tempProjectList[num].name + "所请求资源数量不足，请求失败！");
            alert(tempProjectList[num].name + "所请求资源数量不足，请求失败！");
            that.road = [];
            return false;
        }
      }
      //寻找路径
      function add(arr1, arr2){
        for(let i= 0; i< arr1.length; i++){
            arr1[i] += arr2[i];
        }
        return arr1;
      }
      let result = true; //标识是否找到路径
      let resultArr = []; //最终输出的结果路径数组
      while(tempProjectList.length != 0){
        let deleteObj = 0,
            position = -1;
        console.log(tempRemain);
        for(let k= 0; k< tempProjectList.length; k++){
          for(let i= 0; i< tempRemain.length; i++){
            if(tempProjectList[k].need[i] > tempRemain[i]){
              deleteObj = 0;
              break;
            }
            deleteObj = 1;
          }
          if(deleteObj == 1){
            position = k;
          }
        }
        console.log(position);
        if(position == -1){
          console.log("无法找到一条安全路径，请求资源失败！");
          alert("无法找到一条安全路径，请求资源失败！");
          return false;
        } else {
          for(let j= 0; j< tempRemain.length; j++){
            tempRemain[j] += tempProjectList[position].allocation[j];

            
          }
          resultArr.push(tempProjectList[position]);
          tempProjectList.splice(position, 1);
          if(tempProjectList.length == 0){
            break;
          }
        }
      }
      console.log(resultArr);
      if(resultArr.length == that.projectList.length){
        for(let j= 0; j< that.remainRes.length; j++){
          // that.remainRes[j] += arr[j];
          that.projectList[num].allocation[j] += arr[j];
          that.projectList[num].need[j] -= arr[j];
          that.remainRes[j] -= arr[j];
          that.allocationList[j] += arr[j];
        }
        let pos = that.applyData.length-1;
        console.log(that.applyData);
        that.applyData[pos].result = "success";
        let road = '';
        for(let i= 0; i< resultArr.length; i++){
          if(i == 0){
            road += resultArr[i].name;
          } else {
            road += "->" + resultArr[i].name;
          }
        }
        that.applyData[pos].road = road;
      }
      let del = true;
      for(let i= 0; i< tempRemain.length; i++){
        if(that.projectList[num].need[i] > 0){
          del = false;
        }
      }
      if(del == true){
        for(let i= 0; i< tempRemain.length; i++){
          that.remainRes[i] += that.projectList[num].allocation[i];
        }
        
        that.projectList.splice(num, 1);
      }
      that.road = [];
      for(let i= 0; i< resultArr.length; i++){
        resultArr[i].roaddetail = [];
        for(let j= 0; j< tempRemain.length; j++){
          if(i == 0){
            resultArr[i].roaddetail[j] = tempRemainRes[j] - arr[j];
          } else {
            resultArr[i].roaddetail[j] = resultArr[i-1].roaddetail[j] + resultArr[i-1].allocation[j]; 
          }
        }
        that.road.push(resultArr[i]);
      }
      for(let i= resultArr.length; i< that.projectList.length; i++){
        resultArr[i].roaddetail = tempRemainRes;
        resultArr[i].allocation = [0, 0, 0];
        that.road.push(resultArr[i]);
      }
      console.log(that.road);
    },

    applyDataRandomBtn: function(e){
      let that = this;
      let proList = document.getElementsByClassName('applyName')[0];
      let appAllacation = [];
      let getProName = () => {
        let len = that.projectList.length;
        let num = Math.floor(Math.random()* len);
        console.log(num);
        appAllacation = that.projectList[num].need;
        console.log(appAllacation);
        return that.projectList[num].name;
      }
      let proName = getProName();
      proList.value = proName;
      console.log(proList.value);
      
      let appList = [];
      for(let i= 0; i< that.remainRes.length; i++){
        let num = Math.floor(Math.random()* (appAllacation[i] + 1));
        appList.push(num);
      }
      console.log(appList);

      let list = document.getElementsByClassName("applyList");
      for(let i= 0; i< list.length; i++){
        list[i].value = appList[i];
      }

      this.applyDataBtn();

    }

  }
});


