import { Sequelize, DataTypes } from 'sequelize';

export class DatabaseModule {
  static sequelize: Sequelize;
  static User: any;
  static async init(setup: any) {
    this.sequelize = new Sequelize(setup.name, setup.username, setup.password, {
      host: setup.remote_url,
      dialect: 'mariadb',
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
    await this.User.sync();
  }
  static async set(firstName: string, lastName: string) {
    const user = await this.User.create({ firstName, lastName });
    console.log(`${firstName} ${lastName}'s auto-generated ID: ${user.id}`);
  }
  // ...
}

// const User = sequelize.define('user', {
//   username: DataTypes.STRING,
//   password: {
//     type: DataTypes.STRING,
//     set(value) {
//       // Storing passwords in plaintext in the database is terrible.
//       // Hashing the value with an appropriate cryptographic hash function is better.
//       this.setDataValue('password', hash(value));
//     }
//   }
// });

export default DatabaseModule;
