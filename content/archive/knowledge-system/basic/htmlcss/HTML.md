---
title: "前端知识体系之基础知识 - HTML: 元素和语言"
date: "2019-08-03"
keyword: "前端知识体系,基础知识,HTML,元素和语言"
tags: ["前端知识体系","基础知识","HTML"]
slug: "2019-08-03-html"
---

## 1. 文档元信息

元信息，是指描述自身的信息，元信息类标签，就是 HTML 用于描述文档自身的一类标签，它们通常出现在 head 标签中，一般都不会在页面被显示出来（与此相对，其它标签，如语义类标签，描述的是业务）。

### 1.1 head

head 标签本身并不携带任何信息，它主要是作为盛放其它语义类标签的容器使用。

head 标签规定了自身必须是 html 标签中的第一个标签，它的内容必须包含一个 title，并且最多只能包含一个 base。如果文档作为 iframe，或者有其他方式指定了文档标题时，可以允许不包含 title 标签。

### 1.2 title

title 标签表示文档的标题。

### 1.3 meta

meta 标签是一组键值对，它是一种通用的元信息表示标签。

在 head 中可以出现任意多个 meta 标签。一般的 meta 标签由 name 和 content 两个属性来定义。name 表示元信息的名，content 则用于表示元信息的值。

这里的 name 是一种比较自由的约定，http 标准规定了一些 name 作为大家使用的共识，也鼓励大家发明自己的 name 来使用。

除了基本用法，meta 标签还有一些变体，主要用于简化书写方式或者声明自动化行为。

- **具有 charset 属性的 meta**

  从 HTML5 开始，为了简化写法，meta 标签新增了 charset 属性。添加了 charset 属性的 meta 标签无需再有 name 和 content。

  ```html
  <meta charset="UTF-8" />
  ```

- **具有 http-equiv 属性的 meta**

  具有 http-equiv 属性的 meta 标签，表示执行一个命令，这样的 meta 标签可以不需要 name 属性了。

  例如，下面一段代码，相当于添加了 content-type 这个 http 头，并且指定了 http 编码方式。

  ```html
  <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
  ```

  除了 content-type，还有以下几种命令：

  - content-language 指定内容的语言；
  - default-style 指定默认样式表；
  - refresh 刷新；
  - set-cookie 模拟 http 头 set-cookie，设置 cookie；
  - x-ua-compatible 模拟 http 头 x-ua-compatible，声明 ua 兼容性；
  - content-security-policy 模拟 http 头 content-security-policy，声明内容安全策略。

- **name 为 viewport 的 meta**

  实际上，meta 标签可以被自由定义，只要写入和读取的双方约定好 name 和 content 的格式就可以了。

  name 为 viewport 的 meta，它没有在 HTML 标准中定义，却是移动端开发的事实标准。

  这类 meta 的 name 属性为 viewport，它的 content 是一个复杂结构，是用逗号分隔的键值对，键值对的格式是 key=value。

  例如：

  ```html
  <meta name="viewport" content="width=500, initial-scale=1" />
  ```

  这里只指定了两个属性，宽度和缩放，实际上 viewport 能控制的更多，它能表示的全部属性如下：

  - width：页面宽度，可以取值具体的数字，也可以是 device-width，表示跟设备宽度相等。
  - height：页面高度，可以取值具体的数字，也可以是 device-height，表示跟设备高度相等。
  - initial-scale：初始缩放比例。
  - minimum-scale：最小缩放比例。
  - maximum-scale：最大缩放比例。
  - user-scalable：是否允许用户缩放。

  对于已经做好了移动端适配的网页，应该把用户缩放功能禁止掉，宽度设为设备宽度，一个标准的 meta 如下：

  ```javascript
  <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
  ```

- **其它预定义的 meta**

  在 HTML 标准中，还定义了一批 meta 标签的 name，可以视为一种有约定的 meta。

  - application-name：如果页面是 Web application，用这个标签表示应用名称。
  - author: 页面作者。
  - description：页面描述，这个属性可能被用于搜索引擎或者其它场合。
  - generator: 生成页面所使用的工具，主要用于可视化编辑器，如果是手写 HTML 的网页，不需要加这个 meta。
  - keywords: 页面关键字，对于 SEO 场景非常关键。
  - referrer: 跳转策略，是一种安全考量。
  - theme-color: 页面风格颜色，实际并不会影响页面，但是浏览器可能据此调整页面之外的 UI（如窗口边框或者 tab 的颜色）。

## 2. 语义相关内容

### 2.1 语义化标签优点

- 语义类标签对开发者更为友好，使用语义类标签增强了可读性，即便是在没有 CSS 的时候，开发者也能够清晰地看出网页的结构，也更为便于团队的开发和维护。
- 除了对人类友好之外，语义类标签也十分适宜机器阅读。它的文字表现力丰富，更适合搜索引擎检索（SEO），也可以让搜索引擎爬虫更好地获取到更多有效信息，有效提升网页的搜索量，并且语义类还可以支持读屏软件，根据文章可以自动生成目录等等。

### 2.2 常用语义化标签

- aside：导航性质的工具内容，例如左侧侧边栏
- article：文章主体
- hgroup,h1,h2：hgroup 标签是标题组，h1 标签是一级标题，h2 标签是二级标题
- abbr：缩写内容
- hr：横向分割线，表示故事走向的转变或者话题的转变
- p：普通段落
- strong：黑体加粗，表示这个词很重要
- blockquote,q,cite：blockquote 标签表示段落级引述内容，q 标签表示行内的引述内容，cite 标签表示引述的作品名
- time：日期内容
- figure,figcaption：figure 标签用于表示与主文章相关的图像、照片等流内容，figcaption 标签表示内容的标题
- dfn：用来包裹被定义的名词
- nav,ol,ul：nav 标签是导航、目录内容，ol 标签表示有序列表，ul 标签表示无序列表
- pre,samp,code：pre 标签表示这部分内容是预先排版过的，不需要浏览器进行排版，smap 标签用于计算机程序的示例输出展示，code 标签用来包裹计算机程序代码。

### 2.3 适合使用语义化的场景

- 自然语言表达能力的补充；
- 文章标题摘要；
- 适合机器阅读的整体结构。

## 3. 链接

链接是 HTML 中的一种机制，它是 HTML 文档和其它文档或者资源的连接关系，在 HTML 中，链接有两种类型。一种是超链接型标签，一种是外部资源链接。

链接的家族中有 a 标签、area 标签和 link 标签。

### 3.1 link 标签

link 标签也是元信息的一种，在很多时候，它也是不会对浏览器产生任何效果的，这也是很多人会忽略 link 标签学习的原因。

link 标签会生成一个链接，它可能生成超链接，也可能生成外部资源链接。

一些 link 标签会生成超链接，这些超链接又不会像 a 标签那样显示在网页中。这就是超链接型的 link 标签。

这意味着多数浏览器中，这些 link 标签不产生任何作用。但是，这些 link 标签能够被搜索引擎和一些浏览器插件识别，从而产生关键性作用。

比如，到页面 RSS 的 link 标签，能够被浏览器的 RSS 订阅插件识别，提示用户当前页面是可以 RSS 订阅的。

另外一些 link 标签则会把外部的资源链接到文档中，也就是说，会实际下载这些资源，并且做出一些处理，比如我们常见的用 link 标签引入样式表。

除了元信息的用法之外，多数外部资源型的 link 标签还能够被放在 body 中使用，从而起到把外部资源链接进文档的作用。

link 标签的链接类型主要通过 rel 属性来区分，其代码类似下面：

```html
<link rel="xx" ...>
```

#### 3.1.1 超链接类 link 标签

超链接型 link 标签是一种被动型链接，在用户不操作的情况下，它们不会被主动下载。

link 标签具有特定的 rel 属性，会成为特定类型的 link 标签。产生超链接的 link 标签包括：具有 rel=“canonical” 的 link、具有 rel="alternate"的 link、具有 rel=“prev” rel="next"的 link 等等。

- canonical 型 link

  ```html
  <link rel="canonical" href="...">
  ```

  这个标签提示页面它的主 URL，在网站中常常有多个 URL 指向同一页面的情况，搜索引擎访问这类页面时会去掉重复的页面，这个 link 会提示搜索引擎保留哪一个 URL。

- alternate 型 link

  ```html
  <link rel="alternate" href="...">
  ```

  这个标签提示页面它的变形形式，这个所谓的变形可能是当前页面内容的不同格式、不同语言或者为不同的设备设计的版本，这种 link 通常也是提供给搜索引擎来使用的。

  alternate 型的 link 的一个典型应用场景是，页面提供 rss 订阅时，可以用这样的 link 来引入：

  ```html
  <link rel="alternate" type="application/rss+xml" title="RSS" href="...">
  ```

  除了搜索引擎外，很多浏览器插件都能识别这样的 link。

- prev 型 link 和 next 型 link

  在互联网应用中，很多网页都属于一个序列，比如分页浏览的场景，或者图片展示的场景，每个网页是序列中的一个项。

  这种时候，就适合使用 prev 和 next 型的 link 标签，来告诉搜索引擎或者浏览器它的前一项和后一项，这有助于页面的批量展示。

  因为 next 型 link 告诉浏览器“这是很可能访问的下一个页面”，HTML 标准还建议对 next 型 link 做预处理。

- 其它超链接类的 link

  其它超链接类 link 标签都表示一个跟当前文档相关联的信息，可以把这样的 link 标签视为一种带链接功能的 meta 标签。

  - rel=“author” 链接到本页面的作者，一般是 mailto: 协议
  - rel=“help” 链接到本页面的帮助页
  - rel=“license” 链接到本页面的版权信息页
  - rel=“search” 链接到本页面的搜索页面（一般是站内提供搜索时使用）

#### 3.1.2 外部资源类 link 标签

外部资源型 link 标签会被主动下载，并且根据 rel 类型做不同的处理。外部资源型的标签包括：具有 icon 型的 link、预处理类 link、modulepreload 型的 link、stylesheet、pingback。下面我们来一一介绍它们。

- icon 型 link

  这类链接表示页面的 icon。多数浏览器会读取 icon 型 link，并且把页面的 icon 展示出来。

  icon 型 link 是唯一一个外部资源类的元信息 link，其它元信息类 link 都是超链接，这意味着，icon 型 link 中的图标地址默认会被浏览器下载和使用。

  如果没有指定这样的 link，多数浏览器会使用域名根目录下的 favicon.ico，即使它并不存在，所以从性能的角度考虑，建议一定要保证页面中有 icon 型的 link。

  只有 icon 型 link 有有效的 sizes 属性，HTML 标准允许一个页面出现多个 icon 型 link，并且用 sizes 指定它适合的 icon 尺寸。

- 预处理类 link

  我们都知道，导航到一个网站需要经过 dns 查询域名、建立连接、传输数据、加载进内存和渲染等一系列的步骤。

  预处理类 link 标签就是允许我们控制浏览器，提前针对一些资源去做这些操作，以提高性能（当然如果你乱用的话，性能反而更差）。

  下面我来列一下这些 link 类型：

  - dns-prefetch 型 link 提前对一个域名做 dns 查询，这样的 link 里面的 href 实际上只有域名有意义。
  - preconnect 型 link 提前对一个服务器建立 tcp 连接。
  - prefetch 型 link 提前取 href 指定的 url 的内容。
  - preload 型 link 提前加载 href 指定的 url。
  - prerender 型 link 提前渲染 href 指定的 url。

- modulepreload 型的 link

  modulepreload 型 link 的作用是预先加载一个 JavaScript 的模块。这可以保证 JS 模块不必等到执行时才加载。

  这里的所谓加载，是指完成下载并放入内存，并不会执行对应的 JavaScript。

  ```html
  <link rel="modulepreload" href="app.js">
  <link rel="modulepreload" href="helpers.js">
  <link rel="modulepreload" href="irc.js">
  <link rel="modulepreload" href="fog-machine.js">
  <script type="module" src="app.js">
  ```

  这个例子来自 HTML 标准，我们假设 app.js 中有 import “irc” 和 import “fog-machine”, 而 irc.js 中有 import “helpers”。这段代码使用 moduleload 型 link 来预加载了四个 js 模块。

  尽管，单独使用 script 标签引用 app.js 也可以正常工作，但是我们通过加入对四个 JS 文件的 link 标签，使得四个 JS 文件有机会被并行地下载，这样提高了性能。

- stylesheet 型 link

  样式表大概是所有人最熟悉的 link 标签用法了。它的样子是下面这样的。

  ```html
  <link rel="stylesheet" href="xxx.css" type="text/css">
  ```

  基本用法是从一个 CSS 文件创建一个样式表。这里 type 属性可以没有，如果有，必须是"text/css"才会生效。

  rel 前可以加上 alternate，成为 rel=“alternate stylesheet”，此时必须再指定 title 属性。

  这样可以为页面创建一份变体样式，一些浏览器，如 Firefox 3.0，支持从浏览器菜单中切换这些样式，当然了，大部分浏览器不支持这个功能，所以仅仅从语义的角度了解一下这种用法即可。

- pingback 型 link

  这样的 link 表示本网页被引用时，应该使用的 pingback 地址，这个机制是一份独立的标准，遵守 pingback 协议的网站在引用本页面时，会向这个 pingback url 发送一个消息。

### 3.2 a 标签

a 标签其实同时充当了链接和目标点的角色，当 a 标签有 href 属性时，它是链接，当它有 name 时，它是链接的目标。

具有 href 的 a 标签跟一些 link 一样，会产生超链接，也就是在用户不操作的情况下，它们不会被主动下载的被动型链接。

重点的内容是，a 标签也可以有 rel 属性，我们来简单了解一下，首先是跟 link 相同的一些 rel，包括下面的几种。

- alternate
- author
- help
- license
- next
- prev
- search

这些跟 link 语义完全一致，不同的是，a 标签产生的链接是会实际显示在网页中的，而 link 标签仅仅是元信息。

除了这些之外，a 标签独有的 rel 类型：

- tag 表示本网页所属的标签；
- bookmark 到上级章节的链接。

a 标签还有一些辅助的 rel 类型，用于提示浏览器或者搜索引擎做一些处理：

- nofollow 此链接不会被搜索引擎索引；
- noopener 此链接打开的网页无法使用 opener 来获得当前页面的窗口；
- noreferrer 此链接打开的网页无法使用 referrer 来获得当前页面的 url；
- opener 打开的网页可以使用 window.opener 来访问当前页面的 window 对象，这是 a 标签的默认行为。

a 标签基本解决了在页面中插入文字型和整张图片超链接的需要，但是如果我们想要在图片的某个区域产生超链接，那么就要用到另一种标签了——area 标签。

### 3.3 area 标签

area 标签与 a 标签非常相似，不同的是，它不是文本型的链接，而是区域型的链接。

area 标签支持的 rel 与 a 完全一样，这里就不多说了。

area 是整个 html 规则中唯一支持非矩形热区的标签，它的 shape 属性支持三种类型。

- 圆形：circle 或者 circ，coords 支持三个值，分别表示中心点的 x,y 坐标和圆形半径 r。
- 矩形：rect 或者 rectangle，coords 支持两个值，分别表示两个对角顶点 x1，y1 和 x2，y2。
- 多边形：poly 或者 polygon，coords 至少包括 6 个值，表示多边形的各个顶点。

因为 area 设计的时间较早，所以不支持含有各种曲线的路径，但是它也是唯一一个支持了非矩形触发区域的元素，所以，对于一些效果而言，area 是必不可少的。

area 必须跟 img 和 map 标签配合使用。使用示例如下（例子来自 html 标准）。

```HTML
<p>
 Please select a shape:
 <img src="shapes.png" usemap="#shapes"
      alt="Four shapes are available: a red hollow box, a green circle, a blue triangle, and a yellow four-pointed star.">
 <map name="shapes">
  <area shape=rect coords="50,50,100,100"> <!-- the hole in the red box -->
  <area shape=rect coords="25,25,125,125" href="red.html" alt="Red box.">
  <area shape=circle coords="200,75,50" href="green.html" alt="Green circle.">
  <area shape=poly coords="325,25,262,125,388,125" href="blue.html" alt="Blue triangle.">
  <area shape=poly coords="450,25,435,60,400,75,435,90,450,125,465,90,500,75,465,60"
        href="yellow.html" alt="Yellow star.">
 </map>
</p>
```

这个例子展示了在一张图片上画热区并且产生链接，分别使用了矩形、圆形和多边形三种 area。

## 4. 替换型元素

替换型元素是把文件的内容引入，替换掉自身位置的一类标签。

凡是替换型元素，都是使用 src 属性来引用文件的，链接型元素是使用 href 标签的。

script、img、picture、audio、video、iframe 几个标签均能产生替换型元素。

### 4.1 script

我们之所以选择先讲解 script 标签，是因为 script 标签是为数不多的既可以作为替换型标签，又可以不作为替换型标签的元素。

我们先来看看 script 标签的两种用法：

```html
<script type="text/javascript">
console.log("Hello world!");
</script>


<script type="text/javascript" src="my.js"></script>
```

这个例子中，我们展示了两种 script 标签的写法，一种是直接把脚本代码写在 script 标签之间，另一种是把代码放到独立的 js 文件中，用 src 属性引入。

这两种写法是等效的。我想这种等效性可以帮助你理解替换型元素的“替换”是怎么一回事。

### 4.2 img

img 标签的作用是引入一张图片。这个标签是没有办法像 script 标签那样作为非替换型标签来使用的，它必须有 src 属性才有意义。

如果一定不想要引入独立文件，可以使用 data uri，我们来看个实际的例子：

```html
 <img src='data:image/svg+xml;charset=utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/></svg>'/>
```

这个例子中我们使用了 data uri 作为图片的 src，这样，并没有产生独立的文件，客观上做到了和内联相同的结果，这是一个常用的技巧。

img 标签可以使用 width 和 height 指定宽度和高度。也可以只指定其中之一。当我们只指定宽度，图片会被**等比例缩放了**。这个特性非常重要，适用于那种我们既要限制图片尺寸，又要保持图片比例的场景。如果从性能的角度考虑，建议你同时给出图片的宽高，因为替换型元素加载完文件后，如果尺寸发生变换，会触发重排版。

此处要重点提到一个属性，alt 属性，这个属性很难被普通用户感知，对于视障用户非常重要，可以毫不夸张地讲，给 img 加上 alt 属性，已经做完了可访问性的一半。

img 标签还有一组重要的属性，那就是 srcset 和 sizes，它们是 src 属性的升级版（所以我们前面讲 img 标签必须有 src 属性，这是不严谨的说法）。

这两个属性的作用是在不同的屏幕大小和特性下，使用不同的图片源。下面一个例子也来自 MDN，它展示了 srcset 和 sizes 的用法

```html
<img srcset="elva-fairy-320w.jpg 320w,
             elva-fairy-480w.jpg 480w,
             elva-fairy-800w.jpg 800w"
     sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
     src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
```

srcset 提供了根据屏幕条件选取图片的能力，但是其实更好的做法，是使用 picture 元素。

### 4.3 picture

picture 元素可以根据屏幕的条件为其中的 img 元素提供不同的源，它的基本用法如下：

```html
<picture>
  <source srcset="image-wide.png" media="(min-width: 600px)">
  <img src="image-narrow.png">
</picture>
```

picture 元素的设计跟 audio 和 video 保持了一致（稍后我会为你讲解这两个元素），它跟 img 搭配 srcset 和 sizes 不同，它使用 source 元素来指定图片源，并且支持多个。

这里的 media 属性是 media query，跟 CSS 的 @media 规则一致。 

### 4.4 video

在 HTML5 早期的设计中，video 标签跟 img 标签类似，也是使用 src 属性来引入源文件的，不过，我想应该是考虑到了各家浏览器支持的视频格式不同，现在的 video 标签跟 picture 元素一样，也是提倡使用 source 的。

下面例子是一个古典的 video 用法：

```html
<video controls="controls" src="movie.ogg">
</video>
```

这个例子中的代码用 src 来指定视频的源文件。但是因为一些历史原因，浏览器对视频的编码格式兼容问题分成了几个派系，这样，对于一些兼容性要求高的网站，我们使用单一的视频格式是不合适的。

现在的 video 标签可以使用 source 标签来指定接入多个视频源。

```html
<video controls="controls" >
  <source src="movie.webm" type="video/webm" >
  <source src="movie.ogg" type="video/ogg" >
  <source src="movie.mp4" type="video/mp4">
  You browser does not support video.
</video>
```

从这个例子中，我们可以看到，source 标签除了支持 media 之外，还可以使用 type 来区分源文件的使用场景。

video 标签的内容默认会被当做不支持 video 的浏览器显示的内容吗，因此，如果要支持更古老的浏览器，还可以在其中加入 object 或者 embed 标签，这里就不详细展开了。

### 4.5 audio

接下来我们来讲讲 audio，跟 picture 和 video 两种标签一样，audio 也可以使用 source 元素来指定源文件。我们看一下例子：

```html
<audio controls>
  <source src="song.mp3" type="audio/mpeg">
  <source src="song.ogg" type="audio/ogg">
  <p>You browser does not support audio.</p>
</audio>
```

但比起 video，audio 元素的历史问题并不严重，所以使用 src 也是没有问题的。

### 4.6 iframe

最后我们来讲一下 iframe，这个标签能够嵌入一个完整的网页。

```html
<iframe src="http://time.geekbang.org"></iframe>
```

这个例子展示了古典的 iframe 用法。

在新标准中，为 iframe 加入了 sandbox 模式和 srcdoc 属性，这样，给 iframe 带来了一定的新场景。我们来看看例子：

```html
<iframe sandbox srcdoc="<p>Yeah, you can see it <a href="/gallery?mode=cover&amp;amp;page=1">in my gallery</a>."></iframe>
```

这样，这个 iframe 就不涉及任何跨域问题了。

不过，在移动端，iframe 受到了相当多的限制，它无法指定大小，里面的内容会被完全平铺到父级页面上。

同时很多网页也会通过 http 协议头禁止自己被放入 iframe 中。

iframe 标签也是各种安全问题的重灾区。opener、window.name、甚至 css 的 opacity 都是黑客可以利用的漏洞。

因此，在 2019 年，当下这个时间点，任何情况下我都不推荐在实际开发中用以前的 iframe。

## 5. 表单

### 5.1 HTML表单

HTML 表单用于收集用户输入。`<form>  `元素定义 HTML 表单：

```html
<form>
 .
form elements
 .
</form>
```

### 5.2 HTML表单元素

HTML 表单包含表单元素，表单元素指的是不同类型的 input 元素、复选框、单选按钮、提交按钮等等。

- `<input> ` 元素有很多形态，根据不同的 type属性。

  - `<input type="text"> `定义用于文本输入的单行输入字段；
  - `<input type="checkbox"> `定义复选框；
  - `<input type="radio"> `定义单选按钮；
  - `<input type="submit">` 定义用于向表单处理程序（form-handler）提交表单的按钮；
  - …...

- `<select>` 元素定义下拉列表

  ```html
  <select name="cars">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="fiat">Fiat</option>
    <option value="audi">Audi</option>
  </select>
  ```

- `<textarea> ` 元素定义多行输入字段（文本域）

  ```html
  <textarea name="message" rows="10" cols="30">
  	The cat was playing in the garden.
  </textarea>
  ```

- `<button>` 元素定义可点击的按钮

  ```html
  <button type="button" onclick="alert('Hello World!')">Click Me!</button>
  ```

HTML5 增加了如下表单元素：

- `<datalist>` 代表提供给其他控件的一组预定义选项；
- `<keygen> ` 代表一个密钥对生成器控件；
- `<output> ` 代表计算值；
- `<progress>` 代表进度条；
- `<meter>` 代表滑动条。

## 6. 表格

简单的 HTML 表格由 table 元素以及一个或多个 tr、th 或 td 元素组成，tr 元素定义表格行，th 元素定义表头，td 元素定义表格单元，更复杂的 HTML 表格也可能包括 caption、col、colgroup、thead、tfoot 以及 tbody 元素。

```html
<table>
    <thead>
        <tr>
            <th colspan="2">The table header</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>The table body</td>
            <td>with two columns</td>
        </tr>
    </tbody>
</table>
```

- `<table>` 定义多维数据；
- `<caption>` 代表表格的标题；
- `<colgroup>` 代表表格中一组单列或多列；
- `<col>` 代表表格中的列 ；
- `<tbody>` 代表表格中一块具体数据 （表格主体）；
- `<thead>` 代表表格中一块列标签 （表头）；
- `<tfoot>` 代表表格中一块列摘要 （表尾）;
- `<tr>` 代表表格中的行 ;
- `<td>` 代表表格中的单元格;
- `<th>` 代表表格中的头部单元格 。

## 7. 总集

我们已经提到了大部分的 HTML 标签，但是为了突出重点，我们会忽略一些标签类型，以及弱化讲解一些标签类型，比如表单类和表格类这类目前使用场景较少的标签。

剩下的标签可以通过查阅HTML标准获得，所有**标准化的 HTML5 标签**可查阅[HTML5 标签列表](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5/HTML5_element_list)。

## 8. 语言

HTML（HyperText Markup Language，超文本标记语言） 是用来定义网页结构的一种描述语言。

### 8.1 基本语法

HTML 语法源自 SGML，包含了五种节点：标签（元素）、文本、注释、文档类型定义（DTD）和处理信息（ProcessingInstruction）。

![img](https://static001.geekbang.org/resource/image/b6/bc/b6fdf08dbe47c837e274ff1bb6f630bc.jpg)

#### 8.1.1 标签语法

标签语法产生元素，我们从语法的角度讲，就用“标签”这个术语，我们从运行时的角度讲，就用“元素”这个术语。

HTML 中，用于描述一个元素的标签分为开始标签、结束标签和自闭合标签。开始标签和自闭合标签中，又可以有属性。

- 开始标签：`<tagname>`
  - 带属性的开始标签： `<tagname attributename="attributevalue">`
- 结束标签：`</tagname>`
- 自闭合标签：`<tagname />`

这里需要重点讲一讲属性语法，属性可以使用单引号、双引号或者完全不用引号，这三种情况下，需要转义的部分都不太一样。

属性中可以使用文本实体来做转义，属性中，一定需要转义的有：

- 无引号属性：`<tab>` `<LF>` `<FF>` `<SPACE>` `&`五种字符
- 单引号属性：`'` `&`两种字符
- 双引号属性：`"` `&`两种字符

一般来说，灵活运用属性的形式，是不太用到文本实体转义的。

#### 8.1.2 文本语法

在 HTML 中，规定了两种文本语法，一种是普通的文本节点，另一种是 CDATA 文本节点。

文本节点看似是普通的文本，但是，其中有两种字符是必须做转义的：`<`和`&`。

如果我们从某处拷贝了一段文本，里面包含了大量的 `<`和`&`，那么我们就有麻烦了，这时候，就轮到我们的 CDATA 节点出场了。

CDATA 也是一种文本，它存在的意义是语法上的意义：在 CDATA 节点内，不需要考虑多数的转义情况。

#### 8.1.3 注释语法

HTML 注释语法以`<!--`开头，以`-->`结尾，注释的内容非常自由，除了`-->`都没有问题。

如果注释的内容一定要出现 `-->`，我们可以拆成多个注释节点。

#### 8.1.4 DTD 语法（文档类型定义）

SGML 的 DTD 语法十分复杂，但是对 HTML 来说，其实 DTD 的选项是有限的，浏览器在解析 DTD 时，把它当做几种字符串之一，关于 DTD，在下面会详细讲解。

#### 8.1.5 ProcessingInstruction 语法（处理信息）：

ProcessingInstruction 多数情况下，是给机器看的。HTML 中规定了可以有 ProcessingInstruction，但是并没有规定它的具体内容，所以可以把它视为一种保留的扩展机制。对浏览器而言，ProcessingInstruction 的作用类似于注释。

ProcessingInstruction 包含两个部分，紧挨着第一个问号后，空格前的部分被称为“目标”，这个目标一般表示处理 ProcessingInstruction 的程序名。例如：

```html
<?a 1?>
```

剩余部分是它的文本信息，没有任何格式上的约定，完全由文档编写者和处理程序的编写者约定。

### 8.2 DTD

DTD 的全称是 Document Type Defination，也就是文档类型定义。SGML 用 DTD 来定义每一种文档类型，HTML 属于 SGML，在 HTML5 出现之前，HTML 都是使用符合 SGML 规定的 DTD。

HTML4.01 有三种 DTD。分别是严格模式、过渡模式和 frameset 模式。

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

严格模式的 DTD 规定了 HTML4.01 中需要的标签。

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```

过渡模式的 DTD 除了 html4.01，还包含了一些被贬斥的标签，这些标签已经不再推荐使用了，但是过渡模式中仍保留了它们。

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
```

frameset 结构的网页如今已经很少见到了，它使用 frameset 标签把几个网页组合到一起。

众所周知，HTML 中允许一些标签不闭合的用法，实际上这些都是符合 SGML 规定的，并且在 DTD 中规定好了的。但是，一些程序员喜欢严格遵守 XML 语法，保证标签闭合性，所以，HTML4.01 又规定了 XHTML 语法，同样有三个版本。

版本一

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

版本二

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "
http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

版本三

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
```

其实你看看就知道，这些复杂的 DTD 写法并没有什么实际作用（浏览器根本不会用 SGML 引擎解析它们），因此，到了 HTML5，干脆放弃了 SGML 子集这项坚持，规定了一个简单的，大家都能记住的 DTD：

```html
<!DOCTYPE html>
```

但是，HTML5 仍然保留了 HTML 语法和 XHTML 语法。

### 8.3 文本实体

不知道你注意到没有，HTML4.01 的 DTD 里包含了一个长得很像是 URL 的东西，其实它是真的可以访问的——但是 W3C 警告说，禁止任何浏览器在解析网页的时候访问这个 URL，不然 W3C 的服务器会被压垮。我相信很多好奇的前端工程师都把它下载下来打开过。

这是符合 SGML 规范的 DTD，我们前面讲过，SGML 的规范十分复杂，所以这里我并不打算讲 SGML（其实我也不会），但是这不妨碍我们了解一下 DTD 的内容。这个 DTD 规定了 HTML 包含了哪些标签、属性和文本实体。其中文本实体分布在三个文件中：HTMLsymbol.ent HTMLspecial.ent 和 HTMLlat1.ent。

所谓文本实体定义就是类似以下的代码：

```html
&lt;
&nbsp;
&gt;
&amp;
```

每一个文本实体由 `&` 开头，由 `;` 结束，这属于基本语法的规定，文本实体可以用#后跟一个十进制数字，表示字符 Unicode 值。除此之外这两个符号之间的内容，则由 DTD 决定。

### 8.4 命名空间

xmlns 属性可以在文档中定义一个或多个可供选择的命名空间。该属性可以放置在文档内任何元素的开始标签中。该属性的值类似于 URL，它定义了一个命名空间，浏览器会将此命名空间用于该属性所在元素内的所有内容。

例如，如果需要使用符合 XML 规范的 XHTML 文档，则应该在文档中的`<html>` 标签中至少使用一个 xmlns 属性，以指定整个文档所使用的主要命名空间：

```html
<html xmlns="http://www.w3.org/1999/xhtml">
```

如果需要在一个 div 元素中显示一串数学公式，则可以为该 div 元素定义一个数学命名空间。比如这样：

```html
<div xmlns="http://www.w3.org/1999/Math/MathMl">x3/x</div>
```

虽然在大多数情况下，绝大多数 XHTML 作者都不需要定义多个命名空间，但是您仍然有必要理解存在着多个命名空间，以便在需要选择将基于某个 DTD 的内容嵌入其他 DTD 定义的内容中时，可以管理多个命名空间。