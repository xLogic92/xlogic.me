---
title: '前端知识体系之基础知识 - 浏览器: API'
date: '2019-08-06'
keyword: '前端知识体系,基础知识,浏览器,API'
tags: ['前端知识体系', '基础知识', '浏览器']
slug: '2019-08-06-explorer-api'
---

## 1. DOM API

DOM API 是最早被设计出来的一批 API，也是用途最广的 API，所以早年的技术社区，常常用 DOM 来泛指浏览器中所有的 API。不过今天这里我们要介绍的 DOM，指的就是狭义的文档对象模型。

首先我们先来讲一讲什么叫做文档对象模型。

顾名思义，文档对象模型是用来描述文档，这里的文档，是特指 HTML 文档（也用于 XML 文档，但是本文不讨论 XML）。同时它又是一个“对象模型”，这意味着它使用的是对象这样的概念来描述 HTML 文档。

说起 HTML 文档，这是大家最熟悉的东西了，我们都知道，HTML 文档是一个由标签嵌套而成的树形结构，因此，DOM 也是使用树形的对象模型来描述一个 HTML 文档。

DOM API 大致会包含 4 个部分。

- 节点：DOM 树形结构中的节点相关 API。
- 事件：触发和监听事件相关 API。
- Range：操作文字范围相关 API。
- 遍历：遍历 DOM 需要的 API。

DOM API 数量很多，我希望给你提供一个理解 DOM API 设计的思路，避免单靠机械的方式去死记硬背。

### 1.1 节点

DOM 的树形结构所有的节点有统一的接口 Node，我们按照继承关系，给你介绍一下节点的类型。

![img](https://static001.geekbang.org/resource/image/6e/f6/6e278e450d8cc7122da3616fd18b9cf6.png)

在这些节点中，除了 Document 和 DocumentFrangment，都有与之对应的 HTML 写法，我们可以看一下。

```html
Element: <tagname>...</tagname> Text: text Comment:
<!-- comments -->
DocumentType: <!DOCTYPE html> ProcessingInstruction:
<?a 1?>
```

我们在编写 HTML 代码并且运行后，就会在内存中得到这样一棵 DOM 树，HTML 的写法会被转化成对应的文档模型，而我们则可以通过 JavaScript 等语言去访问这个文档模型。

这里我们每天都需要用到，要重点掌握的是：Document、Element、Text 节点。

DocumentFragment 也非常有用，它常常被用来高性能地批量添加节点。因为 Comment、DocumentType 和 ProcessingInstruction 很少需要运行时去修改和操作，所以有所了解即可。

#### 1.1.1 Node

Node 是 DOM 树继承关系的根节点，它定义了 DOM 节点在 DOM 树上的操作，首先，Node 提供了一组属性，来表示它在 DOM 树中的关系，它们是：

- parentNode
- childNodes
- firstChild
- lastChild
- nextSibling
- previousSibling

从命名上，我们可以很清晰地看出，这一组属性提供了前、后、父、子关系，有了这几个属性，我们可以很方便地根据相对位置获取元素。当然，Node 中也提供了操作 DOM 树的 API，主要有下面几种。

- appendChild
- insertBefore
- removeChild
- replaceChild

这个命名跟上面一样，我们基本可以知道 API 的作用。这几个 API 的设计可以说是饱受诟病。其中最主要的批评是它不对称——只有 before，没有 after，而 jQuery 等框架都对其做了补充。

实际上，appendChild 和 insertBefore 的这个设计，是一个“最小原则”的设计，这两个 API 是满足插入任意位置的必要 API，而 insertAfter，则可以由这两个 API 实现出来。

我个人其实不太喜欢这个设计，对我而言，insertAt(pos) 更符合审美一些。当然，不论喜不喜欢，这个标准已经确定，我们还是必须要掌握它。

这里从设计的角度还想要谈一点，那就是，所有这几个修改型的 API，全都是在父元素上操作的，比如我们要想实现“删除一个元素的上一个元素”，必须要先用 parentNode 获取其父元素。

这样的设计是符合面向对象的基本原则的。还记得我们在 JavaScript 对象部分讲的对象基本特征吗？“拥有哪些子元素”是父元素的一种状态，所以修改状态，应该是父元素的行为。这个设计我认为是 DOM API 中好的部分。

到此为止，Node 提供的 API 已经可以很方便（大概吧）地对树进行增、删、遍历等操作了。

除此之外，Node 还提供了一些高级 API，我们来认识一下它们。

- compareDocumentPosition 是一个用于比较两个节点中关系的函数。
- contains 检查一个节点是否包含另一个节点的函数。
- isEqualNode 检查两个节点是否完全相同。
- isSameNode 检查两个节点是否是同一个节点，实际上在 JavaScript 中可以用“===”。
- cloneNode 复制一个节点，如果传入参数 true，则会连同子元素做深拷贝。

DOM 标准规定了节点必须从文档的 create 方法创建出来，不能够使用原生的 JavaScript 的 new 运算。于是 document 对象有这些方法。

- createElement
- createTextNode
- createCDATASection
- createComment
- createProcessingInstruction
- createDocumentFragment
- createDocumentType

上面的这些方法都是用于创建对应的节点类型。你可以自己尝试一下。

#### 1.1.2 Element 与 Attribute

Node 提供了树形结构上节点相关的操作。而大部分时候，我们比较关注的是元素。Element 表示元素，它是 Node 的子类。

元素对应了 HTML 中的标签，它既有子节点，又有属性。所以 Element 子类中，有一系列操作属性的方法。

我们需要注意，对 DOM 而言，Attribute 和 Property 是完全不同的含义，只有特性场景下，两者才会互相关联。

首先，我们可以把元素的 Attribute 当作字符串来看待，这样就有以下的 API：

- getAttribute
- setAttribute
- removeAttribute
- hasAttribute

如果你追求极致的性能，还可以把 Attribute 当作节点：

- getAttributeNode
- setAttributeNode

此外，如果你喜欢 property 一样的访问 attribute，还可以使用 attributes 对象，比如 document.body.attributes.class = “a” 等效于 document.body.setAttribute(“class”, “a”)。

#### 1.1.3 查找元素

document 节点提供了查找元素的能力。比如有下面的几种。

- querySelector
- querySelectorAll
- getElementById
- getElementsByName
- getElementsByTagName
- getElementsByClassName

我们需要注意，getElementById、getElementsByName、getElementsByTagName、getElementsByClassName，这几个 API 的性能高于 querySelector。

而 getElementsByName、getElementsByTagName、getElementsByClassName 获取的集合并非数组，而是一个能够动态更新的集合。

我们看一个例子：

```javascript
var collection = document.getElementsByClassName('test');
console.log(collection.length);
var test = document.createElement('div');
test.setAttribute('class', 'test');
document.documentElement.appendChild(test);
console.log(collection.length);
```

在这段代码中，我们先获取了页面的 className 为 test 的元素集合，不出意外的话，应该是空。

我们通过 console.log 可以看到集合的大小为 0。之后我们添加了一个 class 为 test 的 div，这时候我们再看集合，可以发现，集合中出现了新添加的元素。

这说明浏览器内部是有高速的索引机制，来动态更新这样的集合的。所以，尽管 querySelector 系列的 API 非常强大，我们还是应该尽量使用 getElement 系列的 API。

### 1.2 事件

#### 1.2.1 事件概述

在开始接触具体的 API 之前，我们要先了解一下事件。一般来说，事件来自输入设备，我们平时的个人设备上，输入设备有三种：

- 键盘；
- 鼠标；
- 触摸屏。

**这其中，触摸屏和鼠标又有一定的共性，它们被称作 pointer 设备，所谓 pointer 设备，是指它的输入最终会被抽象成屏幕上面的一个点。**但是触摸屏和鼠标又有一定区别，它们的精度、反应时间和支持的点的数量都不一样。

我们现代的 UI 系统，都源自 WIMP 系统。WIMP 即 Window Icon Menu Pointer 四个要素，它最初由施乐公司研发，后来被微软和苹果两家公司应用在了自己的操作系统上。

WIMP 是如此成功，以至于今天很多的前端工程师会有一个观点，认为我们能够“点击一个按钮”，实际上并非如此，我们只能够点击鼠标上的按钮或者触摸屏，是操作系统和浏览器把这个信息对应到了一个逻辑上的按钮，再使得它的视图对点击事件有反应。这就引出了我们第一个要讲解的机制：捕获与冒泡。

#### 1.2.2 捕获与冒泡

很多文章会讲到捕获过程是从外向内，冒泡过程是从内向外，但是这里我希望讲清楚，为什么会有捕获过程和冒泡过程。

我们刚提到，实际上点击事件来自触摸屏或者鼠标，鼠标点击并没有位置信息，但是一般操作系统会根据位移的累积计算出来，跟触摸屏一样，提供一个坐标给浏览器。

那么，把这个坐标转换为具体的元素上事件的过程，就是捕获过程了。而冒泡过程，则是符合人类理解逻辑的：当你按电视机开关时，你也按到了电视机。

所以我们可以认为，捕获是计算机处理事件的逻辑，而冒泡是人类处理事件的逻辑。

以下代码展示了事件传播顺序：

```html
<body>
  <input id="i" />
</body>
```

```javascript
document.body.addEventListener(
  'mousedown',
  () => {
    console.log('key1');
  },
  true
);

document.getElementById('i').addEventListener(
  'mousedown',
  () => {
    console.log('key2');
  },
  true
);

document.body.addEventListener(
  'mousedown',
  () => {
    console.log('key11');
  },
  false
);

document.getElementById('i').addEventListener(
  'mousedown',
  () => {
    console.log('key22');
  },
  false
);
```

我们监听了 body 和一个 body 的子元素上的鼠标按下事件，捕获和冒泡分别监听，可以看到，最终产生的顺序是：

- “key1”
- “key2”
- “key22”
- “key11”

这是捕获和冒泡发生的完整顺序。

在一个事件发生时，捕获过程跟冒泡过程总是先后发生，跟你是否监听毫无关联。

在我们实际监听事件时，我建议这样使用冒泡和捕获机制：默认使用冒泡模式，当开发组件时，遇到需要父元素控制子元素的行为，可以使用捕获机制。

理解了冒泡和捕获的过程，我们再看监听事件的 API，就非常容易理解了。

addEventListener 有三个参数：

- 事件名称；
- 事件处理函数；
- 捕获还是冒泡。

事件处理函数不一定是函数，也可以是个 JavaScript 具有 handleEvent 方法的对象，看下例子：

```javascript
var o = {
  handleEvent: (event) => console.log(event)
};
document.body.addEventListener('keydown', o, false);
```

第三个参数不一定是 bool 值，也可以是个对象，它提供了更多选项。

- once：只执行一次。
- passive：承诺此事件监听不会调用 preventDefault，这有助于性能。
- useCapture：是否捕获（否则冒泡）。

实际使用，在现代浏览器中，还可以不传第三个参数，我建议默认不传第三个参数，因为我认为冒泡是符合正常的人类心智模型的，大部分业务开发者不需要关心捕获过程。除非你是组件或者库的使用者，那就总是需要关心冒泡和捕获了。

#### 1.2.3 焦点

我们讲完了 pointer 事件是由坐标控制，而我们还没有讲到键盘事件。

键盘事件是由焦点系统控制的，一般来说，操作系统也会提供一套焦点系统，但是现代浏览器一般都选择在自己的系统内覆盖原本的焦点系统。

焦点系统也是视障用户访问的重要入口，所以设计合理的焦点系统是非常重要的产品需求，尤其是不少国家对可访问性有明确的法律要求。

在旧时代，有一个经典的问题是如何去掉输入框上的虚线框，这个虚线框就是 Windows 焦点系统附带的 UI 表现。

现在 Windows 的焦点已经不是用虚线框表示了，但是焦点系统的设计几十年间没有太大变化。

焦点系统认为整个 UI 系统中，有且仅有一个“聚焦”的元素，所有的键盘事件的目标元素都是这个聚焦元素。

Tab 键被用来切换到下一个可聚焦的元素，焦点系统占用了 Tab 键，但是可以用 JavaScript 来阻止这个行为。

浏览器 API 还提供了 API 来操作焦点，如：

```javascript
document.body.focus(); // 赋予焦点
document.body.blur(); // 移开焦点
```

其实原本键盘事件不需要捕获过程，但是为了跟 pointer 设备保持一致，也规定了从外向内传播的捕获过程。

#### 1.2.4 自定义事件

除了来自输入设备的事件，还可以自定义事件，实际上事件也是一种非常好的代码架构，但是 DOM API 中的事件并不能用于普通对象，所以很遗憾，我们只能在 DOM 元素上使用自定义事件。

自定义事件的代码示例如下（来自 MDN）：

```javascript
var evt = new Event('look', { bubbles: true, cancelable: false });
document.dispatchEvent(evt);
```

这里使用 Event 构造器来创造了一个新的事件，然后调用 dispatchEvent 来在特定元素上触发。

我们可以给这个 Event 添加自定义属性、方法。

注意，这里旧的自定义事件方法（使用 document.createEvent 和 initEvent）已经被废弃。

### 1.3 Range

Range API 是一个比较专业的领域，如果不做富文本编辑类的业务，不需要太深入。这里我们就仅介绍概念和给出基本用法的示例，你只要掌握即可。

Range API 表示一个 HTML 上的范围，这个范围是以文字为最小单位的，所以 Range 不一定包含完整的节点，它可能是 Text 节点中的一段，也可以是头尾两个 Text 的一部分加上中间的元素。

我们通过 Range API 可以比节点 API 更精确地操作 DOM 树，凡是 节点 API 能做到的，Range API 都可以做到，而且可以做到更高性能，但是 Range API 使用起来比较麻烦，所以在实际项目中，并不常用，只有做底层框架和富文本编辑对它有强需求。

创建 Range 一般是通过设置它的起止来实现，我们可以看一个例子：

```javascript
var range = new Range(),
  firstText = p.childNodes[1],
  secondText = em.firstChild;
range.setStart(firstText, 9); // do not forget the leading space
range.setEnd(secondText, 4);
```

此外，通过 Range 也可以从用户选中区域创建，这样的 Range 用于处理用户选中区域:

```javascript
var range = document.getSelection().getRangeAt(0);
```

更改 Range 选中区段内容的方式主要是取出和插入，分别由 extractContents 和 insertNode 来实现。

```javascript
var fragment = range.extractContents();
range.insertNode(document.createTextNode('aaaa'));
```

### 1.4 遍历

前面已经提到过，通过 Node 的相关属性，我们可以用 JavaScript 遍历整个树。实际上，DOM API 中还提供了 NodeIterator 和 TreeWalker 来遍历树。

比起直接用属性来遍历，NodeIterator 和 TreeWalker 提供了过滤功能，还可以把属性节点也包含在遍历之内。

NodeIterator 的基本用法示例如下：

```javascript
var iterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT, null, false);
var node;
while ((node = iterator.nextNode())) {
  console.log(node);
}
```

这个 API 的设计非常老派，这么讲的原因主要有两点，一是循环并没有类似“hasNext”这样的方法，而是直接以 nextNode 返回 null 来标志结束，二是第二个参数是掩码，这两个设计都是传统 C 语言里比较常见的用法。

放到今天看，这个迭代器无法匹配 JavaScript 的迭代器语法，而且 JavaScript 位运算并不高效，掩码的设计就徒增复杂性了。

这里请你注意一下这个例子中的处理方法，通常掩码型参数，我们都是用按位或运算来叠加。而针对这种返回 null 表示结束的迭代器，我使用了在 while 循环条件中赋值，来保证循环次数和调用 next 次数严格一致（但这样写可能违反了某些编码规范）。

我们再来看一下 TreeWalker 的用法。

```javascript
var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null, false);
var node;
while ((node = walker.nextNode())) {
  if (node.tagName === 'p') node.nextSibling();
  console.log(node);
}
```

比起 NodeIterator，TreeWalker 多了在 DOM 树上自由移动当前节点的能力，一般来说，这种 API 用于“跳过”某些节点，或者重复遍历某些节点。

总的来说，我个人不太喜欢 TreeWalker 和 NodeIterator 这两个 API，建议需要遍历 DOM 的时候，直接使用递归和 Node 的属性。

## 2. CSSOM API

我想，你在最初接触浏览器 API 的时候，应该都有跟我类似的想法：“好想要 element.width、element.height 这样的 API 啊”。

这样的 API 可以直接获取元素的显示相关信息，它们是非常符合人的第一印象直觉的设计，但是，偏偏 DOM API 中没有这样的内容。

随着学习的深入，我才知道，这样的设计是有背后的逻辑的，正如 HTML 和 CSS 分别承担了语义和表现的分工，DOM 和 CSSOM 也有语义和表现的分工。

DOM 中的所有的属性都是用来表现语义的属性，CSSOM 的则都是表现的属性，width 和 height 这类显示相关的属性，都属于我们今天要讲的 CSSOM。

顾名思义，CSSOM 是 CSS 的对象模型，在 W3C 标准中，它包含两个部分：描述样式表和规则等 CSS 的模型部分（CSSOM），和跟元素视图相关的 View 部分（CSSOM View）。

在实际使用中，CSSOM View 比 CSSOM 更常用一些，因为我们很少需要用代码去动态地管理样式表。

### 1.1 CSSOM

首先我们来介绍下 CSS 中样式表的模型，也就是 CSSOM 的本体。

我们通常创建样式表也都是使用 HTML 标签来做到的，我们用 style 标签和 link 标签创建样式表，例如：

```html
<style title="Hello">
  a {
    color: red;
  }
</style>
<link rel="stylesheet" title="x" href="data:text/css,p%7Bcolor:blue%7D" />
```

我们创建好样式表后，还有可能要对它进行一些操作。如果我们以 DOM 的角度去理解的话，这些标签在 DOM 中是一个节点，它们有节点的内容、属性，这两个标签中，CSS 代码有的在属性、有的在子节点。这两个标签也遵循 DOM 节点的操作规则，所以可以使用 DOM API 去访问。

但是，这样做的后果是我们需要去写很多分支逻辑，并且，要想解析 CSS 代码结构也不是一件简单的事情，所以，这种情况下，我们直接使用 CSSOM API 去操作它们生成的样式表，这是一个更好的选择。

我们首先了解一下 CSSOM API 的基本用法，一般来说，我们需要先获取文档中所有的样式表：

```javascript
document.styleSheets;
```

document 的 styleSheets 属性表示文档中的所有样式表，这是一个只读的列表，我们可以用方括号运算符下标访问样式表，也可以使用 item 方法来访问，它有 length 属性表示文档中的样式表数量。

样式表只能使用 style 标签或者 link 标签创建，我们虽然无法用 CSSOM API 来创建样式表，但是我们可以修改样式表中的内容。

```javascript
document.styleSheets[0].insertRule('p { color:pink; }', 0);
document.styleSheets[0].removeRule(0);
```

更进一步，我们可以获取样式表中特定的规则（Rule），并且对它进行一定的操作，具体来说，就是使用它的 cssRules 属性来实现：

```javascript
document.styleSheets[0].cssRules;
```

这里取到的规则列表，同样是支持 item、length 和下标运算。

不过，这里的 Rules 可就没那么简单了，它可能是 CSS 的 at-rule，也可能是普通的样式规则。不同的 rule 类型，具有不同的属性。

我们在 CSS 语法部分，已经为你整理过 at-rule 的完整列表，多数 at-rule 都对应着一个 rule 类型：

- CSSStyleRule
- CSSCharsetRule
- CSSImportRule
- CSSMediaRule
- CSSFontFaceRule
- CSSPageRule
- CSSNamespaceRule
- CSSKeyframesRule
- CSSKeyframeRule
- CSSSupportsRule

具体的规则支持的属性，建议你可以用到的时候，再去查阅 MDN 或者 W3C 的文档，在我们的文章中，仅为你详细介绍最常用的 CSSStyleRule。

CSSStyleRule 有两个属性：selectorText 和 style，分别表示一个规则的选择器部分和样式部分。

selector 部分是一个字符串，这里显然偷懒了没有设计进一步的选择器模型，我们按照选择器语法设置即可。

style 部分是一个样式表，它跟我们元素的 style 属性是一样的类型，所以我们可以像修改内联样式一样，直接改变属性修改规则中的具体 CSS 属性定义，也可以使用 cssText 这样的工具属性。

此外，CSSOM 还提供了一个非常重要的方法，来获取一个元素最终经过 CSS 计算得到的属性：

```javascript
window.getComputedStyle(elt, pseudoElt);
```

其中第一个参数就是我们要获取属性的元素，第二个参数是可选的，用于选择伪元素。

好了，到此为止，我们可以使用 CSSOM API 自由地修改页面已经生效的样式表了。接下来，我们来一起关注一下视图的问题。

### 1.2 CSSOM View

CSSOM View 这一部分的 API，可以视为 DOM API 的扩展，它在原本的 Element 接口上，添加了显示相关的功能，这些功能，又可以分成三个部分：窗口部分，滚动部分和布局部分，下面我来分别带你了解一下。

#### 1.2.1 窗口 API

窗口 API 用于操作浏览器窗口的位置、尺寸等。

- moveTo(x, y) 窗口移动到屏幕的特定坐标；
- moveBy(x, y) 窗口移动特定距离；
- resizeTo(x, y) 改变窗口大小到特定尺寸；
- resizeBy(x, y) 改变窗口大小特定尺寸。

此外，窗口 API 还规定了 window.open() 的第三个参数：

```javascript
window.open('about:blank', '_blank', 'width=100,height=100,left=100,right=100');
```

一些浏览器出于安全考虑没有实现，也不适用于移动端浏览器，这部分你仅需简单了解即可。下面我们来了解一下滚动 API。

#### 1.2.2 滚动 API

要想理解滚动，首先我们必须要建立一个概念，在 PC 时代，浏览器可视区域的滚动和内部元素的滚动关系是比较模糊的，但是在移动端越来越重要的今天，两者必须分开看待，两者的性能和行为都有区别。

##### 视口滚动 API

可视区域（视口）滚动行为由 window 对象上的一组 API 控制，我们先来了解一下：

- scrollX 是视口的属性，表示 X 方向上的当前滚动距离，有别名 pageXOffset；
- scrollY 是视口的属性，表示 Y 方向上的当前滚动距离，有别名 pageYOffset；
- scroll(x, y) 使得页面滚动到特定的位置，有别名 scrollTo，支持传入配置型参数 {top, left}；
- scrollBy(x, y) 使得页面滚动特定的距离，支持传入配置型参数 {top, left}。

通过这些属性和方法，我们可以读取视口的滚动位置和操纵视口滚动。不过，要想监听视口滚动事件，我们需要在 document 对象上绑定事件监听函数：

```javascript
document.addEventListener('scroll', function(event) {
  //......
});
```

视口滚动 API 是页面的顶层容器的滚动，大部分移动端浏览器都会采用一些性能优化，它和元素滚动不完全一样，请大家一定建立这个区分的意识。

##### 元素滚动 API

接下来我们来认识一下元素滚动 API，在 Element 类（参见 DOM 部分），为了支持滚动，加入了以下 API。

- scrollTop 元素的属性，表示 Y 方向上的当前滚动距离。
- scrollLeft 元素的属性，表示 X 方向上的当前滚动距离。
- scrollWidth 元素的属性，表示元素内部的滚动内容的宽度，一般来说会大于等于元素宽度。
- scrollHeight 元素的属性，表示元素内部的滚动内容的高度，一般来说会大于等于元素高度。
- scroll(x, y) 使得元素滚动到特定的位置，有别名 scrollTo，支持传入配置型参数 {top, left}。
- scrollBy(x, y) 使得元素滚动特定的距离，支持传入配置型参数 {top, left}。
- scrollIntoView(arg) 滚动元素所在的父元素，使得元素滚动到可见区域，可以通过 arg 来指定滚到中间、开始或者就近。

除此之外，可滚动的元素也支持 scroll 事件，我们在元素上监听它的事件即可：

```javascript
element.addEventListener('scroll', function(event) {
  //......
});
```

这里你需要注意一点，元素部分的 API 设计与视口滚动命名风格上略有差异，你在使用的时候不要记混。

#### 1.2.3 布局 API

最后我们来介绍一下布局 API，这是整个 CSSOM 中最常用到的部分，我们同样要分成全局 API 和元素上的 API。

##### 全局尺寸信息

window 对象上提供了一些全局的尺寸信息，它是通过属性来提供的，我们一起来了解一下来这些属性。

![img](https://static001.geekbang.org/resource/image/b6/10/b6c7281d86eb7214edf17069f95ae610.png)

- window.innerHeight, window.innerWidth 这两个属性表示视口的大小。
- window.outerWidth, window.outerHeight 这两个属性表示浏览器窗口占据的大小，很多浏览器没有实现，一般来说这两个属性无关紧要。
- window.devicePixelRatio 这个属性非常重要，表示物理像素和 CSS 像素单位的倍率关系，Retina 屏这个值是 2，后来也出现了一些 3 倍的 Android 屏。
- window.screen （屏幕尺寸相关的信息）
  - window.screen.width, window.screen.height 设备的屏幕尺寸。
  - window.screen.availWidth, window.screen.availHeight 设备屏幕的可渲染区域尺寸，一些 Android 机器会把屏幕的一部分预留做固定按钮，所以有这两个属性，实际上一般浏览器不会实现的这么细致。
  - window.screen.colorDepth, window.screen.pixelDepth 这两个属性是固定值 24，应该是为了以后预留。

虽然 window 有这么多相关信息，在我看来，我们主要使用的是 innerHeight、innerWidth 和 devicePixelRatio 三个属性，因为我们前端开发工作只需要跟视口打交道，其它信息大概了解即可。

##### 元素的布局信息

我们是否能够取到一个元素的宽（width）和高（height）呢？

实际上，我们首先应该从脑中消除“元素有宽高”这样的概念，我们文中已经多次提到了，有些元素可能产生多个盒，事实上，只有盒有宽和高，元素是没有的。

所以我们获取宽高的对象应该是“盒”，于是 CSSOM View 为 Element 类添加了两个方法：

- getClientRects();
- getBoundingClientRect()。

getClientRects 会返回一个列表，里面包含元素对应的每一个盒所占据的客户端矩形区域，这里每一个矩形区域可以用 x, y, width, height 来获取它的位置和尺寸。

getBoundingClientRect ，这个 API 的设计更接近我们脑海中的元素盒的概念，它返回元素对应的所有盒的包裹的矩形区域，需要注意，这个 API 获取的区域会包括当 overflow 为 visible 时的子元素区域。

根据实际的精确度需要，我们可以选择何时使用这两个 API。

这两个 API 获取的矩形区域都是相对于视口的坐标，这意味着，这些区域都是受滚动影响的。

如果我们要获取相对坐标，或者包含滚动区域的坐标，需要一点小技巧：

```javascript
var offsetX = document.documentElement.getBoundingClientRect().x - element.getBoundingClientRect().x;
```

如这段代码所示，我们只需要获取文档根节点的位置，再相减即可得到它们的坐标。

这两个 API 的兼容性非常好，定义又非常清晰，建议你如果是用 JavaScript 实现视觉效果时，尽量使用这两个 API。
