import React from 'react'

let lucky: number
lucky = 23

let myObj: object = { foo: 'bar' }

interface Person {
  name: string
  age: number
  rich: boolean
  [key: string]: any
  readonly random?: string
}

const person: Person = {
  name: 'John',
  age: 23,
  rich: true,
  fit: true,
}

function pow(x: number, y: number): number {
  return x ** y
}

// void = function doesn't return anything
function log(input: string): void {
  console.log(input)
}

// ? = optional parameters
function compare(
  num1: number,
  num2: number,
  cb: () => boolean,
  refKey?: string,
): () => void {
  console.log(num1 === num2)
  cb()
  console.table({
    refKey,
  })

  return () => {}
}

// Array
const arr: number[] = [1, 2, 3]
const arr2: Array<number> = [4, 5, 6]

// Tupple
const tuple: [number?, string?, boolean?] = []
tuple.push(1)
tuple.push('one')
tuple.push(true)

// Generics (used for giving types internally inside of a class or a function)
class Observable<T, T2> {
  constructor(public value: T, private value2: T2) {}
}

let x: Observable<number, string> = new Observable(lucky, '')
let y: Observable<Person, Object> = new Observable(person, {})
let z: Observable<Function, () => void> = new Observable(pow, () => {})

// BigInt
let myBigInt: bigint = BigInt(123)

// Enums
enum Color {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
}

// Numbering starts at 0, but you can alter it by manually changing the value for one of the enum's members
enum Cars {
  Tesla = 1,
  BMW,
  Audi,
}

// Symbols
const sym: unique symbol = Symbol('key')
const sym2: unique symbol = Symbol('key')
//sym === sym2 --> always returns false

// Unknown, any & multiple options
let uk: unknown = 4 // used most commonly for dynamic content
uk = 'x'
uk = true

let a: any = {}
a = []
a = Color.Green

let multi: string | number
multi = 2
multi = '2'

// Null, undefined & never
let u: undefined = undefined
let n: null = null
let v: void = undefined // special case (won't work for null)
// void => returns undefined
// never => doesn't return anything

// never = function never ends or always throws an exception/error
function error(msg: string): never {
  throw new Error(msg)
}

// Interface vs Type (it's recommended to use interfaces most of the time)
interface MyInterface {
  a: string
  b: number
  c: boolean
}

// Extending interfaces
interface MyInterfaceExtended extends MyInterface {
  d: object[]
  e: readonly [string, number, boolean]
  f: () => boolean
}

type MyType = {
  a: string
  b: number
  c: boolean
}

// Extending types
type MyTypeExtended = MyType & {
  d: string[]
  e: object
}

// Interface inheritance (extends keyword)
interface BaseState {}

interface UserState extends BaseState {}

// Class inheritance (extends & implements keywords)
// extends will get all properties and methods of the parent class (super calls are required)
// implements will obligate us to implement all of the properties and methods defined in the implemented interface
interface Time {
  h: number
  m: number
}

class Clock implements Time {
  h = 0
  m = 0

  constructor(h: number, m: number) {
    this.h = h
    this.m = m
  }

  showTime(h: number, m: number): Time {
    console.log({
      h,
      m,
    })

    return {
      h,
      m,
    }
  }
}

enum Format {
  American,
  European,
}

class DigitalClock extends Clock implements Time {
  format = Format.American

  constructor(h: number, m: number, format: Format) {
    super(h, m)
    this.format = format
  }

  setFormat(format: Format): void {
    this.format = format
  }
}

// Namespaces
// Groups of functionality (interfaces, classes, functions, variables)
// Contains internal export statements for interfaces, classes, etc. that you want to use outside the namespace
// Can be multi-file, using commented-out reference tags (with 3 forward slashes) on top of the file that contains the namespace
/// <reference path="Validation.ts" />
namespace Validation {
  export interface FileExtValidator {
    isAcceptable(s: string): boolean
  }

  const jsRegex = /\.js$/
  const tsRegex = /\.ts$/

  export class JSValidator implements FileExtValidator {
    isAcceptable(f: string): boolean {
      f.replace(f, '')
      if (f.includes('.js')) return true
      return false
    }
  }

  export class TSValidator implements FileExtValidator {
    isAcceptable(f: string): boolean {
      f.replace(f, '')
      if (f.includes('.ts')) return true
      return false
    }
  }
}

// Declare keyword (specifies type on an already existing variable)
declare let module: any
