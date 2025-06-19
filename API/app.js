const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./models');
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const auditLoRoutes = require('./routes/auditLogRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const tribunalRoutes = require('./routes/tribunalRoutes');
const processoRoutes = require('./routes/processoRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
require('./jobs/tokenCleaner');
const activityTracker = require('./middleware/activityTracker');
const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Rota da documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Test database connection
db.sequelize.authenticate()
  .then(() => {
    console.log('A conexão com o banco de dados foi estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Não é possível conectar ao banco de dados:', err);
  });

// Sync database (remove force: true in production)
db.sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado');
  })
  .catch(err => {
    console.error('Erro ao sincronizar o banco:', err);
  });

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the secure API.' });
});

app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/logs', auditLoRoutes);
app.use('/api/tribunal', tribunalRoutes);
app.use('/api/processos', processoRoutes);

// Montar as rotas de autenticação sob o prefixo /api/auth
app.use('/api/auth', authRoutes); 
app.use(activityTracker); // Deve vir DEPOIS do middleware de autenticação
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});