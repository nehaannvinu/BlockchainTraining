//Program to populate array using user given values

use std::io;

pub fn run() {
    let mut array = [0; 5];

    let mut num = String::new();

    for x in 0..5 {
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
