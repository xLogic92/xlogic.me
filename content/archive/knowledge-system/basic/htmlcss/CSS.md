---
title: "前端知识体系之基础知识 - CSS: 语言和功能"
date: "2019-08-04"
keyword: "前端知识体系,基础知识,CSS,语言和功能"
tags: ["前端知识体系","基础知识","CSS"]
slug: "2019-08-04-css"
---

## 1. @rule

CSS 的顶层样式表由两种规则组成的规则列表构成，一种被称为 at-rule，也就是 at 规则，另一种是 qualified rule，也就是普通规则。

at-rule 由一个 @ 关键字和后续的一个区块组成，如果没有区块，则以分号结束。

- **@charset**

  @charset 用于提示 CSS 文件使用的字符编码方式，它如果被使用，必须出现在最前面。这个规则只在给出语法解析阶段前使用，并不影响页面上的展示效果。

  ```css
  @charset "utf-8";
  ```

- **@import**

  @import 用于引入一个 CSS 文件，除了 @charset 规则不会被引入，@import 可以引入另一个文件的全部内容。

  ```CSS
  @import "mystyle.css";
  @import url("mystyle.css");
  ```

  ```css
  @import [ <url> | <string> ] [ supports(
      [ <supports-condition> | <declaration> ]
    ) ]? <media-query-list>?;
  ```

  通过代码，我们可以看出，import 还支持 supports 和 media query 形式。

- **@media**

  media 就是大名鼎鼎的 media query 使用的规则了，它能够对设备的类型进行一些判断。在 media 的区块内，是普通规则列表。

  ```CSS
  @media print {
      body { font-size: 10pt }
  }
  ```

- **@page**

  page 用于分页媒体访问网页时的表现设置，页面是一种特殊的盒模型结构，除了页面本身，还可以设置它周围的盒。

  ```CSS
  @page {
    size: 8.5in 11in;
    margin: 10%;
  
    @top-left {
      content: "Hamlet";
    }
    @top-right {
      content: "Page " counter(page);
    }
  }
  ```

- **@ counter-style**

  counter-style 产生一种数据，用于定义列表项的表现。

  ```css
  @counter-style triangle {
    system: cyclic;
    symbols: ‣;
    suffix: " ";
  }
  ```

- **@ key-frames**

  keyframes 产生一种数据，用于定义动画关键帧。

  ```css
  @keyframes diagonal-slide {
    from {
      left: 0;
      top: 0;
    }
  
    to {
      left: 100px;
      top: 100px;
    }
  }
  ```

- **@ fontface**

  fontface 用于定义一种字体，icon font 技术就是利用这个特性来实现的。

  ```css
  @font-face {
    font-family: Gentium;
    src: url(http://example.com/fonts/Gentium.woff);
  }
  
  p {
    font-family: Gentium, serif;
  }
  ```

- **@ support**

  support 检查环境的特性，它与 media 比较类似。

- **@ namespace**

  用于跟 XML 命名空间配合的一个规则，表示内部的 CSS 选择器全都带上特定命名空间。

- **@ viewport**

  用于设置视口的一些特性，不过兼容性目前不是很好，多数时候被 HTML 的 meta 代替。

## 2. 选择器

qualified rule 主要是由选择器和声明区块构成。声明区块又由属性和值构成。

### 2.1 选择器的分类

- 简单选择器：针对某一特征判断是否选中元素。

  - 类型选择器和全体选择器

    类型选择器，它根据一个元素的标签名来选中元素。

    这里有一个特殊的选择器，就是“ \* ” ，它称为全体选择器，可以选中任意元素。它的用法跟类型选择器是完全一致的。

    ```css
    div {
    }
    * {
    }
    ```

  - id 选择器与 class 选择器

    id 选择器和 class 选择器都是针对特定属性的选择器。id 选择器是“#”号后面跟随 id 名，class 选择器是“.”后面跟随 class 名。我们来看看基本用法：

    ```css
    #myid {
      stroke: blue;
      stroke-width: 1;
    }
    
    .mycls {
      font-size: 40px;
    }
    ```

  - 属性选择器

    属性选择器根据 HTML 元素的属性来选中元素。属性选择器有四种形态。

    - [att]：直接在方括号中放入属性名，是检查元素是否具有这个属性，只要元素有这个属性，不论属性是什么值，都可以被选中。
    - [att=val]：精确匹配，检查一个元素属性的值是否是 val。
    - [att~=val]：多种匹配，检查一个元素的值是否是若干值之一，这里的 val 不是一个单一的值了，可以是用空格分隔的一个序列。
    - [att|=val]：开头匹配，检查一个元素的值是否是以 val 开头，它跟精确匹配的区别是属性只要以 val 开头即可，后面内容不管。

    有些 HTML 属性含有特殊字符，这个时候，可以把 val 用引号括起来，形成一个 CSS 字符串。CSS 字符串允许使用单双引号来规避特殊字符，也可以用反斜杠转义，这样，就可以表示出任意属性值啦。

  - 伪类选择器

- 复合选择器：连续写在一起的简单选择器，针对元素自身特征选择单个元素。

- 复杂选择器：由“（空格）”“ >”“ ~”“ +”“ ||”等符号连接的复合选择器，根据父元素或者前序元素检查单个元素。

- 选择器列表：由逗号分隔的复杂选择器，表示“或”的关系。

### 2.2 伪类选择器和伪元素

#### 2.2.1 伪类选择器

伪类选择器是一系列由 CSS 规定好的选择器，它们以冒号开头。伪类选择器有普通型和函数型两种。

- 树结构关系伪类选择器

  :root 伪类表示树的根元素，在选择器是针对完整的 HTML 文档情况，我们一般用 HTML 标签即可选中根元素。但是随着 scoped css 和 shadow root 等场景出现，选择器可以针对某一子树来选择，这时候就很需要 root 伪类了。

  - :empty 伪类表示没有子节点的元素，这里有个例外就是子节点为空白文本节点的情况。

  - :nth-child 和 :nth-last-child 这是两个函数型的伪类，CSS 的 An+B 语法设计的是比较复杂的，我们这里仅仅介绍基本用法。我们还是看几个例子：

    | 选择器                           | 效果                                                         |
    | -------------------------------- | ------------------------------------------------------------ |
    | :nth-child(even)                 | 选中偶数节点                                                 |
    | :nth-child(4n-1)                 | 选中第 3 个、第 7 个、第 11 个这样符合 4 的倍数减一的数字    |
    | :nth-child(3n+1 of li.important) | 选中第 1 个、第 4 个、第 7 个 li.important，注意这里只有 li.important 会被计数 |

  - :nth-last-child 的区别仅仅是从后往前数。

  - :first-child :last-child 分别表示第一个和最后一个元素。

  - :only-child 按字面意思理解即可，选中唯一一个子元素。

  of-type 系列，是一个变形的语法糖，S:nth-of-type(An+B) 是:nth-child(|An+B| of S) 的另一种写法。

  以此类推，还有 nth-last-of-type、first-of-type、last-of-type、only-of-type。

- 链接与行为伪类选择器

  链接与行为是第一批设计出来的伪类，也是最常用的一批。

  - :any-link 表示任意的链接，包括 a、area 和 link 标签都可能匹配到这个伪类。
  - :link 表示未访问过的链接， :visited 表示已经访问过的链接。
  - :hover 表示鼠标悬停在上的元素。
  - :active 表示用户正在激活这个元素，如用户按下按钮，鼠标还未抬起时，这个按钮就处于激活状态。
  - :focus 表示焦点落在这个元素之上。
  - :target 用于选中浏览器 URL 的 hash 部分所指示的元素。

  在 Selector Level 4 草案中，还引入了 target-within、focus-within 等伪类，用于表示 target 或者 focus 的父容器。

- 逻辑伪类选择器

  我们这里介绍一个逻辑伪类 —— :not 伪类。

  这个伪类是个函数型伪类，它的作用时选中内部的简单选择器命中的元素。

  ```css
  *|*: not(: hover);
  ```

  选择器 3 级标准中，not 只支持简单选择器，在选择器 4 级标准，则允许 not 接受一个选择器列表，这意味着选择器支持嵌套，仅靠 not 即可完成选择器的一阶真值逻辑完备，但目前还没有看到浏览器实现它。

  在 Selector Level 4 草案中，还引入了:is :where :has 等逻辑伪类，但是它们有一些违背了选择器匹配 DOM 树不回溯的原则，所以这部分设计最终的命运如何还不太确定。

- 其它伪类选择器

  还有一些草案中或者不常用的选择器，你仅做大概了解即可。

  - 国际化：用于处理国际化和多语言问题。
    - dir
    - lang
  - 音频 / 视频：用于区分音视频播放状态。
    - play
    - pause
  - 时序：用于配合读屏软件等时序性客户端的伪类。
    - current
    - past
    - future
  - 表格：用于处理 table 的列的伪类。
    - nth-col
    - nth-last-col

伪类是很大的一类简单选择器，它是选择器能力的一种补充。在实际使用中，我还是建议你尽量通过合适的 id 和 class 来标识元素，约束伪类的使用。最好只在不得不使用伪类的场景使用伪类，这对于 CSS 代码的性能和可读性都有好处。

#### 2.2.2 伪元素

之所以没有把伪元素放在简单选择器中，是因为伪元素本身不单单是一种选择规则，它还是一种机制。伪元素的语法跟伪类相似，但是实际产生的效果却是把不存在的元素硬选出来。

目前兼容性达到可用的伪元素有以下几种。

- ::first-line
  - 表示元素的第一行
- ::first-letter
  - 表示元素的第一个字母
- ::before
  - 表示在元素内容之前插入一个虚拟的元素
- ::after
  - 表示在元素内容之后插入

![img](https://static001.geekbang.org/resource/image/6e/48/6e050ee9f7a0b1657388271cceb0c548.png)

CSS 标准只要求 ::first-line 和 ::first-letter 实现有限的几个 CSS 属性，都是文本相关，如上图所示，::before 和 ::after 中支持所有的 CSS 属性。

### 2.3 选择器的组合

根据选择器列表的语法，选择器的连接方式可以理解为像四则运算一样有优先级。

- 第一优先级
  - 无连接符号
- 第二优先级
  - `空格`
  - `~`
  - `+`
  - `>`
  - `||`
- 第三优先级
  - `,`

例如以下选择器：

```css
.c,
.a > .b.d {
  /*......*/
}
```

复合选择器表示简单选择器中“且”的关系，例如，例子中的“ .b.d ”，表示选中的元素必须同时具有 b 和 d 两个 class。

复杂选择器是针对节点关系的选择，它规定了五种连接符号。

- **“空格”**：后代，表示选中所有符合条件的后代节点， 例如“ .a .b ”表示选中所有具有 class 为 a 的后代节点中 class 为 b 的节点。
- **“>”** ：子代，表示选中符合条件的子节点，例如“ .a>.b ”表示：选中所有“具有 class 为 a 的子节点中，class 为 b 的节点”。
- **“~”**: 后继，表示选中所有符合条件的后继节点，后继节点即跟当前节点具有同一个父元素，并出现在它之后的节点，例如“ .a~.b ”表示选中所有具有 class 为 a 的后继中，class 为 b 的节点。
- **“+”**：直接后继，表示选中符合条件的直接后继节点，直接后继节点即 nextSlibling。例如 “.a+.b ”表示选中所有具有 class 为 a 的下一个 class 为 b 的节点。
- **“||”**：列选择器，表示选中对应列中符合条件的单元格。

### 2.4 选择器的优先级

CSS 标准用一个三元组 (a, b, c) 来构成一个复杂选择器的优先级。

- id 选择器的数目记为 a；
- 伪类选择器和 class 选择器的数目记为 b；
- 伪元素选择器和标签选择器数目记为 c；
- “\*” 不影响优先级。

CSS 标准建议用一个足够大的进制，获取“ a-b-c ”来表示选择器优先级。

即：

```css
specificity = base * base * a + base * b + c
```

其中，base 是一个“足够大”的正整数。关于 base，历史中有些趣闻，早年 IE6 采用 256 进制，于是就产生“256 个 class 优先级等于一个 id”这样的奇葩问题，后来扩大到 65536，基本避免了类似的问题。

现代浏览器多采用了更大的数量，我们正常编写的 CSS 规则数量不太可能达到数万，因此我们可以认为这样的 base 就足够大了。

行内属性的优先级永远高于 CSS 规则，浏览器提供了一个“口子”，就是在选择器前加上“!import”。

## 3. 单位

声明部分是一个由“属性: 值”组成的序列。

### 3.1 属性

**属性**是由中划线、下划线、字母等组成的标识符，CSS 还支持使用反斜杠转义。我们需要注意的是：属性不允许使用连续的两个中划线开头，这样的属性会被认为是 CSS 变量。

在 CSS Variables 标准中，以双中划线开头的属性被当作变量，与之配合的则是 var 函数：

```css
:root {
  --main-color: #06c;
  --accent-color: #006;
}
/* The rest of the CSS file */
#foo h1 {
  color: var(--main-color);
}
```

### 3.2 值

**值**的部分，主要在标准 CSS Values and Unit，根据每个 CSS 属性可以取到不同的值，这里的值可能是字符串、标识符。

CSS 属性值可能是以下类型：

- CSS 范围的关键字：initial，unset，inherit，任何属性都可以的关键字。
- 字符串：比如 content 属性。
- URL：使用 url() 函数的 URL 值。
- 整数 / 实数：比如 flex 属性。
- 维度：单位的整数 / 实数，比如 width 属性。
- 百分比：大部分维度都支持。
- 颜色：比如 background-color 属性。
- 图片：比如 background-image 属性。
- 2D 位置：比如 background-position 属性。
- 函数：来自函数的值，比如 transform 属性。

## 4. 布局

### 4.1 正常流

#### 4.1.1 正常流的行为

**我们可以用一句话来描述正常流的排版行为，那就是：依次排列，排不下了换行**。这个操作很简单吧，我想，任何一个不懂排版的人都会将其作为排版时的第一反应。

理解了正常流的基本概念，剩下的功能只需要在它的基础上延伸一下就好。

在正常流基础上，我们有 float 相关规则，使得一些盒占据了正常流需要的空间，我们可以把 float 理解为“文字环绕”。

![img](https://static001.geekbang.org/resource/image/af/65/aff7250eac6064158021aea86dd4ac65.png)

我们还有 vertical-align 相关规则规定了如何在垂直方向对齐盒。vertical-align 相关规则看起来复杂，但是实际上，基线、文字顶 / 底、行顶 / 底都是我们正常书写文字时需要用到的概念，只是我们平时不一定会总结它们。

下图展示了在不同的 vertical-align 设置时，盒与文字是如何混合排版的。为了方便你理解，我们用代码给大家标注了基线、文字顶 / 底、行顶 / 底等概念。

![img](https://static001.geekbang.org/resource/image/aa/e3/aa6611b00f71f606493f165294410ee3.png)

除此之外，margin 折叠是很多人非常不理解的一种设计，但是实际上我们可以把 margin 理解为“一个元素规定了自身周围至少需要的空间”，这样，我们就非常容易理解为什么 margin 需要折叠了。

#### 4.1.2 正常流的原理

在 CSS 标准中，规定了如何排布每一个文字或者盒的算法，这个算法依赖一个排版的“当前状态”，CSS 把这个当前状态称为“格式化上下文（formatting context）”。

我们可以认为排版过程是这样的：格式化上下文 + 盒 / 文字 = 位置（formatting context + boxes/charater = positions）。

我们需要排版的盒，是分为块级盒和行内级盒的，所以排版需要分别为它们规定了块级格式化上下文和行内级格式化上下文。

块级格式化上下文顺次排列元素：

![img](https://static001.geekbang.org/resource/image/a5/e7/a5e1b9a77d9745499f96d25cf0a0dbe7.png)

行内级格式化上下文顺次排列元素：

![img](https://static001.geekbang.org/resource/image/1c/cf/1ced4fa809b30343df45e559cf0c08cf.png)

注意，块级和行内级元素的排版，受文字书写方向的影响，这里我们讲上下左右只是为了方便你直观理解。

当我们要把正常流中的一个盒或者文字排版，需要分成三种情况处理。

- **当遇到块级盒**：排入块级格式化上下文。
- **当遇到行内级盒或者文字**：首先尝试排入行内级格式化上下文，如果排不下，那么创建一个行盒，先将行盒排版（行盒是块级，所以到第一种情况），行盒会创建一个行内级格式化上下文。
- **遇到 float 盒**：把盒的顶部跟当前行内级上下文上边缘对齐，然后根据 float 的方向把盒的对应边缘对到块级格式化上下文的边缘，之后重排当前行盒。

我们以上讲的都是一个块级格式化上下文中的排版规则，实际上，页面中的布局没有那么简单，一些元素会在其内部创建新的块级格式化上下文，这些元素有：

- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 非块级但仍能包含块级元素的容器（如 inline-blocks, table-cells, table-captions）
- 块级的能包含块级元素的容器，且属性 overflow 不为 visible

这里的最后一条比较绕，实际上，我个人喜欢用另一种思路去理解它：

自身为块级，且 overflow 为 visible 的块级元素容器，它的块级格式化上下文和外部的块级格式化上下文发生了融合，也就是说，如果不考虑盒模型相关的属性，这样的元素从排版的角度就好像根本不存在。

好了，到这里我们已经讲完了正常流的排版详细规则，但是理解规则仅仅是基础，我们还需要掌握一些技巧。

#### 4.1.3 正常流的使用技巧

现在，我们就一起来动手用实际的例子来研究一下。我们今天来看看等分布局和自适应宽，从这两种经典布局问题入手，一起来探索一下正常流的使用技巧。

##### 等分布局问题

横向等分布局是一个很常见的需求，按照一般的思路，我们可以使用百分比宽度来解决，我们参考以下代码：

```html
<div class="outer">
    <div class="inner"></div>
    <div class="inner"></div>
    <div class="inner"></div>
</div>
```

```css
.inner {
    width:33.33%;
    height:300px;
    display:inline-block;
    outline:solid 1px blue;
}
```

在这段 HTML 代码中，我们放了三个 div，用 CSS 给它们指定了百分比宽度，并且指定为 inline-block。

但是这段代码执行之后，效果跟我们预期不同，我们可以发现，每个 div 并非紧挨，中间有空白，这是因为我们为了代码格式加入的换行和空格被 HTML 当作空格文本，跟 inline 盒混排了的缘故。

解决方案是修改 HTML 代码，去掉空格和换行：

```html
<div class="outer"><div class="inner"></div><div class="inner"></div><div class="inner"></div></div>
```

但是这样做影响了源代码的可读性，一个变通的方案是，改变 outer 中的字号为 0。

```css
.inner {
    width:33.33%;
    height:300px;
    display:inline-block;
    outline:solid 1px blue;
    font-size:30px;
}
.outer {
    font-size:0;
}
```

在某些浏览器中，因为像素计算精度问题，还是会出现换行，我们给 outer 添加一个特定宽度：

```scss
.inner {
    width:33.33%;
    height:300px;
    display:inline-block;
    outline:solid 1px blue;
}
.outer {
    width:101px
}
```

这个代码在某些旧版本浏览器中会出现换行。为了保险起见，我们给最后一个 div 加上一个负的右 margin：

```css
.outer {
    width:101px
}

.inner {
    width:33.33%;
    height:300px;
    display:inline-block;
    outline:solid 1px blue;
}

.inner:last-child {
    margin-right:-5px;
}
```

这样就可以解决旧版本浏览器的问题了。

除了使用 inline-block，float 也可以实现类似的效果，但是 float 元素只能做顶对齐，不如 inline-block 灵活。

##### 自适应宽

我们再来说说自适应宽。在 IE6 统治浏览器市场的旧时代，自适应宽（一个元素固定宽度，另一个元素填满父容器剩余宽度）是个经典的布局问题，我们现在就看一下如何使用正常流来解决。

我们首先来看一下问题。

```html
<div class="outer">
    <div class="fixed"></div>
    <div class="auto"></div>
</div>
```

```css
.fixed {
    width:200px;
}
.fixed, .auto {
    height:300px;
    outline:solid 1px blue;
}
```

这里 fixed 这个 div 宽度已经被指定好，我们需要添加 css 代码尝试让.auto 填满剩余宽度。

使用正常流解决这个问题的思路是，利用负 margin：

```css
.fixed {
    display:inline-block;
    vertical-align:top;
}
.auto {
    margin-left:-200px;
    width:100%;
    display:inline-block;
    vertical-align:top;
}
```

但是，这样做会导致 auto 中的内容位置不对，所以我们还需要使用 padding 把内容挤出来，最终完整代码如下：

```css
.fixed {
    display:inline-block;
    vertical-align:top;
}
.auto {
    margin-left:-200px;
    padding-left:200px;
    box-sizing:border-box;
    width:100%;
    display:inline-block;
    vertical-align:top;
}
```

这样就给 auto 添加了 padding-left 和 box-sizing 两个属性。

总的来说，正常流布局主要是使用 inline-block 来作为内容的容器，利用块级格式化上下文的纵向排布和行内级格式化上下文的横向排布来完成布局的，我们需要根据需求的横向和纵向排布要求，来选择元素的 display 属性。

### 4.2 弹性布局

我们在前面多次讲过，正常流排版的设计来源于数百年来出版行业的排版经验，而 HTML 诞生之初，也确实是作为一种“超文本”存在的。

但是，自上世纪 90 年代以来，Web 标准和各种 Web 应用蓬勃发展，网页的功能逐渐从“文本信息”向着“软件功能”过渡，这个思路的变化导致了：CSS 的正常流逐渐不满足人民群众的需求了。

这是因为文字排版的思路是“改变文字和盒的相对位置，把它放进特定的版面中”，而软件界面的思路则是“改变盒的大小，使得它们的结构保持固定”。

因此，在早年的 CSS 中，“使盒按照外部尺寸变化”的能力非常弱。CSS 三大经典问题：垂直居中问题，两列等高问题，自适应宽问题。这是在其它 UI 系统中最为基本的问题，而到了 CSS 中，却变成了困扰工程师的三座大山。

机智的前端开发者们，曾经创造了各种黑科技来解决问题，包括著名的 table 布局、负 margin、float 与 clear 等等。在这种情况下，Flex 布局被随着 CSS3 一起提出（最初叫 box 布局），可以说是解决了大问题。

React Native 则更为大胆地使用了纯粹的 Flex 排版，不再支持正常流，最终也很好地支持了大量的应用界面布局，这一点也证明了 Flex 排版的潜力。

本节，我们就从设计、原理和应用三个方面来学习一下 Flex 布局，我们先从设计开始。

#### 4.2.1 Flex 的设计

Flex 排版的核心是 display:flex 和 flex 属性，它们配合使用。具有 display:flex 的元素我们称为 flex 容器，它的子元素或者盒被称作 flex 项。

flex 项如果有 flex 属性，会根据 flex 方向代替宽 / 高属性，形成“填补剩余尺寸”的特性，这是一种典型的“根据外部容器决定内部尺寸”的思路，也是我们最常用的 Windows 和 Apple 窗口系统的设计思路。

#### 4.2.2 Flex 的原理

下面我们就来讲解一下，如何实现一个 Flex 布局。

首先，Flex 布局支持横向和纵向，这样我们就需要做一个抽象，我们把 Flex 延伸的方向称为“主轴”，把跟它垂直的方向称为“交叉轴”。这样，flex 项中的 width 和 height 就会称为交叉轴尺寸或者主轴尺寸。

而 Flex 又支持反向排布，这样，我们又需要抽象出交叉轴起点、交叉轴终点、主轴起点、主轴终点，它们可能是 top、left、bottom、right。

Flex 布局中有一种特殊的情况，那就是 flex 容器没有被指定主轴尺寸，这个时候，实际上 Flex 属性完全没有用了，所有 Flex 尺寸都可以被当做 0 来处理，Flex 容器的主轴尺寸等于其它所有 flex 项主轴尺寸之和。

接下来我们开始做 Flex 排版。

**第一步是把 flex 项分行，有 flex 属性的 flex 项可以暂且认为主轴尺寸为 0，所以，它可以一定放进当前行。**

接下来我们把 flex 项逐个放入行，不允许换行的话，我们就“无脑地”把 flex 项放进同一行。允许换行的话，我们就先设定主轴剩余空间为 Flex 容器主轴尺寸，每放入一个就把主轴剩余空间减掉它的主轴尺寸，直到某个 flex 项放不进去为止，换下一行，重复前面动作。

分行过程中，我们会顺便对每一行计算两个属性：交叉轴尺寸和主轴剩余空间，交叉轴尺寸是本行所有交叉轴尺寸的最大值，而主轴剩余空间前面已经说过。

**第二步我们来计算每个 flex 项主轴尺寸和位置。**

如果 Flex 容器是不允许换行的，并且最后主轴尺寸超出了 Flex 容器，就要做等比缩放。

如果 Flex 容器有多行，那么根据我们前面的分行算法，必然有主轴剩余空间，这时候，我们要找出本行所有的带 Flex 属性的 flex 项，把剩余空间按 Flex 比例分给它们即可。

做好之后，我们就可以根据主轴排布方向，确定每个 flex 项的主轴位置坐标了。

如果本行完全没有带 flex 属性的 flex 项，justify-content 机制就要生效了，它的几个不同的值会影响剩余空白如何分配，作为实现者，我们只要在计算 flex 项坐标的时候，加上一个数值即可。

例如，如果是 flex-start 就要加到第一个 flex 项身上，如果是 center 就给第一个 flex 项加一半的尺寸，如果是 space-between，就要给除了第一个以外的每个 flex 项加上“flex 项数减一分之一”。

**第三步我们来计算 flex 项的交叉轴尺寸和位置。**

交叉轴的计算首先是根据 align-content 计算每一行的位置，这部分跟 justify-content 非常类似。

再根据 alignItems 和 flex 项的 alignSelf 来确定每个元素在行内的位置。

计算完主轴和交叉轴，每个 flex 项的坐标、尺寸就都确定了，这样我们就完成了整个的 Flex 布局。

#### 4.2.3 Flex 的应用

接下来我们来尝试用 flex 排版来解决一下当年的 CSS 三大经典问题（简直易如反掌）。

##### 垂直居中

```html
<div id="parent">
  <div id="child">
  </div>
</div>
```

```css
#parent {
  display:flex;
  width:300px;
  height:300px;
  outline:solid 1px;
  justify-content:center;
  align-content:center;
  align-items:center;
}
#child {
  width:100px;
  height:100px;
  outline:solid 1px;
}

```

思路是创建一个只有一行的 flexbox，然后用 align-items:center; 和 justify-content:center; 来保证行位于容器中，元素位于行中。

##### 两列等高

```html
<div class="parent">
  <div class="child" style="height:300px;">
  </div>
  <div class="child">
  </div>
</div>
<br/>
<div class="parent">
  <div class="child" >
  </div>
  <div class="child" style="height:300px;">
  </div>
</div>
```

```css
.parent {
  display:flex;
  width:300px;
  justify-content:center;
  align-content:center;
  align-items:stretch;
}
.child {
  width:100px;
  outline:solid 1px;
}
```

思路是创建一个只有一行的 flexbox，然后用 stretch 属性让每个元素高度都等于行高。

##### 自适应宽

```html
<div class="parent">
  <div class="child1">
  </div>
  <div class="child2">
  </div>
</div>
```

```css
.parent {
  display:flex;
  width:300px;
  height:200px;
  background-color:pink;
}
.child1 {
  width:100px;
  background-color:lightblue;
}
.child2 {
  width:100px;
  flex:1;
  outline:solid 1px;
}
```

这个就是 Flex 设计的基本能力了，给要自适应的元素添加 flex 属性即可。

## 5. 绘制

### 5.1 颜色

首先我们来讲讲颜色，最常见的颜色相关的属性就是 color 和 background-color。

这两个属性没什么好讲的，它们分别表示文字颜色和背景颜色，我们这里重点讲讲颜色值。

#### 5.1.1 RGB 颜色

我们在计算机中，最常见的颜色表示法是 RGB 颜色，**它符合光谱三原色理论：红、绿、蓝三种颜色的光可以构成所有的颜色。**

![img](https://static001.geekbang.org/resource/image/7f/a1/7f5bf39cbe44e36758683a674f9fcfa1.png)

为什么是这三种颜色呢？这跟人类的视神经系统相关，人类的视觉神经分别有对红、绿、蓝三种颜色敏感的类型。

顺便提一下，人类对红色的感觉最为敏感，所以危险信号提示一般会选择红色；而红绿色盲的人，就是红和绿两种神经缺失一种。其它的动物视觉跟人可能不太一样，比如皮皮虾拥有 16 种视锥细胞，所以我猜它们看到的世界一定特别精彩。

现代计算机中用 0 - 255 的数字表示每一种颜色，这正好占据了一个字节，每一个颜色就占据三个字节。

这个数字远远超过了人体的分辨能力，因此，上世纪 90 年代刚推出这样的颜色系统的时候，它被称作真彩色。早年间还有更节约空间，但是精度更低的 8 位色和 16 位色表示法。

红绿蓝三种颜色的光混合起来就是白光，没有光就是黑暗，所以在 RGB 表示法中，三色数值最大表示白色，三色数值为 0 表示黑色。

#### 5.1.2 CMYK 颜色

如果你上过小学美术课，应该听过“红黄蓝”三原色的说法，这好像跟我们说的不太一样。实际上是这样的，颜料显示颜色的原理是它吸收了所有别的颜色的光，只反射一种颜色，所以颜料三原色其实是红、绿、蓝的补色，也就是：品红、黄、青。因为它们跟红、黄、蓝相近，所以有了这样的说法。

![img](https://static001.geekbang.org/resource/image/15/1b/15fefe9f80ec8e1f7bd9ecd223feb61b.png)

在印刷行业，使用的就是这样的三原色（品红、黄、青）来调配油墨，这种颜色的表示法叫做 CMYK，它用一个四元组来表示颜色。

你一定会好奇，为什么它比三原色多了一种，其实答案并不复杂，在印刷行业中，黑色颜料价格最低，而品红、黄、青颜料价格较贵，如果要用三原色调配黑色，经济上是不划算的，所以印刷时会单独指定黑色。

对 CMYK 颜色表示法来说，同一种颜色会有多种表示方案，但是我们参考印刷行业的习惯，会尽量优先使用黑色。

#### 5.1.3 HSL 颜色

我们刚才讲的颜色是从人类的视觉原理建模，应该说是十分科学了。但是，人类对颜色的认识却并非来自自己的神经系统，当我们把阳光散射，可以得到七色光：红橙黄绿蓝靛紫，实际上，阳光接近白光，它包含了各种颜色的光，它散射之后，应该是个基本连续的。这说明对人的感知来说，颜色远远大于红、绿、蓝。

因此，HSL 这样的颜色模型被设计出来了，它用一个值来表示人类认知中的颜色，我们用专业的术语叫做色相（H）。加上颜色的纯度（S）和明度（L），就构成了一种颜色的表示。

![img](https://static001.geekbang.org/resource/image/a3/ce/a3016a6ff178870d6dba23f807b0dfce.png)

在这里，我需要特别推荐 HSL 颜色，因为它是一种语义化的颜色。当我们对一张图片改变色相时，人们感知到的是“图片的颜色变了”。这里先容我卖个关子，具体的例子待我们讲完了渐变再看。

#### 5.1.4 其他颜色

接下来我们讲一讲 RGBA，RGBA 是代表 Red（红色）、Green（绿色）、Blue（蓝色）和 Alpha 的色彩空间。RGBA 颜色被用来表示带透明度的颜色，实际上，Alpha 通道类似一种颜色值的保留字。在 CSS 中，Alpha 通道被用于透明度，所以我们的颜色表示被称作 RGBA，而不是 RGBO（Opacity）。

为了方便使用，CSS 还规定了名称型的颜色，它内置了大量（140 种）的颜色名称。不过这里我要挑出两个颜色来讲一讲：金（gold）和银（silver）。

如果你使用过这两个颜色，你会发现，金（gold）和银（silver）的视觉表现跟我们想象中的金色和银色相差甚远。与其被叫做金色和银色，它们看起来更像是难看的暗黄色和浅灰色。

为什么会这样呢？在人类天然的色彩认知中，实际上混杂了很多其它因素，金色和银色不仅仅是一种颜色，它还意味着一定的镜面反光程度，在同样的光照条件下，金属会呈现出更亮的色彩，这并非是用一个色值可以描述的，这就引出了我们接下来要讲的渐变。

#### 5.1.5 渐变

在 CSS 中，background-image这样的属性，可以设为渐变。CSS 中支持两种渐变，一种是线性渐变，一种是放射性渐变，我们先了解一下它们的基本用法：

线性渐变的写法是：

```css
linear-gradient(direction, color-stop1, color-stop2, ...);
```

这里的 direction 可以是方向，也可以是具体的角度。例如：

- to bottom
- to top
- to left
- to right
- to bottom left
- to bottom right
- to top left
- To top right
- 120deg
- 3.14rad

以上这些都是合理的方向取值。

color-stop 是一个颜色和一个区段，例如：

- rgba(255,0,0,0)
- orange
- yellow 10%
- green 20%
- lime 28px

我们组合一下，产生一个“真正的金色”的背景：

```html
<style>
#grad1 {
    height: 200px;
    background: linear-gradient(45deg, gold 10%, yellow 50%, gold 90%); 
}
</style>
<div id="grad1"></div>
```

放射性渐变需要一个中心点和若干个颜色：

```css
radial-gradient(shape size at position, start-color, ..., last-color);
```

当我们应用的每一种颜色都是 HSL 颜色时，就产生了一些非常有趣的效果，比如，我们可以通过变量来调整一个按钮的风格：

```html
<style>
.button {
    display: inline-block;
    outline: none;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    font: 14px/100% Arial, Helvetica, sans-serif;
    padding: .5em 2em .55em;
    text-shadow: 0 1px 1px rgba(0,0,0,.3);
    border-radius: .5em;
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
    color: white;
    border: solid 1px ;
}

</style>
<div class="button orange">123</div>
<script>
var btn = document.querySelector(".button");
var h = 25;
setInterval(function(){
  h ++;
  h = h % 360;
  btn.style.borderColor=`hsl(${h}, 95%, 45%)`
  btn.style.background=`linear-gradient(to bottom,  hsl(${h},95%,54.1%),  hsl(${h},95%,84.1%))`
},100);
</script>
```

### 5.2 形状

CSS 中的很多属性还会产生形状，比如我们常见的属性：

- border
- box-shadow
- border-radius

这些产生形状的属性非常有趣，我们也能看到很多利用它们来产生的 CSS 黑魔法。然而，这里我有一个相反的建议，我们仅仅把它们用于基本的用途，把 border 用于边框、把阴影用于阴影，把圆角用于圆角，所有其它的场景，都有一个更好的替代品：datauri+svg。

### 5.3 文字相关

- font-style
- font-weight
- font-size
- font-family

**以上四种属性可采用缩写格式：** font: style weight size family; 

## 6. 交互

### 6.1 动画

在 CSS 属性中，有这么一类属性，它负责的不是静态的展现，而是根据用户行为产生交互。这就是今天我们要讲的属性。

首先我们先从属性来讲起。CSS 中跟动画相关的属性有两个：animation 和 transition。

#### 6.1.1 animation 属性和 transition 属性

我们先来看下 animation 的示例，通过示例来了解一下 animation 属性的基本用法:

```css
@keyframes mykf
{
  from {background: red;}
  to {background: yellow;}
}

div
{
    animation:mykf 5s infinite;
}
```

这里展示了 animation 的基本用法，实际上 animation 分成六个部分：

- animation-name 动画的名称，这是一个 keyframes 类型的值；
- animation-duration 动画的时长；
- animation-timing-function 动画的时间曲线；
- animation-delay 动画开始前的延迟；
- animation-iteration-count 动画的播放次数；
- animation-direction 动画的方向。

我们先来看 animation-name，这个是一个 keyframes 类型，需要配合 @规则来使用。

比如，我们前面的示例中，就必须配合定义 mymove 这个 keyframes。keyframes 的主体结构是一个名称和花括号中的定义，它按照百分比来规定数值，例如：

```css
@keyframes mykf {
  0% { top: 0; }
  50% { top: 30px; }
  75% { top: 10px; }
  100% { top: 0; }
}
```

这里，0% 和 100% 可以写成 from 和 to，不过一般不会混用，画风会变得很奇怪，比如：

```css
@keyframes mykf {
  from { top: 0; }
  50% { top: 30px; }
  75% { top: 10px; }
  to { top: 0; }
}
```

这里关键帧之间，是使用 animation-timing-function 作为时间曲线的，稍后我会详细介绍时间曲线。

接下来我们来介绍一下 transition。transition 与 animation 相比来说，是简单得多的一个属性。

它有四个部分：

- transition-property 要变换的属性；
- transition-duration 变换的时长；
- transition-timing-function 时间曲线；
- transition-delay 延迟。

这里的四个部分，可以重复多次，指定多个属性的变换规则。

实际上，有时候我们会把 transition 和 animation 组合，抛弃 animation 的 timing-function，以编排不同段用不同的曲线。

```css
@keyframes mykf {
  from { top: 0; transition:top ease}
  50% { top: 30px;transition:top ease-in }
  75% { top: 10px;transition:top ease-out }
  to { top: 0; transition:top linear}
}
```

在这个例子中，在 keyframes 中定义了 transition 属性，以达到各段曲线都不同的效果。

#### 6.1.2 三次贝塞尔曲线

我想，你能从很多 CSS 的资料中都找到了贝塞尔曲线，但是为什么 CSS 的时间曲线要选用（三次）贝塞尔曲线呢？

我们在这里首先要了解一下贝塞尔曲线，贝塞尔曲线是一种插值曲线，它描述了两个点之间差值来形成连续的曲线形状的规则。

一个量（可以是任何矢量或者标量）从一个值到变化到另一个值，如果我们希望它按照一定时间平滑地过渡，就必须要对它进行插值。

最基本的情况，我们认为这个变化是按照时间均匀进行的，这个时候，我们称其为线性插值。而实际上，线性插值不大能满足我们的需要，因此数学上出现了很多其它的插值算法，其中贝塞尔插值法是非常典型的一种。它根据一些变换中的控制点来决定值与时间的关系。

贝塞尔曲线是一种被工业生产验证了很多年的曲线，它最大的特点就是“平滑”。时间曲线平滑，意味着较少突兀的变化，这是一般动画设计所追求的。

贝塞尔曲线用于建筑设计和工业设计都有很多年历史了，它最初的应用是汽车工业用贝塞尔曲线来设计车型。

K 次贝塞尔插值算法需要 k+1 个控制点，最简单的一次贝塞尔插值就是线性插值，将时间表示为 0 到 1 的区间，一次贝塞尔插值公式是：

![img](https://static001.geekbang.org/resource/image/d7/f8/d7e7c3bcc1e2b2ce72fde79956e872f8.png)

“二次贝塞尔插值”有 3 个控制点，相当于对 P0 和 P1，P1 和 P2 分别做贝塞尔插值，再对结果做一次贝塞尔插值计算

![img](https://static001.geekbang.org/resource/image/14/84/14d6a5396b7c0cc696c52a9e06e45184.png)

“三次贝塞尔插值”则是“两次‘二次贝塞尔插值’的结果，再做一次贝塞尔插值”：

![img](https://static001.geekbang.org/resource/image/65/b2/65ff1dd9b8e5911f9dd089531acea2b2.png)

贝塞尔曲线的定义中带有一个参数 t，但是这个 t 并非真正的时间，实际上贝塞尔曲线的一个点 (x, y)，这里的 x 轴才代表时间。

这就造成了一个问题，如果我们使用贝塞尔曲线的直接定义，是没办法直接根据时间来计算出数值的，因此，浏览器中一般都采用了数值算法，其中公认做有效的是牛顿积分，我们可以看下 JavaScript 版本的代码：

```javascript
function generate(p1x, p1y, p2x, p2y) {
    const ZERO_LIMIT = 1e-6;
    // Calculate the polynomial coefficients,
    // implicit first and last control points are (0,0) and (1,1).
    const ax = 3 * p1x - 3 * p2x + 1;
    const bx = 3 * p2x - 6 * p1x;
    const cx = 3 * p1x;

    const ay = 3 * p1y - 3 * p2y + 1;
    const by = 3 * p2y - 6 * p1y;
    const cy = 3 * p1y;

    function sampleCurveDerivativeX(t) {
        // `ax t^3 + bx t^2 + cx t' expanded using Horner 's rule.
        return (3 * ax * t + 2 * bx) * t + cx;
    }

    function sampleCurveX(t) {
        return ((ax * t + bx) * t + cx ) * t;
    }

    function sampleCurveY(t) {
        return ((ay * t + by) * t + cy ) * t;
    }

    // Given an x value, find a parametric value it came from.
    function solveCurveX(x) {
        var t2 = x;
        var derivative;
        var x2;

        // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation
        // First try a few iterations of Newton's method -- normally very fast.
        // http://en.wikipedia.org/wiki/Newton's_method
        for (let i = 0; i < 8; i++) {
            // f(t)-x=0
            x2 = sampleCurveX(t2) - x;
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2;
            }
            derivative = sampleCurveDerivativeX(t2);
            // == 0, failure
            /* istanbul ignore if */
            if (Math.abs(derivative) < ZERO_LIMIT) {
                break;
            }
            t2 -= x2 / derivative;
        }

        // Fall back to the bisection method for reliability.
        // bisection
        // http://en.wikipedia.org/wiki/Bisection_method
        var t1 = 1;
        /* istanbul ignore next */
        var t0 = 0;

        /* istanbul ignore next */
        t2 = x;
        /* istanbul ignore next */
        while (t1 > t0) {
            x2 = sampleCurveX(t2) - x;
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2;
            }
            if (x2 > 0) {
                t1 = t2;
            } else {
                t0 = t2;
            }
            t2 = (t1 + t0) / 2;
        }

        // Failure
        return t2;
    }

    function solve(x) {
        return sampleCurveY(solveCurveX(x));
    }

    return solve;
}
```

这段代码其实完全翻译自 WebKit 的 C++ 代码，牛顿积分的具体原理请参考相关数学著作。

这个 JavaScript 版本的三次贝塞尔曲线可以用于实现跟 CSS 一模一样的动画。

#### 6.1.3 贝塞尔曲线拟合

理论上，贝塞尔曲线可以通过分段的方式拟合任意曲线，但是有一些特殊的曲线，是可以用贝塞尔曲线完美拟合的，比如抛物线。

这里我做了一个示例，用于模拟抛物线：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Simulation</title>
  <style>
    .ball {
      width:10px;
      height:10px;
      background-color:black;
      border-radius:5px;
      position:absolute;
      left:0;
      top:0;
      transform:translateY(180px);
    }
  </style>
</head>
<body>
  <label> 运动时间：<input value="3.6" type="number" id="t" />s</label><br/>
  <label> 初速度：<input value="-21" type="number" id="vy" /> px/s</label><br/>
  <label> 水平速度：<input value="21" type="number" id="vx" /> px/s</label><br/>
  <label> 重力：<input value="10" type="number" id="g" /> px/s²</label><br/>
  <button onclick="createBall()"> 来一个球 </button>
</body>
</html>
```

```javascript
function generateCubicBezier (v, g, t){
    var a = v / g;
    var b = t + v / g;

    return [[(a / 3 + (a + b) / 3 - a) / (b - a), (a * a / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)],
        [(b / 3 + (a + b) / 3 - a) / (b - a), (b * b / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)]];
}

function createBall() {
  var ball = document.createElement("div");
  var t = Number(document.getElementById("t").value);
  var vx = Number(document.getElementById("vx").value);
  var vy = Number(document.getElementById("vy").value);
  var g = Number(document.getElementById("g").value);
  ball.className = "ball";
  document.body.appendChild(ball)
  ball.style.transition = `left linear ${t}s, top cubic-bezier(${generateCubicBezier(vy, g, t)}) ${t}s`;
  setTimeout(function(){ 
    ball.style.left = `${vx * t}px`; 
    ball.style.top = `${vy * t + 0.5 * g * t * t}px`; 
  }, 100);
  setTimeout(function(){ document.body.removeChild(ball); }, t * 1000);
}
```

这段代码中，我实现了抛物线运动的小球，其中核心代码就是 generateCubicBezier 函数。

这个公式完全来自于一篇论文，推理过程我也不清楚，但是不论如何，它确实能够用于模拟抛物线。

实际上，我们日常工作中，如果需要用贝塞尔曲线拟合任何曲线，都可以找到相应的论文，我们只要取它的结论即可。