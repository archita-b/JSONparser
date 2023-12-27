JSON is used to exchange data to/from a web server.

A JSON string is needed to be parsed in order to interpret it.

An overview of JSON structure can be found at [json.org](https://www.json.org/json-en.html).

# Project Overview

This project contains a JSON parser written in JavaScript. The input is a JSON string, and the output is a parsed javascript value or null
in case of a bad JSON.

# Components:

# nullParser

```bash
input : JSON string
output : [null, rest of the input] or null
```

# booleanParser

```bash
input : JSON string
output : [boolean, rest of the input] or null
```

# numberParser

```bash
input : JSON string
output : [number, rest of the input] or null
```

# stringParser

```bash
input : JSON string
output : [string, rest of the input] or null
```

# arrayParser

```bash
input : JSON string
output : [array, rest of the input] or null
```

# objectParser

```bash
input : JSON string
output : [object, rest of the input] or null
```
