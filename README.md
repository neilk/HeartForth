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

😀💥0💞👉💕1➖💕1🙏👍👉✖💑0🙏👍💞💔😉

5💥0😘  

```
>> 120
```

## Discussion

HeartForth is a dialect of Forth, a stack-based language. Where other programming languages use many data structures, 
Forth has a wealth of operators to manipulate the stack. Emoji also has a large number of symbols which incorporate hearts, 
so these are matched together. So far I have implemented the basics:

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

## Why? Why would you do this?


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



## Acknowledgements

Aadit M. Shah posted this answer on Stack Exchange, which helped me get started.

https://stackoverflow.com/questions/13466600/how-would-i-go-about-implementing-a-simple-stack-based-programming-language

