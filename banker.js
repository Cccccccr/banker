"use strict"
var pArr = [
    {
        "name" : "P0", 
        "max" : [7, 5, 3], 
        "allocation" : [0, 0, 0], 
        "need" : [0, 0, 0]
    },
    {
        "name" : "P1", 
        "max" : [3, 2, 2], 
        "allocation" : [0, 0, 0], 
        "need" : [0, 0, 0]
    },
    {
        "name" : "P2", 
        "max" : [9, 0, 2], 
        "allocation" : [0, 0, 0],
        "need" : [0, 0, 0]
    },
    {
        "name" : "P3", 
        "max" : [2, 2, 2], 
        "allocation" : [0, 0, 0], 
        "need" : [0, 0, 0]
    },
    {
        "name" : "P4", 
        "max" : [4, 3, 3], 
        "allocation" : [0, 0, 0], 
        "need" : [0, 0, 0]
    }
];

var allResource = [10, 5, 7];
var remainRes = [10, 5, 7];

function initParr(){
    var arr = [];
    for (let i= 0; i< pArr.length; i++){
        if(pArr[i].need.length > allResource.length){
            console.log(pArr[i].name + "需要系统不存在的资源，无法满足");
            arr.push(i);
        }
        for(let j= 0; j< pArr[i].need.length; j++){
            if(pArr[i].need[j] > allResource[j]){
                console.log("系统资源总量无法满足" + pArr[i].name);
                arr.push(i);
            }
            pArr[i].need[j] = pArr[i].max[j];
        }
    }
    for(let k= 0; k< arr.length; k++){
        pArr.splice(arr[k], 1);
    }
}

function getResourcesArr(obj){ //随机获取资源的数量数组，用来判断能不能申请
    function allZero(resourceArr){
        for(let i= 0; i< resourceArr.length; i++){
            if(resourceArr[i] != 0){
                return false;
            }
        }
        return true;
    }

    function getRandomArr(){      
        var resourceArr = [];  
        for(let i= 0; i< allResource.length; i++){
            var num = Math.floor(Math.random()*(objNeed[i]));
            resourceArr.push(num);
        }
        return resourceArr;
    }
    var objNeed = obj.need;
    var resourceArr = getRandomArr();
    var allZeroFlag = allZero(resourceArr); 

    while(allZeroFlag == true){
        resourceArr = getRandomArr();
        allZeroFlag = allZero(resourceArr);
    }
    
    return resourceArr;
}


function findSaveSeq(obj, arr){ //非严谨版本
    var resourceArr = arr; //想要获取的资源数
    var tempParr = [];
    var tempRemainRes = [];
    var resArr = []; //储存关键路径
    for(let i= 0; i< pArr.length; i++){ //获得当前的pArr和allResource的备份
        tempParr[i] = pArr[i];
    }
    for(let i= 0; i< remainRes.length; i++){
        tempRemainRes[i] = remainRes[i]
    }

    var num = tempParr.indexOf(obj); //找到这个要申请资源的obj的位置

    for(let i= 0; i< pArr[num].allocation.length; i++){ //对这个obj的备份进行修改操作
        tempParr[num].allocation[i] += resourceArr[i];
        tempParr[num].need[i] -= resourceArr[i];
        tempRemainRes[i] -= resourceArr[i];
        if(tempRemainRes[i] < 0){
            console.log(tempParr[num] + "所请求资源数量不足，请求失败！");
            return false;
        }
    }

    //开始找路径，核心，找到一个满足条件的（剩余资源能满足他所缺资源的）就把它从tempAllResource里面剔除
    while(tempParr.length != 0){
        var deleteObj = 0;
        var position = -1; 
        for(let k= 0; k<tempParr.length; k++){
            for(let i= 0; i< tempRemainRes.length; i++){
                if(tempParr[k].need[i] > tempRemainRes[i]){ //比较资源数
                    deleteObj = 0;
                    break;
                }
                deleteObj = 1;
            }
            if(deleteObj == 1){
                position = k;
            }
        }
        // console.log(position); //保留
        if(position == -1){ //一个可以满足的都没有找到
            console.log("无法找到一条安全路径，请求资源失败！");
            return false;
        } else {
            tempRemainRes = add(tempRemainRes, tempParr[position].allocation);
            resArr.push(tempParr[position].name);
            tempParr.splice(position, 1);
            if(tempParr.length == 0){
                return resArr;
            }
        }
    }
    return true;
}

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

function runOnce(){ //执行一次总的的操作
    var num = Math.floor(Math.random()*(pArr.length));
    var arr = getResourcesArr(pArr[num]);
    console.log(pArr[num].name + "请求资源：" + arr);

    var findResult = findSaveSeq(pArr[num], arr);
    
    if(findResult == false){
        console.log("请求资源失败！");
    } else {
        add(pArr[num], arr);
        sub(remainRes, arr);
        console.log("请求资源成功！完成请求后资源情况：")
        // console.log(pArr);
        showParr();
        console.log("剩余资源：" + remainRes);
        // console.log(remainRes);
        console.log("所找到的关键路径：" + findResult);
    }
}

function showParr(){
    for(let i= 0; i< pArr.length; i++){
        console.log("name:" + pArr[i].name + "   max:" + pArr[i].max + "   allocation:" + pArr[i].allocation + "   need:" + pArr[i].need);
    }
}

//主函数
initParr();
console.log("经过初始化的Project：");
showParr();
console.log("\n");
var counter = 0;
while(counter < 10){
    runOnce();
    counter++;
    console.log("\n");
}