function fibonacciBook(n){
    if(n<=1){
        return n;
    } else {
        return arguments.callee(n-1) + arguments.callee(n-2);
    }
}
// console.log(fibonacciBook(40)); //9.716s

function fibonacciMine(n){
    let num1, num2, result;
    for(let i= 0; i<= n; i++){
        if(i == 0){
            num1 = 0;
            result = 0;
        } else if(i == 1){
            num2 = 1;
            result = num1 + num2;
        } else {
            result = num1 + num2;
            num1 = num2;
            num2 = result;
        }
    }
    return result;
}
// console.log(fibonacciMine(40)); //0.26s - 0.29s  
//递归调用会消耗非常多的资源加时间

var arr = [99, 57, 82, 109, 62, 11, 26, 89];

function copyArr(arr){
    let tempArr = [];
    for(let i= 0; i< arr.length; i++){
        tempArr[i] = arr[i];
    }
    return tempArr;
}

function swap(arr, i, pos){
    let temp = arr[i];
    arr[i] = arr[pos];
    arr[pos] = temp;
}

function selectSort(arr){
    var tempArr = copyArr(arr);
    console.log("tempArr: " + tempArr);

    for(let i= 0; i< tempArr.length - 1; i++){
        let min = tempArr[i];
        let pos = i;
        for(let j= i; j< tempArr.length; j++){
            if(tempArr[j] < min){
                min = tempArr[j];
                pos = j;
            }
        }
        console.log("pos: " + pos);
        if(pos != i){
            swap(tempArr, i, pos);
            console.log("min: " + min);
        }
    }

    return tempArr;
}
// console.log(selectSort(arr));

function bubbleSort(arr){
    var tempArr = copyArr(arr);

    for(let i= 0; i< tempArr.length - 1; i++){
        for(let j= 0; j< tempArr.length - i -1; j++){
            if(tempArr[j] > tempArr[j+1]){
                swap(tempArr, j, j+1);
            }
        }
    }

    return tempArr;
}
// console.log(bubbleSort(arr));

function insertionSort(arr){
    var tempArr = copyArr(arr);

    for(let i= 0; i< tempArr.length; i++){
        let temp = tempArr[i];
        let j = i - 1;

        while(j >= 0 && tempArr[j] > temp){
            tempArr[j+1] = tempArr[j];
            tempArr[j] = temp;
            j -= 1;
        }
    }

    return tempArr;
}
console.log(insertionSort(arr));
