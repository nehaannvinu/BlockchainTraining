//Program to populate dynamically created vector using user inputted values

use std::io;

pub fn main() {
    let mut length = String::new();
    println!("Enter array length");

    io::stdin()
        .read_line(&mut length)
        .expect("Failed to read line");

    let length: usize = length.trim().parse().expect("The value was not a length");

    let mut array = vec![0; length];
    println!("{:?}", array);

    let mut num = String::new();

    for x in 0..length {
        println!("Enter number { }:", x + 1);

        io::stdin()
            .read_line(&mut num)
            .expect("Failed to read line");

        let n: usize = num.trim().parse().expect("The value was not a number");
        array[x] = n;

        num.clear();

        println!("Your Array is {:?}", array);
    }
}
