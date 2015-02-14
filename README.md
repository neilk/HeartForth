💕  💘  HeartForth ❤ 💞  
======================

An Emoji-based stack language

## Synopsis

*Instead of standard Forth...*

```
: factorial 0 swap begin dup 1 - dup  1 = until begin * over 0 = until swap drop ;

5 factorial .

>> 120 
```

*In HeartForth...*

> 😀💥0💞👉💕1➖💕1🙏👍👉✖💑0🙏👍💞💔😉
>
> 5💥😘  
> 
> `>> 120`

## Discussion

HeartForth is a dialect of
[Forth](https://en.wikipedia.org/wiki/Forth_%28programming_language%29), a
[stack-oriented](https://en.wikipedia.org/wiki/Stack-oriented_programming_language)
language. Where other programming languages use many data structures,
Forth has a wealth of operators to manipulate the stack. Emoji 
has a large number of symbols which incorporate hearts. So....

| HeartForth | Standard Forth | meaning |
| --- | --- | --- |
| 💕   | dup | ( a -> a a ) |
| 💔   | drop | ( a -> ) |
| 💑   | over | ( a b -> a b a ) |
| 💘   | rot | ( a b c -> b c a ) |
| 💞   | swap | ( a b -> b a ) |
| 😘   | . | *show last item on stack* |
| ❤   | dump | *show entire stack* |

## Advantages

* Extremely compact. Many complex programs fit in a tweet.
* Clean visual separation between program and data. No need to syntax-highlight.
* Whitespace agnostic. 
* Fully internationalized. Most programming languages are biased towards English speakers. Not HeartForth!

## Disadvantages

* None.

## Why would you do this?

My friend Ian Baker [wondered](https://twitter.com/raindrift/status/547536961171226625) whether
anyone had yet made an all-Emoji programming language.  My [first
thought](https://twitter.com/flipzagging/status/547815119473086465) was
to do a Lisp, but I was disappointed in how much the parentheses 🌘 🌒 
dominated the visual look. What we needed was a language which
was more stream-of-consciousness, like the way people use Emoji
already.

A long time ago I had used another stack-based language,
[PostScript](https://en.wikipedia.org/wiki/PostScript). They have
this curious property of being streams of keywords with some data
mixed in. Just like a block of Emoji. Once I realized I could match
hearts to stack operators I knew I was onto something. The "revolving hearts" 
symbol practically suggests `swap`, and hearts have something to do with
holding something close or remembering it. 

I originally tried implementing a new stack language in pure JavaScript, which was
surprisingly easy to get started but surprisingly hard to do things like
recursion well. So I decided to simply source-translate to an existing
Forth implementation instead.

## Show me another hackeneyed programming example.

What new language would be complete without printing the first *n* Fibonacci
numbers?

> 😀🌿0 1💘0✋💑➕💞💕😘👌💔😉
> 
> 10🌿 
>
> `>> 0 1 1 2 3 5 8 13 21 34`


## Complete glossary

| HeartForth | Standard Forth | meaning |
| --- | --- | --- |
| 💕   | dup | ( a -> a a ) |
| 💔   | drop | ( a -> ) |
| 💑   | over | ( a b -> a b a ) |
| 💘   | rot | ( a b c -> b c a ) |
| 💞   | swap | ( a b -> b a ) |
| 😘   | . | *show last item on stack* |
| ❤   | dump | *show entire stack* |
| ➕   | + | *add* |
| ➖   | - | *subtract* |
| ✖   | * | *multiply* |
| ➗   | / | *divide* |
| 🙏   | = | *equals* |
| 📢   | > | *greater than* |
| 📡   | < | *less than* |
| 😀   | : | *begin function definition*|
| 😉   | ; | *end function definition*|
| ✋   | ?do | *do block if > 0* |
| 👌   | loop | *loop* |
| 👉   | begin | *start block* |
| 👍   | until | *end loop condition* |
| 👐   | if | *if* |
| 👏   | then | *then* |


## Thanks to

Aadit M. Shah posted [this answer](https://stackoverflow.com/questions/13466600/how-would-i-go-about-implementing-a-simple-stack-based-programming-language)
on Stack Exchange, which helped me get started.

The [repl.it](https://github.com/replit) project and [ForthFreak](http://forthfreak.net/jsforth80x25.html) for bringing Forth to JavaScript.

## Mirrored

On my blog at [neilk.net](http://neilk.net/blog/2015/02/14/heartforth/).

## Dedication

*For my lovely girlfriend Melanie. I heart you 100 factorial .*

