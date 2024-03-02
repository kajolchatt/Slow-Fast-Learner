
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.get('/otherpage', (req, res) => {
    // Write a SQL query to retrieve data from the database
    const sql = 'SELECT * FROM your_table_name';
  
    // Execute the query
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      // Render the 'otherpage' template and pass the fetched data to it
      res.render('otherpage', { data: results });
    });
  }); 
