RTBHouse - Americas Traffic Solutions Development Case

We would like you to build a simple web application page.

We have provided some files with this case:
- For the data that will be used in the project, let's call it data files:
	- data/orders.json
	- data/clients.json
        - data/products.json
- For the server side we have the boilerplate provided
	- rtbhouse-server:
		- contains the basic skeleton for the API
		- it's a NestJS initial TypeScript project 
        - it was generated using: `npx @nestjs/cli new rtbhouse-server`
        - helpful documentation [NestJS](https://docs.nestjs.com/)
- For the client side we also have the boilerplate provided
	- rtbhouse-client
		- contains the basic skeleton for the web client
		- it's a simple Nuxt project
        - it was generated using: `npx create-nuxt-app rtbhouse-client`
        - helpful documentation [Nuxt V2](https://v2.nuxt.com/docs/get-started/installation/)

Some requirements:
- use node 16 (the skeleton was generated using it, so you will probably have less issues sticking to this version)
- there are no library restrictions, but remember that we must be able to install it and the test aims on having a better understanding of how you code ;)

What we expect:
	- In the api(rtbhouse-server):
		- One, or more, new routes that will return, in a proper HTTP response, the content stored in the data files
		- New service and controller to handle new route(s) and data access
		- As a plus:
			- New e2e test cases to cover the new feature added
	- In the client side(rtbhouse-client):
		- A main page that will make a request to the API and render the data in a simple table
        - The table should contain:
            - a list of all products
            - how much of that product was sold
            - the product name
            - the product's store name
            - the unit price of the product
            - the total revenue of all products sold
        - sorting and filtering the data in the table are optional (but we should be able to read the whole list)
		- you can also use any components library you fancy, but it's not required :)

Keep it simple:
	- It's enough to run the project locally. We only need to be able to run locally to test. No need to deploy anywhere.
	- In the api:
		- There's no need for API authentication / authorization.
		- You can use HTTP, no need for HTTPS.
	- In the client side:
		- You can use simple HTML and CSS elements to build your UI. Keep the UI/UX simple.

Any extra features will be welcomed, but are totally optional.

You don't need to use the boilerplate provided.
The boilerplate provided uses our current stack, but you can use whatever NodeJS stack you prefer.
But remember that you still have consider the "What we expect" topics.

You have to send us the final code in a .zip file with instructions on how to run it or any other documentation you consider important. We will analyze the running app and the final code. 

Should you encounter any doubts, let us know.
