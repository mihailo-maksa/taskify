fn main() {
  let mut a = 12;

  another_fn();

  fn another_fn() {
    let b = 22;
  }

  let c = String::from("hello");
  let d = c; // this makes variable c invalid because of rule #2
  let e = c.clone(); // both variables d & e are now valid because of the .clone() method

  let x = String::from("hey!");
  drop_string(x); // x loses ownership to the argument s of the drop_string() function (because x is out of scope for it - rule #3)
  let x_2 = return_ownership(x); // There is also a way to return the ownership of x: assign a new variable that will get the original string x as its value (i.e. x gets returned from that function)

  let mut p = String::from("hi");
  // both r and s borrowed value from p
  let r = &p; // read-only borrow
  let s = &mut p; // mutable borrow

  // Borrowing a portion (slice) of a string or a vector
  let f = "world";
  let g = &f[0..2]; // wo
  let h = &f[1..5]; // orld
}

fn drop_string(s: String) {}

fn return_ownership(s: String) -> String {
  return s;
}

// Ownership Rules in Rust:
// 1.) Each value has its owner
// 2.) There can only be one owner at a time (e.g. b owns 22)
// 3.) When the value goes out of scope, it will be dropped

// Borrowing Rules in Rust:
// 1.) You can create an indefinite amount of read-only copies of each variable
// 2.) There can only be a single mutable borrow created at a time per scope
