# Yoga Sequencing Project In React
Preliminary app that allows users to create their own yoga sequences, directed at teachers, but students may also find this tool to be helpful. Teachers can store the sequences they have created using this application.

## How to install

In your terminal, enter the following commands:

* `git clone https://github.com/ricecake88/react_yoga_sequencing_project.git <directory_of_workspace>`
* `cd <directory_of_workspace>`
* `cd yoga_sequences_backend`
* `bundle install`
* `rake db:migrate RAILS_ENV=test`
* `rake db:seed`

## This application uses Postgres, and runs on localhost. 

### To modify the port that localhost runs on one can change the following file:

  `yoga_sequences_backend/config/environment/development.rb`

and add the following:

  `config.action_mailer.default_url_options = { host: 'localhost', port:3001}`

This indicates that the backend will be served up by port 3001.

### Postgres SQL instructions (Note these are instructions for using with the pgAdmin4.exe on Windows)

* Start a new database, and name it where you will use it to create your tables and records of data
* Create a user and add it to to the default role of admin for the database.
* Modify js_rails_project_backend/config/database.yml by changing the following lines:
*   `database`
*   `username`
*   if `localhost` is commented out, uncomment it.

## To start the server enter into the terminal (which will run on port 3001):
* `rails s`

## To View the Application

* From the terminal, exit to the parent folder and `cd yoga_sequences_frontend`.
* On the client side, install all necessary packages by entering `npm install'.
* Follow the instructions in the terminal if it may be necessary to update any packages.
* Enter `npm start`.
* Open up your browser.
* Enter `http://localhost:3000`.

## Built With

* create-react-app
* VS Code

## Authors

* Grace Shih - Initial work for basic habit application.

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

## Acknowledgments

* [Geniuses at StackOverflow](http://stackoverflow.com) for their never ending help when I encounter any problems
* [W3Schools](https://www.w3schools.com)
* Dakota Martinez from Flatiron for his authorization/authentication code and countless number of hours he spent helping everyone during study groups that I joined. His guidance has really helped in debugging issues.

