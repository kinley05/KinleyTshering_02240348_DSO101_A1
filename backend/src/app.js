const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Setup SQLite database
const db = new sqlite3.Database(path.join(__dirname, '..', 'todos.db'));

db.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// GET all todos
app.get('/todos', (req, res) => {
  db.all('SELECT * FROM todos ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST add a todo
app.post('/todos', (req, res) => {
  const { task } = req.body;
  if (!task || task.trim() === '') {
    return res.status(400).json({ error: 'Task cannot be empty' });
  }
  db.run('INSERT INTO todos (task) VALUES (?)', [task.trim()], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT * FROM todos WHERE id = ?', [this.lastID], (err, row) => {
      res.status(201).json(row);
    });
  });
});

// PUT edit/complete a todo
app.put('/todos/:id', (req, res) => {
  const { task, completed } = req.body;
  const { id } = req.params;
  db.get('SELECT * FROM todos WHERE id = ?', [id], (err, todo) => {
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    db.run(
      'UPDATE todos SET task = ?, completed = ? WHERE id = ?',
      [
        task !== undefined ? task : todo.task,
        completed !== undefined ? completed : todo.completed,
        id
      ],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        db.get('SELECT * FROM todos WHERE id = ?', [id], (err, row) => {
          res.json(row);
        });
      }
    );
  });
});

// DELETE a todo
app.delete('/todos/:id', (req, res) => {
  db.run('DELETE FROM todos WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Todo deleted successfully' });
  });
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = { app };