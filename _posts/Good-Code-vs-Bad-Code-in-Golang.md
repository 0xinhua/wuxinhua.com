---

title: 'Good Code vs Bad Code in Golang'
excerpt: '最近我被问到关于`Golang`好代码和不好的代码的一些细节问题，我发现这个问题非常有趣，有趣到可以就这个问题写一篇文章'
coverImage: ''
date: '2018-04-30 14:04:21'


---

最近在学习`Go`，也顺便在[GCTT](https://studygolang.com/gctt)社区帮忙翻译了一些文章。

原文地址：[Good Code vs Bad Code in Golang](https://teivah.io/blog/good-code-vs-bad-code-in-golang/)
作者：[Teivah Harsanyi](https://teivah.io/)

最近我被问到关于`Golang`好代码和不好的代码的一些细节问题，我发现这个问题非常有趣，有趣到可以就这个问题写一篇文章。为了阐明我的观点，我举了一些我在`Air Traffic Management`（`ATM`）航空交通管制领域的代码例子，这些代码托管在[Github](https://github.com/teivah/golang-good-code-bad-code)上。

## 背景

首先，简短地描述一下项目的背景。

`Eurocontrol`(欧洲航管组织)是一个管理欧洲各国航空交通的组织。`Eurocontrol`和`Air Navigation Service Provider`(`ANSP`)之间共同的数据交换网络称为`AFTN`。这个网络主要用来交换两种格式的信息： `ADEXP` 和 `ICAO`(国际民航组织)格式信息。每一种信息都有它们自己的语法格式，但在语义上，或多或少它们是相同的。在这个背景下，性能必须是实现的关键因素。

这个项目需要提供基于`GO`语言的用于转换`ADEXP`格式信息的两种实现(`ICAO`格式的转换并没有体现在这次对比中)：

- 不好的实现方式（`package`包名：[bad](https://github.com/teivah/golang-good-code-bad-code/tree/master/bad)）  

- 重构之后的实现方式（`package`包名：[good](https://github.com/teivah/golang-good-code-bad-code/tree/master/good)）  

- `ADEXP`格式的信息例子可以在[这里](https://raw.githubusercontent.com/teivah/golang-good-code-bad-code/master/resources/tests/adexp.txt)找到。

这次对比的结构里，在`ADEXP`信息中，解析处理部分只是一个子集，至今它仍然跟`Go`中常见的一些错误有关系。

## 解析

概括地讲，一个`ADEXP`信息是一个`tokens`的集合，可以是下面任意一种：

- 简单的

 > -ARCID ACA878

代表`ARCID`(航班`ID`) 是`ACA878`。

- 循环的

 > -EETFIR EHAA 0853  
   -EETFIR EBBU 0908

这个例子代表的是一个`FIR`(飞行情报区)列表，第一个航班是`EHAA 0853`,第二个`EBBU 0908`。

- 复杂的

 > -GEO -GEOID GEO01 -LATTD 490000N -LONGTD 0500000W  
 > -GEO -GEOID GEO02 -LATTD 500000N -LONGTD 0400000W

一个循环的`tockens`列表，每一行包含一个子`token`列表（在这个例子中是`GEOID`， `LATTD`， `LONGTD`）。

结合项目背景，实现一个并行执行的转化代码变得很重要。所以有以下算法：

- 实现一个对输入进行清理和重新排列的预处理过程（我们需要清除可能存在的空格，重新排列例如`COMMENT`等的多行`tokens`）

- 然后分割每一行至一个协程中。每一个协程将会负责处理一行`tokens`，并且返回结果。

- 最后一个步骤同样重要，整合结果并且返回一个`Message`消息)结构体，这是一个公共的结构，不管是`ADEXP`还是`ICAO`类型的信息。

每一个包包含一个`adexp.go`文件暴露主要的`ParseAdexpMessage()`方法。

## 逐步对比

现在我们逐步来看下我认为的不好的代码，并且我是如何重构它的。

## String类型 vs  []byte类型

限制输入类型为字符串类型并不好。`Go`对`byte`类型的处理提供了强大的支持（例如基础的`trim`, `regexp`等），并且输入将会很大程度上类似于`[]byte`(鉴于`AFTN`信息是通过`TCP`协议来接收的)，实际上没有理由强制要求字符串类型的输入。

## 错误处理

错误的处理实现有点糟糕。

我们会发现忽视了在第二个参数中返回的一些可能存在的错误：

```Go
preprocessed, _ := preprocess(string)
```

好的实现方式是捕获每一个可能的错误：

```Go
preprocessed, err := preprocess(bytes)
if err != nil {
return Message{}, err
}
```

我们可以在下面这种不好的代码中也能找到犯的一些错误：

```Go
if len(in) == 0 {
return "", fmt.Errorf("Input is empty")
}
```

第一个错误是语法上的。根据Go的语法，错误提示的字符串既不是大写也不是以标点符号结尾。

第二个错误是如果一个错误信息是一个简单的字符串常量（不需要格式化），使用轻量的`errors.New()`性能会更好。

好的实现如下：

```Go
if len(in) == 0 {
 return nil, errors.New("input is empty")
}
```

## 避免嵌套

`mapLine()`函数就是一个很好的例子来说明避免嵌套调用。不好的代码如下：

```Go
func mapLine(msg *Message, in string, ch chan string) {
    if !startWith(in, stringComment) {
        token, value := parseLine(in)
        if token != "" {
            f, contains := factory[string(token)]
            if !contains {
                ch <- "ok"
            } else {
                data := f(token, value)
                enrichMessage(msg, data)
                ch <- "ok"
            }
        } else {
            ch <- "ok"
            return
        }
    } else {
        ch <- "ok"
        return
    }
}
```

相反，好的代码表示得很清晰：

```Go
func mapLine(in []byte, ch chan interface{}) {
    // Filter empty lines and comment lines
    if len(in) == 0 || startWith(in, bytesComment) {
        ch <- nil
        return
    }

    token, value := parseLine(in)
    if token == nil {
        ch <- nil
        log.Warnf("Token name is empty on line %v", string(in))
        return
    }

    sToken := string(token)
    if f, contains := factory[sToken]; contains {
        ch <- f(sToken, value)
        return
    }

    log.Warnf("Token %v is not managed by the parser", string(in))
    ch <- nil
}
```

在我看来，这使得代码易读性更强。此外，这种扁平化的处理方式也应该加到错误捕获代码中，下面的例子：

```Go
a, err := f1()
if err == nil {
    b, err := f2()
    if err == nil {
        return b, nil
    } else {
        return nil, err
    } 
} else {
    return nil, err
}
```

应该被修改成：

```Go
a, err := f1()
if err != nil {
    return nil, err
}
b, err := f2()
if err != nil {
    return nil, err
}
return b, nil
```

同样，第二段代码的可读性更好。

## 传值采用value还是reference

预处理方法的实现并不好：

```Go
func preprocess(in container) (container, error) {
}
```

结合项目的背景来说(考虑性能)，考虑到一个信息的结构体有可能会比较大，更好的方式是在`container`结构内传入指针，否则，在上面例子的代码中`container`的值将会在每一次调用的时候被覆盖掉。

好的实现代码将不会有这个问题因为它单个的处理方式(一个简单的24字节的结构，不管什么类型数据)。

```go
func preprocess(in []byte) ([][]byte, error) {
}
```

更广泛地说，无论是根据引用还是数值传递参数都不是一个符合语言习惯的用法。通过数值传递数据也能帮助确定一个方法将不会带来任何的副作用（就像在函数的输入中传递数据一样）。这样做有几个好处，例如单元测试、在代码并发上的重构（否则我们需要检查每个子函数来确定传递是否完成）

我确信这种这种写法需要根据实际项目背景小心地使用。

## 并发

不好的实现方式源于一个最初的好的想法：利用协程并发处理数据（一个协程处理一行）。

这导致了在一个协程里反复调用`mapLine()`。

```go
for i := 0; i < len(lines); i++ {
    go mapLine(&msg, lines[i], ch)
}
```

`mapLine()`方法三个参数：

- 返回指向最后一个`Message`结构的指针。这意味着每个`mapLine()`将会被同一个变量填充。

- 当前行

- 一个`channel`通道用于处理行完成时发送消息

为了共享`Message`消息而去传递一个指针违背了Go基本原则：

> 不要通过共享内存来通信，而应该通过通信来共享内存

传递共享的变量有两个主要的缺点：

- 缺点 #1：分割一致的修饰

因为结构中包含一些切片可以被同时修改（同时被两个或者更多的协程）我们得处理互斥的问题。

例如，`Message`消息结构包含一个`Estdata []estdata`，通过加上另一个`estdata`修改这部分必须像下面这样处理：

```go
mutexEstdata.Lock()
for _, v := range value {
    fl := extractFlightLevel(v[subtokenFl])
    msg.Estdata = append(msg.Estdata, estdata{v[subtokenPtid], v[subtokenEto], fl})
}
mutexEstdata.Unlock()
```

事实上，排除特定用法，在协程中使用`mutex`(互斥锁)并不是一个好的选择。

- 缺点 #2：伪共享

通过线程或者协程分享内存并不是一个好的方式因为可能存在伪共享（一个在`CPU`缓存中的进程可以被另一个`CPU`缓存)。这意味着我们需要尽可能地避免通过线程和协程来共享那些需要修改的变量。

在这个例子中，虽然，我不认为伪共享在输入的文件教少的情况下有一个很大的影响（在`Message`消息结构体中增加文件的性能测试结果或多或少是一样的），但在我看来这也是一个很重要的需要牢记的点。

现在让我们来看下好的并发处理：

```Go
for _, line := range in {
    go mapLine(line, ch)
}
```

现在，`mapLine()`只接受两个参数：

- 当前行

- `channel`通道，当前行处理完后，这里的通道不再简单地用来发生消息，也用来传送实际的结果。这意味着不应该使用协程去修改最后的消息结构。

结果在父级的协程中整合。（产生的`mapLine()`方法在各自的协程中被调用）

```Go
msg := Message{}

for range in {
    data := <-ch

    switch data.(type) {
        // Modify msg variable
    }
}
```

这个代码更加一致，在我看来，根据`Go`的原则：通过通信来共享内存。通过单一的协程来修改消息变量防止了可能由于并发导致的修改和伪共享问题。

这部分代码潜在的问题是造成了每一行一个协程，这种实现将能够运行，因为`ADEXP`信息行数将不会太大，在这个简单实现中，一个请求将产生一个协程，在生成能力上将无法考量。一个更好的选择是创建一个协程池来复用协程。

## 行处理通知

在上面不好的代码中，一旦`mapLine()`处理完一行，我们需要在父级的协程中进行标识。这部分将通过使用`chan string`通道和方法的调用：

```Go
ch <- "ok"
```

因为父级协程并不会检查通道传过来的结果，较好的处理是通过`chan struct{}`使用`ch <- struct{}{}`，或者更好的选择(`GC`会更差)是通过`chan interface{}`使用`ch <- nil`处理。

另一个类似的方法（在我看来甚至会更简洁）是使用`sync.WaitGroup`，因为当每一个`mapLine()`执行完了，父级的协程还需继续运行。

## If条件判断

在`Go`的条件判断语句中，允许在条件前进行赋值。

一个改进版的代码：

```Go
f, contains := factory[string(token)]
if contains {
    // Do something
}
```

如下：

```Go
if f, contains := factory[sToken]; contains {
    // Do something
}
```

这样代码的可读性更高。

## Switch选择

代码中犯得另一个错误是没有设置`switch`中的`default`选项：

```Go
switch simpleToken.token {
case tokenTitle:
    msg.Title = value
case tokenAdep:
    msg.Adep = value
case tokenAltnz:
    msg.Alternate = value 
// Other cases
}
```

如果开发者能够考虑到所有的情况，`switch`的`default`项是可选的，但是像下面这样捕获特殊的情况肯定会更好。

```Go
switch simpleToken.token {
case tokenTitle:
    msg.Title = value
case tokenAdep:
    msg.Adep = value
case tokenAltnz:
    msg.Alternate = value
// Other cases    
default:
    log.Errorf("unexpected token type %v", simpleToken.token)
    return Message{}, fmt.Errorf("unexpected token type %v", simpleToken.token)
}
```

处理`default`选项会帮助开发者捕获开发过程中可能造成的`bugs`。

## 递归

`parseComplexLines()`是一个解析复杂`token`的方法，在不好的代码中是使用递归来处理：

```Go
func parseComplexLines(in string, currentMap map[string]string, 
 out []map[string]string) []map[string]string {

    match := regexpSubfield.Find([]byte(in))

    if match == nil {
        out = append(out, currentMap)
        return out
    }

    sub := string(match)

    h, l := parseLine(sub)

    _, contains := currentMap[string(h)]

    if contains {
        out = append(out, currentMap)
        currentMap = make(map[string]string)
    }

    currentMap[string(h)] = string(strings.Trim(l, stringEmpty))

    return parseComplexLines(in[len(sub):], currentMap, out)
}
```

但是`Go`不支持尾调用优化递归，好的代码使用迭代算法能得到同样的结果：

```Go
func parseComplexToken(token string, value []byte) interface{} {
    if value == nil {
        log.Warnf("Empty value")
        return complexToken{token, nil}
    }

    var v []map[string]string
    currentMap := make(map[string]string)

    matches := regexpSubfield.FindAll(value, -1)

    for _, sub := range matches {
        h, l := parseLine(sub)

        if _, contains := currentMap[string(h)]; contains {
            v = append(v, currentMap)
            currentMap = make(map[string]string)
        }

        currentMap[string(h)] = string(bytes.Trim(l, stringEmpty))
    }
    v = append(v, currentMap)

    return complexToken{token, v}
}
```

第二种写法在性能上会优于第一种。

## 常量管理

我们需要管理一个常量来区分`ADEXP`和`ICAO`类型的消息。不好的写法如下：

```Go
const (
    AdexpType = 0 // TODO constant
    IcaoType  = 1
)

```

反之，利用`Go`的`iota`（常量计数器）能写出更优雅的代码：

```Go
const (
    AdexpType = iota
    IcaoType 
)
```

输出的结果是一致的，但是规避了可能存在的错误。

## 接收方法

每个转换提供一个函数来判断每个`Message`是非涉及到上一个级别（至少在350级以上的路线点）

不好的代码如下：

```Go
func IsUpperLevel(m Message) bool {
    for _, r := range m.RoutePoints {
        if r.FlightLevel > upperLevel {
            return true
        }
    }

    return false
}

```

意味着我们必须把`Message`当函数的参数。反之，好的代码是提供一个简单的函数作为`Message`的接收者。

```Go
func (m *Message) IsUpperLevel() bool {
    for _, r := range m.RoutePoints {
        if r.FlightLevel > upperLevel {
            return true
        }
    }

    return false
}
```

第二种方法是更可取的，我们简单地让消息实现了一个特定的行为。这也是使用`Go`实现接口的第一步，如果某天我们需要创建另一个同一行为(`IsUpperLevel()`)的结构，这部分代码不需要被重构（因为`Message`已经继承该行为）。

## 注释

注释这部分的问题很明显，但是不好的注释很少被提及。

另一方面，在真实项目中我尝试着去做很好的注释，尽管我并不是那种每行都会注释的人，我依然相信至少在每个函数和在一个复杂的函数的核心部分写上注释是非常重要的事情。

举个例子：

```Go
// Split each line in a goroutine
for _, line := range in {
    go mapLine(line, ch)
}

msg := Message{}

// Gather the goroutine results
for range in {
    // ...
}

```

在注释中提供一个另外的例子也会提供很大的帮助：

```Go
// Parse a line by returning the header (token name) and the value. 
// Example: -COMMENT TEST must returns COMMENT and TEST (in byte slices)
func parseLine(in []byte) ([]byte, []byte) {
    // ...
}
```

这样的一个额外的例子对另一个开发者更好地了解当前这个项目很有帮助。

最后同样重要的，根据`Go`的最佳实践，包本身也需要注释。

```Go
/*
Package good is a library for parsing the ADEXP messages.
An intermediate format Message is built by the parser.
*/

package good

```

## 日志处理

另一个很明显的问题是在缺少日志处理。因为我并不喜欢`Go`提供的标准日志`package`包，我在这个项目中使用一个叫`logrus`第三方的日志包。

## go的fmt包

`Go`提供一个强力的工具集`go fmt`。遗憾的是我们忘记去利用它。

## DDD

`DDD`带来了通用语言的概念，以强调所有项目之间共享语言的重要性(`business experts`, `dev`, `testers` 等)。

这点在这个项目上可能无法衡量，但是从整个项目的可维护性上来考虑，保持一个简单的兼容上下文结构的`Message`也是重要的一点。

# 性能结果

在`i7-7700 4x 3.60Ghz`的硬件环境下，我通过基准测试来对比两种代码：

- 好的代码： 60430 ns/op

- 不好的代码： 45996 ns/op

不好的代码比好的代码慢了超过30%。

# 结论

在我看来，要对好的代码和不好的代码给出一个普遍的定义非常难。在一个环境中，一段代码可以被认为是好的代码，但在另一个环境中可能被认为是不好的代码。

一个很明显的特征就是好的代码在给定的环境中能很好地解决问题，如果代码高效，但是不满足需求，那也是徒劳。

同时，考虑代码的简洁、可维护性、高效对开发者来说非常重要。

> 性能的提升伴随着代码复杂性的增加。

一个好的开发者能够在给定的环境中在上面这些特征里找到一个平衡。就像在`DDD`里,`context`就是解决方案🙂。
