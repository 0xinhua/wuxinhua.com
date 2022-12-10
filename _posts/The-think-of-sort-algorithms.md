---
title: '对比几种常见的排序算法'
excerpt: '本文将详细地介绍、比较、实践我们常用到的几种排序算法:计数排序、桶排序、冒泡排序、插入排序等'
date: '2017-12-13 11:53:11'
tags: algorithms
---

计算机科学里，排序算法是最基础算法之一，排序的方式有很多种，例如我们常见的冒泡排序、插入排序、快排等，这类需要对系列值进行比较的方法，称为基于比较排序算法；而相反，例如计数排序、桶排序等无需进行比较的算法称为非基于比较排序算法；不管什么样的方式，排序的结果是一致的，但在时间、空间上的开销却不一样，各算法使用条件也有一定的限制，本文将详细地介绍、比较、实践我们常用到的几种排序算法:计数排序、桶排序、冒泡排序、插入排序等；  

#### #最快最简单的排序—计数排序(countingSort)  
计数排序的思路是利用元素的实际值来确定它们在输出数组中的位置，计数排序不是比较排序，它的复杂度为Ο(n+k)（其中k是整数的范围),排序的速度会快于任何比较排序算法;通过写一段简单的计数排序代码来分析：

```javascript
/**
 * 桶排序
 * @function countingSort(arr, min, max)
 * @param {Array} arr 需排序的数组
 * @param {Number} min 需排序的数组最小值
 * @param {Number} max 需排序的数组最大值
 * @return {Array} 返回排序的数组
 */
function countingSort(arr, min, max) {
    var i,
        j = 0,
        counter = [];
    for (i = min; i <= max; i++) {
        counter[i] = 0;
    }
    for (i=0; i < arr.length; i++) {
        counter[arr[i]]++;
    }
    for (i = min; i <= max; i++) {
        while (counter[i]-- > 0) {
            arr[j++] = i;
        }
    }
    return arr;
  }
  // 测试
  console.log(countingSort([1, 10, 4, 2, 3, 5, 1, 10], 1 ,10)); // [1, 1, 2, 3, 4, 5, 10, 10]
```

计数排序的升级版本-**桶排序(BucketSort)**,例如有一个待排的整数系列A，元素最小值不小于0，最大值不超过k,即需要排序的数的范围是0-k,，那么需要k+1个桶来存储这些数出现的次数，最基础的桶排序代码实现如下：  

```javascript
/**
 * 桶排序
 * @function bucketSort(arr,min,max)
 * @param {Array} arr 需排序的数组
 * @param {Number} min 需排序数组最小值
 * @param {Number} max 需排序数组最大值
 * @return {Array} 返回排序的数组
 */
function bucketSort(arr, min, max) {
    var i,
        j,
        result,
        bucket,
        result = [],
        bucket = [];
    for(i=min; i<=max; i++) {
        bucket[i]=0;
    }
    for(i=0; i<arr.length; i++) {
        bucket[arr[i]]++;
    }
    for(i=min; i<=max; i++) {
       for(j=1; j<=bucket[i]; j++) {
         result.push(i);
       }
    }
    return result;
}
// 测试
console.log(bucketSort([1, 10, 4, 2, 3, 5, 1, 10], 1, 10)); // [1, 1, 2, 3, 4, 5, 10, 10]
```
上面这种情况貌似浪费了很多个桶，并且实际情况下，最小最大值差距较大，这样空间的浪费更严重；优化方案是我们可以用一个桶来存储一段期间内的数据，假设有一个待排序的整数序列A，元素的最小值不小于0，最大值不超过K,我们有M个桶，确定隐射函数f(i)=K/M,把这些数据划分进M个桶中，这样桶的个数会大大减少，再利用快排或其它排序方式把非空桶中的数值进行排序；

```javascript
/**
 * 桶排序优化版,给定桶的大小，将对应范围内的数据放入对应桶内
 * @function bucketSort(arr, min, max, bucketSize)
 * @param {Array} arr 需排序的数组
 * @param {Number} min 需排序数组最小值
 * @param {Number} max 需排序数组最大值
 * @param {Number} bucketSize 桶的大小
 * @return {Array} 返回排序的数组
 */
function bucketSort(arr, min , max, bucketSize) {
    var i,
        n,
        counter,
        result,
        bucketSize = bucketSize || 5,
        counter = [],
        result=[],
        n = Math.floor((max-min) / bucketSize) +1; // 桶个数
    for(i=0; i<n; i++) {
        counter[i] = []; // 初始化空桶
    }
    for(i=0; i<arr.length; i++) {
        counter[Math.floor((arr[i]- min) / bucketSize).push(arr[i]);
    }
    for(i=0; i<counter.length; i++) {
        if(counter[i].length > 0) {
            result = result.concat(bubbleSort(counter[i])); // 使用其他排序方法对桶内数据排序
        }
    }
    return result;
}
// 测试
console.log(bucketSort([1, 10, 4, 2, 3, 5, 1, 10], 1, 10, 3)); // [1, 1, 2, 3, 4, 5, 10, 10]
```

**分析**：  
用大写字母O来表示时间复杂度，那么该算法的时间复杂度是O(n+k+n+k)，即O(2*(n+k)),在计算时间复杂度的时候可以忽略较小的常数，最终桶排序的时间复杂度为O(N+K);由此看来桶排序还是非常快的，并且它也是最稳定的，它取决于桶的个数和待排整数系列的个数，例如即使待排的数值个数很少，但数值的最大值很大，需要的桶的个数就越多，结果就是浪费了很多空间来存储这些变量。  

1. 利用隐射关系，几乎减少了元素之间的比较工作，所以说桶排序是稳定的而且效率高的排序算法；
2. 由于取决于数据范围，在内存空间的消耗上比较大；
3. 如果桶能均匀分配到数据(一个桶一个数据)，这样就避免了桶内数据的排序了，桶内数据越多，时间复杂度越高；  

####  #最经典的排序算法-冒泡排序(Bubble Sort)

**冒泡排序**（Bubble Sort）作为最简单的排序算法之一，也是我最先接触到的排序算法(每个学过C语言的都会了解的吧，这可能是很多人接触的第一个排序算法)，简单并且一看就明白的排序算法。它的思路是从左到右逐个比较相邻的元素，一次比较两个元素，如果第一个比第二个大，则交换两者的位置，持续交换将大的数“冒泡”到右边，第二大的数浮动到数组倒数第二个位置……重复比较直到排序完成，所以形象地得名“冒泡排序”，看下Javascript代码的实现:

```javascript
/**
 * 冒泡排序
 * @param {Array}  arr 待排数组
 * @return {Array} 返回排序的数组
 */
function bubbleSort(arr) {
    for(var i=0; i<arr.length; i++) {
        for(var j=1; j<arr.length; j++) {
            if(arr[j-1] > arr[j]) {
                [arr[j-1], arr[j]] = [arr[j], arr[j-1]];
            }
        }
    }
    return arr;
}
// 测试
console.log(bubbleSort([1, 10, 4, 2, 3, 5, 1, 10]));  // [1, 1, 2, 3, 4, 5, 10, 10]

```

或者写成这样，整个排序过程会更加明了：

```javascript
/**
 * 冒泡排序
 * @param {Array}  arr 待排数组
 * @return {Array} 返回排序的数组
 */
function bubbleSort(arr) {
    var len = arr.length;
        for (var i = 0; i < len - 1; i++) {
            console.log('第'+ i +'次外循环,当前数组元素顺序:'+ arr);
            for (var j = 0; j < len - 1 - i; j++) {
                console.log('第'+ j +'次内循环,当前数组元素顺序:'+ arr);
                if (arr[j] > arr[j+1]) {        // 相邻元素两两对比
                    var temp = arr[j+1];        // 交换位置
                    arr[j+1] = arr[j];
                    arr[j] = temp;
                    console.log('第'+ j +'次内循环,交换位置后数组元素顺序:'+ arr);
                }
            }
        }
    return arr;
}
// 测试
bubbleSort([1, 5, 4, 2, 3, 10]);  
```
**分析**:  
可以从console中查看整个比较过程，冒泡的核心是双重嵌套循环，冒泡排序的时间复杂度是O(N的2次方),最好的情况下是O(N),它不存在桶排序的空间浪费问题，但在效率上并不是很高,同样冒泡排序也是一个稳定的排序，有人可能会问，**到底怎么判断排序算法的稳定性？**所谓稳定性，指的是当你原来待排的元素中间有相同的元素，在排序后它们之间的先后顺序保持不变，我们就称这个算法是稳定的；冒泡排序中，如果相邻两个元素值相等，则会跳过，不存在位置交换，所以说冒泡排序同样是稳定的。  

#### #简单粗暴的算法-插入排序(Insertion Sort)  
冒泡排序很好理解，**插入排序**原理同样也很好理解，它的原理是先构建有序序列(先将序列的第一个数值看做是有序的子序列)，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入，直到整个系列有序为止；插入排序在实现上类似与我们打牌摸牌过程，从摸到第一张牌后，之后的牌与手里的牌进行比较，按大小插入到合适的位置，代码实现如下：  

```javascript
/**
 * 插入排序
 * @param {Array}  arr 待排数组
 * @return {Array} 返回排序的数组
 */
function insertSort(arr) {
    var i,j,key;
    for(i=1; i<arr.length; i++) {
        j = i - 1;
        key = arr[i];
        while(j>=0 && arr[j] > key) {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1]=key;
    }
    return arr;
}
// 测试
console.log(insertSort([1, 5, 4, 2, 3, 10])); // [1, 2, 3, 4, 5, 10]
```
**分析**:
插入排序的时间复杂度为O(N的2次方),而最好情况是前部分均是已经排好序的序列，每次插入只需要与前一个元素比较，时间复杂度为O(N),而相同值在插入排序后左右位置并没有发生变化，所以插入排序是稳定的排序算法。  

#### #有效排序算法-归并排序(Merge Sort)  

归并排序是建立在归并操作上的一种有效的排序算法。该算法是采用分治法的一个非常典型的应用，归并排序是一个O(nlogn)的算法，其基本思想就是一个分治的策略，先进行划分，然后再进行合并;假设有这样一个数组[4,2,3,1,13,21]，归并排序的思路是将它逐步拆分，第一次对半拆成：[4,2,3] 和 [1, 13, 21],对于拆分出来的两个数组继续做该操作，直到每个数组元素为一个，最后进行有序的合并操作，直到合并到最上层，得到排序的数组[1,2,3,4,13,21]，JavaScript代码实现如下：  

```javascript
/**
 * 归并排序
 * @param {Array}  arr 待排数组
 * @return {Array} 返回排序的数组
 */
function mergeSort (arr) {
  if (arr.length === 1) {
    return arr;
  }
  var middle = Math.floor(arr.length / 2),
      left = arr.slice(0, middle), // 左边部分
      right = arr.slice(middle); // 右边部分
  return merge(
      mergeSort(left), // 递归操作
      mergeSort(right)
    );
}

/**
 * 左右进行比较
 * @param {Array}  left 左部分数组
 * @param {Array}  right 右部分数组
 * @return {Array} 返回排序的数组
 */
function merge (left, right) {
    var result = [],
        l = 0,
        r = 0;
  while (l < left.length && r < right.length) {
    if (left[l] < right[r]) {
        result.push(left[l]);
        l++;
    } else {
        result.push(right[r]);
        r++;
    }
  }
  return result.concat(left.slice(l)).concat(right.slice(r));
}

// 测试 
console.log(mergeSort([4,2,3,1,13,21])); // [1, 2, 3, 4, 13, 21]

```
分析：  
归并排序的效率是比较高的，时间复杂度为O(nlogn)，设序列长为N，将序列分开成小序列一共要logN步，每步都是一个合并有序数列的过程，时间复杂度可以记为O(N)，故一共为O(N*logN)。

#### #常用排序算法-快速排序(Quick Sort)  
相对于归并排序，两者都是用分治法，快速排序比归并排序思路更简单一些；在待排的数组中找一个“基准”，所有小于“基准”的都放在“左边”，大于“基准”的放在右边，左右子集再重复上述操作；  
```Javascript
/**
 * 根据中间值分为左右，再进行递归比较
 * @param {arr}  arr 待排序数组
 * @return {Array} 返回排序的数组
 */
var quickSort = function(arr) {
    if (arr.length <= 1) return arr;
    var midIndex = Math.floor(arr.length / 2),
        mid = arr.splice(midIndex, 1)[0],
        left = [],
        right = [];
    for(var i=0; i< arr.length; i++) {
        if(arr[i] < mid) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
  }
  return quickSort(left).concat(mid, quickSort(right));
}
// 测试 
console.log(mergeSort([4,2,3,1,13,21])); // [1, 2, 3, 4, 13, 21]
```

#### #总结  
以上几种算法的时间复杂度、空间复杂度、稳定性对比：
```javascript
算法          时间复杂度(O)         最佳情况(O)        最坏情况(O)        空间复杂度       稳定
-------------------------------------------------------------------------------------------
计数排序       O(N+K)              O(N)             O(N+K)             O(N+K)         稳定
桶排序         O(N+K)              O(N)             O(N+K)             O(N+K)         稳定
冒泡排序       O(N的2次方)              O(N)             O(N+K)             O(1)           稳定
插入排序       O(N+K)              O(N)             O(N+K)             O(N+K)         稳定
归并排序       O(NlogN)            O(NlogN)         O(NlogN)           O(N)           稳定
快速排序       O(NlogN)            O(NlogN)         O(N的2次方)             O(N)           不稳定
```
像归并排序、堆排序等较复杂的排序算法，在实际的应用中用得频率比较小(就我个人而言)，像冒泡、快排等基于比较的算法用的次数会更多一些，最主要的原因是这类排序算法限制较少，更灵活，非基于比较型的算法实际复杂度依赖于数据范围，但是在效率上会更加有优势，所以在算法的选择上得基于实际情况来定。