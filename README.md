# React Project - Code Commerce

You are going to build an e-commerce store for code. A super-smart person decided it was time for developers to actually make money with code instead of posting it for free online. Introducing Code Commerce -- a store where developers can sell pre-built code projects and snippets.

### 🔍 This project focuses on a few major principles:

> - Forms and form validation with React
> - Building stateful components
> - Passing data between components

### 🛠 Requirements:

You will build a 5-part checkout form.

1. Signup/Login
2. Customer cart
3. Shipping information
4. Payment information
5. Confirmation

Must include the "progress bar" as shown in the SHIPPING & PAYMENT mockup.

```
Note: Please do NOT use React Routing in this project. You will learn about it later.
The goal is to master components, props, state and conditional UI rendering.
```

### :busts_in_silhouette: Signup/Login

- [x] User can sign-in
- [x] Password field is obscured
- [x] There is an "eye" icon next to password to reveal what is being typed
- [x] If password is invalid, show an error message as depicted in the screenshot below
- [x] If successful sign-in, take user to Customer Cart
- [x] User can switch between Sign in and Create Account
- [x] If creating an account there will be two password fields
- [x] Passwords must match or show appropriate error as depicted below
- [x] First name and last name cannot have numbers
- [x] Postal code must not allow text (numbers only)
- [x] Show an "eye" icon next to password to reveal what is being typed
- [x] If an account for that email already exists, show an error message
- [x] Add a facebook sign in button (non-functional).

### :shopping_cart: Customer Cart

- [x] Create a cart that has 2-5 items in it
- [x] These should be actual components with item value
- [ ] The total sum of all items should be calculated as a total
- [x] Items can be removed and quantities can be increased or decreased -- cart total should adjust accordingly
- [ ] If there are zero cart items the Checkout button should be disabled
- [ ] If Checkout is selected move to the shipping screen

### :airplane: Shipping Information

- [ ] Show all shipping fields as depicted in the screenshot below
- [ ] Have standard and express shipping options -- the shipping & handling/checkout prices should adjust accordingly
- [ ] Ensure phone fields cannot take text (only numbers)
- [ ] Ensure postal code cannot take text (only numbers)
- [ ] Make sure all fields are completed or prevent the user from moving forward. Show appropriate error messages
- [ ] Back to cart button should go back to cart
- [ ] There should be a Next or "Payment" button to go to next screen

### :credit_card: Payment Information

- [ ] Create a credit card formatted that takes all major credit cards (Visa, Master Card, American Express, etc)
- [ ] Format the credit card field so the numbers are properly spaced (we don't want it to look ugly!)
- [ ] Have a dropdown for month and year for expiration dates
- [ ] Show errors if fields are entered incorrectly
- [ ] The Pay button should show the total price. If the fields are not complete this button should be disabled
- [ ] Make sure to show the cart/total at the right (or somewhere else)
- [ ] The Pay button should take the user to the confirmation screen
- [ ] A user should be able to apply a promo code and receive a discount

### :white_check_mark: Confirmation Screen

- [ ] Should show amount paid
- [ ] Should show last 4 digits of credit card used to make the purchase
- [ ] Add other UI as depicted below

---

## Mockups

### Login/Signup Screen

![Alt text](https://files.cdn.thinkific.com/file_uploads/88925/images/e70/22d/709/1.png 'Login/Signup Screen')

### Cart Screen

![Alt text](https://files.cdn.thinkific.com/file_uploads/88925/images/f56/3c6/e25/2.png?width=1920 'Cart Screen')

### Shipping Screen

![Alt text](https://files.cdn.thinkific.com/file_uploads/88925/images/a2b/785/b19/3.png 'Shipping Screen')

### Payment Screen

![Alt text](https://files.cdn.thinkific.com/file_uploads/88925/images/a62/250/95d/4.png 'Payment Screen')

### Confirmation Screen

![Alt text](https://files.cdn.thinkific.com/file_uploads/88925/images/cb3/e52/b92/5.png 'Confirmation Screen')
