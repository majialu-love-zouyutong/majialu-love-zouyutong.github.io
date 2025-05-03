---
title: Rust入门
date: 2025-05-03 11:38:03
tags: rust
cover: /img/rust.png
top_img: /img/rust.png
---

# 所有权

所有权是Rust最独特的特性，对整个语言有着深远的影响。它使Rust能够在不需要垃圾回收器的情况下提供内存安全保证，因此理解所有权的工作方式非常重要。在本章中，我们将讨论所有权以及几个相关特性：借用，切片以及Rust如何在内存中布局数据。


## 什么是所有权

所有权是一组规则，用于管理Rust程序如何管理内存。所有程序在运行时都必须管理他们使用计算机内存的方式。有些语言具有垃圾回收机制，在程序运行时会定期查找不再使用的内存；在其他语言中，程序员必须显示地分配和释放内存。Rust采用第三种方法：通过所有权系统以及一系列由编译器检查的规则来管理内存。如果违反了任何规则，程序将无法编译。所有的所有权系统都不会在程序运行时减慢程序速度。

由于所有权对于许多程序员来说是一个新概念，因此确实需要一些时间来适应。好消息是，随着你对Rust和所有权系统规则的经验越来越丰富，你会发现自然地编写安全且高效的代码变得越来越容易。继续努力！

当你理解了所有权，你将拥有理解使Rust独特的特性的坚实基础。在本章中，你将通过一些示例来学习所有权，这些示例侧重于一个非常常见的数据结构：字符串。

> 栈（Stack）和堆（Heap）
> 许多编程语言并不需要你经常考虑栈和堆。但在像Rust这样的系统编程语言中，一个值是在栈上还是在堆上，会影响语言的行为以及为什么你必须做出某些决定。本章后面将描述与栈和堆相关的所有权部分，所以在此先简要解释一下。
>
> 栈和堆都是代码在运行时可以使用的内存部分，但他们的结构不同。栈按照获取值的顺序来存储值，并按相反的顺序移除值。这被称为LIFO（last in first out，后进先出）。向栈中添加数据称为压栈，从栈中移除数据称为弹栈。所有存储在栈上的数据都必须具有已知且固定的大小。在编译时大小未知或大小可能变化的数据必须存储在堆上。
>
> 堆的组织性较差：当你在将数据放在堆上时，你会请求一定量的空间。内存分配器在堆中找到一个足够大的空位，将其标记为正在使用，并返回一个指针，该指针是该位置的地址。这个过程称为堆分配，有时简称为分配（将值压入栈中不被视为分配）。因为堆指针是一个已知，固定的大小，所以你可以将指针存储在栈上，但当你想要实际数据时，你必须跟随指针。
>
> 将数据压入栈中比在堆上分配内存更快，因为分配器无需搜索存储新数据的位置；该位置始终位于栈顶。相比之下，在堆上分配内存空间需要更多的工作，因为分配器必须首先找到一个足够大的空间来存放数据，然后进行账目管理以准备下一次分配。
>
> 在堆上访问数据比栈上访问数据要慢，因为你必须跟随指针才能到达那里。现在处理器如果内存跳跃次数越少，运行速度越快。
>
> 当你的代码调用一个函数时，传递给函数的值（包括可能指向堆上数据的指针）以及函数的局部变量都会压入栈中。当函数结束时，这些值会从栈中弹出。
>
> 跟踪代码中那些部分使用堆上的哪些数据，最小化堆上重复数据量，以及清理堆上未使用的数据，以避免空间不足，这些都是所有权解决的问题。一旦你理解了所有权，你就不太需要经常考虑栈和堆，但了解所有权的核心目的是管理堆数据，这有助于解释为什么它工作得如此之好。
>

### 所有权规则

- 每个Rust中的值都有一个所有者。
- 同时只能有一个所有者。
- 当所有者超出作用域时，值将被丢弃。

### 变量作用域

作为所有权的一个示例，我们将查看一些变量的作用域。作用域是程序中一个项目有效的范围。下面是一个变量的例子。

```rust
let s = "hello";
```

变量`s`指的是一个字符串字面量，其中字符串的值硬编码在我们的程序文本中。该变量从声明开始直到当前作用域的结束都是有效的。

```rust
{
  // s在这里无效，它还没有被声明
  let s = "hello";
  // s从这里开始有效

  // 用s做一些事

} // 作用域结束，s不再有效。

```
换句话说，这里有两个重要的时间节点：

- 当s进入作用域时，他是有效的。
- 它将保持有效，直到他退出作用域。

在这一点上，作用域与变量有效性的关系与其他编程语言类似。现在我们将在此基础上引入`String`类型。

### String类型

String类型管理在堆上分配的数据，因此能够存储在编译时我们不知道数量的文本。您可以使用`from`函数从一个字符串字面量创建一个`String`，如下所示：

```rust
let s = Stirng::from("hello");
```

这种字符串可以被修改

```rust
let mut s = String::from("hello");
s.push_str(", world!"); // push_str() 往一个字符串末尾添加字面量
println!("{s}");  // 输出 hello, world!
```
### 内存和分配

在字符串时字面量的情况下，我们在编译时就知道其内容，因此文本会直接硬编码到最终的可执行文件中。这就是为什么字符串字面量既快又高效。但这些属性仅来自于字符串字面量的不可变形。不幸的是，我们无法在编译时将未知大小或可能在程序运行时变化的每段文本中都将一块内存放入二进制文件中。

使用`String`类型，为了支持可变，可增长的文本片段，我们需要在堆上分配一定量的内存，该内存在编译时未知。这意味着:

- 内存必须在运行时村内存分配器请求
- 我们需要一种方法在完成我们的`String`后，将内存返回给分配器。

第一部分是我们完成的，当我们调用`Stirng::from`时，其实现请求所需内存。这在编程语言中几乎是通用的。

然而，第二部分是不同的。在具有垃圾回收器（GC）的语言中，GC会跟踪并清理不再使用的内存，我们不需要考虑它。在大多数没有GC的语言中，我们需要负责确定何时内存不再被使用，并调用代码来显式地释放它，就像我们请求它一样。正确地完成这项工作在历史上一直是一个困难的编程问题。如果我们忘记了，我们会浪费内存。如果我们做的太早，我们会得到一个无效的变量。如果我们重复做两次，回导致错误。我们需要将一个`allocate`和一个`free`精确配对。

Rust走了一条不同的道路：一旦拥有它的变量超出作用域，内存就会自动返回。这是使用`String`而不是字符串字面量重写的作用域示例

```rust
{
  let s = String::from("hello"); // s从这里开始有效
  // 用s做一些事
} // 作用域结束，s失效
```

在某个自然点，我们可以将我们的`String`需要的内存归还给分配器：当`s`超出作用域时。当一个变量超出作用域时，Rust会为我们调用一个特殊的函数。这个函数被称为`drop`，这是`String`的创建者可以归还内存的地方。Rust会自动在闭合花括号处调用`drop`。

这种模式对Rust代码的编写方式产生了深远的影响。现在它可能看起来很简单，但在更复杂的情况下，当我们想要多个变量使用我们在堆上分配的数据时，代码的行为可能会出乎意料。现在让我们探讨一些这样的情况。

### 移动变量和数据

在Rust中，多个变量可以以不同的方式与同一份数据交互。

```rust
let x = 5;
let y = x;
```

我们将`5`的值绑定到`x`；然后复制`x`中的值并将其绑定到`y`.现在我们有两个变量`x`和`y`,他们都等于`5`.这确实就是这样发生的。因为整数是具有已知，固定大小的简单值，这两个`5`被压入栈中。

现在我们来看看`String`版本：

```rust
let s1 = String::from("hello");
let s2 = s1;
```
一个String由三部分组成：
- 指向包含字符串内容的内存的指针
- 长度
- 容量
这组数据存储在栈上，右侧是包含内容的堆内存。

![20250503154611](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250503154611.png)

长度表示当前`String`内容使用的内存量（以字节为单位）。容量表示`String`从分配器接收到的总内存量（以字节为单位）。长度和容量之间的差异很重要，但在这里并不重要，所以目前先忽略容量。

当我们将 s1 赋值给 s2 时， String 数据被复制，这意味着我们复制了栈上的指针、长度和容量。我们不复制指针指向的堆上的数据。换句话说，内存的数据如下图

![20250503154831](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250503154831.png)

之前我们提到，当一个变量超出作用域时，Rust会自动调用`drop`函数并清理该变量的堆内存。但是当两个数据指针都指向同一个位置时，这里有一个问题：当`s2`和`s1`超出作用域时，他们都会尝试释放相同的内存。这被称为双重释放错误，是我们之前提到的内存安全错误之一。重复释放内存考能导致内存损坏，这可能会引发安全漏洞。

为了确保内存安全，在`let s2 = s1`之后，Rust认为`s1`不再有效。因此，当`s1`超出作用域时，Rust不需要释放任何内容。查看在创建`s2`后尝试使用`s1`会发生什么；它将无法工作：

```rust
let s1 = String::from("hello");
let s2 = s1;

println!("{s1}, world!");
```
你会得到这样的错误，因为Rust阻止你使用已经失效的引用：

```bash
$ cargo run
   Compiling ownership v0.1.0 (file:///projects/ownership)
error[E0382]: borrow of moved value: `s1`
 --> src/main.rs:5:15
  |
2 |     let s1 = String::from("hello");
  |         -- move occurs because `s1` has type `String`, which does not implement the `Copy` trait
3 |     let s2 = s1;
  |              -- value moved here
4 |
5 |     println!("{s1}, world!");
  |               ^^^^ value borrowed here after move
  |
  = note: this error originates in the macro `$crate::format_args_nl` which comes from the expansion of the macro `println` (in Nightly builds, run with -Z macro-backtrace for more info)
help: consider cloning the value if the performance cost is acceptable
  |
3 |     let s2 = s1.clone();
  |                ++++++++

For more information about this error, try `rustc --explain E0382`.
error: could not compile `ownership` (bin "ownership") due to 1 previous error

```

如果你在其他语言中听到过浅拷贝和深拷贝这些术语，那么在指针、长度和容量不复制数据的情况下复制指针的概念可能听起来就像是在进行浅拷贝。但因为在 Rust 中，第一个变量也会被失效，所以它不是被称为浅拷贝，而是被称为移动。在这个例子中，我们会说 s1 被移动到了 s2 。所以，实际上发生的情况如下图：

![20250503155600](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250503155600.png)

这就解决了我们的问题！只有`s2`是有效的，当它超出作用域时，它将独自释放内存，我们就完成了。

此外，还有一个隐含的设计选择：Rust永远不会自动创建“深层”数据副本。因此，任何自动复制在运行时性能都可以认为是低成本的。

### 范围和赋值

对于作用域，所有权以及通过`drop`函数释放的内存之间的关系，这个说法同样成立。当你给现有变量赋一个全新的值时，Rust会调用`drop`并立即释放原始值的内存。以下代码可以作为例子。

```rust
let mut s = String::from("hello");
s = String::from("ahoy");

println!("{s}, world!");
```

我们首先声明一个变量 s ，并将其绑定到值为 "hello" 的 String 。然后我们立即创建一个新的值为 "ahoy" 的 String ，并将其赋值给 s 。此时，堆上的原始值没有任何引用了。

![20250503160034](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250503160034.png)

因此，原始字符串立即超出作用域。Rust 将运行 drop 函数对其执行，并立即释放其内存。当我们打印最后的值时，它将是 "ahoy, world!" 。

### 克隆变量和数据

如果我们想要深度复制 String 的堆数据，而不仅仅是栈数据，我们可以使用一种常见的方法，称为 clone 。我们将在第 5 章中讨论方法语法，但由于方法在许多编程语言中都是常见特性，你可能之前已经见过。

这里是一个 clone 方法的示例：

```rust 
let s1 = String::from("hello");
let s2 = s1.clone();

println!("s1 = {s1}, s2 = {s2}");
```
这可以正常工作，并明确产生下图中所示的行为，堆数据确实被复制了。

![20250503160530](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250503160530.png)

当你看到对 clone 的调用时，你就知道正在执行一些任意代码，而这些代码可能很昂贵。这是一个视觉指示，表明正在发生不同的事情。

### 栈上数据复制

```rust

let x = 5;
let y = x;

println!("x = {x}, y = {y}");
```

但这段代码似乎与我们刚刚学到的知识相矛盾：我们没有调用 clone ，但 x 仍然有效，并且没有被移动到 y 中。

原因在于，像整数这样的已知在编译时具有已知大小的类型完全存储在栈上，因此实际值的副本制作非常快。这意味着我们没有理由阻止在创建变量 y 之后 x 仍然有效。换句话说，在这里深拷贝和浅拷贝之间没有区别，所以调用 clone 不会与常规的浅拷贝产生任何不同，我们可以省略它。

Rust 有一个特殊的注解，称为 Copy 特质，我们可以将其放置在存储在栈上的类型上，整数就是这样（我们将在第 10 章中更多地讨论特质）。如果一个类型实现了 Copy 特质，使用它的变量不会移动，而是被简单地复制，这使得它们在赋值给另一个变量后仍然有效。

Rust 不允许我们使用 Copy 注解类型，如果该类型或其任何部分实现了 Drop 特性。如果类型需要在值超出作用域时执行某些特殊操作，并且我们向该类型添加了 Copy 注解，则会发生编译时错误。有关如何将 Copy 注解添加到您的类型以实现特性的说明，请参阅附录 C 中的“可推导特性”。

那么，哪些类型实现了 Copy 特性？您可以检查给定类型的文档以确信，但一般来说，任何简单标量值的组合都可以实现 Copy ，而任何需要分配或以某种形式占用资源的类型都不能实现 Copy 。以下是实现 Copy 的类型示例：

- 所有整数类型，例如`u32`
- 布尔类型`bool`
- 所有浮点类型，例如`f64`
- 字符类型`char`
- 只包含实现Copy类型的元组

### 所有权和函数

函数传递值的机制与将值赋给变量的机制相似。将变量传递给函数与赋值操作一样，会移动或复制。下面代码中的示例包含一些注释，展示了变量如何进入和退出作用域。

```rust
fn main() {
  let s = String::from("hello");  // s 进入作用域

  takes_ownership(s); // s的值移动到函数中，所以在这里实效

  let x = 5;  // x进入作用域

  makes_copy(x);  // 因为i32实现了Copy类型，所以x没有移动到函数中，后续还可以使用x
  println!("{}", x);
} // 这里x离开作用域，但是由于s的值被移动了，所以每什么特殊情况发生。

fn takes_ownership(some_string: String) {
  // some_string 进入作用域
  println!("{some_string}");
} // 这里some_string离开作用域，drop被调用，内存被释放。

fn makes_copy(some_integer: i32) {
  // some_integer 进入作用域
  println!("{some_integer}");
} // 这里，some_integer离开作用域，没有什么特殊的事情发生。
```
如果在调用 takes_ownership 之后尝试使用 s ，Rust 将抛出编译时错误。这些静态检查可以保护我们免受错误的影响。尝试向 main 添加代码，使用 s 和 x 来查看它们的使用位置，以及所有权规则阻止您使用它们的位置。

### 返回值和作用域

返回值也可以转移所有权。

```rust
fn main() {
  let s1 = gives_ownership(); // gives_ownership移动它的返回值到s1中

  let s2 = String::from("hello"); // s2进入作用域

  let s3 = takes_and_gives_back(s2);  // s2被移动到takes_and_gives_back中，这个函数有返回他的值到s3中
} // 这里，s3离开作用域并且被drop。s2被移动，所以没有事情发生。s1离开作用域也被drop

fn gives_ownership() -> String {
  // gives_ownership将会移动它的返回值到调用者中
  let some_string = String::from("yours");  // some_string进入作用域

  some_string // some_thing 被返回并且移动出调用函数
}

fn takes_and_gives_back(a_string: String) -> String {
  // a_string进入作用域

  a_string // a_string被返回并移动到调用者中。
}

```

变量的所有权每次都遵循相同的模式：将值赋给另一个变量就会移动它。当一个包含堆上数据的变量超出作用域时，除非数据的所有权已转移到另一个变量，否则将由 drop 负责清理。

虽然这样可行，但每次函数调用都要获取和返回所有权确实有点繁琐。如果我们想让函数使用一个值但不获取它的所有权怎么办？如果我们想再次使用传递进来的任何东西，除了函数体中可能返回的数据外，还需要将它传递回来，这确实很烦人。

Rust 允许我们使用元组返回多个值。

```rust
fn main() {
  let s1 = String::from("hello");

  let (s2, len) = calculate_length(s1);

  println!("The length of '{s2}' is {len}.");
}

fn calculate_length(s: String) -> (String, usize) {
  let length = s.len(); // len()返回字符串的长度
  (s, length)
}

```

但是，对于一个本应普遍存在的概念来说，这太过繁琐，也做了很多工作。幸运的是，Rust 有一个使用值而不转移所有权的功能，称为引用。

## 引用和借用

上面代码的问题在于，我们必须将`String`返回给调用函数，以便我们可以在调用`calculate_length`之后仍然使用`String`，因为`String`被移动到了`calculate_length`中。相反，我们可以提供一个对`String`值的引用。引用就像指针一样，跟随引用可以访问存储在该地址的数据。该数据由某个其他变量拥有。与指针不同，引用保证在整个引用的生命周期内指向特定类型的有效值。

下面是一个示例，将对象引用作为参数而不是接收值的拥有权。

```rust
fn main() {
  let s1 = String::from("hello");

  let len = calculate_length(&s1);

  println!("The length of '{s1}' is {len}.");
}

fn calculate_length(s: &String) -> usize {
  s.len()
}

```

首先，请注意，变量声明和函数返回值中的所有元组代码都消失了。其次，请注意，我们将 &s1 传递给 calculate_length ，并在其定义中，我们使用 &String 而不是 String 。这些 & 符号代表引用，它们允许你引用某个值而不拥有它。图 4-6 展示了这一概念。

![20250503163617](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250503163617.png)

&s1 语法允许我们创建一个引用，该引用指向 s1 的值，但不拥有它。因为引用不拥有它，所以当引用不再使用时，它指向的值不会被丢弃。

同样，函数的签名使用 & 来表示参数 s 的类型是一个引用。让我们添加一些解释性注释：

```rust
fn calculate_length(s: &String) -> usize { // s is a reference to a String
    s.len()
} // Here, s goes out of scope. But because s does not have ownership of what
  // it refers to, the value is not dropped.
```

变量 s 的作用域与任何函数参数的作用域相同，但由于 s 没有所有权，引用指向的值在 s 停止使用时不会被丢弃。当函数以引用作为参数而不是实际值时，我们不需要返回值以归还所有权，因为我们从未拥有过所有权。

我们称创建引用的动作为借用。就像现实生活中，如果一个人拥有某物，你可以从他那里借用。当你完成时，你必须归还它。你并不拥有它。

那么，如果我们尝试修改我们正在借用的东西会发生什么？尝试代码。剧透一下：这是不行的！

```rust
fn main() {
    let s = String::from("hello");

    change(&s);
}

fn change(some_string: &String) {
    some_string.push_str(", world");
}
```

```bash
$ cargo run
   Compiling ownership v0.1.0 (file:///projects/ownership)
error[E0596]: cannot borrow `*some_string` as mutable, as it is behind a `&` reference
 --> src/main.rs:8:5
  |
8 |     some_string.push_str(", world");
  |     ^^^^^^^^^^^ `some_string` is a `&` reference, so the data it refers to cannot be borrowed as mutable
  |
help: consider changing this to be a mutable reference
  |
7 | fn change(some_string: &mut String) {
  |                         +++

For more information about this error, try `rustc --explain E0596`.
error: could not compile `ownership` (bin "ownership") due to 1 previous error

```
正如变量默认是不可变的，引用也是如此。我们不允许修改我们引用的对象。

### 可变引用

```rust
fn main() {
  let mut s = String::from("hello");

  change(&mut s);
}

fn change(some_string: &mut String) {
  some_string.push_str(", world");
}
```

首先，我们将 s 改为 mut 。然后，我们使用 &mut s 创建一个可变引用，并调用 change 函数，并将函数签名更新为接受一个可变引用 some_string: &mut String 。这使得 change 函数将修改它所借用的值这一点非常明确。

可变引用有一个很大的限制：如果你有一个值的可变引用，那么你不能有该值的任何其他引用。以下尝试为 s 创建两个可变引用的代码将失败：

```rust
let mut s = String::from("hello");

let r1 = &mut s;
let r2 = &mut s;

println!("{},{}", r1, r2);
```

```bash
$ cargo run
   Compiling ownership v0.1.0 (file:///projects/ownership)
error[E0499]: cannot borrow `s` as mutable more than once at a time
 --> src/main.rs:5:14
  |
4 |     let r1 = &mut s;
  |              ------ first mutable borrow occurs here
5 |     let r2 = &mut s;
  |              ^^^^^^ second mutable borrow occurs here
6 |
7 |     println!("{}, {}", r1, r2);
  |                        -- first borrow later used here

For more information about this error, try `rustc --explain E0499`.
error: could not compile `ownership` (bin "ownership") due to 1 previous error
```

这个错误表示代码无效，因为我们不能同时多次借用 s 的可变引用。第一次可变借用发生在 r1 ，并且必须持续到它在 println! 中被使用，但在创建该可变引用和其使用之间，我们试图在 r2 中创建另一个可变引用 r1 ，它借用了相同的数据。

阻止同一数据在相同时间内有多个可变引用的限制允许进行修改，但以非常受控的方式进行。这是新 Rustaceans 难以理解的地方，因为大多数语言允许你随时进行修改。拥有这种限制的好处是，Rust 可以在编译时防止数据竞争。数据竞争类似于竞争条件，发生在以下三种行为发生时：

- 两个或多个指针同时访问相同的数据
- 至少有一个指针正在用于写入数据
- 没有机制被用来同步对数据的访问

数据竞争会导致未定义的行为，当你在运行时尝试追踪它们时，这个问题可能会变得难以诊断和修复；Rust 通过拒绝编译存在数据竞争的代码来防止这个问题！

和往常一样，我们可以使用花括号来创建一个新的作用域，允许存在多个可变引用，只是不能同时存在：

```rust
    let mut s = String::from("hello");

    {
        let r1 = &mut s;
    } // r1 goes out of scope here, so we can make a new reference with no problems.

    let r2 = &mut s;
```
Rust 对组合可变和不可变引用也强制执行类似的规则。此代码会导致错误：

```rust
let mut s = String::from("hello");

let r1 = &s;
let r2 = &s;
let r3 = &mut s;

println!("{},{}, and {}", r1, r2, r3);

```
```bash
$ cargo run
   Compiling ownership v0.1.0 (file:///projects/ownership)
error[E0502]: cannot borrow `s` as mutable because it is also borrowed as immutable
 --> src/main.rs:6:14
  |
4 |     let r1 = &s; // no problem
  |              -- immutable borrow occurs here
5 |     let r2 = &s; // no problem
6 |     let r3 = &mut s; // BIG PROBLEM
  |              ^^^^^^ mutable borrow occurs here
7 |
8 |     println!("{}, {}, and {}", r1, r2, r3);
  |                                -- immutable borrow later used here

For more information about this error, try `rustc --explain E0502`.
error: could not compile `ownership` (bin "ownership") due to 1 previous error
```

哇！当我们有一个不可变引用指向同一个值时，我们也不能有一个可变引用。

不可变引用的使用者不会期望值突然从他们手中消失！然而，允许多个不可变引用同时存在，因为仅仅读取数据的人没有能力影响其他人读取数据的行为。

注意，一个引用的作用域从其引入之处开始，一直持续到最后一次使用该引用。例如，以下代码可以编译，因为不可变引用的最后使用是在 println! ，在引入可变引用之前：

```rust
let mut s = String::from("hello");

let r1 = &s;
let r2 = &s;
println!("{r1} and {r2}");

let r3 = &mut s;
println!("{r3}");
```

不可变引用 r1 和 r2 的作用域在它们最后一次使用的地方结束，即 println! ，在创建可变引用 r3 之前。这些作用域不重叠，因此此代码是允许的：编译器可以确定在作用域结束之前引用不再被使用。

尽管借用错误有时可能会让人沮丧，但请记住，这是 Rust 编译器在编译时而不是在运行时指出潜在的错误，并准确地指出问题所在。这样，你就不必追踪为什么你的数据不是你所期望的那样了。

### 悬垂引用

在具有指针的语言中，很容易错误地创建悬垂指针——一个引用内存位置的指针，该内存位置可能已被分配给其他人——通过释放一些内存同时保留对该内存的指针。相比之下，在 Rust 中，编译器保证了引用永远不会成为悬垂引用：如果你有一些数据的引用，编译器将确保该数据不会在引用之前超出作用域。

让我们尝试创建一个悬垂引用，看看 Rust 是如何通过编译时错误来防止它们的：

```rust
fn main() {
  let reference_to_nothing = dangle();
}

fn dangle() -> &String {
  let s = String::from("hello");

  &s
}

```

```bash
$ cargo run
   Compiling ownership v0.1.0 (file:///projects/ownership)
error[E0106]: missing lifetime specifier
 --> src/main.rs:5:16
  |
5 | fn dangle() -> &String {
  |                ^ expected named lifetime parameter
  |
  = help: this function's return type contains a borrowed value, but there is no value for it to be borrowed from
help: consider using the `'static` lifetime, but this is uncommon unless you're returning a borrowed value from a `const` or a `static`
  |
5 | fn dangle() -> &'static String {
  |                 +++++++
help: instead, you are more likely to want to return an owned value
  |
5 - fn dangle() -> &String {
5 + fn dangle() -> String {
  |

error[E0515]: cannot return reference to local variable `s`
 --> src/main.rs:8:5
  |
8 |     &s
  |     ^^ returns a reference to data owned by the current function

Some errors have detailed explanations: E0106, E0515.
For more information about an error, try `rustc --explain E0106`.
error: could not compile `ownership` (bin "ownership") due to 2 previous errors
```

因为 s 是在 dangle 内部创建的，所以当 dangle 的代码执行完毕后， s 将会被释放。但我们尝试返回它的引用。这意味着这个引用将指向一个无效的 String 。这可不行！Rust 不允许我们这样做。

这里的解决方案是直接返回 String ：

```rust
fn no_dangle() -> String {
    let s = String::from("hello");

    s
}
```

### 引用规则

- 在任何给定时间，你可以有一个可变引用或任意数量的不可变引用。
- 引用必须始终有效

## 切片

切片允许您引用集合中的连续元素序列，而不是整个集合。切片是一种引用，因此它没有所有权。

这里有一个小问题：编写一个函数，该函数接受一个由空格分隔的单词字符串，并返回该字符串中找到的第一个单词。如果函数在该字符串中找不到空格，则整个字符串必须是一个单词，因此应该返回整个字符串。

让我们来看看在不使用切片的情况下如何编写这个函数签名，以了解切片将解决的问题：

```rust
fn first_word(s: &String) -> ?
```

`first_word`函数有一个`&String`作为参数。我们不需要所有权，所以这没有问题。但是我们应该返回什么？我们实际上没有一种方式来谈论字符串的一部分。然而，我们可以返回由空格表示的单词结束索引。

```rust
fn first_word(s: &String) -> usize {
  let bytes = s.as_bytes();

  for (i, &item) in bytes.iter().enumerate() {
    if item = b' ' {
      return i;
    }
  }
  s.len()
}

```
因为我们需要逐个元素遍历 String 并检查一个值是否为空格，所以我们将我们的 String 转换为使用 as_bytes 方法的字节数组。

接下来，我们使用 iter 方法在字节数组上创建一个迭代器：

我们将在第 13 章更详细地讨论迭代器。现在，知道 iter 是一个返回集合中每个元素的方法，而 enumerate 则将 iter 的结果包装起来，并以元组的形式返回每个元素。 enumerate 返回的元组的第一个元素是索引，第二个元素是对元素的引用。这比我们自己计算索引要方便一些。

因为 enumerate 方法返回一个元组，所以我们可以使用模式来解构这个元组。我们将在第 6 章更详细地讨论模式。在 for 循环中，我们指定一个模式，该模式在元组中有 i 作为索引， &item 作为元组中的单个字节。因为我们从 .iter().enumerate() 获取了对元素的引用，所以在模式中使用 & 。

在 for 循环内部，我们使用字面量语法来搜索表示空格的字节。如果我们找到一个空格，就返回位置。否则，使用 s.len() 返回字符串的长度。

现在我们有了一种方法来找出字符串中第一个单词结束的索引，但有一个问题。我们返回了一个单独的 usize ，但这个数字只有在 &String 的上下文中才有意义。换句话说，因为它是一个与 String 分离的值，所以无法保证它在将来仍然有效。考虑 4-8 列表中的程序，它使用了 4-7 列表中的 first_word 函数。

```rust
fn main() {
    let mut s = String::from("hello world");

    let word = first_word(&s); // word will get the value 5

    s.clear(); // this empties the String, making it equal to ""

    // `word` still has the value `5` here, but `s` no longer has any content
    // that we could meaningfully use with the value `5`, so `word` is now
    // totally invalid!
}
```

这个程序编译没有任何错误，如果我们调用 s.clear() 后再使用 word ，它也会这样做。因为 word 与 s 的状态没有任何联系，所以 word 仍然包含 5 的值。我们可以使用这个值 5 与变量 s 来尝试提取第一个单词，但这将是一个错误，因为 s 的内容自从我们在 5 中保存 word 之后已经改变了。

必须担心 word 中的索引与 s 中的数据不同步是非常繁琐且容易出错的！如果我们编写一个 second_word 函数，它的签名将看起来像这样：

现在我们跟踪一个起始索引和一个结束索引，并且我们还有更多从特定状态中的数据计算得出的值，但这些值根本与该状态无关。我们有三个无关的变量在浮动，需要保持同步。

幸运的是，Rust 有一个解决方案来解决这个问题：字符串切片。

### 字符串切片

字符串切片是`String`的一部分引用，其形式如下：

```rust
let s = String::from("hello world");

let hello = &s[0..5];
let world = &s[6..11];
```
与引用整个 String 不同， hello 是 String 的一部分的引用，由额外的 [0..5] 位指定。我们通过在方括号内指定一个范围来创建切片，其中 [starting_index..ending_index] 是 starting_index 的起始位置和 ending_index 的最后一个位置加一。内部，切片数据结构存储切片的起始位置和长度，这对应于 ending_index 减去 starting_index 。因此，在 let world = &s[6..11]; 的情况下， world 将是一个包含指向 s 中索引 6 的字节的指针和长度值 5 的切片。

![20250503173509](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250503173509.png)

使用 Rust 的 .. 范围语法，如果你想从索引 0 开始，可以省略两个点之前的值。换句话说，它们是相等的：

```rust
let s = String::from("hello");

let slice = &s[0..2];
let slice = &s[..2];
```
同样地，如果你的切片包含 String 的最后一个字节，你可以省略尾随的数字。这意味着它们是相等的：

```rust
let s = String::from("hello");

let len = s.len();

let slice = &s[3..len];
let slice = &s[3..];

```

你也可以省略这两个值，以获取整个字符串的切片。所以它们是相等的：

```rust
let s = String::from("hello");

let len = s.len();

let slice = &s[0..len];
let slice = &s[..];
```
> 注意：字符串切片的范围索引必须出现在有效的 UTF-8 字符边界上。如果你尝试在多字节字符的中间创建字符串切片，你的程序将因错误而退出。在本节介绍字符串切片时，我们假设仅使用 ASCII；关于 UTF-8 处理的更详细讨论请参阅第 8 章的“使用字符串存储 UTF-8 编码文本”部分。


在了解所有这些信息后，让我们将 first_word 重新编写为返回一个切片。表示“字符串切片”的类型写作 &str ：

```rust
fn first_word(s: &String) -> &str {
  let bytes = s.as_bytes();

  for (i, &item) in bytes.iter().enumerate() {
    if item == b' ' {
      return &s[0..i];
    }
  }

  &s[..]
}
```

现在我们有一个简单的 API，因为编译器将确保 String 中的引用保持有效，这使得出错的可能性大大降低。记得列表 4-8 中的程序中的错误，当我们获取到第一个单词的末尾索引，但随后清除了字符串，我们的索引就变得无效了。这段代码在逻辑上是错误的，但没有立即显示任何错误。如果我们继续使用空字符串的第一个单词索引，问题会在稍后出现。切片使得这种错误成为不可能，并让我们及早知道代码中存在的问题。使用 first_word 的切片版本将抛出一个编译时错误：

```rust
fn main() {
    let mut s = String::from("hello world");

    let word = first_word(&s);

    s.clear(); // error!

    println!("the first word is: {word}");
}
```

```bash
$ cargo run
   Compiling ownership v0.1.0 (file:///projects/ownership)
error[E0502]: cannot borrow `s` as mutable because it is also borrowed as immutable
  --> src/main.rs:18:5
   |
16 |     let word = first_word(&s);
   |                           -- immutable borrow occurs here
17 |
18 |     s.clear(); // error!
   |     ^^^^^^^^^ mutable borrow occurs here
19 |
20 |     println!("the first word is: {word}");
   |                                  ------ immutable borrow later used here

For more information about this error, try `rustc --explain E0502`.
error: could not compile `ownership` (bin "ownership") due to 1 previous error
```

从借用规则中回忆起来，如果我们有一个不可变引用，那么我们也不能同时获取一个可变引用。因为 clear 需要截断 String ，它需要获取一个可变引用。在调用 clear 之后， word 使用了该引用，所以不可变引用必须仍然在那一刻有效。Rust 禁止在 clear 处存在可变引用和在 word 处存在不可变引用，编译将失败。Rust 不仅使我们的 API 更易于使用，而且还消除了在编译时整个类别的错误！

### 字符串字面量作为切片

回想一下，我们讨论了字符串字面量存储在二进制文件中。现在我们知道了切片，我们可以正确理解字符串字面量：

```rust
let s = "Hello, world!";
```
这里的`s`的类型是`&str`：他是一个指向二进制文件中特定点的切片。这也是为什么字符串字面量是不可变的原因：`&str`是一个不可变引用。

### 字符串切片作为参数

```rust
fn first_word(s: &str) -> &str {

}
```

如果我们有一个字符串切片，我们可以直接传递它。如果我们有一个 String ，我们可以传递 String 的切片或 String 的引用。这种灵活性利用了解引用转换，这是我们将在第 15 章的“函数和方法的隐式解引用转换”部分中介绍的功能。

定义一个函数以接受字符串切片而不是 String 的引用，可以使我们的 API 更通用、更有用，而不会丢失任何功能：

```rust
fn main() {
    let my_string = String::from("hello world");

    // `first_word` works on slices of `String`s, whether partial or whole
    let word = first_word(&my_string[0..6]);
    let word = first_word(&my_string[..]);
    // `first_word` also works on references to `String`s, which are equivalent
    // to whole slices of `String`s
    let word = first_word(&my_string);

    let my_string_literal = "hello world";

    // `first_word` works on slices of string literals, whether partial or whole
    let word = first_word(&my_string_literal[0..6]);
    let word = first_word(&my_string_literal[..]);

    // Because string literals *are* string slices already,
    // this works too, without the slice syntax!
    let word = first_word(my_string_literal);
}
```

### 其他切片

如你所想，字符串切片是特定于字符串的。但还有一个更通用的切片类型。考虑这个数组：

```rust
let a = [1, 2, 3, 4, 5];
```

就像我们可能想要引用字符串的一部分一样，我们可能想要引用数组的一部分。我们可以这样做：

```rust
let a = [1, 2, 3, 4, 5];

let slice = &a[1..3];

assert_eq!(slice, &[2, 3]);
```

这个切片具有类型 &[i32] 。它的工作方式与字符串切片相同，通过存储对第一个元素的引用和长度。您将使用这种类型的切片来处理各种其他集合。我们将在第 8 章讨论向量时详细讨论这些集合。