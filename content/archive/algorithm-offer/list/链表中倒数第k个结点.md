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

**思路一**：从头到尾遍历一遍，统计长度`length`。再从头遍历，直到`length - k`个节点停止，这就是倒数第 k 个节点。

**思路二**：只需要遍历一遍。准备 2 个指针`a`和`b`均指向第一个节点，`a`先移动`k`个位置；然后`a`和`b`一起向后移动，此时两个只指针的位置差为`k`；直到`a`移动到尾结点停止，此时`b`指向的节点就是倒数第 k 个节点。

## 3. 代码

```javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
class ListNode {
  /**
   * 节点构造函数
   * @param {*} val
   * @param {ListNode} next
   */
  constructor(val, next) {
    this.val = val;
    this.next = next;
  }
}

/**
 * 寻找倒数第k个节点
 * @param {Node} head 初始节点
 * @param {Number} k 顺序(倒数)
 */
function FindKthToTail(head, k) {
  if (!head || k <= 0) {
    return null;
  }

  let a = head,
    b = head;

  for (let i = 0; i < k; ++i) {
    a = a.next;
    if (!a) {
      if (i === k - 1) {
        break;
      } else {
        return null;
      }
    }
  }

  while (a) {
    b = b.next;
    a = a.next;
  }

  return b;
}

/**
 * 以下是测试代码
 */
let node3 = new ListNode(3, null),
  node2 = new ListNode(2, node3),
  node1 = new ListNode(1, node2),
  head = new ListNode(0, node1);

console.log(FindKthToTail(head, 2));
console.log(FindKthToTail(head, 4));
console.log(FindKthToTail(head, 5));
```
