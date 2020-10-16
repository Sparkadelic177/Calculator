# Calculator
A calculator that uses order of operations.

1. User types on an  input element that holds a value (number or operator)
2. Push that elements value into an array 
3. Display value on to the output section. (Array.join())
4. When user click “ = “ parse the array for the order of operations 
5. From left to right parse the array and find the first multiplication or division operator
6. Concat the single strings from the left and right side of the operator before reaching another operator or end of the array
7. Replace the single strings in between the operators or before the end of the array with the built concatenated number
8. Compute the value for the operation and replace the single operation with its value 
9. Repeat steps 5 through 8 in till no more multiplication or division operators are found
10. Repeat steps 5 through 9 for addition and subtraction operators
11. Display the Results on the output
