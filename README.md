# mask-json-data

A lib to mask json sensitive properties to protect your data

## Installation 

```bash
npm install --save mask-json-data
```

## Usage

```typescript

const schema: IMaskSchema =  {
  name: Mask.FullName(),
  document: {
    number: Mask.All(),
  },
  email: Mask.Email(),
};

const person = {
  name: "Bruce Wayne",
  document: {
    number: "129308120938",
    createdAt: "2020-05-30 15:00:00",
  }
  email: "bruce.wayne@wayne.com"
};

const result = Runner.Apply(person, schema);

{
  name: "Bru*****yne",
  document: {
    number: "************",
    createdAt: "2020-05-30 15:00:00",
  },
  email: "bru********@wayne.com"
}
```
## Rules

### All
Change all characters to *
 
 ### Email
 Show first 3 characters, host value and change anoterhs to *

 * Show "*invalid_email*" if string is invalid email.

 ### FullName

 Shouw first 3 and last # charecters from name and change anothers to *

### Number
Change valid number value to "*number*" and invalid to "*invalid_number*"

### Regex

Parameters: Regex pattern

Apply regex pattern in string and replace by *

### Show First

Paramters: Size

Show first paramters size characters.

### Show Last

Paramters: Size

Show last paramters size characters.

### Custom Rules

Implements a class with IRule interface

```typescript
class Sensitive implements IRule {
   public execute(value: any): string {
     return "*sensitive*";
   }
}

const schema = {
  passwotd: new Sensitive()
}
```

### Null and Undefined

If object value is null or undefined the returned value is null or undefined.


## Lint

```bash
npm run lint

// Fix
npm run lint:fix
```

##  Test

```bash
// Test
npm run test

// Coverage
npm run test:coverage

// Watch
npm run test:watch
```
## Build

```bash
npm run build
```
