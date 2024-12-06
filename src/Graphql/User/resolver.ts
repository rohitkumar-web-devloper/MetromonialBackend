import db from "../../models";
import { IResolvers } from "@graphql-tools/utils"; // or '@apollo/server'
import { UserAttributes } from "../../models/user"
import { passwordCompare, passwordEncrypt, generateToken } from "../../helpers";
import { ApolloError } from 'apollo-server';
import { Op } from "sequelize";
import { upload } from "../../MulterConfig";

const User: IResolvers<any, any> = {
  
 
Query: {
  users: async (_: any, { page = 1, pageSize = 10, filter }: { page: number, pageSize: number, filter?: any }, context: any) => {
    const { user } = context;

    if (!user) {
      throw new Error("Unauthorized");
    }

    const whereConditions: any = {
      id: {
        [Op.ne]: user.id,
      },
    };

    // Apply filtering conditions if filter is provided
    if (filter) {
      if (filter.name) {
        whereConditions.name = {
          [Op.like]: `%${filter.name}%`,  // Example filter for name (case-insensitive)
        };
      }
      if (filter.email) {
        whereConditions.email = {
          [Op.like]: `%${filter.email}%`,  // Example filter for email
        };
      }
      // Add more filter conditions as needed
    }

    // Calculate pagination offset
    const offset = (page - 1) * pageSize;

    const users = await db.User.findAll({
      where: whereConditions,
      limit: pageSize,
      offset,
    });

    // You can also return additional metadata for pagination, like total count
    const totalCount = await db.User.count({
      where: whereConditions,
    });

    return {
      users,
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  },
  user: async (_: any, { id }: UserAttributes) => {
    return await db.User.findOne({
      where: {
        id,
      },
    });
  },
},


  Mutation: {
    loginUser: async (_: any, { email, password }: UserAttributes) => {
      const exist: any = await db.User.findOne({ where: { email } })
      if (!exist) {
        throw new ApolloError("User does not exist", "USER_NOT_FOUND");
      } else {
        if (!await passwordCompare(password, exist.password)) {
          throw new ApolloError("Password not match", "Password not match");
        }
        exist.token = await generateToken({ id: exist.id, name: exist.name });
        await exist.save();
        return { message: "User Login Successfully", success: true, ...exist.dataValues }
      }
    },
    createUser: async (_: any, data: UserAttributes, context: any) => {
      const { user } = context;
      if (!user) {
        throw new ApolloError("Unauthorized", "Unauthorized");
      }
      console.log(data, '--user-');

      const result = await db.User.create({ ...data, password: await passwordEncrypt(data.password) });
      return result;
    },
    updateUser: async (_: any, data: UserAttributes, context: any) => {
      const { user } = context;
      if (!user) {
        throw new ApolloError("Unauthorized", "Unauthorized");
      }
      const exist: any = await db.User.findOne({ where: { id: data.id } })
      if (exist) {
        exist.name = data.name
        exist.email = data.email
        await exist.save()
        return { ...exist.dataValues, message: 'User Updated', success: true }
      } else {
        return { message: 'User Not Found', success: false }
      }
    },
    deleteUser: async (_: any, { id }: UserAttributes, context: any) => {
      const { user } = context;
      if (!user) {
        throw new ApolloError("Unauthorized", "Unauthorized");
      }
      const exist: any = await db.User.findOne({ where: { id } })
      if (exist) {
        const result = await db.User.destroy({ where: { id } })
        if (result)
          return { ...exist.dataValues, message: 'User Deleted', success: true }
      } else {
        return { message: 'User Not Found', success: false }
      }
    },
  },
};

export default User;

