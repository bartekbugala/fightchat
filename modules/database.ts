import { Sequelize, DataTypes } from 'sequelize';

export class DatabaseModule {
  private sequelize: Sequelize | null = null;
  private User: any | null = null;

  public async init(setup: any) {
    this.sequelize = new Sequelize(setup.name, setup.username, setup.password, {
      host: setup.remote_url,
      // port: setup.port,
      dialect: setup.dialect,
      dialectOptions: {
        // Your mariadb options here
        connectTimeout: 3000,
      },
    });

    try {
      await this.sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }

    this.User = this.sequelize.define(
      'User',
      {
        // Model attributes are defined here
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          // allowNull defaults to true
        },
      },
      {
        // Other model options go here
      }
    );

    await this.User.sync(); // Wait for synchronization to complete
  }

  public async set(firstName: string, lastName: string) {
    if (!this.sequelize || !this.User) {
      throw new Error('Database is not initialized. Call initialize() first.');
    }

    const jane = await this.User.create({ firstName, lastName });
    console.log(`${firstName} ${lastName}'s auto-generated ID: ${jane.id}`);
  }

  // ...
}

export default DatabaseModule;
