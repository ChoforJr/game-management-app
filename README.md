# Game Management App

This is an inventory application for a game shop,
I use Express JS along side posgreSQL to build this application

# Author : FORSAKANG CHOFOR JUNIOR

# Instuctions:

1. Set up an Express project and a new PostgreSQL database.
2. Before you begin, take a moment to write down all of the database tables and its fields you’ll need, as well as the relations between them. For example:

- In a game management app, there can be a game, genre, and developer entity. A game can have one or multiple developers and genres. Similarly a developer can develop multiple games.
- In a pokemon management app, there can be a pokemon, trainer and a type entity. Each pokemon must be contained in a type. While a trainer can have multiple pokemons.
  Any sufficient inventory app will have relations and constraints against its entities. Figure out these database particulars for your inventory app.

3. Set up the routes and controllers you’re going to need.
4. Create all of the ‘READ’ views (i.e. view category, and view item).
5. Create all the forms and build out the controllers you need for the create and update actions.
6. Figure out the delete functionality. What happens if you try to delete a category with items in it? Should it delete all the items as well? Should it just remove the category from the items? Or something else? This specific behavior will depend on your app’s requirements.
7. Once you’re confident with your project, add dummy data via a script to your local database. Do this again when you deploy.
8. Deploy it and show off what you’ve done!
