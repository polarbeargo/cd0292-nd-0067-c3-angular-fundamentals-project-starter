# MyStore Project Overview

MyStore is Angular application that allows users to view a list of available products to purchase, add them to a shopping cart, and ultimately complete the checkout process.

## Getting Started

To run the MyStore project, follow these steps:
1. **Clone the repository**:
   ```bash
   git clone https://github.com/polarbeargo/nd-0067-c3-angular-fundamentals-project-starter.git
   ```
2. **Navigate to the project directory**:
   ```bash
    cd mystore
    ```
3. **Install dependencies**:
    ```bash
    npm install
    ```
4. **Run the application**:
    ```bash
    ng serve
    ```
5. **Open your browser** and navigate to `http://localhost:4200` to view the application.

#### Project introduction: MyStore


![MyStore shopping flow](shoppingflow.gif)



#### Project features

- **Product list** page, which displays the available products for the user to choose and add to their cart (in various quantities)
- **Product details** page, which displays more information about any particular product
- **Shopping cart**, which includes the products that the user has added to their cart
- **Checkout form**, which collects information about the user (e.g., name, address, payment details, etc.)
- **Order confirmation page**, which shows the outcome after the user completes the checkout process (i.e., submits the checkout form)

#### Development strategy
We applied the `Observer` design pattern is already built into the core and is available through the EventEmitter class. It is used to create custom events in this Angular applications. The Observer pattern allows components to communicate with each other without being tightly coupled, promoting a more modular and maintainable codebase.
1.  The `*ngFor` directive iterates over the `products emitted` by the `products$` `observable` using the `async pipe` whenever the observable emits new data, the template will automatically update.
2. Each product is passed to the ProductItemComponent via the product input binding.
3. The (addToCart) output `event` from the ProductItemComponent is listened to in the ProductListComponent, and it calls the addToCart method with the `emitted` product.

4. The CartComponent will use the CartService to manage the cart's state, display the items in the cart, and allow users to remove items or proceed to checkout the HTML template for the CartComponent. This template will display the items in the cart, the total price, and a checkout form.

    * CartComponent: This component interacts with the CartService to manage the cart's state. It loads the cart items on initialization, allows users to remove items, and handles the checkout process.
    * Template: The template displays the cart items, total items, and total price. It also includes a `form` for the user to enter their name, address, and payment details for checkout.


## License

[License](LICENSE.txt)
