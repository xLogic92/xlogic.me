---
title: '算法修炼之Javascript版剑指Offer - 链表中倒数第k个结点'
date: '2019-08-29'
keyword: '算法修炼,Javascript,剑指Offer,链表'
tags: ['算法修炼', 'Javascript', '剑指Offer', '链表']
slug: '2019-08-29-algorithm-list-02'
---

## 1. 题目描述

输入一个链表，输出该链表中倒数第 k 个结点。

## 2. 解题思路

可以从头到尾遍历一遍链表，将节点放入数组中，反序数组后即可。

## 3. 代码

```javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function FindKthToTail(head, k) {
  let arr = [];
  let currentNode = head;
  while (currentNode && currentNode.next && currentNode.next !== null) {
    arr.push({
      val: currentNode.val,
      next: currentNode.next
    });
    currentNode = currentNode.next;
  }
  if (currentNode && currentNode.val) {
    arr.push({
      val: currentNode.val,
      next: currentNode.next
    });
  }
  let reverseArr = arr.reverse();
  return reverseArr[k - 1];
}
```
